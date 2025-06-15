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
  const [name, setName] = useState(
    selectedItem?.properties?.name || "Nom du POI"
  );
  const [categoryId, setCategoryId] = useState(
    selectedItem?.properties?.categoryId || ""
  );
  const [categoryName, setCategoryName] = useState(
    selectedItem?.properties?.category || ""
  );
  const [description, setDescription] = useState(
    selectedItem?.properties?.description || "Description du POI"
  );
  const [poiCategories, setPoiCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPoiCategories = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/poi-categories`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch POI categories: ${response.status}`);
        }
        const data = await response.json();
        setPoiCategories(data);
      } catch (err) {
        console.error("Error fetching POI categories:", err);
        setError(err.message);
        toast.error("Erreur lors du chargement des catégories de POI");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPoiCategories();
  }, []);

  useEffect(() => {
    if (selectedItem) {
      setName(selectedItem.properties?.name || "Nom du POI");
      setCategoryId(selectedItem.properties?.categoryId || "");
      setCategoryName(selectedItem.properties?.category || "");
      setDescription(
        selectedItem.properties?.description || "Description du POI"
      );
    }
  }, [selectedItem]);

  const handleCategoryChange = (value) => {
    const selectedCategory = poiCategories.find(
      (category) => category.id.toString() === value
    );
    if (selectedCategory) {
      setCategoryId(selectedCategory.id);
      setCategoryName(selectedCategory.category);
    }
  };

  const handleSave = () => {
    console.log("poi selected item categoru", selectedItem);
    const updatedItem = {
      ...selectedItem,
      properties: {
        ...selectedItem.properties,
        name,
        categorie: categoryName,
        categoryId: categoryId,
        description,
        id: 0,
        envId: envId,
      },
    };

    handleSaveItem(updatedItem);
    toast.success("POI ajouté");
    setName("");
    setCategoryId("");
    setCategoryName("");
    setDescription("");
  };

  return (
    <div className="p-6 bg-main-20 dark:bg-gray-800 rounded-lg shadow-md max-w-md mx-auto border-main-40 dark:border-gray-600 border">
      <ToastContainer />

      <Title
        text="Créer un Point d'Intérêt"
        lineLength="0"
        className="dark:text-white"
      />

      {/* Name */}
      <div className="mb-4 gap-2">
        <Label htmlFor="name" className="dark:text-gray-300">
          Nom
        </Label>
        {showValues ? (
          <p className="mt-1 text-gray-700 dark:text-gray-300">{name}</p>
        ) : (
          <Input
            id="name"
            placeholder="Nom du POI..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          />
        )}
      </div>

      {/* Catégorie (Dropdown) */}
      <div className="mb-4">
        <Label htmlFor="categorie" className="dark:text-gray-300">
          Catégorie
        </Label>
        {showValues ? (
          <p className="mt-1 text-gray-700 dark:text-gray-300">
            {categoryName || "Aucune catégorie sélectionnée"}
          </p>
        ) : (
          <Select
            onValueChange={handleCategoryChange}
            value={categoryId?.toString()}>
            <SelectTrigger className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <SelectValue
                placeholder={
                  isLoading ? "Chargement..." : "Sélectionnez une catégorie"
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
                poiCategories.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={category.id.toString()}
                    className="dark:hover:bg-gray-600">
                    {category.category}
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
            placeholder="Description du POI..."
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
            Ajouter le POI
          </Button>
        )}
      </div>
    </div>
  );
};

export default AddPoiCard;
