"use client";
import { hexToRgb } from "@/utils/hexToRGB";
import Image from "next/image";
import { ButtonPrimary } from "@/components/shared/primary-button";

interface PoiCategoryCardProps {
  id: number;
  category: string;
  icon?: string | null;
  color?: string | null;
}

const PoiCategoryCard: React.FC<
  PoiCategoryCardProps & {
    onEdit: () => void;
    onDelete: () => void;
  }
> = ({ id, category, icon, color, onEdit, onDelete }) => {
  // Enhanced color processing with vibrancy boost
  const enhanceColor = (hexColor: string | null) => {
    const defaultColor = "#e0e0e0";
    const baseColor =
      hexColor && hexColor.startsWith("#") ? hexColor : defaultColor;

    const rgb = hexToRgb(baseColor);
    if (!rgb) return `rgba(224, 224, 224, 0.25)`;

    // Color enhancement formula
    const [r, g, b] = rgb.split(",").map(Number);
    const boostFactor = 1.5; // Increase for more vibrancy
    const minBoost = 40; // Minimum brightness boost

    const newR = Math.min(255, r * boostFactor + minBoost);
    const newG = Math.min(255, g * boostFactor + minBoost);
    const newB = Math.min(255, b * boostFactor + minBoost);

    return `rgba(${newR}, ${newG}, ${newB}, 0.25)`;
  };

  const backgroundColor = enhanceColor(color);
  const borderColor = color || "#e0e0e0";

  return (
    <div
      style={{
        backgroundColor,
        borderColor: borderColor,
      }}
      className="text-sm xl:text-md w-full max-w-[320px] p-5 rounded-2xl border shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col space-y-4 relative dark:bg-gray-800/30">
      {/* Header with delete button */}
      <div className="flex items-center gap-4">
        <div className="w-full flex items-center space-x-4 pb-4">
          <div className="w-[95%]">
            <h3 className="w-full text-start text-md xl:text-lg font-bold text-black dark:text-white">
              {category}
            </h3>
          </div>
          <div
            className="w-[7%] cursor-pointer"
            onClick={onDelete}
            title="Supprimer">
            <Image
              src="/assets/shared/delete.png"
              alt="Delete Icon"
              width={20}
              height={20}
              className="opacity-70 hover:opacity-100 dark:invert transition-all hover:scale-110"
            />
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-y-2 text-sm">
        <div className="text-gray-700 dark:text-gray-300 font-medium">
          Catégorie ID
        </div>
        <div className="text-end font-semibold text-gray-900 dark:text-gray-100">
          {id}
        </div>
      </div>

      {/* Edit Button */}
      <div className="flex items-end justify-end w-full pt-6">
        <ButtonPrimary
          title="Modifier"
          onClick={onEdit}
          className="dark:bg-main-600 dark:hover:bg-main-500 hover:scale-[1.02] transform transition-transform"
        />
      </div>
    </div>
  );
};

export default PoiCategoryCard;
