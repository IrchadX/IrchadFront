"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/shared/button";
import { Input } from "@/components/shared/input";

interface PoiCategory {
  id: number;
  category: string;
  icon?: string | null;
  color?: string | null;
}

interface PoiCategoryEditModalProps {
  poiCategory: PoiCategory;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedPoiCategory: PoiCategory) => void;
}

const PoiCategoryEditModal: React.FC<PoiCategoryEditModalProps> = ({
  poiCategory,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<PoiCategory>({
    id: poiCategory?.id || 0,
    category: poiCategory?.category || "",
    icon: poiCategory?.icon || null,
    color: poiCategory?.color || "#000000",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (poiCategory) {
      setFormData({
        id: poiCategory.id,
        category: poiCategory.category,
        icon: poiCategory.icon || null,
        color: poiCategory.color || "#000000",
      });
    }
  }, [poiCategory]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch(
        ` ${process.env.NEXT_PUBLIC_API_URL}/poi-categories/${formData.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour.");
      }

      const updated = await response.json();
      onSave(updated); // Call onSave with updated POI category
    } catch (error) {
      console.error("Failed to update POI category:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Modifier la catégorie de POI</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-[1fr,2fr] items-center gap-4">
              <label htmlFor="category">Catégorie</label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PoiCategoryEditModal;
