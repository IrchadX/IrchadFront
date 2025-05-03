"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import POICard from "./poi-card";
import POIEditModal from "./poi-edit-modal";
import POIDeleteConfirm from "./poi-delete-modal";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const POIsSwiper = ({ pois: initialPOIs }) => {
  const [pois, setPOIs] = useState(initialPOIs || []);
  const [swiperWidth, setSwiperWidth] = useState(0);
  const [editingPOI, setEditingPOI] = useState(null);
  const [deletingPOI, setDeletingPOI] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    setPOIs(initialPOIs || []);
  }, [initialPOIs]);

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
  const openEditModal = (poi) => {
    setEditingPOI(poi);
    setIsEditModalOpen(true);
  };

  // ✅ Open Delete Modal
  const openDeleteModal = (poi) => {
    setDeletingPOI(poi);
    setIsDeleteModalOpen(true);
  };

  // ✅ Actual Edit Request
  const handleEditPOI = async (updatedPOI) => {
    console.log(updatedPOI);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/pois/${updatedPOI.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(updatedPOI),
        }
      );

      if (!response.ok) throw new Error("Failed to update POI");

      const data = await response.json();

      // Update local state
      setPOIs((prev) =>
        prev.map((p) => (p.id === updatedPOI.id ? { ...p, ...updatedPOI } : p))
      );

      setIsEditModalOpen(false);
      setEditingPOI(null);

      return data;
    } catch (error) {
      console.error("Error updating POI:", error);
      throw error;
    }
  };

  // ✅ Actual Delete Request
  const handleDeletePOI = async () => {
    if (!deletingPOI) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/pois/${deletingPOI.id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Failed to delete POI");

      setPOIs((prev) => prev.filter((p) => p.id !== deletingPOI.id));
      setIsDeleteModalOpen(false);
      setDeletingPOI(null);

      return true;
    } catch (error) {
      console.error("Error deleting POI:", error);
      throw error;
    }
  };

  // ✅ Close modals
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingPOI(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingPOI(null);
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
        {pois.map((poi) => (
          <SwiperSlide key={poi.id}>
            <POICard
              poi={poi}
              onEdit={() => openEditModal(poi)}
              onDelete={() => openDeleteModal(poi)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ✅ Edit Modal */}
      {editingPOI && (
        <POIEditModal
          poi={editingPOI}
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          onSave={handleEditPOI}
        />
      )}

      {/* ✅ Delete Modal */}
      {deletingPOI && (
        <POIDeleteConfirm
          poi={deletingPOI}
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleDeletePOI}
        />
      )}
    </div>
  );
};

export default POIsSwiper;
