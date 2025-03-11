"use client";
import { useEffect, useState } from "react";
import { ButtonSecondary } from "@/components/shared/secondary-button";
import Title from "@/components/shared/title";
import dynamic from "next/dynamic";
import AddZoneCard from "@/components/admin/environment/add-zone-card";
import AddPoiCard from "@/components/admin/environment/add-poi-card";
import AddEnvCard from "@/components/admin/environment/add-env-card";
import Image from "next/image";

const DynamicMap = dynamic(
  () => import("@/components/admin/environment/editable-map"),
  { ssr: false }
);

const Page = () => {
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [geojsonData, setGeoJsonData] = useState(null);
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [isPoiFormOpen, setIsPoiFormOpen] = useState(false);
  const [isZoneFormOpen, setIsZoneFormOpen] = useState(false);

  const handleFileImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const geoJSON = JSON.parse(e.target.result);
        setGeoJsonData(geoJSON);
        setIsFileUploaded(true);
        console.log("File uploaded and parsed successfully:", geoJSON);
        // update the center of the loaded map
        setLat(geoJSON.features[0].geometry.coordinates[0][0]);
        setLong(geoJSON.features[0].geometry.coordinates[0][1]);
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
        {/* Title and Upload Button Row */}
        <div className="flex justify-between items-start mb-4">
          <Title text="Creation d'un environnement" lineLength="100px" />
          <input
            type="file"
            accept=".json,.geojson"
            onChange={handleFileImport}
            style={{ display: "none" }}
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <ButtonSecondary
              title="Upload"
              onClick={() =>
                document && document.getElementById("file-upload").click()
              }
            />
          </label>
        </div>

        {/* Editable Map or Gray Div */}
        {!isFileUploaded ? (
          <div className="bg-[#DEDEDE] flex flex-col items-center justify-center h-[75vh] gap-4">
            <Image
              src="/assets/admin/environments/no-env.svg"
              width={200}
              height={40}
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
          />
        )}
      </div>

      {/* Right Column */}
      <div className="col-span-1">
        {/* Content for the right column */}
        {!isPoiFormOpen && !isZoneFormOpen && (
          <AddEnvCard showValues={isFileUploaded} />
        )}
        {isPoiFormOpen && <AddPoiCard showValues={!isFileUploaded} />}
        {isZoneFormOpen && <AddZoneCard showValues={!isFileUploaded} />}
      </div>
    </div>
  );
};

export default Page;
