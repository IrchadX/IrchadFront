// Updated EditableMap.tsx - Fixed Wall Display Issue

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
  // ADD THESE NEW PROPS
  onLayerCreated?: (layer: any) => void;
  onLayerUpdated?: (layer: any) => void;
}

export default function EditableMap({
  geoData,
  file = null,
  setIsPoiFormOpen = () => {},
  setIsZoneFormOpen = () => {},
  setSelectedItem,
  handleDeleteItem,
  onLayersDeleted,
  // ADD THESE NEW PROPS
  onLayerCreated,
  onLayerUpdated,
}: EditableMapProps) {
  const [drawingMode, setDrawingMode] = useState<string | null>(null);
  const [map, setMap] = useState<LeafletMap | null>(null);
  const [mapLayer, setMapLayer] = useState<MapLayer[]>([]);
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

  const handleDrawingMode = (mode: string) => {
    console.log("Drawing mode clicked:", mode);
    console.log("Current drawing mode:", drawingMode);

    if (drawingMode === mode) {
      console.log("Turning off drawing mode");
      setDrawingMode(null);
      setIsPoiFormOpen(false);
      setIsZoneFormOpen(false);
    } else {
      console.log("Setting drawing mode to:", mode);
      setDrawingMode(mode);
      if (mode === "poi") {
        setIsPoiFormOpen(true);
        setIsZoneFormOpen(false);
      } else if (mode === "zone") {
        setIsZoneFormOpen(true);
        setIsPoiFormOpen(false);
      } else {
        setIsPoiFormOpen(false);
        setIsZoneFormOpen(false);
      }
    }
  };

  const getDrawingDashArray = (): string | undefined => {
    switch (drawingMode) {
      case "environment":
        return "5, 5";
      case "zone":
        return "10, 10";
      default:
        return undefined;
    }
  };

  // FIXED _onCreate function:

  const _onCreate = (e: any) => {
    const { layerType, layer } = e;

    // Simple validation - only prevent polyline when specifically in polygon mode
    if (layerType === "polyline" && drawingMode === "polygon") {
      layer.remove();
      return;
    }

    // If no drawing mode is selected, use a default
    const effectiveDrawingMode = drawingMode || "zone";

    const properties = {
      type: effectiveDrawingMode,
      typeId: effectiveDrawingMode, // Add typeId for backend compatibility
      id: `new-${Date.now()}-${Math.random()}`,
      color: getDefaultColor(effectiveDrawingMode),
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

    // Convert to GeoJSON format and notify parent
    const geoJSONFeature = {
      type: "Feature",
      geometry: newLayer.geometry,
      properties: newLayer.properties,
    };

    // Notify parent component about the new layer
    if (onLayerCreated) {
      console.log("Notifying parent about new layer:", geoJSONFeature);
      onLayerCreated(geoJSONFeature);
    }

    setSelectedItem(newLayer);
    console.log("New layer added:", newLayer);
  };

  // SOLUTION: Update the getDefaultColor function to include door:

  const getDefaultColor = (drawingMode: string): string => {
    const colorMap = {
      environment: "#95a5a6",
      wall: "#2c3e50",
      door: "#27ae60", // <-- ADD THIS LINE
      window: "#2B7A78",
      zone: "#9b59b6",
      poi: "#e67e22",
    };
    return colorMap[drawingMode] || "#9b59b6";
  };

  // Also update the getColorForMode function to ensure consistency:

  const getColorForMode = (mode: string) => {
    const colors = {
      environment: "#95a5a6",
      wall: "#2c3e50",
      window: "#2B7A78",
      door: "#27ae60", // <-- MAKE SURE THIS MATCHES
      zone: "#17252A",
      poi: "#e67e22",
    };
    return colors[mode] || "#17252A";
  };

  const getButtonStyle = (mode: string) => ({
    padding: "6px 12px",
    borderRadius: "6px",
    border: `2px solid ${getColorForMode(mode)}`,
    backgroundColor:
      drawingMode === mode ? getColorForMode(mode) : "transparent",
    color: drawingMode === mode ? "#fff" : getColorForMode(mode),
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease",
    whiteSpace: "nowrap",
  });

  // And update the drawing color functions:

  const getDrawingColor = (): string => {
    switch (drawingMode) {
      case "environment":
        return "#95a5a6";
      case "wall":
        return "#2c3e50";
      case "door":
        return "#27ae60"; // <-- ADD THIS CASE
      case "window":
        return "#2B7A78";
      case "zone":
        return "#9b59b6";
      case "poi":
        return "#e67e22";
      default:
        return "#9b59b6";
    }
  };

  const getDrawingFillOpacity = (): number => {
    switch (drawingMode) {
      case "environment":
        return 0.1;
      case "wall":
        return 0.4;
      case "door":
        return 0.4; // <-- ADD THIS CASE
      case "window":
        return 0.2;
      case "zone":
        return 0.3;
      case "poi":
        return 0.3;
      default:
        return 0.3;
    }
  };

  const getDrawingWeight = (): number => {
    switch (drawingMode) {
      case "wall":
        return 6;
      case "window":
        return 4;
      case "door":
        return 4; // <-- ADD THIS CASE
      case "environment":
        return 2;
      default:
        return 4;
    }
  };
  // UPDATED _onEditPath function
  const _onEditPath = (e: any) => {
    const { layers } = e;
    const updatedLayers = mapLayer.map((layer) => {
      const editedLayer = layers.getLayer(layer._leaflet_id);
      if (editedLayer) {
        const updatedLayer = {
          ...layer,
          geometry: editedLayer.toGeoJSON().geometry,
        };

        // Notify parent about the updated layer
        if (onLayerUpdated) {
          const geoJSONFeature = {
            type: "Feature",
            geometry: updatedLayer.geometry,
            properties: updatedLayer.properties,
          };
          console.log("Notifying parent about updated layer:", geoJSONFeature);
          onLayerUpdated(geoJSONFeature);
        }

        return updatedLayer;
      }
      return layer;
    });

    setMapLayer(updatedLayers);
    console.log("Layers updated:", updatedLayers);
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
  };

  // Replace your GridOverlay component with this fixed version:
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
          pointerEvents: "none", // This prevents blocking mouse events
          zIndex: 1000, // Lower z-index to ensure it doesn't interfere with Leaflet controls
          transformOrigin: "center center",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
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
          flexDirection: "column",
          gap: "12px",
          padding: "15px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          marginBottom: "10px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}>
        {/* Primary Drawing Tools - Top Row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            alignItems: "center",
          }}>
          <span
            style={{
              fontWeight: "600",
              color: "#17252A",
              marginRight: "8px",
            }}>
            Drawing Tools:
          </span>

          {/* Environment & Structure Group */}
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <button
              onClick={() => handleDrawingMode("environment")}
              style={getButtonStyle("environment")}>
              🌍 Environment
            </button>
            <button
              onClick={() => handleDrawingMode("wall")}
              style={getButtonStyle("wall")}>
              🧱 Wall
            </button>
          </div>

          {/* Openings Group */}
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <button
              onClick={() => handleDrawingMode("window")}
              style={getButtonStyle("window")}>
              🪟 Window
            </button>
            <button
              onClick={() => handleDrawingMode("door")}
              style={getButtonStyle("door")}>
              🚪 Door
            </button>
          </div>

          {/* Zones & POIs Group */}
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <button
              onClick={() => handleDrawingMode("zone")}
              style={getButtonStyle("zone")}>
              🏗️ Zone
            </button>
            <button
              onClick={() => handleDrawingMode("poi")}
              style={getButtonStyle("poi")}>
              📍 POI
            </button>
          </div>
        </div>

        {/* Secondary Controls - Bottom Row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          {/* Grid Controls */}
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <span style={{ fontWeight: "600", color: "#17252A" }}>Grid:</span>
            <button
              onClick={() => setShowGrid(!showGrid)}
              style={{
                padding: "6px 12px",
                borderRadius: "6px",
                border: "2px solid #2B7A78",
                backgroundColor: showGrid ? "#2B7A78" : "transparent",
                color: showGrid ? "#fff" : "#2B7A78",
                fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}>
              {showGrid ? "🔲 ON" : "⬜ OFF"}
            </button>
            {showGrid && (
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                }}>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={gridSize}
                  onChange={(e) => setGridSize(Number(e.target.value))}
                  style={{
                    width: "80px",
                    accentColor: "#2B7A78",
                  }}
                />
                <span style={{ fontSize: "12px", color: "#7f8c8d" }}>
                  {gridSize}px
                </span>
              </div>
            )}
          </div>
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

        <MapContainer
          center={[geoData.lat, geoData.lng]}
          zoom={18}
          maxZoom={24}
          style={{ height: "100%", width: "100%" }}
          whenCreated={setMap}>
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

              console.log(`Rendering layer ${index}:`, { props, geom, coords });

              if (!props || !geom || !coords) return null;

              const toLatLng = (coord: [number, number]): [number, number] => {
                return [coord[1], coord[0]];
              };

              const renderPolygon = (
                color: string,
                title: string,
                name?: string,
                fillOpacity: number = 0.4,
                weight: number = 3,
                dashArray?: string
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
                      weight,
                      dashArray,
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

              const renderPolyline = (
                color: string,
                title: string,
                weight: number = 4
              ) => {
                if (!Array.isArray(coords[0]) || coords[0].length !== 2)
                  return null;

                return (
                  <Polyline
                    key={`polyline-${index}-${layer._leaflet_id}`}
                    positions={coords.map(toLatLng)}
                    pathOptions={{ color, weight }}>
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

              // FIXED WALL RENDERING - Handle both geometry types
              switch (props.type) {
                case "wall":
                  console.log(
                    "Rendering wall with geometry type:",
                    geom.type?.toLowerCase()
                  );
                  switch (geom.type?.toLowerCase()) {
                    case "linestring":
                      return renderPolyline("#2c3e50", "🧱 Wall", 6);
                    case "polygon":
                      return renderPolygon(
                        "#2c3e50",
                        "🧱 Wall",
                        props.name,
                        0.4,
                        6
                      );
                    default:
                      // Fallback - try to render as polyline if coordinates are available
                      if (Array.isArray(coords) && coords.length >= 2) {
                        return renderPolyline("#2c3e50", "🧱 Wall", 6);
                      }
                      return renderPolygon(
                        "#2c3e50",
                        "🧱 Wall",
                        props.name,
                        0.4,
                        6
                      );
                  }

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
                  return renderPolyline("#27ae60", "🚪 Door", 4);

                case "window":
                  switch (geom.type?.toLowerCase()) {
                    case "linestring":
                      return renderPolyline("#2B7A78", "🪟 Window", 4);
                    case "polygon":
                      return renderPolygon(
                        "#2B7A78",
                        "🪟 Window",
                        props.name,
                        0.2,
                        4
                      );
                    default:
                      return renderPolyline("#2B7A78", "🪟 Window", 4);
                  }

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
                        0.3,
                        3,
                        "10, 10"
                      );
                    default:
                      return renderPolygon(
                        zoneColor,
                        "🏗️ Zone",
                        props.name,
                        0.3,
                        3,
                        "10, 10"
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
                    color: getDrawingColor(),
                    fillOpacity: getDrawingFillOpacity(),
                  },
                },
                circle: {
                  shapeOptions: {
                    color: getDrawingColor(),
                    fillOpacity: getDrawingFillOpacity(),
                  },
                },
                circlemarker: {
                  color: getDrawingColor(),
                },
                marker: true,
                polyline: {
                  shapeOptions: {
                    color: getDrawingColor(),
                    weight: getDrawingWeight(),
                  },
                },
                polygon: {
                  shapeOptions: {
                    color: getDrawingColor(),
                    fillOpacity: getDrawingFillOpacity(),
                    dashArray: getDrawingDashArray(),
                  },
                },
              }}
            />
          </FeatureGroup>
        </MapContainer>
      </div>
    </div>
  );
}
