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
import { TextArea } from "@/components/shared/text-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const POIEditModal = ({ poi, isOpen, onClose, onSave }) => {
  // Category options - replace with your actual categories
  const categories = [
    { id: 1, name: "Restaurant" },
    { id: 2, name: "Hôtel" },
    { id: 3, name: "Monument" },
    { id: 4, name: "Parc" },
    { id: 5, name: "Commerce" },
  ];

  const [formData, setFormData] = useState({
    id: poi.id,
    name: poi?.name || "",
    description: poi?.description || "",
    category_id: 2,
    coordinates: poi?.coordinates || [],
    // Add other fields as needed
  });

  const [isLoading, setIsLoading] = useState(false);

  // Update form data when poi changes
  useEffect(() => {
    if (poi) {
      setFormData({
        id: poi.id || "",
        name: poi.name || "",
        description: poi.description || "",
        category_id: poi.category_id || 2,
        coordinates: poi.coordinates || [],
        // Update other fields as needed
      });
    }
  }, [poi]);

  // Handle POI name display (some POIs might not have names)
  const getDisplayName = () => {
    if (poi?.name) return poi.name;
    return `POI ${poi?.id}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      category_id: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await onSave(formData);
    } catch (error) {
      console.error("Failed to update POI:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Modifier le point d'intérêt</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-[1fr,2fr] items-center gap-4">
              <label htmlFor="name" className="text-right">
                Nom
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-[1fr,2fr] items-center gap-4">
              <label htmlFor="description" className="text-right">
                Description
              </label>
              <TextArea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="col-span-3"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-[1fr,2fr] items-center gap-4">
              <label htmlFor="category" className="text-right">
                Catégorie
              </label>
              <div className="">
                <Select
                  value={formData.category_id.toString()}
                  onValueChange={handleSelectChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* Add more fields as needed */}
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

export default POIEditModal;
