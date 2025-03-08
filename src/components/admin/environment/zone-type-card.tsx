import { hexToRgb } from "@/utils/hexToRGB";
import Image from "next/image";

interface ZoneTypeCardProps {
  icon: string;
  color: string;
  maxSpeed: string;
  title: string;
  dropdownOptions: string[];
}

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
      className={`text-black w-[320px] p-4 border-[1px] border-main-10 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center`}>
      {/* Icon and Title Section */}
      <div className="w-full flex items-center space-x-4">
        {/* Icon with Dynamic Background Color */}
        <div className="w-[20%]">
          <Image src={icon} alt="Zone Icon" width={45} height={45} />
        </div>

        {/* Title and Max Speed */}
        <div className="w-[70%]">
          <h3 className="text-start text-md xl:text-lg font-bold text-black">
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
      <div className="grid grid-cols-2">
        <div>Vitesse maximale</div>
        <div className="text-end font-bold">{maxSpeed}</div>
      </div>
      <div className="grid grid-cols-2">
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
      {/* Dropdown Section */}
      {/* <div className="mt-4">
        <label htmlFor="zone-dropdown" className="sr-only">
          Select an option
        </label>
        <select
          id="zone-dropdown"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          {dropdownOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div> */}
    </div>
  );
};

export default ZoneTypeCard;
