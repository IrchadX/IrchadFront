"use client"; // Required for client-side interactivity

import React, { useState } from "react";
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

interface AddZoneCardProps {
  showValues: boolean;
}

const AddZoneCard = ({ showValues }: AddZoneCardProps) => {
  const [nom, setNom] = useState("Nom de la zone");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("Description de la zone");

  const handleSave = () => {
    const zoneData = {
      nom,
      type,
      description,
    };

    console.log("Saving zone data:", zoneData);
    alert("Zone saved successfully!");
  };

  return (
    <div className="p-6 bg-main-20 rounded-lg shadow-md max-w-md mx-auto border-main-40 border">
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
      <div className="items-end flex justify-end">
        {/* Save Button (Only visible in edit mode) */}
        {!showValues && (
          <Button variant="secondary" onClick={handleSave}>
            {" "}
            Enregistrer
          </Button>
        )}
      </div>
    </div>
  );
};

export default AddZoneCard;
