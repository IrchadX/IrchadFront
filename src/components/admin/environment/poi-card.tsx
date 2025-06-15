"use client";
import React from "react";
import Image from "next/image";
import { ButtonPrimary } from "@/components/shared/primary-button";

const POICard = ({ poi, onEdit, onDelete }) => {
  // Category options - replace with your actual categories
  const categories = [
    { id: 1, name: "Restaurant" },
    { id: 2, name: "Hôtel" },
    { id: 3, name: "Monument" },
    { id: 4, name: "Parc" },
    { id: 5, name: "Commerce" },
  ];

  // Determine if the POI is a point or polygon
  const isPOIPoint = () => {
    if (!poi?.coordinates || !Array.isArray(poi.coordinates)) return false;

    if (!Array.isArray(poi.coordinates[0])) return true;

    if (Array.isArray(poi.coordinates[0][0])) return false;

    return true;
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

  // Enhanced color processing for better visibility
  const enhanceColor = (hexColor) => {
    const defaultColor = "#e0e0e0";
    const baseColor =
      hexColor && hexColor.startsWith("#") ? hexColor : defaultColor;

    // Convert to RGB and boost saturation
    const rgb = hexToRgb(baseColor);
    if (!rgb) return `rgba(224, 224, 224, 0.3)`;

    // Lighten and saturate the color
    const rgbValues = rgb.split(",").map(Number);
    const boostFactor = 1.2;
    const brightnessBoost = 20;

    const newR = Math.min(255, rgbValues[0] * boostFactor + brightnessBoost);
    const newG = Math.min(255, rgbValues[1] * boostFactor + brightnessBoost);
    const newB = Math.min(255, rgbValues[2] * boostFactor + brightnessBoost);

    return `rgba(${newR}, ${newG}, ${newB}, 0.2)`;
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

  // Get category name by id
  const getCategoryName = (id) => {
    const category = categories.find((cat) => cat.id === parseInt(id));
    return category ? category.name : "Non définie";
  };

  const poiColor = getPOIColor(poi.id);
  const backgroundColor = enhanceColor(poiColor);

  return (
    <div
      style={{
        backgroundColor,
        borderColor: poiColor,
      }}
      className="text-sm xl:text-md w-[280px] xl:w-[300px] p-4 border-[1px] rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center dark:bg-gray-800/50 dark:border-gray-700">
      <div className="w-full flex items-center space-x-4 pb-4">
        <div className="w-[10%]">
          <div
            style={{ backgroundColor: poiColor }}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">
            {getAvatarInitial()}
          </div>
        </div>

        <div className="w-[80%]">
          <h3 className="w-full text-start text-md xl:text-lg font-bold text-black dark:text-white">
            {getDisplayName()}
          </h3>
        </div>
        <div className="w-[10%] cursor-pointer" onClick={() => onDelete()}>
          <Image
            src="/assets/shared/delete.png"
            alt="Delete Icon"
            width={23}
            height={23}
            className="dark:invert opacity-80 hover:opacity-100 transition-opacity hover:scale-110"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 w-full items-center">
        <div className="text-gray-700 dark:text-gray-300 font-medium">ID</div>
        <div className="text-end font-bold text-gray-900 dark:text-gray-100">
          {poi.id}
        </div>
      </div>

      <div className="grid grid-cols-2 w-full items-center">
        <div className="text-gray-700 dark:text-gray-300 font-medium">Type</div>
        <div className="text-end font-bold text-gray-900 dark:text-gray-100">
          {getPOITypeText()}
        </div>
      </div>

      <div className="grid grid-cols-2 w-full items-center">
        <div className="text-gray-700 dark:text-gray-300 font-medium">
          Créé le
        </div>
        <div className="text-end font-bold text-gray-900 dark:text-gray-100">
          {formatDate(poi.created_at)}
        </div>
      </div>

      {poi.category_id && (
        <div className="grid grid-cols-2 w-full items-center">
          <div className="text-gray-700 dark:text-gray-300 font-medium">
            Catégorie
          </div>
          <div className="text-end font-bold text-gray-900 dark:text-gray-100">
            {getCategoryName(poi.category_id)}
          </div>
        </div>
      )}

      {poi.description && (
        <div className="w-full mt-2">
          <div className="text-sm italic text-gray-700 dark:text-gray-300 truncate">
            {poi.description}
          </div>
        </div>
      )}

      <div className="flex items-end justify-end w-full pt-6">
        <ButtonPrimary
          title="Modifier"
          onClick={() => onEdit()}
          className="dark:bg-main-600 dark:hover:bg-main-500 hover:scale-105 transform transition-transform"
        />
      </div>
    </div>
  );
};

export default POICard;
