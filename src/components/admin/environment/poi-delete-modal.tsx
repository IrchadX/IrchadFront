"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/shared/button";

const POIDeleteConfirm = ({ poi, isOpen, onClose, onConfirm }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Handle POI name display (some POIs might not have names)
  const getDisplayName = () => {
    if (poi?.name) return poi.name;
    return `POI ${poi?.id}`;
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await onConfirm();
    } catch (error) {
      console.error("Failed to delete POI:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmer la suppression</DialogTitle>
        </DialogHeader>
        <p>
          Êtes-vous sûr de vouloir supprimer le point d'intérêt "
          {getDisplayName()}"? Cette action ne peut pas être annulée.
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}>
            {isLoading ? "Suppression..." : "Supprimer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default POIDeleteConfirm;
