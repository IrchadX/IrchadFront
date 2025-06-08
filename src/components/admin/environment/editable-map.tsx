// Fixed EditableMap.tsx
"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import type { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const FeatureGroup = dynamic(
  () => import("react-leaflet").then((mod) => mod.FeatureGroup),
  { ssr: false }
);
const Polygon = dynamic(
  () => import("react-leaflet").then((mod) => mod.Polygon),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});
const Polyline = dynamic(
  () => import("react-leaflet").then((mod) => mod.Polyline),
  { ssr: false }
);
const EditControl = dynamic(
  () => import("react-leaflet-draw").then((mod) => mod.EditControl),
  { ssr: false }
);

interface GeoData {
  lat: number;
  lng: number;
}

interface LayerProperties {
  color: string;
  type: string;
  name?: string;
  description?: string;
  image?: string;
  nom?: string;
  id?: string;
}

interface MapLayer {
  type: string;
  geometry: {
    type: string;
    coordinates: any;
  };
  properties: LayerProperties;
  _leaflet_id?: number;
}

interface EditableMapProps {
  geoData: GeoData;
  file?: {
    features: MapLayer[];
  } | null;
  setIsPoiFormOpen?: (isOpen: boolean) => void;
  setIsZoneFormOpen?: (isOpen: boolean) => void;
  setSelectedItem: (item: MapLayer | null) => void;
  handleDeleteItem?: (layerIds: number[]) => void;
  onLayersDeleted?: (deletedLayerData: any[]) => void;
}

