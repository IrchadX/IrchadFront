"use client";
import { useEffect, useState, ChangeEvent } from "react";
import { ButtonSecondary } from "@/components/shared/secondary-button";
import Title from "@/components/shared/title";
import dynamic from "next/dynamic";
import AddZoneCard from "@/components/admin/environment/add-zone-card";
import AddPoiCard from "@/components/admin/environment/add-poi-card";
import AddEnvCard from "@/components/admin/environment/add-env-card";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import ZonesSwiper from "@/components/admin/environment/zone-swiper";
import POIsSwiper from "@/components/admin/environment/poi-swiper";
import Link from "next/link";
import LoadingSpinner from "@/components/shared/loading";

const DynamicMap = dynamic(
  () => import("@/components/admin/environment/editable-map"),
  { ssr: false }
);

// Add delimiter interface to your existing interfaces
interface Delimiter {
  id?: string;
  type: string;
  coordinates: number[][][];
}

interface BackendData {
  zones?: Zone[];
  pois?: Poi[];
  delimiters?: Delimiter[];
  environment: {
    name: string;
    description: string;
    address?: string;
    user_id: number | null;
    is_public: boolean;
  };
}

interface GeoJSONData {
  type: string;
  features: BaseFeature[];
  properties: {
    environment: {
      name: string;
      description: string;
      address: string;
      isPublic: boolean;
      userId: number | null;
    };
  };
}

interface EnvironmentInfo {
  name: string;
  description: string;
  isPublic: boolean;
  userId: number | null;
  address: string;
}

interface Zone {
  zone_type_zone_type_idTozone_type: any;
  id?: string;
  name: string;
  description: string;
  color: string;
  coordinates: number[][][];
}

interface Poi {
  id?: string;
  name: string;
  description: string;
  coordinates: number[][][];
}

interface LayerProperties {
  name: string;
  description: string;
  type: string;
  typeId?: string;
  id?: string;
  image?: string;
  color: string;
  nom?: string;
}

export interface BaseFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: number[][][];
  };
  properties: LayerProperties;
  _leaflet_id?: number;
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

interface FeatureItem extends MapLayer {
  id: string;
  properties: MapLayer["properties"] & {};
  type: string;
}

