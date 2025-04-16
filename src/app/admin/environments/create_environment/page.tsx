"use client";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { ButtonSecondary } from "@/components/shared/secondary-button";
import Title from "@/components/shared/title";
import dynamic from "next/dynamic";
import AddZoneCard, {
  AddZoneCardProps,
} from "@/components/admin/environment/add-zone-card";
import AddPoiCard, {
  AddPoiCardProps,
} from "@/components/admin/environment/add-poi-card";
import AddEnvCard, {
  AddEnvCardProps,
} from "@/components/admin/environment/add-env-card";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { toast } from "react-toastify";

interface GeoJSONFeature {
  id?: string;
  type: string;
  properties: Record<string, any>;
  geometry: {
    type: string;
    coordinates: any[];
  };
}

interface GeoJSONData {
  type: string;
  features: GeoJSONFeature[];
  properties?: {
    environment?: {
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
  address: string;
  isPublic: boolean;
  userId: number | null;
}

const DynamicMap = dynamic(
  () => import("@/components/admin/environment/editable-map"),
  { ssr: false }
);

const Page = () => {
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [geojsonData, setGeoJsonData] = useState<GeoJSONData | null>(null);
  const [environmentInfo, setEnvironmentInfo] = useState<EnvironmentInfo>({
    name: "",
    description: "",
    address: "",
    isPublic: true,
    userId: null,
  });
  const [lat, setLat] = useState(36.704661);
  const [long, setLong] = useState(3.174653);
  const [isPoiFormOpen, setIsPoiFormOpen] = useState(false);
  const [isZoneFormOpen, setIsZoneFormOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GeoJSONFeature | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const saveGeoJSONToFile = async () => {
    if (!geojsonData) {
      alert("No data to save.");
      return;
    }

    setIsSaving(true);

    try {
      const dataToExport = {
        ...geojsonData,
        properties: {
          ...geojsonData.properties,
          environment: {
            name: environmentInfo.name,
            description: environmentInfo.description,
            address: environmentInfo.address,
            isPublic: environmentInfo.isPublic,
            userId: environmentInfo.isPublic ? null : environmentInfo.userId,
          },
        },
      };

      // Convert the data to a JSON string with pretty formatting
      const jsonString = JSON.stringify(dataToExport, null, 2);

      // Create a blob with the JSON data
      const blob = new Blob([jsonString], { type: "application/json" });

      // Create a URL for the blob
      const url = URL.createObjectURL(blob);

      // Create a temporary anchor element to trigger the download
      const link = document.createElement("a");
      link.href = url;

      // Set the filename - using the environment name if available, or a default name
      const fileName = environmentInfo.name
        ? `${environmentInfo.name.replace(/\s+/g, "_")}.geojson`
        : `environment_${new Date().toISOString().slice(0, 10)}.geojson`;

      link.download = fileName;

      // Append the link to the body, click it, and then remove it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Release the URL object
      URL.revokeObjectURL(url);

      toast.success("Environnement enregistré avec succès");
      console.log("Environnement enregistré dans un fichier");
    } catch (error: unknown) {
      console.error("Erreur d'enregistrement :", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Une erreur inconnue est survenue";
      toast.error(`Erreur : ${errorMessage}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveItem = (item: GeoJSONFeature) => {
    if (!geojsonData) return;

    if (!item.id) {
      item.id = `feature-${Date.now()}`;
    }

    const featureIndex = geojsonData.features.findIndex(
      (feature) => feature.id === item.id
    );

    let updatedFeatures;
    if (featureIndex !== -1) {
      updatedFeatures = geojsonData.features.map((feature, index) =>
        index === featureIndex ? item : feature
      );
    } else {
      updatedFeatures = [...geojsonData.features, item];
    }

    const updatedGeoJSON = {
      ...geojsonData,
      features: updatedFeatures,
    };

    setGeoJsonData(updatedGeoJSON);
    setSelectedItem(null);
    console.log("Updated GeoJSON:", updatedGeoJSON);
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const geoJSON = JSON.parse(e.target?.result as string) as GeoJSONData;

        setGeoJsonData(geoJSON);
        setIsFileUploaded(true);

        const environment = geoJSON.properties?.environment || {
          name: "Environment Name",
          description: "Environment Description",
          address: "Environment Address",
          isPublic: true,
          userId: null,
        };

        setEnvironmentInfo({
          name: environment.name,
          description: environment.description,
          address: environment.address,
          isPublic: environment.isPublic,
          userId: environment.userId,
        });

        const firstFeature = geoJSON.features[0];
        if (firstFeature && firstFeature.geometry) {
          const [longitude, latitude] = firstFeature.geometry.coordinates[0];
          setLat(latitude);
          setLong(longitude);
        }

        console.log("File uploaded and parsed successfully:", geoJSON);
      } catch (error) {
        console.error("Error parsing the file:", error);
      }
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    console.log("isPoiFormOpen:", isPoiFormOpen);
    console.log("isZoneFormOpen:", isZoneFormOpen);
  }, [isPoiFormOpen, isZoneFormOpen]);

  return (
    <div className="grid grid-cols-[2fr,1fr] gap-4">
      {/* Left Column */}
      <div className="col-span-1">
        {/* Title and Upload/Save Button Row */}
        <div className="flex justify-between items-start mb-4">
          <Title text="Creation d'un environnement" lineLength="100px" />
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
                  disabled={false}
                  title="Upload"
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
                />
              </label>
            </>
          ) : (
            <Link href="/admin/environments">
              <ButtonSecondary
                title={isSaving ? "Saving..." : "Sauvegarder"}
                onClick={saveGeoJSONToFile}
                disabled={isSaving || !isFileUploaded}
              />
            </Link>
          )}
        </div>

        {/* Editable Map or Gray Div */}
        {!isFileUploaded ? (
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
        ) : (
          <DynamicMap
            geoData={{ lat: 36.704661, lng: 3.174653 }}
            setIsPoiFormOpen={setIsPoiFormOpen}
            setIsZoneFormOpen={setIsZoneFormOpen}
            file={geojsonData}
            setSelectedItem={setSelectedItem}
          />
        )}
      </div>

      {/* Right Column */}
      <div
        className={`col-span-1 ${
          !isFileUploaded ? "disabled opacity-40 pointer-events-none" : ""
        }`}
        style={{
          backgroundColor: !isFileUploaded ? "#f0f0f0" : "transparent",
          cursor: !isFileUploaded ? "not-allowed" : "auto",
        }}>
        {/* Content for the right column */}
        {!isPoiFormOpen && !isZoneFormOpen && (
          <AddEnvCard
            showValues={!isFileUploaded}
            environmentInfo={environmentInfo}
            setEnvironmentInfo={setEnvironmentInfo}
          />
        )}
        {isPoiFormOpen && (
          <AddPoiCard
            setSelectedItem={
              setSelectedItem as Dispatch<SetStateAction<GeoJSONFeature | null>>
            }
            handleSaveItem={handleSaveItem}
            selectedItem={selectedItem}
            showValues={!isFileUploaded}
          />
        )}
        {isZoneFormOpen && (
          <AddZoneCard
            setSelectedItem={
              setSelectedItem as Dispatch<SetStateAction<GeoJSONFeature | null>>
            }
            handleSaveItem={handleSaveItem}
            selectedItem={selectedItem}
            showValues={!isFileUploaded}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
