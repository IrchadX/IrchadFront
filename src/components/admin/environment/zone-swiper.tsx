"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ZoneCard from "./zone-card";
import ZoneEditModal from "./zone-edit-modal";
import ZoneDeleteConfirm from "./zone-delete-modal";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ZonesSwiper = ({ zones: initialZones }) => {
  const [zones, setZones] = useState(initialZones || []);
  const [swiperWidth, setSwiperWidth] = useState(0);
  const [editingZone, setEditingZone] = useState(null);
  const [deletingZone, setDeletingZone] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    setZones(initialZones || []);
  }, [initialZones]);

  useEffect(() => {
    const updateWidth = () => {
      const width =
        window.innerWidth > 1570
          ? window.innerWidth * 0.8
          : window.innerWidth * 0.75;
      setSwiperWidth(width);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // ✅ Open Edit Modal
  const openEditModal = (zone) => {
    setEditingZone(zone);
    setIsEditModalOpen(true);
  };

  // ✅ Open Delete Modal
  const openDeleteModal = (zone) => {
    setDeletingZone(zone);
    setIsDeleteModalOpen(true);
  };

  // ✅ Actual Edit Request
  const handleEditZone = async (updatedZone) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/zones/${updatedZone.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(updatedZone),
        }
      );
      if (!response.ok) throw new Error("Failed to update zone");

      // Update local state
      setZones((prev) =>
        prev.map((z) => (z.id === updatedZone.id ? updatedZone : z))
      );
      setIsEditModalOpen(false);
      setEditingZone(null);
    } catch (error) {
      console.error("Error updating zone:", error);
    }
  };

  // ✅ Actual Delete Request
  const handleDeleteZone = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/zones/${deletingZone.id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error("Failed to delete zone");

      setZones((prev) => prev.filter((z) => z.id !== deletingZone.id));
      setIsDeleteModalOpen(false);
      setDeletingZone(null);
    } catch (error) {
      console.error("Error deleting zone:", error);
    }
  };

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
        {zones.map((zone) => (
          <SwiperSlide key={zone.id}>
            <ZoneCard
              zone={zone}
              onEdit={() => openEditModal(zone)}
              onDelete={() => openDeleteModal(zone)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ✅ Edit Modal */}
      {editingZone && (
        <ZoneEditModal
          zone={editingZone}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingZone(null);
          }}
          onSave={handleEditZone}
        />
      )}

      {/* ✅ Delete Modal */}
      {deletingZone && (
        <ZoneDeleteConfirm
          zone={deletingZone}
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setDeletingZone(null);
          }}
          onConfirm={handleDeleteZone}
        />
      )}
    </div>
  );
};

export default ZonesSwiper;
