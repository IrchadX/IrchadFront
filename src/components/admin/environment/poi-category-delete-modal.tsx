"use client";
import React, { useState } from "react";
import { ButtonPrimary } from "@/components/shared/primary-button";

interface PoiCategory {
  id: number;
  category: string;
  icon?: string | null;
  color?: string | null;
}

interface PoiCategoryDeleteConfirmProps {
  poiCategory: PoiCategory;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (poiCategoryId: number) => void;
}

const PoiCategoryDeleteConfirm: React.FC<PoiCategoryDeleteConfirmProps> = ({
  poiCategory,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/poi-categories/${poiCategory.id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      onConfirm(poiCategory.id);
      onClose();
    } catch (err: any) {
      setError(`Failed to delete POI category: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-lg">
        <h2 className="text-xl font-bold mb-4">Supprimer la catégorie</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <p className="mb-6">
          Êtes-vous sûr de vouloir supprimer la catégorie de POI{" "}
          <strong>{poiCategory.category}</strong>? Cette action est
          irréversible.
        </p>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
            disabled={isLoading}>
            Annuler
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            disabled={isLoading}>
            {isLoading ? "Suppression..." : "Supprimer"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PoiCategoryDeleteConfirm;
