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
import { useParams } from "next/navigation";
import ZonesSwiper from "@/components/admin/environment/zones-swiper";
import POIsSwiper from "@/components/admin/environment/pois-swiper";

const DynamicMap = dynamic(
  () => import("@/components/admin/environment/editable-map"),
  { ssr: false }
);
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
  id?: string;
  name: string;
  description: string;
  coordinates: number[][][];
}

interface Poi {
  id?: string;
  name: string;
  description: string;
  coordinates: number[][][];
}

interface LayerProperties {
  name: string; // Make name required
  description: string;
  type: string;
  id?: string;
  image?: string;
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
  const id = params.id as string;
  const [pois, setPois] = useState([]);
  const [zones, setZones] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [geoJSON, setGeoJSON] = useState<GeoJSONData | null>(null);
  const [environmentInfo, setEnvironmentInfo] = useState<EnvironmentInfo>({
    name: "",
    description: "",
    isPublic: true,
    userId: null,
    address: "",
  });
  const [lat, setLat] = useState(36.704661);
  const [long, setLong] = useState(3.174653);
  const [isPoiFormOpen, setIsPoiFormOpen] = useState(false);
  const [isZoneFormOpen, setIsZoneFormOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MapLayer | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch environment data based on ID
  useEffect(() => {
    if (id) {
      const fetchEnvironmentData = async () => {
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

          // Reconstruct GeoJSON from the backend data
          const reconstructedGeoJSON = reconstructGeoJSON(data);

          setGeoJSON(reconstructedGeoJSON);
          setEnvironmentInfo({
            name: data.environment.name,
            description: data.environment.description || "",
            isPublic: data.environment.is_public,
            userId: data.environment.user_id,
            address: data.environment.address || "",
          });
          setIsEditMode(true);
        } catch (error) {
          console.error("Error fetching environment:", error);
          toast.error("Failed to load environment data");
        }
      };

      const fetchZonesData = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/zones/env/${id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch environment zones");
          }
          const data = await response.json();
          setZones(data);
          console.log(data);
        } catch (error) {
          console.error("Error fetching environment zones:", error);
          toast.error("Failed to load environment zones data");
        }
      };

      const fetchPoisData = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/pois/env/${id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch environment pois");
          }
          const data = await response.json();
          setPois(data);
          console.log(data);
        } catch (error) {
          console.error("Error fetching environment pois:", error);
          toast.error("Failed to load environment pois data");
        }
      };
      fetchEnvironmentData();
      fetchZonesData();
      fetchPoisData();
    }
  }, [id]);

  // Function to reconstruct GeoJSON from backend data
  const reconstructGeoJSON = (data: {
    zones?: Zone[];
    pois?: Poi[];
    environment: {
      name: string;
      description: string;
      address?: string;
      user_id: number | null;
    };
  }): GeoJSONData => {
    const features: GeoJSONData["features"] = [];

    // Add zones as Polygon features
    if (data.zones && data.zones.length > 0) {
      data.zones.forEach((zone: Zone) => {
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
            id: zone.id,
          },
        });
      });
    }

    // Add POIs as Polygon or LineString features
    if (data.pois && data.pois.length > 0) {
      data.pois.forEach((poi: Poi) => {
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
            name: poi.name,
            description: poi.description,
            type: "poi",
            id: poi.id,
          },
        });
      });
    }

    return {
      type: "FeatureCollection",
      features: features,
      properties: {
        environment: {
          name: data.environment.name,
          description: data.environment.description,
          address: data.environment.address || "",
          isPublic: data.environment.user_id === null,
          userId: data.environment.user_id,
        },
      },
    };
  };

  const saveGeoJSONToFile = async () => {
    if (!geoJSON) {
      alert("No data to save.");
      return;
    }

    setIsSaving(true);

    try {
      const dataToExport = {
        ...geoJSON,
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

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/environments/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(dataToExport),
        }
      );

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
    } catch (error: unknown) {
      console.error("Erreur:", error);
      toast.error(
        `Erreur: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveItem = (item: FeatureItem) => {
    if (!geoJSON) return;

    if (!item.id) {
      item.id = `feature-${Date.now()}`;
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

        setGeoJSON(parsedGeoJSON);
        setIsEditMode(true);

        // Extract environment info from the GeoJSON properties
        const environment = parsedGeoJSON.properties?.environment || {
          name: "Environment Name",
          description: "",
          isPublic: true,
          userId: null,
          address: "Environment Address",
        };

        setEnvironmentInfo({
          name: environment.name,
          description: environment.description,
          isPublic: environment.isPublic,
          userId: environment.userId,
          address: environment.address,
        });

        const firstFeature = parsedGeoJSON.features[0];
        if (firstFeature && firstFeature.geometry) {
          const [longitude, latitude] = firstFeature.geometry.coordinates[0][0];
          setLat(latitude);
          setLong(longitude);
        }

        console.log(
          "Fichier téléversé et analysé avec succès :",
          parsedGeoJSON
        );
      } catch (error) {
        console.error("Erreur lors de l'analyse du fichier :", error);
      }
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    console.log("isPoiFormOpen:", isPoiFormOpen);
    console.log("isZoneFormOpen:", isZoneFormOpen);
  }, [isPoiFormOpen, isZoneFormOpen]);

  return (
    <div className="flex flex-col w-full">
      {" "}
      <div className="grid grid-cols-[2fr,1fr] gap-4 w-full">
        {/* Left Column */}

        <div className="col-span-1">
          {/* Title and Upload/Save Button Row */}
          <div className="flex justify-between items-start mb-4">
            <Title
              text={
                isEditMode
                  ? "Modification d'un environnement"
                  : "Création d'un environnement"
              }
              lineLength="100px"
            />
            {!isEditMode ? (
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
                    title="Modifier"
                    onClick={() =>
                      document.getElementById("file-upload")?.click()
                    }
                    disabled={false}
                  />
                </label>
              </>
            ) : (
              <ButtonSecondary
                title="Sauvegarder"
                onClick={saveGeoJSONToFile}
                disabled={false}
              />
            )}
          </div>

          {geoJSON ? (
            <div className="flex flex-col">
              {" "}
              <DynamicMap
                geoData={{ lat, lng: long }}
                setIsPoiFormOpen={setIsPoiFormOpen}
                setIsZoneFormOpen={setIsZoneFormOpen}
                file={geoJSON}
                setSelectedItem={setSelectedItem}
              />
            </div>
          ) : (
            <div className="bg-[#DEDEDE] flex flex-col items-center justify-center h-[75vh] gap-4">
              <Image
                src="/assets/admin/environments/no-env.svg"
                width={200}
                height={40}
                alt="No environment"
              />
              <p className="text-sm">
                Importer un fichier .geojson pour commencer...
              </p>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div
          className={`col-span-1 ${
            !isEditMode ? "disabled opacity-40 pointer-events-none" : ""
          }`}
          style={{
            backgroundColor: !isEditMode ? "#f0f0f0" : "transparent",
            cursor: !isEditMode ? "not-allowed" : "auto",
          }}>
          {/* Content for the right column */}
          {!isPoiFormOpen && !isZoneFormOpen && (
            <AddEnvCard
              showValues={!isEditMode}
              environmentInfo={environmentInfo}
              setEnvironmentInfo={setEnvironmentInfo}
            />
          )}
          {isPoiFormOpen && (
            <AddPoiCard
              setSelectedItem={setSelectedItem}
              handleSaveItem={handleSaveItem}
              selectedItem={selectedItem}
              showValues={!isEditMode}
              envId={parseInt(params.id)}
            />
          )}
          {isZoneFormOpen && (
            <AddZoneCard
              setSelectedItem={setSelectedItem}
              handleSaveItem={handleSaveItem}
              selectedItem={selectedItem}
              showValues={!isEditMode}
            />
          )}
        </div>

        <ToastContainer />
      </div>
      <Title text="Zones" lineLength="40px" />
      <ZonesSwiper zones={zones} />
      <Title text="Points d'interet" lineLength="80px" />
      <POIsSwiper pois={pois} />
    </div>
  );
};

export default Page;
