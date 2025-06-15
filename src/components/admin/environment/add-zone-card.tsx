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
import { Button } from "@/components/shared/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface AddZoneCardProps {
  handleSaveItem: (item: any) => void;
  setSelectedItem: (item: any) => void;
  showValues: boolean;
  selectedItem: any;
}

interface ZoneType {
  id: number;
  name: string;
}

const AddZoneCard = ({
  showValues,
  selectedItem,
  handleSaveItem,
}: AddZoneCardProps) => {
  const [name, setName] = useState(selectedItem?.properties?.name || "");
  const [zoneTypeId, setZoneTypeId] = useState<number | string>(
    selectedItem?.properties?.typeId || ""
  );
  const [zoneTypeName, setZoneTypeName] = useState(
    selectedItem?.properties?.type || ""
  );
  const [description, setDescription] = useState(
    selectedItem?.properties?.description || ""
  );
  const [zoneTypes, setZoneTypes] = useState<ZoneType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchZoneTypes = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/zone-types`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch zone types: ${response.status}`);
        }
        const data: ZoneType[] = await response.json();
        setZoneTypes(data);
        console.log(data);
      } catch (err) {
        console.error("Error fetching zone types:", err);
        setError(err.message);
        toast.error("Erreur lors du chargement des types de zones");
      } finally {
        setIsLoading(false);
      }
    };

    fetchZoneTypes();
  }, []);

  useEffect(() => {
    if (selectedItem) {
      setName(selectedItem.properties?.name || "");
      setZoneTypeId(selectedItem.properties?.typeId || "");
      setZoneTypeName(selectedItem.properties?.typeName || "");
      setDescription(selectedItem.properties?.description || "");
    }
  }, [selectedItem]);

  const handleZoneTypeChange = (value: string) => {
    const selectedZoneType = zoneTypes.find(
      (zone) => zone.id.toString() === value
    );
    console.log("SELECTED ZONE TYPE AHHAAH", selectedZoneType);
    if (selectedZoneType) {
      setZoneTypeId(selectedZoneType.id);
      setZoneTypeName(selectedZoneType.name);
    }
  };

  const handleSave = () => {
    if (!name.trim()) {
      toast.error("Veuillez entrer un nom pour la zone");
      return;
    }

    if (!zoneTypeId) {
      toast.error("Veuillez sélectionner un type de zone");
      return;
    }

    const updatedItem = {
      ...selectedItem,
      properties: {
        ...selectedItem.properties,
        name: name.trim(),
        type: zoneTypeName,
        typeId: zoneTypeId,
        description: description.trim(),
        id: selectedItem?.properties?.id || 0,
      },
    };

    handleSaveItem(updatedItem);
    toast.success("Zone ajoutée avec succès");

    if (!selectedItem) {
      setName("");
      setDescription("");
      setZoneTypeId("");
      setZoneTypeName("");
    }
  };

  return (
    <div className="p-6 bg-main-20 dark:bg-gray-800 rounded-lg shadow-md max-w-md mx-auto border-main-40 dark:border-gray-600 border">
      <ToastContainer />
      <Title text="Créer une zone" lineLength="0" className="dark:text-white" />

      {/* Name */}
      <div className="mb-4 gap-2">
        <Label htmlFor="name" className="dark:text-gray-300">
          Zone
        </Label>
        {showValues ? (
          <p className="mt-1 text-gray-700 dark:text-gray-300">{name}</p>
        ) : (
          <Input
            id="name"
            placeholder="Nom de la zone..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          />
        )}
      </div>

      {/* Type (Dropdown) */}
      <div className="mb-4">
        <Label htmlFor="type" className="dark:text-gray-300">
          Type
        </Label>
        {showValues ? (
          <p className="mt-1 text-gray-700 dark:text-gray-300">
            {zoneTypeName || "Aucun type sélectionné"}
          </p>
        ) : (
          <Select
            onValueChange={handleZoneTypeChange}
            value={zoneTypeId?.toString() || ""}>
            <SelectTrigger className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <SelectValue
                placeholder={
                  isLoading ? "Chargement..." : "Sélectionnez un type"
                }
              />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
              {error && (
                <SelectItem
                  value="error"
                  disabled
                  className="dark:hover:bg-gray-600">
                  Erreur de chargement
                </SelectItem>
              )}
              {isLoading && (
                <SelectItem
                  value="loading"
                  disabled
                  className="dark:hover:bg-gray-600">
                  Chargement...
                </SelectItem>
              )}
              {!isLoading &&
                !error &&
                zoneTypes.map((zone) => (
                  <SelectItem
                    key={zone.id}
                    value={zone.id.toString()}
                    className="dark:hover:bg-gray-600">
                    {zone.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Description */}
      <div className="mb-4">
        <Label htmlFor="description" className="dark:text-gray-300">
          Description
        </Label>
        {showValues ? (
          <p className="mt-1 text-gray-700 dark:text-gray-300">{description}</p>
        ) : (
          <TextArea
            id="description"
            placeholder="Description de la zone..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          />
        )}
      </div>

      {/* Save Button */}
      <div className="items-end flex justify-end">
        {!showValues && (
          <Button
            variant="secondary"
            onClick={handleSave}
            disabled={isLoading}
            className="dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
            {selectedItem ? "Mettre à jour" : "Ajouter la zone"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default AddZoneCard;
