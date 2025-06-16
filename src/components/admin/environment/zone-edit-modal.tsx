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

const ZoneEditModal = ({ zone, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    id: zone?.id || "",
    name: zone?.name || "",
    description: zone?.description || "",
    coordinates: zone?.coordinates || [],
    // Add other fields as needed
  });

  const [isLoading, setIsLoading] = useState(false);

  // Update form data when zone changes
  useEffect(() => {
    if (zone) {
      setFormData({
        id: zone.id || "",
        name: zone.name || "",
        description: zone.description || "",
        coordinates: zone.coordinates || [],
        // Update other fields as needed
      });
    }
  }, [zone]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await onSave(formData);
    } catch (error) {
      console.error("Failed to update zone:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Modifier la zone</DialogTitle>
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
                required
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

export default ZoneEditModal;
