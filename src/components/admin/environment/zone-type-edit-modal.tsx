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

const ZoneTypeEditModal = ({ zoneType, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    id: zoneType?.id || "",
    name: zoneType?.name || "",
    type: zoneType?.type || "",
    description: zoneType?.description || "",
    priority: zoneType?.priority || "",
    accessible: zoneType?.accessible || false,
    color: zoneType?.color || "",
    icon: zoneType?.icon || "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (zoneType) {
      setFormData({ ...formData, ...zoneType });
    }
  }, [zoneType]);

  const handleInputChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: inputType === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/zone-types/${formData.id}`,
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
      onSave(updated); // Pass updated data back to parent
    } catch (error) {
      console.error("Failed to update zone type:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Modifier le type de zone</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-[1fr,2fr] items-center gap-4">
              <label htmlFor="name">Nom</label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid grid-cols-[1fr,2fr] items-center gap-4">
              <label htmlFor="type">Type</label>
              <Input
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid grid-cols-[1fr,2fr] items-center gap-4">
              <label htmlFor="priority">Priorité</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority || ""}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2">
                <option value="">-- Sélectionner --</option>
                <option value="Low">Faible</option>
                <option value="Medium">Moyenne</option>
                <option value="High">Élevée</option>
              </select>
            </div>

            <div className="grid grid-cols-[1fr,2fr] items-center gap-4">
              <label htmlFor="description">Description</label>
              <TextArea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-[1fr,2fr] items-center gap-4">
              <label htmlFor="accessible">Accessible</label>
              <input
                id="accessible"
                name="accessible"
                type="checkbox"
                checked={formData.accessible}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-[1fr,2fr] items-center gap-4">
              <label htmlFor="color">Couleur</label>
              <input
                id="color"
                name="color"
                type="color"
                value={formData.color || "#000000"}
                onChange={handleInputChange}
                className="w-full h-10 p-1 border border-gray-300 rounded"
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

export default ZoneTypeEditModal;
