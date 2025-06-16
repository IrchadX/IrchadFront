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
import { Input } from "@/components/shared/input";
import { TextArea } from "@/components/shared/text-area";
import { Switch } from "@/components/ui/switch";
import { Select } from "@/components/ui/select";

interface AddZoneTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void; // We call this after a successful POST
}

export const AddZoneTypeModal: React.FC<AddZoneTypeModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [color, setColor] = useState("#A8D5BA");
  const [icon, setIcon] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Moyenne");
  const [accessible, setAccessible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    console.log({
      name,
      type,
      color,
      icon,
      description,
      priority,
      accessible,
    });
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/zone-types`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name,
            type,
            color,
            icon,
            description,
            priority,
            accessible,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Échec de l'ajout du type de zone");
      }

      onSave();
      onClose();
    } catch (error) {
      console.error("Erreur lors de l'ajout du type de zone :", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Ajouter un type de zone</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid grid-cols-[1fr,2fr] items-center gap-4">
              <label htmlFor="name">Nom</label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-[1fr,2fr] items-center gap-4">
              <label htmlFor="type">Type</label>
              <Input
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-[1fr,2fr] items-center gap-4">
              <label htmlFor="icon">Icône</label>
              <Input
                id="icon"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-[1fr,2fr] items-center gap-4">
              <label htmlFor="color">Couleur</label>
              <Input
                id="color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-[1fr,2fr] items-center gap-4">
              <label htmlFor="priority">Priorité</label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="border rounded px-2 py-1">
                <option value="Haute">Haute</option>
                <option value="Moyenne">Moyenne</option>
                <option value="Basse">Basse</option>
              </select>
            </div>
            <div className="grid grid-cols-[1fr,2fr] items-center gap-4">
              <label htmlFor="accessible">Accessible</label>
              <Switch
                id="accessible"
                checked={accessible}
                onCheckedChange={setAccessible}
              />
            </div>
            <div className="grid grid-cols-[1fr,2fr] items-start gap-4">
              <label htmlFor="description">Description</label>
              <TextArea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Ajout..." : "Ajouter"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
