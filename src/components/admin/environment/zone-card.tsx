"use client";
import React from "react";
import Image from "next/image";
import { ButtonPrimary } from "@/components/shared/primary-button";

const ZoneCard = ({ zone, onEdit, onDelete }) => {
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

  // Generate a consistent color based on zone id
  const getZoneColor = (id) => {
    const colors = [
      "#4A90E2",
      "#50E3C2",
      "#F5A623",
      "#D0021B",
      "#7ED321",
      "#9013FE",
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

  const zoneColor = getZoneColor(zone.id);

  return (
    <div
      style={{
        backgroundColor: `rgba(${hexToRgb(zoneColor)}, 0.2)`,
      }}
      className="text-sm xl:text-md text-black w-[280px] xl:w-[300px] p-4 border-[1px] border-main-10 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center">
      <div className="w-full flex items-center space-x-4 pb-4">
        <div className="w-[10%]">
          <div
            style={{ backgroundColor: zoneColor }}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">
            {zone.name.charAt(0)}
          </div>
        </div>

        <div className="w-[80%]">
          <h3 className="w-full text-start text-md xl:text-lg font-bold text-black">
            {zone.name}
          </h3>
        </div>
        <div className="w-[10%] cursor-pointer" onClick={() => onDelete()}>
          <Image
            src="/assets/shared/delete.png"
            alt="Delete Icon"
            width={23}
            height={23}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 w-full items-center">
        <div>Zone ID</div>
        <div className="text-end font-bold">{zone.id}</div>
      </div>

      <div className="grid grid-cols-2 w-full items-center">
        <div>Surface approximative</div>
        <div className="text-end font-bold">{calculateArea()}</div>
      </div>

      <div className="grid grid-cols-2 w-full items-center">
        <div>Créé le</div>
        <div className="text-end font-bold">{formatDate(zone.created_at)}</div>
      </div>

      {zone.description && (
        <div className="w-full mt-2">
          <div className="text-sm italic text-gray-700 truncate">
            {zone.description}
          </div>
        </div>
      )}

      <div className="flex items-end justify-end w-full pt-6">
        <ButtonPrimary title="Modifier" onClick={() => onEdit()} />
      </div>
    </div>
  );
};

export default ZoneCard;
