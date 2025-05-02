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

  const handleEditZone = (zoneId) => {
    const zoneToEdit = zones.find((zone) => zone.id === zoneId);
    if (zoneToEdit) {
      setEditingZone(zoneToEdit);
      setIsEditModalOpen(true);
    }
  };

  const handleDeleteZone = (zoneId) => {
    const zoneToDelete = zones.find((zone) => zone.id === zoneId);
    if (zoneToDelete) {
      setDeletingZone(zoneToDelete);
      setIsDeleteModalOpen(true);
    }
  };

  const handleSaveZone = (updatedZone) => {
    setZones((prevZones) =>
      prevZones.map((zone) => (zone.id === updatedZone.id ? updatedZone : zone))
    );
  };

  const handleConfirmDelete = (deletedZoneId) => {
    setZones((prevZones) =>
      prevZones.filter((zone) => zone.id !== deletedZoneId)
    );
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
        {zones &&
          zones.map((zone) => (
            <SwiperSlide key={zone.id}>
              <ZoneCard
                zone={zone}
                onEdit={() => handleEditZone(zone.id)}
                onDelete={() => handleDeleteZone(zone.id)}
              />
            </SwiperSlide>
          ))}
      </Swiper>

      {/* Edit Modal */}
      {editingZone && (
        <ZoneEditModal
          zone={editingZone}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingZone(null);
          }}
          onSave={handleSaveZone}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deletingZone && (
        <ZoneDeleteConfirm
          zone={deletingZone}
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setDeletingZone(null);
          }}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default ZonesSwiper;
