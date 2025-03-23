"use client";
import { useEffect, useState } from "react";
import { ButtonSecondary } from "@/components/shared/secondary-button";
import Title from "@/components/shared/title";
import dynamic from "next/dynamic";
import AddZoneCard from "@/components/admin/environment/add-zone-card";
import AddPoiCard from "@/components/admin/environment/add-poi-card";
import AddEnvCard from "@/components/admin/environment/add-env-card";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "next/navigation"; // Import useParams
import environments from "@/data/environments"; // Import environments data

const DynamicMap = dynamic(
  () => import("@/components/admin/environment/editable-map"),
  { ssr: false }
);

const Page = () => {
  const params = useParams(); // Get the dynamic route parameters
  const id = params.id as string; // Extract the `id` parameter

  const [isEditMode, setIsEditMode] = useState(false);
  const [geojsonData, setGeoJsonData] = useState(null);
  const [environmentInfo, setEnvironmentInfo] = useState({
    name: "",
    isPublic: true,
    userId: null,
    address: "",
  });
  const [lat, setLat] = useState(36.704661);
  const [long, setLong] = useState(3.174653);
  const [isPoiFormOpen, setIsPoiFormOpen] = useState(false);
  const [isZoneFormOpen, setIsZoneFormOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Fetch environment data based on ID
  useEffect(() => {
    if (id) {
      const environment = environments.find((env) => env.id === id);
      if (environment) {
        setGeoJsonData(environment.geoData); // Set GeoJSON data
        setEnvironmentInfo({
          name: environment.properties.name,
          isPublic: environment.properties.isPublic,
          userId: environment.properties.userId,
          address: environment.properties.address,
        });
        setIsEditMode(true); // Enable edit mode
      }
    }
  }, [id]); // Re-run when `id` changes

  const saveGeoJSONToFile = () => {
    if (!geojsonData) {
      alert("No data to save.");
      return;
    }

    const dataToExport = {
      ...geojsonData,
      properties: {
        ...geojsonData.properties,
        environment: {
          name: environmentInfo.name,
          isPublic: environmentInfo.isPublic,
          userId: environmentInfo.isPublic ? null : environmentInfo.userId,
          address: environmentInfo.address,
        },
      },
    };

    const jsonString = JSON.stringify(dataToExport, null, 2);

    const blob = new Blob([jsonString], { type: "application/json" });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "updated-environment.geojson";
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log("GeoJSON file saved with environment info:", dataToExport);
  };

  const handleSaveItem = (item) => {
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

  const handleFileImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const geoJSON = JSON.parse(e.target.result);

        setGeoJsonData(geoJSON);
        setIsEditMode(true);

        // Extract environment info from the GeoJSON properties
        const environment = geoJSON.properties?.environment || {
          name: "Environment Name",
          isPublic: true,
          userId: null,
          address: "Environment Address",
        };

        setEnvironmentInfo({
          name: environment.name,
          isPublic: environment.isPublic,
          userId: environment.userId,
          address: environment.address,
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
                    document && document.getElementById("file-upload").click()
                  }
                />
              </label>
            </>
          ) : (
            <ButtonSecondary title="Sauvegarder" onClick={saveGeoJSONToFile} />
          )}
        </div>

        <DynamicMap
          geoData={{ lat: 36.704661, lng: 3.174653 }}
          setIsPoiFormOpen={setIsPoiFormOpen}
          setIsZoneFormOpen={setIsZoneFormOpen}
          file={geojsonData}
          setSelectedItem={setSelectedItem}
        />
      </div>

      {/* Right Column */}
      <div
        className={`col-span-1 ${
          !isEditMode ? "disabled opacity-40 pointer-events-none" : ""
        }`}
        style={{
          backgroundColor: !isEditMode ? "#f0f0f0" : "transparent", // Light gray background when disabled
          cursor: !isEditMode ? "not-allowed" : "auto", // Change cursor to not-allowed when disabled
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
    </div>
  );
};

export default Page;
