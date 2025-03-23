"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/shared/input";
import { Label } from "@/components/shared/label";
import { TextArea } from "@/components/shared/text-area";
import Title from "@/components/shared/title";
import { zoneTypes } from "@/data/zoneTypes";
import { Button } from "@/components/shared/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AddZoneCardProps {
  handleSaveItem: (item: any) => void;
  showValues: boolean;
  selectedItem: any;
}

const AddZoneCard = ({
  showValues,
  selectedItem,
  handleSaveItem,
}: AddZoneCardProps) => {
  const [nom, setNom] = useState(
    selectedItem?.properties?.nom || "Nom de la zone"
  );
  const [type, setType] = useState(selectedItem?.properties?.type || "");
  const [description, setDescription] = useState(
    selectedItem?.properties?.description || "Description de la zone"
  );

  useEffect(() => {
    if (selectedItem) {
      setNom(selectedItem.properties?.nom || "Nom de la zone");
      setType(selectedItem.properties?.type || "");
      setDescription(
        selectedItem.properties?.description || "Description de la zone"
      );
    }
  }, [selectedItem]);

  const handleSave = () => {
    const updatedItem = {
      ...selectedItem,
      properties: {
        ...selectedItem.properties,
        nom,
        type,
        description,
      },
    };

    handleSaveItem(updatedItem);
    toast.success("Zone ajoutee");
    setNom("");
    setDescription("");
    setType("");
    console.log("Updated item:", updatedItem);
  };

  return (
    <div className="p-6 bg-main-20 rounded-lg shadow-md max-w-md mx-auto border-main-40 border">
      <ToastContainer />
      <Title text="Créer une zone" lineLength="0" />

      {/* Nom */}
      <div className="mb-4 gap-2">
        <Label htmlFor="nom">Nom</Label>
        {showValues ? (
          <p className="mt-1 text-gray-700">{nom}</p>
        ) : (
          <Input
            id="nom"
            placeholder="Nom de la zone..."
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="bg-white"
          />
        )}
      </div>

      {/* Type (Dropdown) */}
      <div className="mb-4">
        <Label htmlFor="type">Type</Label>
        {showValues ? (
          <p className="mt-1 text-gray-700">
            {type || "Aucun type sélectionné"}
          </p>
        ) : (
          <Select onValueChange={setType} value={type}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Sélectionnez un type" />
            </SelectTrigger>
            <SelectContent>
              {zoneTypes.map((zone, index) => (
                <SelectItem key={index} value={zone.title}>
                  {zone.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Description */}
      <div className="mb-4">
        <Label htmlFor="description">Description</Label>
        {showValues ? (
          <p className="mt-1 text-gray-700">{description}</p>
        ) : (
          <TextArea
            id="description"
            placeholder="Description de la zone..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-white"
          />
        )}
      </div>

      {/* Save Button (Only visible in edit mode) */}
      <div className="items-end flex justify-end">
        {!showValues && (
          <Button variant="secondary" onClick={handleSave}>
            Ajouter la zone
          </Button>
        )}
      </div>
    </div>
  );
};

export default AddZoneCard;
