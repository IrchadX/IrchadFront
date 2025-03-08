"use client"; // Ensure this is a Client Component
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ZoneTypeCard from "./zone-type-card";
import { zoneTypes } from "@/data/zoneTypes";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ZonesSwiper = () => {
  return (
    <div className="p-4 2xl:w-[1280px]">
      <Swiper
        modules={[Navigation]}
        spaceBetween={0}
        slidesPerView={3}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}>
        {zoneTypes.map((zone, index) => (
          <SwiperSlide key={index}>
            <ZoneTypeCard
              icon={zone.icon}
              color={zone.color}
              maxSpeed={zone.maxSpeed}
              title={zone.title}
              dropdownOptions={zone.dropdownOptions}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ZonesSwiper;
