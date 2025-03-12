"use client";
import { useState } from "react";
import { ButtonSecondary } from "@/components/shared/secondary-button";
import Title from "@/components/shared/title";
import dynamic from "next/dynamic";

// Dynamically import the map component
const DynamicMap = dynamic(
  () => import("@/components/admin/environment/editable-map"),
  { ssr: false }
);

const Page = () => {
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  return (
    <div className="grid grid-cols-[2fr,1fr] gap-4">
      {/* Left Column */}
      <div className="col-span-1">
        {/* Title and Upload Button Row */}
        <div className="flex justify-between items-start mb-4">
          <Title text="Creation d'un environnement" lineLength="100px" />
          <ButtonSecondary
            title="Upload"
            onClick={() => {
              setIsFileUploaded(true); // Set file uploaded to true
              console.log("adding env");
            }}
          />
        </div>

        {/* Editable Map or Gray Div */}
        {isFileUploaded ? (
          // Show gray div if file is uploaded
          <div className="bg-gray-200 p-4 rounded-lg">
            File uploaded successfully!
          </div>
        ) : (
          // Show map if no file is uploaded
          <DynamicMap geoData={{ lat: 36.704661, lng: 3.174653 }} />
        )}
      </div>

      {/* Right Column */}
      <div className="col-span-1">
        {/* Content for the right column */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Env Informations</h3>
          <p className="text-sm text-gray-600">
            Additional information about the environment goes here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
