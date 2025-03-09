"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ZoneTypeCard from "./zone-type-card";
import { zoneTypes } from "@/data/zoneTypes";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ZonesSwiper = () => {
  const [swiperWidth, setSwiperWidth] = useState(0);

  useEffect(() => {
    // Calculate 75% of the screen width
    const width =
      window.innerWidth > 1570
        ? window.innerWidth * 0.8
        : window.innerWidth * 0.75;
    setSwiperWidth(width);

    const handleResize = () => {
      const newWidth =
        window.innerWidth > 1570
          ? window.innerWidth * 0.8
          : window.innerWidth * 0.75;
      setSwiperWidth(newWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ width: `${swiperWidth}px` }} className="p-4">
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={3}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 2.25,
          },
          1233: { slidesPerView: 3 },
          1300: { slidesPerView: 2.9 },
          1400: { slidesPerView: 3 },
          1500: { slidesPerView: 3.5 },
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
