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
  const defaultColor = "#e0e0e0";
  const backgroundColor =
    color && color.startsWith("#")
      ? `rgba(${hexToRgb(color)}, 0.2)`
      : `rgba(${hexToRgb(defaultColor)}, 0.2)`;

  return (
    <div
      style={{ backgroundColor }}
      className="text-sm xl:text-md text-black w-full max-w-[320px] p-5 rounded-2xl border border-main-10 shadow hover:shadow-lg transition-shadow duration-300 flex flex-col space-y-4 relative">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-full flex items-center space-x-4 pb-4">
          <div className="w-[95%]">
            <h3 className="w-full text-start text-md xl:text-md font-bold text-black">
              {category}
            </h3>
          </div>
          <div className="w-[7%] cursor-pointer" onClick={onDelete}>
            <Image
              src="/assets/shared/delete.png"
              alt="Delete Icon"
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-y-2 text-sm">
        <div className="text-gray-600">Catégorie ID</div>
        <div className="text-end font-medium">{id}</div>
      </div>

      <div className="flex items-end justify-end w-full pt-6">
        <ButtonPrimary title="Modifier" onClick={onEdit} />
      </div>
    </div>
  );
};

export default PoiCategoryCard;
