"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
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

export default function EditableMap({
  geoData,
  file,
  setIsPoiFormOpen = () => {},
  setIsZoneFormOpen = () => {},
}: any) {
  const [drawingMode, setDrawingMode] = useState(null);
  const [map, setMap] = useState(null);
  const [mapLayer, setMapLayer] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

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
  const handleDrawingMode = (mode) => {
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
    setSelectedItem(newLayer);
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

  const handleSaveItem = (item) => {
    // Save the item details to the state or send to an API
    console.log("Item saved:", item);
    setSelectedItem(null);
  };

  return (
    <div className="font-montserrat">
      <style>
        {`
          .leaflet-draw-actions {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 5px;
          }
          .leaflet-draw-actions a {
            margin: 0 !important;
          }
        `}
      </style>
      <MapContainer
        center={[geoData.lat, geoData.lng]}
        zoom={18}
        maxZoom={25}
        style={{ height: "70vh", width: "800px" }}
        whenCreated={setMap}>
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
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
            onClick={() => {
              handleDrawingMode("zone");
            }}
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
            }}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor =
                drawingMode === "zone" ? "#45a049" : "#ddd")
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor =
                drawingMode === "zone" ? "#17252A" : "#17252A66")
            }
            onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
            onMouseUp={(e) => (e.target.style.transform = "scale(1)")}>
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
            }}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor =
                drawingMode === "poi" ? "#45a049" : "#ddd")
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor =
                drawingMode === "poi" ? "#17252A" : "#17252A66")
            }
            onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
            onMouseUp={(e) => (e.target.style.transform = "scale(1)")}>
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
            }}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor =
                drawingMode === "wall" ? "#45a049" : "#ddd")
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor =
                drawingMode === "wall" ? "#17252A" : "#17252A66")
            }
            onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
            onMouseUp={(e) => (e.target.style.transform = "scale(1)")}>
            Wall
          </button>
        </div>

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

      {selectedItem && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 1000,
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          }}>
          <h2>Edit {selectedItem.properties.type}</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveItem(selectedItem);
            }}>
            <label>
              Description:
              <input
                type="text"
                value={selectedItem.properties.description}
                onChange={(e) =>
                  setSelectedItem({
                    ...selectedItem,
                    properties: {
                      ...selectedItem.properties,
                      description: e.target.value,
                    },
                  })
                }
              />
            </label>
            {selectedItem.properties.type === "poi" && (
              <label>
                Image URL:
                <input
                  type="text"
                  value={selectedItem.properties.image}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      properties: {
                        ...selectedItem.properties,
                        image: e.target.value,
                      },
                    })
                  }
                />
              </label>
            )}
            <button type="submit">Save</button>
          </form>
        </div>
      )}
    </div>
  );
}
