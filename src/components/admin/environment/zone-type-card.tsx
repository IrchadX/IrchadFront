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
  const handleEditZoneType = () => {
    console.log("Edit zone type:", id);
  };

  const defaultColor = "#e0e0e0";
  const backgroundColor =
    color && color.startsWith("#")
      ? `rgba(${hexToRgb(color)}, 0.2)`
      : `rgba(${hexToRgb(defaultColor)}, 0.2)`;

  const displayName = name || type || "Zone type";
  const displayPriority = priority || "Non définie";
  const displayAccessible = accessible ? "Oui" : "Non";

  return (
    <div
      style={{ backgroundColor }}
      className="text-sm xl:text-md text-black w-full max-w-[320px] p-5 rounded-2xl border border-main-10 shadow hover:shadow-lg transition-shadow duration-300 flex flex-col space-y-4 relative">
      {/* Delete Icon (optional action) */}
      {/* <div className="absolute top-4 right-4 cursor-pointer">
        <Image
          src="/assets/shared/delete.png"
          alt="Delete Icon"
          width={20}
          height={20}
        />
      </div> */}

      {/* Header */}
      <div className="flex items-center gap-4">
        {/* {icon && typeof icon === "string" ? (
          <Image
            src={icon}
            alt="Zone Icon"
            width={50}
            height={50}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-[50px] h-[50px] bg-gray-200 rounded-full" />
        )} */}
        <div className="w-full flex items-center space-x-4 pb-4">
          <div className="w-[90%]">
            <h3 className="w-full text-start text-md xl:text-lg font-bold text-black">
              {displayName}
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
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-y-2 text-sm">
        <div className="text-gray-600">Priorité</div>
        <div className="text-end font-medium">{displayPriority}</div>

        <div className="text-gray-600">Accessible</div>
        <div className="text-end font-medium">{displayAccessible}</div>
      </div>

      {/* Description */}
      {description && (
        <div className="text-gray-700 text-sm leading-relaxed">
          OR use truncate: <p className="truncate">{description}</p>
        </div>
      )}

      <div className="flex items-end justify-end w-full pt-6">
        <ButtonPrimary title="Modifier" onClick={onEdit} />
      </div>
    </div>
  );
};

export default ZoneTypeCard;
