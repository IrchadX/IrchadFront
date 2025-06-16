"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import PoiCategoryCard from "./poi-category-card";
import PoiCategoryEditModal from "./poi-category-edit-modal";
import PoiCategoryDeleteConfirm from "./poi-category-delete-modal";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface PoiCategory {
  id: number;
  category: string;
  icon?: string | null;
  color?: string | null;
}

const PoiCategoriesSwiper = () => {
  const [swiperWidth, setSwiperWidth] = useState(0);
  const [poiCategories, setPoiCategories] = useState<PoiCategory[]>([]);
  const [isClient, setIsClient] = useState(false);

  const [selectedPoiCategory, setSelectedPoiCategory] =
    useState<PoiCategory | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  const [deletePoiCategory, setDeletePoiCategory] =
    useState<PoiCategory | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handlePoiCategoriesFetch = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/poi-categories`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Failed to fetch POI categories");

      const data = (await response.json()) as PoiCategory[];
      setPoiCategories(data);
      return data;
    } catch (error) {
      console.error("Error fetching POI categories:", error);
    }
  };

  useEffect(() => {
    setIsClient(true);
    handlePoiCategoriesFetch();
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

  const handleEdit = (poiCategory: PoiCategory) => {
    setSelectedPoiCategory(poiCategory);
    setEditOpen(true);
  };

  const handleSave = async (updatedPoiCategory: PoiCategory) => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/poi-categories/${updatedPoiCategory.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(updatedPoiCategory),
        }
      );

      await handlePoiCategoriesFetch();
      setEditOpen(false);
    } catch (error) {
      console.error("Failed to save POI category:", error);
    }
  };

  const handleDeleteOpen = (poiCategory: PoiCategory) => {
    setDeletePoiCategory(poiCategory);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = async (poiCategoryId: number) => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/poi-categories/${poiCategoryId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      await handlePoiCategoriesFetch();
    } catch (error) {
      console.error("Failed to delete POI category:", error);
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
        {poiCategories.map((category) => (
          <SwiperSlide key={category.id}>
            <PoiCategoryCard
              {...category}
              onEdit={() => handleEdit(category)}
              onDelete={() => handleDeleteOpen(category)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedPoiCategory && (
        <PoiCategoryEditModal
          poiCategory={selectedPoiCategory}
          isOpen={editOpen}
          onClose={() => setEditOpen(false)}
          onSave={handleSave}
        />
      )}

      {deletePoiCategory && (
        <PoiCategoryDeleteConfirm
          poiCategory={deletePoiCategory}
          isOpen={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default PoiCategoriesSwiper;
