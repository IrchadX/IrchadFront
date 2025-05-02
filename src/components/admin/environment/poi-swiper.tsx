"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import POICard from "./poi-card";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const POIsSwiper = ({ pois }) => {
  const [swiperWidth, setSwiperWidth] = useState(0);

  useEffect(() => {
    // Calculate width based on screen size
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

  const handleEditPOI = (poiId) => {
    console.log("Edit POI:", poiId);
    // Add your edit POI logic here
  };

  const handleDeletePOI = (poiId) => {
    console.log("Delete POI:", poiId);
    // Add your delete POI logic here
  };

  return (
    <div style={{ width: `${swiperWidth}px` }} className="p-4">
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={3}
        navigation
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
        {pois &&
          pois.map((poi) => (
            <SwiperSlide key={poi.id}>
              <POICard
                poi={poi}
                onEdit={() => handleEditPOI(poi.id)}
                onDelete={() => handleDeletePOI(poi.id)}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default POIsSwiper;
