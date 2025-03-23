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

interface AddPoiCardProps {
  handleSaveItem: (item: any) => void;
  showValues: boolean;
  selectedItem: any;
}

const AddPoiCard = ({
  showValues,
  selectedItem,
  handleSaveItem,
}: AddPoiCardProps) => {
  const [nom, setNom] = useState(selectedItem?.properties?.nom || "Nom du POI");
  const [categorie, setCategorie] = useState(
    selectedItem?.properties?.categorie || ""
  );
  const [description, setDescription] = useState(
    selectedItem?.properties?.description || "Description du POI"
  );

  useEffect(() => {
    if (selectedItem) {
      setNom(selectedItem.properties?.nom || "Nom du POI");
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
        nom,
        categorie,
        description,
      },
    };

    handleSaveItem(updatedItem);
    setNom("");
    setCategorie("");
    setDescription("");
    toast.success("PoI ajoute");

    console.log("Updated item:", updatedItem);
  };

  return (
    <div className="p-6 bg-main-20 rounded-lg shadow-md max-w-md mx-auto border-main-40 border">
      <ToastContainer />

      <Title text="Créer un Point d'Intérêt" lineLength="0" />

      {/* Nom */}
      <div className="mb-4 gap-2">
        <Label htmlFor="nom">Nom</Label>
        {showValues ? (
          <p className="mt-1 text-gray-700">{nom}</p>
        ) : (
          <Input
            id="nom"
            placeholder="Nom du POI..."
            value={nom}
            onChange={(e) => setNom(e.target.value)}
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
