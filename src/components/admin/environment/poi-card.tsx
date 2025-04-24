"use client";
import React from "react";
import Image from "next/image";
import { ButtonPrimary } from "@/components/shared/primary-button";

const POICard = ({ poi, onEdit, onDelete }) => {
  // Determine if the POI is a point or polygon
  const isPOIPoint = () => {
    if (!poi.coordinates || poi.coordinates.length === 0) return false;
    return !Array.isArray(poi.coordinates[0][0]);
  };

  // Get POI type text
  const getPOITypeText = () => {
    return isPOIPoint() ? "Point d'intérêt" : "Zone d'intérêt";
  };

  // Get creation date in a nice format
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Generate a consistent color based on POI id
  const getPOIColor = (id) => {
    const colors = [
      "#FF5733", // Orange-Red
      "#33A1FD", // Blue
      "#33FD92", // Green
      "#F633FD", // Purple
      "#FDC133", // Yellow
      "#33FDFD", // Cyan
    ];
    return colors[id % colors.length];
  };

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
          result[3],
          16
        )}`
      : "0, 0, 0";
  };

  // Handle POI name display (some POIs might not have names)
  const getDisplayName = () => {
    if (poi.name) return poi.name;
    return `POI ${poi.id}`;
  };

  // Get the first letter for the avatar
  const getAvatarInitial = () => {
    const displayName = getDisplayName();
    return displayName.charAt(0).toUpperCase();
  };

  const poiColor = getPOIColor(poi.id);

  return (
    <div
      style={{
        backgroundColor: `rgba(${hexToRgb(poiColor)}, 0.2)`,
      }}
      className="text-sm xl:text-md text-black w-[280px] xl:w-[300px] p-4 border-[1px] border-main-10 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center">
      <div className="w-full flex items-center space-x-4 pb-4">
        <div className="w-[10%]">
          <div
            style={{ backgroundColor: poiColor }}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">
            {getAvatarInitial()}
          </div>
        </div>

        <div className="w-[80%]">
          <h3 className="w-full text-start text-md xl:text-lg font-bold text-black">
            {getDisplayName()}
          </h3>
        </div>
        <div className="w-[10%] cursor-pointer" onClick={onDelete}>
          <Image
            src="/assets/shared/delete.png"
            alt="Delete Icon"
            width={23}
            height={23}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 w-full items-center">
        <div>ID</div>
        <div className="text-end font-bold">{poi.id}</div>
      </div>

      <div className="grid grid-cols-2 w-full items-center">
        <div>Type</div>
        <div className="text-end font-bold">{getPOITypeText()}</div>
      </div>

      <div className="grid grid-cols-2 w-full items-center">
        <div>Créé le</div>
        <div className="text-end font-bold">{formatDate(poi.created_at)}</div>
      </div>

      {poi.category_id && (
        <div className="grid grid-cols-2 w-full items-center">
          <div>Catégorie</div>
          <div className="text-end font-bold">{poi.category_id}</div>
        </div>
      )}

      {poi.description && (
        <div className="w-full mt-2">
          <div className="text-sm italic text-gray-700 truncate">
            {poi.description}
          </div>
        </div>
      )}

      <div className="flex items-end justify-end w-full pt-6">
        <ButtonPrimary title="Modifier" onClick={onEdit} />
      </div>
    </div>
  );
};

export default POICard;
