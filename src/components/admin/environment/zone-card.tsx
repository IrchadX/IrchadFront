"use client";
import React from "react";
import Image from "next/image";
import { ButtonPrimary } from "@/components/shared/primary-button";

const ZoneCard = ({ zone, onEdit, onDelete }) => {
  console.log(zone);

  // Calculate area of the zone using coordinates
  const calculateArea = () => {
    if (!zone.coordinates || zone.coordinates.length === 0) return "N/A";

    // Simple calculation for demo purposes
    // For production, you might want a more accurate calculation
    try {
      const points = zone.coordinates[0];
      let area = 0;
      for (let i = 0; i < points.length - 1; i++) {
        area += Math.abs(
          points[i][0] * points[i + 1][1] - points[i + 1][0] * points[i][1]
        );
      }
      area = area / 2;
      return area.toFixed(2) + " m²";
    } catch (error) {
      return "Calcul impossible";
    }
  };

  // Get creation date in a nice format
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Fixed: Generate a consistent color based on zone type
  const getZoneColor = () => {
    // Check if zone type exists and has color
    if (zone.zone_type_zone_type_idTozone_type?.color) {
      return zone.zone_type_zone_type_idTozone_type.color;
    }
    // Fallback to default color
    return "#000000";
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

  const zoneColor = getZoneColor();
  const backgroundColor = enhanceColor(zoneColor);
  console.log("Zone color:", zoneColor); // Debug log

  return (
    <div
      style={{
        backgroundColor,
        borderColor: zoneColor,
      }}
      className="text-sm xl:text-md w-[280px] xl:w-[300px] p-4 border-[1px] rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center dark:bg-gray-800/50 dark:border-gray-700">
      <div className="w-full flex items-center space-x-4 pb-4">
        <div className="w-[10%]">
          <div
            style={{ backgroundColor: zoneColor }}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">
            {zone.name.charAt(0)}
          </div>
        </div>

        <div className="w-[80%]">
          <h3 className="w-full text-start text-md xl:text-lg font-bold text-black dark:text-white">
            {zone.name}
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
        <div className="text-gray-700 dark:text-gray-300 font-medium">
          Zone ID
        </div>
        <div className="text-end font-bold text-gray-900 dark:text-gray-100">
          {zone.id}
        </div>
      </div>

      <div className="grid grid-cols-2 w-full items-center">
        <div className="text-gray-700 dark:text-gray-300 font-medium">
          Surface approximative
        </div>
        <div className="text-end font-bold text-gray-900 dark:text-gray-100">
          {calculateArea()}
        </div>
      </div>

      <div className="grid grid-cols-2 w-full items-center">
        <div className="text-gray-700 dark:text-gray-300 font-medium">
          Créé le
        </div>
        <div className="text-end font-bold text-gray-900 dark:text-gray-100">
          {formatDate(zone.created_at)}
        </div>
      </div>

      {/* Display zone type information */}
      {zone.zone_type_zone_type_idTozone_type && (
        <div className="grid grid-cols-2 w-full items-center">
          <div className="text-gray-700 dark:text-gray-300 font-medium">
            Type
          </div>
          <div className="text-end font-bold text-gray-900 dark:text-gray-100">
            {zone.zone_type_zone_type_idTozone_type.name}
          </div>
        </div>
      )}

      {zone.description && (
        <div className="w-full mt-2">
          <div className="text-sm italic text-gray-700 dark:text-gray-300 truncate">
            {zone.description}
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

export default ZoneCard;
