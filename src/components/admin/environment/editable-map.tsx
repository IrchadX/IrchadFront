// Enhanced EditableMap.tsx with tile rotation and grid
"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
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
  const [rotation, setRotation] = useState(0);
  const [showGrid, setShowGrid] = useState(false);
  const [gridSize, setGridSize] = useState(50);
  const [isRotating, setIsRotating] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const tileLayerRef = useRef<any>(null);

  // Effect to update map layers when file changes
  useEffect(() => {
    if (file && file.features) {
      console.log("Updating map layers from file:", file.features);
      const updatedLayers = file.features.map((feature, index) => ({
        type: feature.geometry.type.toLowerCase(),
        geometry: feature.geometry,
        properties: feature.properties,
        _leaflet_id: feature._leaflet_id || index + 1000,
      }));
      setMapLayer(updatedLayers);
    } else {
      setMapLayer([]);
    }
  }, [file]);

  useEffect(() => {
    console.log("Current mapLayer state:", mapLayer);
  }, [mapLayer]);

  // Apply tile rotation using CSS - multiple approaches
  useEffect(() => {
    if (map) {
      const applyRotation = () => {
        // Method 1: Try to rotate the tile pane
        const tilePane = map.getPane("tilePane");
        if (tilePane) {
          tilePane.style.transform = `rotate(${rotation}deg)`;
          tilePane.style.transformOrigin = "center center";
          tilePane.style.transition =
            "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
        }

        // Method 2: Try to rotate tile layers directly
        map.eachLayer((layer: any) => {
          if (layer.options && layer.options.attribution && layer._container) {
            layer._container.style.transform = `rotate(${rotation}deg)`;
            layer._container.style.transformOrigin = "center center";
            layer._container.style.transition =
              "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
          }
        });

        // Method 3: Use CSS to target tile layers
        const mapContainer = map.getContainer();
        if (mapContainer) {
          const tileContainers = mapContainer.querySelectorAll(
            ".leaflet-tile-container"
          );
          tileContainers.forEach((container: any) => {
            container.style.transform = `rotate(${rotation}deg)`;
            container.style.transformOrigin = "center center";
            container.style.transition =
              "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
          });

          const tileLayers = mapContainer.querySelectorAll(".leaflet-layer");
          tileLayers.forEach((layer: any) => {
            layer.style.transform = `rotate(${rotation}deg)`;
            layer.style.transformOrigin = "center center";
            layer.style.transition =
              "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
          });
        }
      };

      // Apply rotation immediately if map is ready, otherwise wait
      if (map._loaded) {
        applyRotation();
      } else {
        map.whenReady(applyRotation);
      }
    }
  }, [rotation, map]);

  // Handle rotation
  const handleRotation = (angle: number) => {
    setRotation((prev) => {
      const newRotation = (prev + angle) % 360;
      return newRotation < 0 ? newRotation + 360 : newRotation;
    });
  };

  const resetRotation = () => {
    setRotation(0);
  };

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

    if (layerType === "polyline" && drawingMode === "polygon") {
      layer.remove();
      return;
    }

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

    setMapLayer((prevLayers) => {
      const updated = [...prevLayers, newLayer];
      console.log("Added new layer, updated mapLayer:", updated);
      return updated;
    });

    setSelectedItem(newLayer);
    console.log("New layer added:", newLayer);
    toast.success(`${layerType} added successfully!`);
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
    toast.success("Layer updated successfully!");

    if (onLayersDeleted) {
      console.log("Layer edited, should notify parent");
    }
  };

  const _onDeleted = (e: any) => {
    const { layers } = e;
    console.log("Deletion event triggered:", e);
    console.log("Layers to delete:", layers);

    const deletedLayerData: any[] = [];
    const deletedLeafletIds: number[] = [];

    layers.eachLayer((layer: any) => {
      const leafletId = layer._leaflet_id;
      deletedLeafletIds.push(leafletId);

      const stateLayer = mapLayer.find((l) => l._leaflet_id === leafletId);

      if (stateLayer) {
        deletedLayerData.push({
          leafletId: leafletId,
          properties: stateLayer.properties,
          geometry: stateLayer.geometry,
          id: stateLayer.properties.id,
        });
        console.log("Found state layer for deletion:", stateLayer);
      } else {
        deletedLayerData.push({
          leafletId: leafletId,
          geometry: layer.toGeoJSON ? layer.toGeoJSON().geometry : null,
        });
        console.log("Layer not found in state, using fallback");
      }
    });

    console.log("Deleted layer data:", deletedLayerData);
    console.log("Deleted leaflet IDs:", deletedLeafletIds);

    const remainingLayers = mapLayer.filter(
      (layer) => !deletedLeafletIds.includes(layer._leaflet_id)
    );

    console.log("Remaining layers after deletion:", remainingLayers);
    setMapLayer(remainingLayers);

    if (onLayersDeleted && deletedLayerData.length > 0) {
      console.log("Notifying parent component about deletions");
      onLayersDeleted(deletedLayerData);
    }

    toast.success(`${deletedLayerData.length} layer(s) deleted successfully!`);
  };

  // Grid overlay component
  const GridOverlay = () => {
    if (!showGrid) return null;

    const gridLines = [];
    const mapWidth = 800;
    const mapHeight = 600; // Assuming 70vh ≈ 600px

    // Vertical lines
    for (let x = 0; x <= mapWidth; x += gridSize) {
      gridLines.push(
        <line
          key={`v-${x}`}
          x1={x}
          y1={0}
          x2={x}
          y2={mapHeight}
          stroke="#00000020"
          strokeWidth="1"
        />
      );
    }

    // Horizontal lines
    for (let y = 0; y <= mapHeight; y += gridSize) {
      gridLines.push(
        <line
          key={`h-${y}`}
          x1={0}
          y1={y}
          x2={mapWidth}
          y2={y}
          stroke="#00000020"
          strokeWidth="1"
        />
      );
    }

    return (
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1000,
        }}>
        {gridLines}
      </svg>
    );
  };

  return (
    <div className="font-montserrat">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Enhanced Control Panel */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          marginBottom: "10px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}>
        {/* Drawing Controls */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span style={{ fontWeight: "600", color: "#17252A" }}>Draw:</span>
          <button
            onClick={() => handleDrawingMode("zone")}
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              border: "2px solid #17252A",
              backgroundColor:
                drawingMode === "zone" ? "#17252A" : "transparent",
              color: drawingMode === "zone" ? "#fff" : "#17252A",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}>
            🏗️ Zone
          </button>
          <button
            onClick={() => handleDrawingMode("poi")}
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              border: "2px solid #17252A",
              backgroundColor:
                drawingMode === "poi" ? "#17252A" : "transparent",
              color: drawingMode === "poi" ? "#fff" : "#17252A",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}>
            📍 POI
          </button>
        </div>

        {/* Rotation Controls */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span style={{ fontWeight: "600", color: "#17252A" }}>
            Rotate Tiles:
          </span>
          <button
            onClick={() => handleRotation(-15)}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border: "2px solid #e74c3c",
              backgroundColor: "transparent",
              color: "#e74c3c",
              fontSize: "16px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            title="Rotate tiles left 15°">
            ↺
          </button>
          <button
            onClick={() => handleRotation(15)}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border: "2px solid #e74c3c",
              backgroundColor: "transparent",
              color: "#e74c3c",
              fontSize: "16px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            title="Rotate tiles right 15°">
            ↻
          </button>
          <button
            onClick={resetRotation}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border: "2px solid #95a5a6",
              backgroundColor: "transparent",
              color: "#95a5a6",
              fontSize: "12px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            title="Reset tile rotation">
            🔄
          </button>
          <span
            style={{
              fontSize: "12px",
              color: "#7f8c8d",
              minWidth: "40px",
              textAlign: "center",
            }}>
            {rotation}°
          </span>
        </div>

        {/* Grid Controls */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span style={{ fontWeight: "600", color: "#17252A" }}>Grid:</span>
          <button
            onClick={() => setShowGrid(!showGrid)}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border: "2px solid #3498db",
              backgroundColor: showGrid ? "#3498db" : "transparent",
              color: showGrid ? "#fff" : "#3498db",
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}>
            {showGrid ? "🔲" : "⬜"} {showGrid ? "ON" : "OFF"}
          </button>
          {showGrid && (
            <>
              <input
                type="range"
                min="20"
                max="100"
                value={gridSize}
                onChange={(e) => setGridSize(Number(e.target.value))}
                style={{
                  width: "80px",
                  accentColor: "#3498db",
                }}
                title={`Grid size: ${gridSize}px`}
              />
              <span style={{ fontSize: "12px", color: "#7f8c8d" }}>
                {gridSize}px
              </span>
            </>
          )}
        </div>
      </div>

      {/* Map Container */}
      <div
        ref={mapContainerRef}
        style={{
          position: "relative",
          height: "70vh",
          width: "800px",
          overflow: "hidden",
          borderRadius: "12px",
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
          border: "3px solid #ecf0f1",
        }}>
        {/* Grid Overlay */}
        <GridOverlay />

        {/* Rotation Indicator */}
        {rotation !== 0 && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "white",
              padding: "5px 10px",
              borderRadius: "15px",
              fontSize: "12px",
              zIndex: 1001,
              fontWeight: "600",
            }}>
            🔄 Tiles: {rotation}°
          </div>
        )}

        <MapContainer
          center={[geoData.lat, geoData.lng]}
          zoom={18}
          maxZoom={24}
          style={{ height: "100%", width: "100%" }}
          whenCreated={setMap}>
          {/* Custom Drawing Controls */}
          <div
            style={{
              zIndex: 1000,
              position: "absolute",
              bottom: "20px",
              left: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              alignItems: "flex-start",
            }}>
            {/* Status Indicator */}
            {drawingMode && (
              <div
                style={{
                  padding: "8px 12px",
                  borderRadius: "20px",
                  backgroundColor: "rgba(23, 37, 42, 0.9)",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "600",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  animation: "pulse 2s infinite",
                }}>
                ✏️ Drawing {drawingMode.toUpperCase()} mode
              </div>
            )}

            {/* Layer Count */}
            <div
              style={{
                padding: "6px 10px",
                borderRadius: "15px",
                backgroundColor: "rgba(52, 152, 219, 0.9)",
                color: "white",
                fontSize: "11px",
                fontWeight: "500",
                backdropFilter: "blur(5px)",
              }}>
              📊 {mapLayer.length} layers
            </div>
          </div>

          <TileLayer
            ref={tileLayerRef}
            zIndex={0}
            maxNativeZoom={22}
            maxZoom={25}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=b4b184f6a33f425f9d9fdf1ce712e0af"
            className="rotatable-tiles"
          />

          <FeatureGroup>
            {mapLayer.map((layer, index) => {
              const props = layer?.properties;
              const geom = layer?.geometry;
              const coords = geom?.coordinates;

              if (!props || !geom || !coords) return null;

              const toLatLng = (coord: [number, number]): [number, number] => {
                return [coord[1], coord[0]];
              };

              const renderPolygon = (
                color: string,
                title: string,
                name?: string,
                fillOpacity: number = 0.4
              ) => {
                if (!Array.isArray(coords[0]) || !Array.isArray(coords[0][0]))
                  return null;

                return (
                  <Polygon
                    key={`polygon-${index}-${layer._leaflet_id}`}
                    positions={coords[0].map(toLatLng)}
                    pathOptions={{
                      color,
                      fillOpacity,
                      weight: 3,
                      dashArray: props.type === "zone" ? "10, 10" : undefined,
                    }}>
                    <Popup>
                      <div style={{ maxWidth: "200px" }}>
                        <strong style={{ color: color }}>
                          {title}
                          {name ? ` : ${name}` : ""}
                        </strong>
                        <br />
                        {props.description && <p>{props.description}</p>}
                        {props.image && (
                          <img
                            src={props.image}
                            alt={title}
                            style={{ width: "100px", borderRadius: "4px" }}
                          />
                        )}
                      </div>
                    </Popup>
                  </Polygon>
                );
              };

              const renderPolyline = (color: string, title: string) => {
                if (!Array.isArray(coords[0]) || coords[0].length !== 2)
                  return null;

                return (
                  <Polyline
                    key={`polyline-${index}-${layer._leaflet_id}`}
                    positions={coords.map(toLatLng)}
                    pathOptions={{ color, weight: 4 }}>
                    <Popup>
                      <div style={{ maxWidth: "200px" }}>
                        <strong style={{ color: color }}>{title}</strong>
                        <br />
                        {props.description && <p>{props.description}</p>}
                        {props.image && (
                          <img
                            src={props.image}
                            alt={title}
                            style={{ width: "100px", borderRadius: "4px" }}
                          />
                        )}
                      </div>
                    </Popup>
                  </Polyline>
                );
              };

              const renderPoint = (title: string) => {
                if (!Array.isArray(coords) || coords.length !== 2) return null;

                return (
                  <Marker
                    key={`marker-${index}-${layer._leaflet_id}`}
                    position={toLatLng(coords)}>
                    <Popup>
                      <div style={{ maxWidth: "200px" }}>
                        <strong>{title}</strong>
                        <br />
                        {props.description && <p>{props.description}</p>}
                        {props.image && (
                          <img
                            src={props.image}
                            alt={title}
                            style={{ width: "100px", borderRadius: "4px" }}
                          />
                        )}
                      </div>
                    </Popup>
                  </Marker>
                );
              };

              switch (props.type) {
                case "wall":
                  return renderPolygon("#2c3e50", "🧱 Wall");
                case "environment":
                  return (
                    Array.isArray(coords[0]) &&
                    Array.isArray(coords[0][0]) && (
                      <Polygon
                        key={`environment-${index}-${layer._leaflet_id}`}
                        positions={coords[0].map(toLatLng)}
                        pathOptions={{
                          color: "#95a5a6",
                          fillOpacity: 0.1,
                          weight: 2,
                          dashArray: "5, 5",
                        }}>
                        <Popup>
                          <div style={{ maxWidth: "200px" }}>
                            <strong style={{ color: "#95a5a6" }}>
                              🌍 Environment Boundary
                            </strong>
                            <br />
                            {props.description && <p>{props.description}</p>}
                          </div>
                        </Popup>
                      </Polygon>
                    )
                  );
                case "door":
                  return renderPolyline("#27ae60", "🚪 Door");
                case "window":
                  return renderPolyline("#3498db", "🪟 Window");
                case "poi":
                  switch (geom.type?.toLowerCase()) {
                    case "point":
                      return renderPoint(`📍 POI: ${props.name}`);
                    case "linestring":
                      return renderPolyline("#e67e22", `📍 POI: ${props.name}`);
                    case "polygon":
                      return renderPolygon("#f39c12", "📍 POI", props.name);
                    default:
                      return null;
                  }
                case "zone":
                  const zoneColor = props.color || "#9b59b6";
                  switch (geom.type?.toLowerCase()) {
                    case "point":
                      return renderPoint(`🏗️ Zone: ${props.name}`);
                    case "linestring":
                      return renderPolyline(
                        zoneColor,
                        `🏗️ Zone: ${props.name}`
                      );
                    case "polygon":
                      return renderPolygon(
                        zoneColor,
                        "🏗️ Zone",
                        props.name,
                        0.3
                      );
                    default:
                      return renderPolygon(
                        zoneColor,
                        "🏗️ Zone",
                        props.name,
                        0.3
                      );
                  }
                default:
                  return renderPolygon("#9b59b6", "🏗️ Zone", props.name, 0.3);
              }
            })}

            <EditControl
              position="topright"
              onEdited={_onEditPath}
              onCreated={_onCreate}
              onDeleted={_onDeleted}
              draw={{
                rectangle: {
                  shapeOptions: {
                    color: drawingMode === "zone" ? "#9b59b6" : "#f39c12",
                    fillOpacity: 0.3,
                  },
                },
                circle: {
                  shapeOptions: {
                    color: drawingMode === "zone" ? "#9b59b6" : "#f39c12",
                    fillOpacity: 0.3,
                  },
                },
                circlemarker: {
                  color: drawingMode === "zone" ? "#9b59b6" : "#f39c12",
                },
                marker: true,
                polyline: {
                  shapeOptions: {
                    color: drawingMode === "zone" ? "#9b59b6" : "#e67e22",
                    weight: 4,
                  },
                },
                polygon: {
                  shapeOptions: {
                    color: drawingMode === "zone" ? "#9b59b6" : "#f39c12",
                    fillOpacity: 0.3,
                  },
                },
              }}
            />
          </FeatureGroup>
        </MapContainer>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        /* Enhanced button hover effects */
        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        button:active {
          transform: translateY(0);
        }

        /* Smooth transitions for all interactive elements */
        * {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Tile rotation styles */
        :global(.leaflet-tile-pane) {
          transform: rotate(${rotation}deg);
          transform-origin: center center;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        :global(.leaflet-layer) {
          transform: rotate(${rotation}deg);
          transform-origin: center center;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        :global(.leaflet-tile-container) {
          transform: rotate(${rotation}deg);
          transform-origin: center center;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
}
