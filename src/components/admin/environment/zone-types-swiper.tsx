import ZoneTypeCard from "./zone-type-card";
import { zoneTypes } from "@/data/zoneTypes";

const ZonesSwiper = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {zoneTypes.map((zone, index) => (
        <ZoneTypeCard
          key={index}
          icon={zone.icon}
          color={zone.color}
          maxSpeed={zone.maxSpeed}
          title={zone.title}
          dropdownOptions={zone.dropdownOptions}
        />
      ))}
    </div>
  );
};

export default ZonesSwiper;
