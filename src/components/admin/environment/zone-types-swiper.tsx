"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ZoneTypeCard from "./zone-type-card";
import ZoneTypeEditModal from "./zone-type-edit-modal";
import ZoneDeleteConfirm from "./zone-type-delete-modal";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ZoneType {
  id: number;
  type: string | null;
  color: string | null;
  icon: string | null;
  name: string | null;
  description: string | null;
  priority: string | null;
  accessible: boolean | null;
  created_at?: string;
}

const ZoneTypesSwiper = () => {
  const [swiperWidth, setSwiperWidth] = useState(0);
  const [zoneTypes, setZoneTypes] = useState<ZoneType[]>([]);
  const [isClient, setIsClient] = useState(false);

  const [selectedZoneType, setSelectedZoneType] = useState<ZoneType | null>(
    null
  );
  const [editOpen, setEditOpen] = useState(false);

  const [deleteZoneType, setDeleteZoneType] = useState<ZoneType | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleZoneTypesFetch = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/zone-types`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Failed to fetch zone types");

      const data = (await response.json()) as ZoneType[];
      setZoneTypes(data);
      return data;
    } catch (error) {
      console.error("Error fetching zone types:", error);
    }
  };

  useEffect(() => {
    setIsClient(true);
    handleZoneTypesFetch();
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const calculateWidth = () => {
      const width =
        window.innerWidth > 1570
          ? window.innerWidth * 0.8
          : window.innerWidth * 0.75;
      setSwiperWidth(width);
    };

    calculateWidth();
    window.addEventListener("resize", calculateWidth);
    return () => window.removeEventListener("resize", calculateWidth);
  }, [isClient]);

  const handleEdit = (zoneType: ZoneType) => {
    setSelectedZoneType(zoneType);
    setEditOpen(true);
  };

  const handleSave = async (updatedZoneType: ZoneType) => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/zone-types/${updatedZoneType.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(updatedZoneType),
        }
      );

      await handleZoneTypesFetch();
      setEditOpen(false);
    } catch (error) {
      console.error("Failed to save zone type:", error);
    }
  };

  const handleDeleteOpen = (zoneType: ZoneType) => {
    setDeleteZoneType(zoneType);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = async (zoneTypeId: number) => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/zone-types/${zoneTypeId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      await handleZoneTypesFetch();
    } catch (error) {
      console.error("Failed to delete zone type:", error);
    }
  };

  if (!isClient) return null;

  return (
    <div style={{ width: `${swiperWidth}px` }} className="p-4">
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={3}
        navigation
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 2.25 },
          1233: { slidesPerView: 3 },
          1300: { slidesPerView: 2.9 },
          1400: { slidesPerView: 3 },
          1500: { slidesPerView: 3.5 },
        }}>
        {zoneTypes.map((zone) => (
          <SwiperSlide key={zone.id}>
            <ZoneTypeCard
              {...zone}
              onEdit={() => handleEdit(zone)}
              onDelete={() => handleDeleteOpen(zone)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedZoneType && (
        <ZoneTypeEditModal
          zoneType={selectedZoneType}
          isOpen={editOpen}
          onClose={() => setEditOpen(false)}
          onSave={handleSave}
        />
      )}

      {deleteZoneType && (
        <ZoneDeleteConfirm
          zoneType={deleteZoneType}
          isOpen={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default ZoneTypesSwiper;
