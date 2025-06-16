"use client";
import { hexToRgb } from "@/utils/hexToRGB";
import Image from "next/image";
import { ButtonPrimary } from "@/components/shared/primary-button";

interface ZoneTypeCardProps {
  id: number;
  icon: string | null;
  color: string | null;
  type: string | null;
  name: string | null;
  description: string | null;
  priority: string | null;
  accessible: boolean | null;
}

const ZoneTypeCard: React.FC<
  ZoneTypeCardProps & {
    onEdit: () => void;
    onDelete: () => void;
  }
> = ({
  id,
  icon,
  color,
  type,
  name,
  description,
  priority,
  accessible,
  onEdit,
  onDelete,
}) => {
  // Enhanced color processing
  const enhanceColor = (hexColor: string | null) => {
    const defaultColor = "#e0e0e0";
    const baseColor =
      hexColor && hexColor.startsWith("#") ? hexColor : defaultColor;

    // Convert to RGB and boost saturation
    const rgb = hexToRgb(baseColor);
    if (!rgb) return `rgba(224, 224, 224, 0.3)`;

    // Lighten and saturate the color
    const [r, g, b] = rgb.split(",").map(Number);
    const boostFactor = 1.4; // Increase this to make colors more vibrant
    const brightnessBoost = 30; // Additional brightness

    const newR = Math.min(255, r * boostFactor + brightnessBoost);
    const newG = Math.min(255, g * boostFactor + brightnessBoost);
    const newB = Math.min(255, b * boostFactor + brightnessBoost);

    return `rgba(${newR}, ${newG}, ${newB}, 0.3)`;
  };

  const backgroundColor = enhanceColor(color);
  const borderColor = color || "#e0e0e0";

  const displayName = name || type || "Zone type";
  const displayPriority = priority || "Non définie";
  const displayAccessible = accessible ? "Oui" : "Non";

  return (
    <div
      style={{
        backgroundColor,
        borderColor: borderColor,
      }}
      className="text-sm xl:text-md w-full max-w-[320px] p-5 rounded-2xl border shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col space-y-4 relative dark:bg-gray-800/50 dark:border-gray-700">
      {/* Header */}
      <div className="w-full flex items-center space-x-4 pb-4">
        <div className="w-[90%]">
          <h3 className="w-full text-start text-md xl:text-lg font-bold text-black dark:text-white">
            {displayName}
          </h3>
        </div>
        <div className="w-[10%] cursor-pointer" onClick={onDelete}>
          <Image
            src="/assets/shared/delete.png"
            alt="Delete Icon"
            width={23}
            height={23}
            className="dark:invert opacity-80 hover:opacity-100 transition-opacity hover:scale-110"
          />
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-y-2 text-sm">
        <div className="text-gray-700 dark:text-gray-300 font-medium">
          Priorité
        </div>
        <div className="text-end font-semibold text-gray-900 dark:text-gray-100">
          {displayPriority}
        </div>

        <div className="text-gray-700 dark:text-gray-300 font-medium">
          Accessible
        </div>
        <div className="text-end font-semibold text-gray-900 dark:text-gray-100">
          {displayAccessible}
        </div>
      </div>

      {/* Description */}
      {description && (
        <div className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">
          <p className="line-clamp-3">{description}</p>
        </div>
      )}

      <div className="flex items-end justify-end w-full pt-6">
        <ButtonPrimary
          title="Modifier"
          onClick={onEdit}
          className="dark:bg-main-600 dark:hover:bg-main-500 hover:scale-105 transform transition-transform"
        />
      </div>
    </div>
  );
};

export default ZoneTypeCard;
