"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

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

export default function EditableMap({ geoData }: any) {
  const [drawingMode, setDrawingMode] = useState(null);
  const [map, setMap] = useState(null);
  const [mapLayer, setMapLayer] = useState([]);

  const _onCreate = (e) => {
    const { layerType, layer } = e;

    // Skip intermediate Polyline features when drawing a Polygon
    if (layerType === "polyline" && drawingMode === "polygon") {
      return;
    }

    // Prompt the user for metadata
    const description = prompt("Enter a description:");
    let image = "";
    if (drawingMode === "poi") {
      image = prompt("Enter an image URL (optional):");
    }

    const properties = {
      type: drawingMode,
      description,
      image,
    };

    const newLayer = {
      type: layerType,
      geometry: layer.toGeoJSON().geometry,
      properties,
    };

    setMapLayer((prevLayers) => [...prevLayers, newLayer]);
    console.log("New layer added:", newLayer);
  };
  const _onEditPath = (e) => {
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

  const _onDeleted = (e) => {
    const { layers } = e;
    const remainingLayers = mapLayer.filter(
      (layer) => !layers.getLayer(layer._leaflet_id)
    );
    setMapLayer(remainingLayers);
    console.log("Layers deleted:", remainingLayers);
  };

  const handleExport = () => {
    const geoJSON = {
      type: "FeatureCollection",
      features: mapLayer.map((layer) => ({
        type: "Feature",
        properties: layer.properties,
        geometry: layer.geometry,
      })),
    };
    const blob = new Blob([JSON.stringify(geoJSON)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "environment.geojson";
    a.click();
    URL.revokeObjectURL(url);
    console.log("Exported GeoJSON:", geoJSON);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const geoJSON = JSON.parse(e.target.result);
      setMapLayer(
        geoJSON.features.map((feature) => ({
          type: feature.geometry.type.toLowerCase(), // Ensure type is lowercase
          geometry: feature.geometry,
          properties: feature.properties,
        }))
      );
      console.log("Imported GeoJSON:", geoJSON);
    };
    reader.readAsText(file);
  };
  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 1000,
          display: "flex",
          gap: "10px",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}>
        {/* Dropdown for Drawing Mode */}
        <select
          onChange={(e) => setDrawingMode(e.target.value)}
          style={{
            margin: "5px",
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            color: "#333",
            fontSize: "14px",
            cursor: "pointer",
            outline: "none",
            transition: "border-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.borderColor = "#666")}
          onMouseOut={(e) => (e.target.style.borderColor = "#ccc")}>
          <option value="">Select drawing mode</option>
          <option value="zone">Draw Zone</option>
          <option value="poi">Draw POI</option>
          <option value="wall">Draw Wall</option>
          <option value="door">Draw Door</option>
          <option value="window">Draw Window</option>
        </select>

        {/* Export Button */}
        <button
          onClick={handleExport}
          style={{
            margin: "5px",
            padding: "8px 16px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#4CAF50",
            color: "#fff",
            fontSize: "14px",
            cursor: "pointer",
            outline: "none",
            transition: "background-color 0.3s ease, transform 0.2s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
          onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
          onMouseUp={(e) => (e.target.style.transform = "scale(1)")}>
          Export GeoJSON
        </button>

        {/* Import Button */}
        <input
          type="file"
          accept=".geojson"
          onChange={handleImport}
          style={{ display: "none" }} // Hide the default file input
          id="fileInput" // Add an ID for the label
        />
        <label
          htmlFor="fileInput"
          style={{
            margin: "5px",
            padding: "8px 16px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#2196F3",
            color: "#fff",
            fontSize: "14px",
            cursor: "pointer",
            outline: "none",
            transition: "background-color 0.3s ease, transform 0.2s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#1e88e5")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#2196F3")}
          onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
          onMouseUp={(e) => (e.target.style.transform = "scale(1)")}>
          Import GeoJSON
        </label>
      </div>

      <MapContainer
        center={[geoData.lat, geoData.lng]}
        zoom={18}
        maxZoom={25}
        style={{ height: "100vh", width: "1000px" }}
        whenCreated={setMap}>
        <TileLayer
          maxNativeZoom={18}
          maxZoom={25}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FeatureGroup>
          {mapLayer.map((layer, index) => {
            if (layer.type === "polygon" && layer.properties.type === "wall") {
              return (
                <Polygon
                  key={index}
                  positions={layer.geometry.coordinates[0].map(([lng, lat]) => [
                    lat,
                    lng,
                  ])}
                  color="black">
                  <Popup>
                    <strong>Wall</strong>
                    <br />
                    <p>{layer.properties.description}</p>
                  </Popup>
                </Polygon>
              );
            } else if (
              layer.type === "linestring" &&
              layer.properties.type === "door"
            ) {
              return (
                <Polyline
                  key={index}
                  positions={layer.geometry.coordinates.map(([lng, lat]) => [
                    lat,
                    lng,
                  ])}
                  color="green">
                  <Popup>
                    <strong>Door</strong>
                    <br />
                    <p>{layer.properties.description}</p>
                  </Popup>
                </Polyline>
              );
            } else if (
              layer.type === "linestring" &&
              layer.properties.type === "window"
            ) {
              return (
                <Polyline
                  key={index}
                  positions={layer.geometry.coordinates.map(([lng, lat]) => [
                    lat,
                    lng,
                  ])}
                  color="blue">
                  <Popup>
                    <strong>Window</strong>
                    <br />
                    <p>{layer.properties.description}</p>
                  </Popup>
                </Polyline>
              );
            } else if (layer.properties.type === "poi") {
              // Handle POIs dynamically based on their geometry type
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
                    </Marker>
                  );
                case "linestring":
                  return (
                    <Polyline
                      key={index}
                      positions={layer.geometry.coordinates.map(
                        ([lng, lat]) => [lat, lng]
                      )}
                      color="purple">
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
                  return (
                    <Polygon
                      key={index}
                      positions={layer.geometry.coordinates[0].map(
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
                    </Polygon>
                  );
                default:
                  return null;
              }
            }
            return null;
          })}
          <EditControl
            position="topright"
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