export default function EditableMap({
  geoData,
  file = null,
  setIsPoiFormOpen = () => {},
  setIsZoneFormOpen = () => {},
  setSelectedItem,
  handleDeleteItem,
  onLayersDeleted,
}: EditableMapProps) {
  const [drawingMode, setDrawingMode] = useState<string | null>(null);
  const [map, setMap] = useState<LeafletMap | null>(null);
  const [mapLayer, setMapLayer] = useState<MapLayer[]>([]);

  // Effect to update map layers when file changes
  useEffect(() => {
    if (file && file.features) {
      console.log("Updating map layers from file:", file.features);
      const updatedLayers = file.features.map((feature, index) => ({
        type: feature.geometry.type.toLowerCase(),
        geometry: feature.geometry,
        properties: feature.properties,
        _leaflet_id: feature._leaflet_id || index + 1000, // Ensure we have a leaflet ID
      }));
      setMapLayer(updatedLayers);
    } else {
      setMapLayer([]);
    }
  }, [file]);

  useEffect(() => {
    console.log("Current mapLayer state:", mapLayer);
  }, [mapLayer]);

  // Handle drawing mode selection
  const handleDrawingMode = (mode: string) => {
    if (drawingMode === mode) {
      setDrawingMode(null);
      setIsPoiFormOpen(false);
      setIsZoneFormOpen(false);
    } else {
      setDrawingMode(mode);
      if (mode === "poi") {
        setIsPoiFormOpen(true);
        setIsZoneFormOpen(false);
      } else if (mode === "zone") {
        setIsZoneFormOpen(true);
        setIsPoiFormOpen(false);
      }
    }
  };

  const _onCreate = (e: any) => {
    const { layerType, layer } = e;

    // Skip intermediate Polyline features when drawing a Polygon
    if (layerType === "polyline" && drawingMode === "polygon") {
      layer.remove(); // Remove the intermediate polyline
      return;
    }

    // Skip if we're not in a drawing mode or the layer type doesn't match
    if (
      !drawingMode ||
      (drawingMode === "polygon" && layerType !== "polygon")
    ) {
      return;
    }

    const properties = {
      type: drawingMode || "",
      id: `new-${Date.now()}-${Math.random()}`,
    };

    const newLayer: MapLayer = {
      type: layerType,
      geometry: layer.toGeoJSON().geometry,
      properties,
      _leaflet_id: layer._leaflet_id,
    };

    // Update local state
    setMapLayer((prevLayers) => {
      const updated = [...prevLayers, newLayer];
      console.log("Added new layer, updated mapLayer:", updated);
      return updated;
    });

    setSelectedItem(newLayer);
    console.log("New layer added:", newLayer);
  };

  const _onEditPath = (e: any) => {
    const { layers } = e;
    const updatedLayers = mapLayer.map((layer) => {
      const editedLayer = layers.getLayer(layer._leaflet_id);
      if (editedLayer) {
        const updatedLayer = {
          ...layer,
          geometry: editedLayer.toGeoJSON().geometry,
        };
        return updatedLayer;
      }
      return layer;
    });

    setMapLayer(updatedLayers);
    console.log("Layers updated:", updatedLayers);

    // Notify parent component about the edit
    if (onLayersDeleted) {
      // We can create a custom callback for edits if needed
      console.log("Layer edited, should notify parent");
    }
  };

  const _onDeleted = (e: any) => {
    const { layers } = e;
    console.log("Deletion event triggered:", e);
    console.log("Layers to delete:", layers);

    // Extract information about deleted layers
    const deletedLayerData: any[] = [];
    const deletedLeafletIds: number[] = [];

    layers.eachLayer((layer: any) => {
      const leafletId = layer._leaflet_id;
      deletedLeafletIds.push(leafletId);

      // Find the corresponding layer in our state
      const stateLayer = mapLayer.find((l) => l._leaflet_id === leafletId);

      if (stateLayer) {
        deletedLayerData.push({
          leafletId: leafletId,
          properties: stateLayer.properties,
          geometry: stateLayer.geometry,
          id: stateLayer.properties.id, // Include the ID for parent component
        });
        console.log("Found state layer for deletion:", stateLayer);
      } else {
        // Fallback for layers not in state
        deletedLayerData.push({
          leafletId: leafletId,
          geometry: layer.toGeoJSON ? layer.toGeoJSON().geometry : null,
        });
        console.log("Layer not found in state, using fallback");
      }
    });

    console.log("Deleted layer data:", deletedLayerData);
    console.log("Deleted leaflet IDs:", deletedLeafletIds);

    // Update local state - remove deleted layers
    const remainingLayers = mapLayer.filter(
      (layer) => !deletedLeafletIds.includes(layer._leaflet_id)
    );

    console.log("Remaining layers after deletion:", remainingLayers);
    setMapLayer(remainingLayers);

    // Notify parent component with detailed deletion information
    if (onLayersDeleted && deletedLayerData.length > 0) {
      console.log("Notifying parent component about deletions");
      onLayersDeleted(deletedLayerData);
    }
  };

  return (
    <div className="font-montserrat">
      <ToastContainer />
      <MapContainer
        center={[geoData.lat, geoData.lng]}
        zoom={18}
        maxZoom={24}
        style={{ height: "70vh", width: "800px" }}>
        <div
          style={{
            zIndex: 1000,
            position: "absolute",
            bottom: "10px",
            left: "50px",
            display: "flex",
            gap: "10px",
            alignItems: "center",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          }}>
          {/* Zone Button */}
          <button
            onClick={() => handleDrawingMode("zone")}
            style={{
              zIndex: 0,
              padding: "8px 16px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: drawingMode === "zone" ? "#17252A" : "#17252A66",
              color: drawingMode === "zone" ? "#fff" : "#17252A",
              fontSize: "14px",
              cursor: "pointer",
              outline: "none",
              transition: "background-color 0.3s ease, transform 0.2s ease",
            }}>
            Zone
          </button>

          {/* POI Button */}
          <button
            onClick={() => handleDrawingMode("poi")}
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: drawingMode === "poi" ? "#17252A" : "#17252A66",
              color: drawingMode === "poi" ? "#fff" : "#17252A",
              fontSize: "14px",
              cursor: "pointer",
              outline: "none",
              transition: "background-color 0.3s ease, transform 0.2s ease",
            }}>
            POI
          </button>
        </div>

        <TileLayer
          zIndex={0}
          maxNativeZoom={22}
          maxZoom={25}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=b4b184f6a33f425f9d9fdf1ce712e0af"
        />
        <FeatureGroup>
          {mapLayer.map((layer, index) => {
            const props = layer?.properties;
            const geom = layer?.geometry;
            const coords = geom?.coordinates;

            if (!props || !geom || !coords) return null;

            // Enhanced coordinate converter with proper typing
            const toLatLng = (coord: [number, number]): [number, number] => {
              return [coord[1], coord[0]]; // Convert from [lng, lat] to [lat, lng]
            };

            const renderPolygon = (
              color: string,
              title: string,
              name?: string
            ) => {
              // Check for Polygon coordinates structure (array of rings)
              if (!Array.isArray(coords[0]) || !Array.isArray(coords[0][0]))
                return null;

              return (
                <Polygon
                  key={`polygon-${index}-${layer._leaflet_id}`}
                  positions={coords[0].map(toLatLng)}
                  pathOptions={{ color }}>
                  <Popup>
                    <strong>
                      {title}
                      {name ? ` : ${name}` : ""}
                    </strong>
                    <br />
                    <p>{props.description}</p>
                    {props.image && (
                      <img
                        src={props.image}
                        alt={title}
                        style={{ width: "100px" }}
                      />
                    )}
                  </Popup>
                </Polygon>
              );
            };

            const renderPolyline = (color: string, title: string) => {
              // Check for LineString coordinates structure (array of points)
              if (!Array.isArray(coords[0]) || coords[0].length !== 2)
                return null;

              return (
                <Polyline
                  key={`polyline-${index}-${layer._leaflet_id}`}
                  positions={coords.map(toLatLng)}
                  pathOptions={{ color }}>
                  <Popup>
                    <strong>{title}</strong>
                    <br />
                    <p>{props.description}</p>
                    {props.image && (
                      <img
                        src={props.image}
                        alt={title}
                        style={{ width: "100px" }}
                      />
                    )}
                  </Popup>
                </Polyline>
              );
            };

            const renderPoint = (title: string) => {
              // Check for Point coordinates structure (single [lng, lat] pair)
              if (!Array.isArray(coords) || coords.length !== 2) return null;

              return (
                <Marker
                  key={`marker-${index}-${layer._leaflet_id}`}
                  position={toLatLng(coords)}>
                  <Popup>
                    <strong>{title}</strong>
                    <br />
                    <p>{props.description}</p>
                    {props.image && (
                      <img
                        src={props.image}
                        alt={title}
                        style={{ width: "100px" }}
                      />
                    )}
                  </Popup>
                </Marker>
              );
            };

            switch (props.type) {
              case "wall":
                return renderPolygon("black", "Wall");
              case "environment":
                return (
                  Array.isArray(coords[0]) &&
                  Array.isArray(coords[0][0]) && (
                    <Polygon
                      key={`environment-${index}-${layer._leaflet_id}`}
                      positions={coords[0].map(toLatLng)}
                      pathOptions={{
                        color: "gray",
                        fillOpacity: 0.2,
                        weight: 2,
                      }}>
                      <Popup>
                        <strong>Environment Boundary</strong>
                        <br />
                        <p>{props.description}</p>
                      </Popup>
                    </Polygon>
                  )
                );
              case "door":
                return renderPolyline("green", "Door");
              case "window":
                return renderPolyline("blue", "Window");
              case "poi":
                switch (geom.type?.toLowerCase()) {
                  case "point":
                    return renderPoint(`POI: ${props.name}`);
                  case "linestring":
                    return renderPolyline("orange", `POI: ${props.name}`);
                  case "polygon":
                    return renderPolygon("yellow", "POI", props.name);
                  default:
                    return null;
                }
              case "zone":
                const zoneColor = props.color || "purple";
                switch (geom.type?.toLowerCase()) {
                  case "point":
                    return renderPoint(`Zone: ${props.name}`);
                  case "linestring":
                    return renderPolyline(zoneColor, `Zone: ${props.name}`);
                  case "polygon":
                    return renderPolygon(zoneColor, "Zone", props.name);
                  default:
                    return renderPolygon(zoneColor, "Zone", props.name);
                }
              default:
                return renderPolygon("purple", "Zone", props.name);
            }
          })}

          <EditControl
            position="bottomleft"
            onEdited={_onEditPath}
            onCreated={_onCreate}
            onDeleted={_onDeleted}
            draw={{
              rectangle: true,
              circle: true,
              circlemarker: true,
              marker: true,
              polyline: true,
            }}
          />
        </FeatureGroup>
      </MapContainer>
    </div>
  );
}
