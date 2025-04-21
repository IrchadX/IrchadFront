"use client"; // Required for client-side interactivity

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
import { Button } from "@/components/shared/button";
import { poiCategories } from "@/data/poiCategories";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface AddPoiCardProps {
  handleSaveItem: (item: any) => void;
  setSelectedItem: (item: any) => void;
  showValues: boolean;
  selectedItem: any;
  envId: number;
}

const AddPoiCard = ({
  showValues,
  selectedItem,
  handleSaveItem,
  envId,
}: AddPoiCardProps) => {
  const [Name, setName] = useState(
    selectedItem?.properties?.Name || "Name du POI"
  );
  const [categorie, setCategorie] = useState(
    selectedItem?.properties?.categorie || ""
  );
  const [description, setDescription] = useState(
    selectedItem?.properties?.description || "Description du POI"
  );

  useEffect(() => {
    if (selectedItem) {
      setName(selectedItem.properties?.name || "Nom du POI");
      setCategorie(selectedItem.properties?.categorie || "");
      setDescription(
        selectedItem.properties?.description || "Description du POI"
      );
    }
  }, [selectedItem]);

  const handleSave = () => {
    const updatedItem = {
      ...selectedItem,
      properties: {
        ...selectedItem.properties,
        name,
        categorie,
        description,
        id: 0,
      },
    };

    handleSaveItem(updatedItem);
    setName("");
    setCategorie("");
    setDescription("");
    toast.success("PoI ajoute");

    console.log("Updated item:", updatedItem);
  };

  return (
    <div className="p-6 bg-main-20 rounded-lg shadow-md max-w-md mx-auto border-main-40 border">
      <ToastContainer />

      <Title text="Créer un Point d'Intérêt" lineLength="0" />

      {/* Name */}
      <div className="mb-4 gap-2">
        <Label htmlFor="Name">Name</Label>
        {showValues ? (
          <p className="mt-1 text-gray-700">{Name}</p>
        ) : (
          <Input
            id="Name"
            placeholder="Name du POI..."
            value={Name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white"
          />
        )}
      </div>

      {/* Catégorie (Dropdown) */}
      <div className="mb-4">
        <Label htmlFor="categorie">Catégorie</Label>
        {showValues ? (
          <p className="mt-1 text-gray-700">
            {categorie || "Aucune catégorie sélectionnée"}
          </p>
        ) : (
          <Select onValueChange={setCategorie} value={categorie}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Sélectionnez une catégorie" />
            </SelectTrigger>
            <SelectContent>
              {poiCategories.map((category, index) => (
                <SelectItem key={index} value={category.title}>
                  {category.title}
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
            placeholder="Description du POI..."
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
            Ajouter le PoI
          </Button>
        )}
      </div>
    </div>
  );
};

export default AddPoiCard;