const Page = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = params.id as string;
  const isPending = searchParams.get("pending") === "true";

  const [isLoading, setIsLoading] = useState(true);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [geoJSON, setGeoJSON] = useState<GeoJSONData | null>(null);
  const [environmentInfo, setEnvironmentInfo] = useState<EnvironmentInfo>({
    name: "",
    description: "",
    isPublic: true,
    userId: null,
    address: "",
  });
  // Handler for when a new layer is created
  const handleLayerCreated = (newLayerFeature: any) => {
    console.log("New layer created:", newLayerFeature);

    // Check if the new layer is an environment type
    if (newLayerFeature.properties.type === "environment") {
      console.log("Environment layer detected, handling separately");

      // For environment layers, you can:
      // 1. Store them in a separate state
      // 2. Send them directly to your backend
      // 3. Handle them differently from other layer types

      // Example: Store environment layers separately
      setEnvironmentLayers((prev) => [...prev, newLayerFeature]);

      // Optional: Send to backend immediately
      // saveEnvironmentLayer(newLayerFeature);

      toast.success("Environment boundary added successfully!");
      return;
    }

    // For non-environment layers, add them to the geoJSON state
    if (geoJSON) {
      const updatedGeoJSON = {
        ...geoJSON,
        features: [...geoJSON.features, newLayerFeature],
      };

      console.log("Adding non-environment layer to geoJSON:", newLayerFeature);
      setGeoJSON(updatedGeoJSON);
    }
  };

  // Handler for when a layer is updated
  const handleLayerUpdated = (updatedLayerFeature: any) => {
    console.log("Layer updated:", updatedLayerFeature);

    // Check if the updated layer is an environment type
    if (updatedLayerFeature.properties.type === "environment") {
      console.log("Environment layer updated");

      // Update environment layers state
      setEnvironmentLayers((prev) =>
        prev.map((layer) =>
          layer.properties.id === updatedLayerFeature.properties.id
            ? updatedLayerFeature
            : layer
        )
      );

      toast.success("Environment boundary updated successfully!");
      return;
    }

    // For non-environment layers, update them in the geoJSON state
    if (geoJSON) {
      const updatedFeatures = geoJSON.features.map((feature) =>
        feature.properties.id === updatedLayerFeature.properties.id
          ? updatedLayerFeature
          : feature
      );

      const updatedGeoJSON = {
        ...geoJSON,
        features: updatedFeatures,
      };

      console.log(
        "Updating non-environment layer in geoJSON:",
        updatedLayerFeature
      );
      setGeoJSON(updatedGeoJSON);
    }
  };

  // Add this state to store environment layers separately (add this near your other useState declarations)
  const [environmentLayers, setEnvironmentLayers] = useState<BaseFeature[]>([]);

  // Optional: Function to save environment layer to backend immediately
  const saveEnvironmentLayer = async (environmentLayer: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/environments/${id}/environment-boundaries`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(environmentLayer),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save environment boundary");
      }

      const result = await response.json();
      console.log("Environment boundary saved:", result);
    } catch (error) {
      console.error("Error saving environment boundary:", error);
      toast.error("Failed to save environment boundary");
    }
  };

  const [zones, setZones] = useState([]);
  const [pois, setPois] = useState([]);
  const [lat, setLat] = useState(36.704661);
  const [long, setLong] = useState(3.174653);
  const [isPoiFormOpen, setIsPoiFormOpen] = useState(false);
  const [isZoneFormOpen, setIsZoneFormOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MapLayer | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleLayersDeleted = (deletedLayerData: any[]) => {
    console.log("handleLayersDeleted called with:", deletedLayerData);

    if (!geoJSON) {
      console.error("Cannot delete items: geoJSON is null");
      return;
    }

    let updatedFeatures = [...geoJSON.features];
    console.log("Initial features count:", updatedFeatures.length);
    deletedLayerData.forEach((deletedItem, index) => {
      console.log(`Processing deleted item ${index}:`, deletedItem);

      let removed = false;

      if (deletedItem.id && !removed) {
        const initialCount = updatedFeatures.length;
        updatedFeatures = updatedFeatures.filter(
          (feature) => feature.properties.id !== deletedItem.id
        );
        if (updatedFeatures.length < initialCount) {
          console.log(`✓ Removed feature with ID: ${deletedItem.id}`);
          removed = true;
        }
      }

      // Strategy 2: Match by properties.id (backup)
      if (deletedItem.properties?.id && !removed) {
        const initialCount = updatedFeatures.length;
        updatedFeatures = updatedFeatures.filter(
          (feature) => feature.properties.id !== deletedItem.properties.id
        );
        if (updatedFeatures.length < initialCount) {
          console.log(
            `✓ Removed feature with properties.id: ${deletedItem.properties.id}`
          );
          removed = true;
        }
      }

      // Strategy 3: Match by _leaflet_id (for items that exist in both states)
      if (deletedItem.leafletId && !removed) {
        const initialCount = updatedFeatures.length;
        updatedFeatures = updatedFeatures.filter(
          (feature) => feature._leaflet_id !== deletedItem.leafletId
        );
        if (updatedFeatures.length < initialCount) {
          console.log(
            `✓ Removed feature with _leaflet_id: ${deletedItem.leafletId}`
          );
          removed = true;
        }
      }

      // Strategy 4: Match by geometry coordinates (last resort)
      if (deletedItem.geometry && !removed) {
        try {
          const deletedCoords = JSON.stringify(
            deletedItem.geometry.coordinates
          );
          const initialCount = updatedFeatures.length;
          updatedFeatures = updatedFeatures.filter((feature) => {
            const featureCoords = JSON.stringify(feature.geometry.coordinates);
            return featureCoords !== deletedCoords;
          });
          if (updatedFeatures.length < initialCount) {
            console.log(`✓ Removed feature by geometry match`);
            removed = true;
          }
        } catch (error) {
          console.warn("Could not compare geometry coordinates:", error);
        }
      }

      if (!removed) {
        console.warn(`Could not remove deleted item:`, deletedItem);
      }
    });

    console.log(
      `Features count: ${geoJSON.features.length} → ${updatedFeatures.length}`
    );

    // Only update state if there were actual changes
    if (updatedFeatures.length !== geoJSON.features.length) {
      const updatedGeoJSON = {
        ...geoJSON,
        features: updatedFeatures,
      };

      console.log("Updating GeoJSON state with new features:", updatedGeoJSON);
      setGeoJSON(updatedGeoJSON);

      // Show success toast
      const deletedCount = geoJSON.features.length - updatedFeatures.length;
      toast.success(`${deletedCount} élément(s) supprimé(s)`);
    } else {
      console.warn("No features were actually removed from the GeoJSON");
      toast.warning("Aucun élément n'a pu être supprimé");
    }
  };

  // Fetch environment data based on ID
  useEffect(() => {
    if (id) {
      const fetchEnvironmentData = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/environments/${id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch environment");
          }
          const data = await response.json();

          console.log("Environment data:", data);

          // Set the environment info regardless of whether it's pending or not
          setEnvironmentInfo({
            name: data.environment.name,
            description: data.environment.description || "",
            isPublic: data.environment.is_public,
            userId: data.environment.env_user[0]?.user_id || null,
            address: data.environment.address || "",
          });

          // If it's not a pending environment, reconstruct GeoJSON from the data
          if (!isPending) {
            // Add delimiters to the data object
            const reconstructedData = {
              ...data,
              delimiters: data.environment.env_delimiter || [],
            };

            const reconstructedGeoJSON = reconstructGeoJSON(reconstructedData);
            console.log("Reconstructed GeoJSON:", reconstructedGeoJSON);
            setGeoJSON(reconstructedGeoJSON);
            setIsFileUploaded(true);
          } else {
            // For pending environments, create an empty GeoJSON structure
            const emptyGeoJSON: GeoJSONData = {
              type: "FeatureCollection",
              features: [],
              properties: {
                environment: {
                  name: data.environment.name,
                  description: data.environment.description || "",
                  address: data.environment.address || "",
                  isPublic: data.environment.is_public,
                  userId: data.environment.user_id,
                },
              },
            };
            setGeoJSON(emptyGeoJSON);
          }
        } catch (error) {
          console.error("Error fetching environment:", error);
          toast.error("Failed to load environment data");
        } finally {
          setIsLoading(false);
        }
      };

      fetchEnvironmentData();
    }
  }, [id, isPending]);

  useEffect(() => {
    console.log("Environment Info:", environmentInfo);
    console.log("GeoJSON State:", geoJSON);
  }, [environmentInfo, geoJSON]);

  // Function to reconstruct GeoJSON from backend data
  const reconstructGeoJSON = (data: {
    zones?: Zone[];
    pois?: Poi[];
    delimiters?: Delimiter[]; // Add this line
    environment: {
      name: string;
      description: string;
      address?: string;
      user_id: number | null;
      is_public: boolean;
    };
  }): GeoJSONData => {
    const features: GeoJSONData["features"] = [];

    console.log("Reconstructing GeoJSON with data:", data);
    console.log("Zones data:", data.zones);
    console.log("POIs data:", data.pois);
    console.log("Delimiters data:", data.delimiters);

    // Add zones as Polygon features with both type and typeId
    if (data.zones && data.zones.length > 0) {
      data.zones.forEach((zone: Zone, index: number) => {
        console.log(`Processing zone ${index}:`, zone);

        let zoneColor = "#000000";

        if (
          zone.zone_type_zone_type_idTozone_type &&
          zone.zone_type_zone_type_idTozone_type.color
        ) {
          zoneColor = zone.zone_type_zone_type_idTozone_type.color;
        } else {
          console.warn(
            `Zone ${zone.name} (ID: ${zone.id}) has no color information. Using default color.`
          );
        }

        console.log(`Zone ${zone.name} color:`, zoneColor);

        features.push({
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: zone.coordinates,
          },
          properties: {
            name: zone.name,
            description: zone.description,
            type: "zone",
            typeId: zone.zone_type_zone_type_idTozone_type,
            id: zone.id,
            color: zoneColor,
          },
        });
      });
    }

    // Add POIs as Polygon or LineString features with both type and typeId
    if (data.pois && data.pois.length > 0) {
      data.pois.forEach((poi: Poi, index: number) => {
        console.log(`Processing POI ${index}:`, poi);

        const coordinates = poi.coordinates;

        let geometryType = "Polygon"; // default
        if (
          Array.isArray(coordinates) &&
          Array.isArray(coordinates[0]) &&
          Array.isArray(coordinates[0][0])
        ) {
          geometryType = "Polygon";
        } else if (
          Array.isArray(coordinates) &&
          Array.isArray(coordinates[0]) &&
          typeof coordinates[0][0] === "number"
        ) {
          geometryType = "LineString";
        }

        features.push({
          type: "Feature",
          geometry: {
            type: geometryType,
            coordinates,
          },
          properties: {
            color: "#FF0000",
            name: poi.name,
            description: poi.description,
            type: "poi",
            typeId: "poi",
            id: poi.id,
          },
        });
      });
    }

    // Add delimiters (wall, window, environment) as features
    if (data.delimiters && data.delimiters.length > 0) {
      data.delimiters.forEach((delimiter: Delimiter, index: number) => {
        console.log(`Processing delimiter ${index}:`, delimiter);

        const coordinates = delimiter.coordinates;

        let geometryType = "Polygon";

        if (
          delimiter.type === "wall" ||
          delimiter.type === "window" ||
          delimiter.type === "door"
        ) {
          geometryType = "LineString";
        } else if (delimiter.type === "environment") {
          geometryType = "Polygon";
        }

        // Override based on coordinate structure if needed
        if (
          Array.isArray(coordinates) &&
          Array.isArray(coordinates[0]) &&
          typeof coordinates[0][0] === "number"
        ) {
          geometryType = "LineString";
        } else if (
          Array.isArray(coordinates) &&
          Array.isArray(coordinates[0]) &&
          Array.isArray(coordinates[0][0])
        ) {
          geometryType = "Polygon";
        }

        let delimiterColor = "#000000";
        switch (delimiter.type) {
          case "wall":
            delimiterColor = "#8B4513";
            break;
          case "door":
            delimiterColor = "#8B4513";
            break;
          case "window":
            delimiterColor = "#87CEEB";
            break;
          case "environment":
            delimiterColor = "#32CD32";
            break;
          default:
            delimiterColor = "#000000";
        }

        features.push({
          type: "Feature",
          geometry: {
            type: geometryType,
            coordinates,
          },
          properties: {
            color: delimiterColor,
            name:
              delimiter.type.charAt(0).toUpperCase() + delimiter.type.slice(1), // Capitalize first letter
            description: `${delimiter.type} delimiter`,
            type: delimiter.type,
            typeId: delimiter.type,
            id: delimiter.id,
          },
        });
      });
    }

    console.log("Final reconstructed features:", features);

    return {
      type: "FeatureCollection",
      features: features,
      properties: {
        environment: {
          name: data.environment.name,
          description: data.environment.description,
          address: data.environment.address || "",
          isPublic: data.environment.is_public,
          userId: data.environment.user_id,
        },
      },
    };
  };
  const saveGeoJSONToFile = async () => {
    if (!geoJSON) {
      toast.error("No data to save.");
      return;
    }

    setIsSaving(true);

    try {
      const allFeatures = [...geoJSON.features, ...environmentLayers];

      const processedFeatures = allFeatures.map((feature) => {
        const updatedProperties = { ...feature.properties };

        if (updatedProperties.type && !updatedProperties.typeId) {
          updatedProperties.typeId = updatedProperties.type;
        } else if (updatedProperties.typeId && !updatedProperties.type) {
          updatedProperties.type = updatedProperties.typeId;
        }

        return {
          ...feature,
          properties: updatedProperties,
        };
      });

      const dataToExport = {
        ...geoJSON,
        features: processedFeatures,
        properties: {
          ...geoJSON.properties,
          environment: {
            name: environmentInfo.name,
            description: environmentInfo.description,
            isPublic: environmentInfo.isPublic,
            userId: environmentInfo.isPublic ? null : environmentInfo.userId,
            address: environmentInfo.address,
          },
        },
      };

      const endpoint = isPending
        ? `${process.env.NEXT_PUBLIC_API_URL}/environments/${id}/finalize`
        : `${process.env.NEXT_PUBLIC_API_URL}/environments/${id}`;

      console.log("Saving data with environment layers:", dataToExport);
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(dataToExport),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            "Une erreur s'est produite lors de l'enregistrement de l'environnement"
        );
      }

      const result = await response.json();
      toast.success("Environnement enregistré avec succès");
      console.log("Saved environment:", result);

      if (isPending) {
        router.push(`/admin/environments/${id}`);
      }
    } catch (error: unknown) {
      console.error("Erreur:", error);
      toast.error(
        `Erreur: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteItem = (leafletIds: number[]) => {
    if (!geoJSON) {
      console.error("Cannot delete item: geoJSON is null");
      return;
    }

    // Filter out features that have _leaflet_id in the list of deleted ids
    const updatedFeatures = geoJSON.features.filter((feature) => {
      return !leafletIds.includes(feature._leaflet_id || -1);
    });

    const updatedGeoJSON = {
      ...geoJSON,
      features: updatedFeatures,
    };

    setGeoJSON(updatedGeoJSON);
    setSelectedItem(null);
    console.log("Items deleted from GeoJSON:", leafletIds);
    console.log("Updated GeoJSON:", updatedGeoJSON);
  };

  const handleSaveItem = (item: FeatureItem) => {
    if (!geoJSON) {
      console.error("Cannot save item: geoJSON is null");
      return;
    }

    if (!item.id) {
      item.id = `feature-${Date.now()}`;
    }

    // Ensure both type and typeId are set consistently
    if (item.properties.type && !item.properties.typeId) {
      item.properties.typeId = item.properties.type;
    } else if (item.properties.typeId && !item.properties.type) {
      item.properties.type = item.properties.typeId;
    }

    const featureIndex = geoJSON.features.findIndex(
      (feature) => feature.properties.id === item.id
    );

    let updatedFeatures;
    if (featureIndex !== -1) {
      updatedFeatures = geoJSON.features.map((feature, index) =>
        index === featureIndex ? item : feature
      );
    } else {
      updatedFeatures = [...geoJSON.features, item];
    }

    const updatedGeoJSON = {
      ...geoJSON,
      features: updatedFeatures,
    };

    setGeoJSON(updatedGeoJSON);
    setSelectedItem(null);
    console.log("Updated GeoJSON:", updatedGeoJSON);
  };

  const handleFileImport = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const result = e.target?.result;
        if (typeof result !== "string") return;

        const parsedGeoJSON = JSON.parse(result) as GeoJSONData;
        console.log("Imported GeoJSON:", parsedGeoJSON);

        // Ensure all features have consistent typeId and type properties
        const processedFeatures = parsedGeoJSON.features.map((feature) => {
          const updatedProperties = { ...feature.properties };

          // Make sure both type and typeId are set consistently
          if (updatedProperties.type && !updatedProperties.typeId) {
            updatedProperties.typeId = updatedProperties.type;
          } else if (updatedProperties.typeId && !updatedProperties.type) {
            updatedProperties.type = updatedProperties.typeId;
          }

          return {
            ...feature,
            properties: updatedProperties,
          };
        });

        setGeoJSON({
          ...parsedGeoJSON,
          features: processedFeatures,
        });
        setIsFileUploaded(true);

        // Extract environment info from the GeoJSON properties if available
        if (parsedGeoJSON.properties?.environment) {
          const environment = parsedGeoJSON.properties.environment;

          // Merge with existing environment info from database
          setEnvironmentInfo((prev) => ({
            ...prev,
            name: prev.name,
            description: prev.description,
            address: prev.address,
          }));
        }

        // Set map center based on first feature if available
        if (parsedGeoJSON.features && parsedGeoJSON.features.length > 0) {
          const firstFeature = parsedGeoJSON.features[0];
          if (
            firstFeature &&
            firstFeature.geometry &&
            firstFeature.geometry.coordinates.length > 0
          ) {
            // Handle different geometry types
            if (
              firstFeature.geometry.type === "Polygon" &&
              firstFeature.geometry.coordinates[0].length > 0
            ) {
              const [longitude, latitude] =
                firstFeature.geometry.coordinates[0][0];
              setLat(latitude);
              setLong(longitude);
            } else if (
              firstFeature.geometry.type === "LineString" &&
              firstFeature.geometry.coordinates.length > 0
            ) {
              const [longitude, latitude] =
                firstFeature.geometry.coordinates[0];
              setLat(latitude);
              setLong(longitude);
            }
          }
        }

        toast.success("Fichier téléversé et analysé avec succès");
      } catch (error) {
        console.error("Erreur lors de l'analyse du fichier :", error);
        toast.error("Erreur lors de l'analyse du fichier GeoJSON");
      }
    };
    reader.readAsText(file);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <div className="grid grid-cols-[2fr,1fr] gap-4 w-full">
        {/* Left Column */}
        <div className="col-span-1">
          {/* Title and Upload/Save Button Row */}
          <div className="flex justify-between items-start mb-4">
            <Title
              text={
                isPending
                  ? "Délimitation d'un environnement en attente"
                  : isFileUploaded
                  ? "Modification d'un environnement"
                  : "Environnement"
              }
              lineLength="100px"
            />
            {!isFileUploaded ? (
              <>
                <input
                  type="file"
                  accept=".json,.geojson"
                  onChange={handleFileImport}
                  style={{ display: "none" }}
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <ButtonSecondary
                    title="Importer GeoJSON"
                    onClick={() =>
                      document.getElementById("file-upload")?.click()
                    }
                    disabled={false}
                  />
                </label>
              </>
            ) : (
              <div className="flex gap-2">
                <Link href="/admin/environments">
                  <ButtonSecondary
                    title="Annuler"
                    onClick={() => {}}
                    disabled={isSaving}
                  />
                </Link>
                <ButtonSecondary
                  title={isSaving ? "Sauvegarde..." : "Sauvegarder"}
                  onClick={saveGeoJSONToFile}
                  disabled={isSaving}
                />
              </div>
            )}
          </div>

          {/* Map Area */}
          {isFileUploaded && geoJSON ? (
            <DynamicMap
              geoData={{ lat, lng: long }}
              setIsPoiFormOpen={setIsPoiFormOpen}
              setIsZoneFormOpen={setIsZoneFormOpen}
              file={geoJSON}
              setSelectedItem={setSelectedItem}
              handleDeleteItem={handleDeleteItem}
              onLayersDeleted={handleLayersDeleted}
              onLayerCreated={handleLayerCreated}
              onLayerUpdated={handleLayerUpdated}
            />
          ) : (
            <div className="bg-[#DEDEDE] flex flex-col items-center justify-center h-[75vh] gap-4">
              <Image
                src="/assets/admin/environments/no-env.svg"
                width={200}
                height={40}
                alt="No environment"
              />
              {isPending ? (
                <div className="text-center">
                  <p className="text-sm mb-2">
                    Cet environnement est en attente de délimitation.
                  </p>
                  <p className="text-sm">
                    Importer un fichier .geojson pour commencer...
                  </p>
                </div>
              ) : (
                <p className="text-sm">
                  Importer un fichier .geojson pour commencer...
                </p>
              )}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div
          className={`col-span-1 ${
            !isFileUploaded && !isPending
              ? "disabled opacity-40 pointer-events-none"
              : ""
          }`}
          style={{
            backgroundColor:
              !isFileUploaded && !isPending ? "#f0f0f0" : "transparent",
            cursor: !isFileUploaded && !isPending ? "not-allowed" : "auto",
          }}>
          {!isPoiFormOpen && !isZoneFormOpen && (
            <AddEnvCard
              showValues={false}
              environmentInfo={environmentInfo}
              setEnvironmentInfo={setEnvironmentInfo}
            />
          )}
          {isPoiFormOpen && (
            <AddPoiCard
              setSelectedItem={setSelectedItem}
              handleSaveItem={handleSaveItem}
              selectedItem={selectedItem}
              showValues={false}
              envId={parseInt(id)}
            />
          )}
          {isZoneFormOpen && (
            <AddZoneCard
              setSelectedItem={setSelectedItem}
              handleSaveItem={handleSaveItem}
              selectedItem={selectedItem}
              showValues={false}
            />
          )}
        </div>
        <ToastContainer />
      </div>

      {!isPending && isFileUploaded && (
        <>
          <Title text="Zones" lineLength="40px" />
          {zones && <ZonesSwiper zones={zones} />}
          <Title text="Points d'Interet" lineLength="100px" />
          {pois && <POIsSwiper pois={pois} />}
        </>
      )}
    </div>
  );
};

export default Page;
