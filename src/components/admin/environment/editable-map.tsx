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
    <div className="font-montserrat">
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
            zIndex: 1000,
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
          maxNativeZoom={22}
          maxZoom={25}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=b4b184f6a33f425f9d9fdf1ce712e0af"
        />
        <FeatureGroup>
          {mapLayer.map((layer, index) => {
            if (layer.properties.type === "wall") {
              return (
                <Polygon
                  key={index}
                  positions={layer.geometry.coordinates[0].map(
                    ([lng, lat]: [number, number]) => [lat, lng]
                  )}
                  pathOptions={{ color: "black" }}>
                  <Popup>
                    <strong>Wall</strong>
                    <br />
                    <p>{layer.properties.description}</p>
                  </Popup>
                </Polygon>
              );
            } else if (layer.properties.type === "environment") {
              return (
                <Polygon
                  key={index}
                  positions={layer.geometry.coordinates[0].map(
                    ([lng, lat]: [number, number]) => [lat, lng]
                  )}
                  pathOptions={{
                    color: "gray",
                    fillOpacity: 0.2,
                    weight: 2,
                  }}>
                  <Popup>
                    <strong>Environment Boundary</strong>
                    <br />
                    <p>{layer.properties.description}</p>
                  </Popup>
                </Polygon>
              );
            } else if (layer.properties.type === "door") {
              return (
                <Polyline
                  key={index}
                  positions={layer.geometry.coordinates.map(
                    ([lng, lat]: [number, number]) => [lat, lng]
                  )}
                  pathOptions={{ color: "green" }}>
                  <Popup>
                    <strong>Door</strong>
                    <br />
                    <p>{layer.properties.description}</p>
                  </Popup>
                </Polyline>
              );
            } else if (layer.properties.type === "window") {
              return (
                <Polyline
                  key={index}
                  positions={layer.geometry.coordinates.map(
                    ([lng, lat]: [number, number]) => [lat, lng]
                  )}
                  pathOptions={{ color: "blue" }}>
                  <Popup>
                    <strong>Window</strong>
                    <br />
                    <p>{layer.properties.description}</p>
                  </Popup>
                </Polyline>
              );
            } else if (
              layer.properties.type.startsWith("Zone") ||
              layer.properties.type.startsWith("zone")
            ) {
              return (
                <Polygon
                  key={index}
                  positions={layer.geometry.coordinates[0].map(
                    ([lng, lat]: [number, number]) => [lat, lng]
                  )}
                  pathOptions={{ color: "purple" }}>
                  <Popup>
                    <strong>Zone : {layer.properties.name}</strong>
                    <br />
                    <p>{layer.properties.description}</p>
                  </Popup>
                </Polygon>
              );
            } else if (layer.properties.type === "poi") {
              switch (layer.type) {
                case "point":
                  return (
                    <Marker
                      key={index}
                      position={[
                        layer.geometry.coordinates[1],
                        layer.geometry.coordinates[0],
                      ]}>
                      <Popup>
                        <strong>PoI : {layer.properties.name}</strong>
                        <br />
                        <p>{layer.properties.description}</p>
                        {layer.properties.image && (
                          <img
                            src={layer.properties.image}
                            alt="POI"
                            style={{ width: "100px" }}
                          />
                        )}
                      </Popup>
                    </Marker>
                  );
                case "linestring":
                  return (
                    <Polyline
                      key={index}
                      positions={layer.geometry.coordinates.map(
                        ([lng, lat]) => [lat, lng]
                      )}
                      color="orange">
                      <Popup>
                        <strong>POI</strong>
                        <br />
                        <p>{layer.properties.description}</p>
                        {layer.properties.image && (
                          <img
                            src={layer.properties.image}
                            alt="POI"
                            style={{ width: "100px" }}
                          />
                        )}
                      </Popup>
                    </Polyline>
                  );
                case "polygon":
                  {
                    console.log(layer);
                  }
                  return (
                    <Polygon
                      key={index}
                      positions={layer.geometry.coordinates[0].map(
                        ([lng, lat]: [number, number]) => [lat, lng]
                      )}
                      pathOptions={{ color: "yellow" }}>
                      <Popup>
                        <strong>POI</strong>
                        <br />
                        <p>{layer.properties.description}</p>
                        {layer.properties.image && (
                          <img
                            src={layer.properties.image}
                            alt="POI"
                            style={{ width: "100px" }}
                          />
                        )}
                      </Popup>
                    </Polygon>
                  );
                default:
                  return null;
              }
            }
            return null;
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
