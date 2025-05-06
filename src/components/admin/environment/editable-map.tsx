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
  type: string;
  name?: string;
  description?: string;
  image?: string;
  nom?: string;
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
}
export default function EditableMap({
  geoData,
  file = null,
  setIsPoiFormOpen = () => {},
  setIsZoneFormOpen = () => {},
  setSelectedItem,
}: EditableMapProps) {
  const [drawingMode, setDrawingMode] = useState<string | null>(null);
  const [map, setMap] = useState<LeafletMap | null>(null);
  const [mapLayer, setMapLayer] = useState<MapLayer[]>([]);

  // Effect to update map layers when file or geoData changes
  useEffect(() => {
    if (file) {
      setMapLayer(
        file.features.map((feature) => ({
          type: feature.geometry.type.toLowerCase(),
          geometry: feature.geometry,
          properties: feature.properties,
        }))
      );
    }
  }, [file, geoData]);

  useEffect(() => {}, [drawingMode]);

  console.log(file);
  // Handle drawing mode selection
  const handleDrawingMode = (mode: string) => {
    if (drawingMode === mode) {
      setDrawingMode(null);
    } else {
      setDrawingMode(mode);
    }

    if (mode === "poi") {
      setIsPoiFormOpen(true);
      setIsZoneFormOpen(false);
    } else if (mode === "zone") {
      setIsZoneFormOpen(true);
      setIsPoiFormOpen(false);
    }
  };

  const _onCreate = (e: any) => {
    const { layerType, layer } = e;

    // Skip intermediate Polyline features when drawing a Polygon
    if (layerType === "polyline" && drawingMode === "polygon") {
      return;
    }

    const properties = {
      type: drawingMode || "",
    };

    const newLayer: MapLayer = {
      type: layerType,
      geometry: layer.toGeoJSON().geometry,
      properties,
      _leaflet_id: layer._leaflet_id,
    };

    setMapLayer((prevLayers) => [...prevLayers, newLayer]);
    setSelectedItem(newLayer);
    console.log("New layer added:", newLayer);
  };

  const _onEditPath = (e: any) => {
    const { layers } = e;
    const updatedLayers = mapLayer.map((layer) => {
      const editedLayer = layers.getLayer(layer._leaflet_id);
      if (editedLayer) {
        return {
          ...layer,
          geometry: editedLayer.toGeoJSON().geometry,
        };
      }
      return layer;
    });
    setMapLayer(updatedLayers);
    console.log("Layers updated:", updatedLayers);
  };

  const _onDeleted = (e: any) => {
    const { layers } = e;
    const remainingLayers = mapLayer.filter(
      (layer) => !layers.getLayer(layer._leaflet_id)
    );
    setMapLayer(remainingLayers);
    console.log("Layers deleted:", remainingLayers);
  };

  return (
    <div className="font-montserrat  z-0">
      <ToastContainer />
      <MapContainer
        zoom={18}
        maxZoom={22}
        center={[geoData.lat, geoData.lng]}
        zoom={18}
        maxZoom={22}
        style={{ height: "70vh", width: "800px" }}>
        <div
          style={{
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
              zIndex: 100,
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

          {/* Wall Button */}
          <button
            onClick={() => handleDrawingMode("wall")}
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: drawingMode === "wall" ? "#17252A" : "#17252A66",
              color: drawingMode === "wall" ? "#fff" : "#17252A",
              fontSize: "14px",
              cursor: "pointer",
              outline: "none",
              transition: "background-color 0.3s ease, transform 0.2s ease",
            }}>
            Wall
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

            const toLatLng = ([lng, lat]: [number, number]) => [lat, lng];

            const renderPolygon = (
              color: string,
              title: string,
              name?: string
            ) =>
              Array.isArray(coords[0]) && (
                <Polygon
                  key={index}
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

            const renderPolyline = (color: string, title: string) =>
              Array.isArray(coords) && (
                <Polyline
                  key={index}
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

            switch (props.type) {
              case "wall":
                return renderPolygon("black", "Wall");
              case "environment":
                return (
                  Array.isArray(coords[0]) && (
                    <Polygon
                      key={index}
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
                switch (layer.type?.toLowerCase()) {
                  case "point":
                    return (
                      Array.isArray(coords) &&
                      coords.length >= 2 && (
                        <Marker key={index} position={[coords[1], coords[0]]}>
                          <Popup>
                            <strong>PoI : {props.name}</strong>
                            <br />
                            <p>{props.description}</p>
                            {props.image && (
                              <img
                                src={props.image}
                                alt="POI"
                                style={{ width: "100px" }}
                              />
                            )}
                          </Popup>
                        </Marker>
                      )
                    );
                  case "linestring":
                    return renderPolyline("orange", "POI");
                  case "polygon":
                    return renderPolygon("yellow", "POI");
                  default:
                    return null;
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
