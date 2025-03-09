"use client";
import { hexToRgb } from "@/utils/hexToRGB";
import Image from "next/image";
import { ButtonPrimary } from "@/components/shared/primary-button";

interface ZoneTypeCardProps {
  icon: string;
  color: string;
  maxSpeed: string;
  title: string;
  dropdownOptions: string[];
}

const handleEditZoneType = () => {};
const ZoneTypeCard: React.FC<ZoneTypeCardProps> = ({
  icon,
  color,
  maxSpeed,
  title,
  dropdownOptions,
}) => {
  return (
    <div
      style={{
        backgroundColor: `rgba(${hexToRgb(color)}, 0.2)`,
      }}
      className={`text-sm xl:text-md text-black text-md w-[280px] xl:w-[300px] p-4 border-[1px] border-main-10 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center`}>
      <div className="w-full flex items-center space-x-4 pb-4">
        <div className="w-[10%]">
          <Image
            src={icon}
            alt="Zone Icon"
            width={45}
            height={45}
            className="scale-110"
          />
        </div>

        <div className="w-[80%]">
          <h3 className=" w-full text-start text-md xl:text-lg font-bold text-black">
            {title}
          </h3>
        </div>
        <div className="w-[10%]">
          <Image
            src="/assets/shared/delete.png"
            alt="Delete Icon"
            width={23}
            height={23}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 w-full items-center">
        <div>Vitesse maximale</div>
        <div className="text-end font-bold">{maxSpeed}</div>
      </div>
      <div className="grid grid-cols-2 w-full items-center">
        <div>Affichage des PoIs</div>
        <div>
          <select
            id="zone-dropdown"
            className="w-full p-2 border bg-black text-white font-futura font-light border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            {dropdownOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex items-end justify-end w-full pt-6">
        <ButtonPrimary title="Modifier" onClick={handleEditZoneType} />
      </div>
    </div>
  );
};

export default ZoneTypeCard;
