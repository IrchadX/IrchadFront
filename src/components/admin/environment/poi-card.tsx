"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ButtonPrimary } from "@/components/shared/primary-button";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const POICard = ({ poi, onEdit, onDelete }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: poi.name || "",
    description: poi.description || "",
    category_id: poi.category_id || "",
    // Add other editable fields as needed
  });

  // Category options - replace with your actual categories
  const categories = [
    { id: 1, name: "Restaurant" },
    { id: 2, name: "Hôtel" },
    { id: 3, name: "Monument" },
    { id: 4, name: "Parc" },
    { id: 5, name: "Commerce" },
  ];

  // Determine if the POI is a point or polygon
  const isPOIPoint = () => {
    if (!poi.coordinates || poi.coordinates.length === 0) return false;
    return !Array.isArray(poi.coordinates[0][0]);
  };

  // Get POI type text
  const getPOITypeText = () => {
    return isPOIPoint() ? "Point d'intérêt" : "Zone d'intérêt";
  };

  // Get creation date in a nice format
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Generate a consistent color based on POI id
  const getPOIColor = (id) => {
    const colors = [
      "#FF5733", // Orange-Red
      "#33A1FD", // Blue
      "#33FD92", // Green
      "#F633FD", // Purple
      "#FDC133", // Yellow
      "#33FDFD", // Cyan
    ];
    return colors[id % colors.length];
  };

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
          result[3],
          16
        )}`
      : "0, 0, 0";
  };

  // Handle POI name display (some POIs might not have names)
  const getDisplayName = () => {
    if (poi.name) return poi.name;
    return `POI ${poi.id}`;
  };

  // Get the first letter for the avatar
  const getAvatarInitial = () => {
    const displayName = getDisplayName();
    return displayName.charAt(0).toUpperCase();
  };

  // Get category name by id
  const getCategoryName = (id) => {
    const category = categories.find((cat) => cat.id === parseInt(id));
    return category ? category.name : "Non définie";
  };

  const poiColor = getPOIColor(poi.id);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      category_id: value,
    }));
  };

  const handleSubmitEdit = async () => {
    try {
      setIsLoading(true);
      await onEdit(poi.id, formData);
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Failed to update POI:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitDelete = async () => {
    try {
      setIsLoading(true);
      await onDelete(poi.id);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Failed to delete POI:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        style={{
          backgroundColor: `rgba(${hexToRgb(poiColor)}, 0.2)`,
        }}
        className="text-sm xl:text-md text-black w-[280px] xl:w-[300px] p-4 border-[1px] border-main-10 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center">
        <div className="w-full flex items-center space-x-4 pb-4">
          <div className="w-[10%]">
            <div
              style={{ backgroundColor: poiColor }}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">
              {getAvatarInitial()}
            </div>
          </div>

          <div className="w-[80%]">
            <h3 className="w-full text-start text-md xl:text-lg font-bold text-black">
              {getDisplayName()}
            </h3>
          </div>
          <div
            className="w-[10%] cursor-pointer"
            onClick={() => setIsDeleteDialogOpen(true)}>
            <Image
              src="/assets/shared/delete.png"
              alt="Delete Icon"
              width={23}
              height={23}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 w-full items-center">
          <div>ID</div>
          <div className="text-end font-bold">{poi.id}</div>
        </div>

        <div className="grid grid-cols-2 w-full items-center">
          <div>Type</div>
          <div className="text-end font-bold">{getPOITypeText()}</div>
        </div>

        <div className="grid grid-cols-2 w-full items-center">
          <div>Créé le</div>
          <div className="text-end font-bold">{formatDate(poi.created_at)}</div>
        </div>

        {poi.category_id && (
          <div className="grid grid-cols-2 w-full items-center">
            <div>Catégorie</div>
            <div className="text-end font-bold">
              {getCategoryName(poi.category_id)}
            </div>
          </div>
        )}

        {poi.description && (
          <div className="w-full mt-2">
            <div className="text-sm italic text-gray-700 truncate">
              {poi.description}
            </div>
          </div>
        )}

        <div className="flex items-end justify-end w-full pt-6">
          <ButtonPrimary
            title="Modifier"
            onClick={() => {
              setFormData({
                name: poi.name || "",
                description: poi.description || "",
                category_id: poi.category_id || "",
              });
              setIsEditDialogOpen(true);
            }}
          />
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Modifier le point d'intérêt</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Nom
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
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
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="category" className="text-right">
                Catégorie
              </label>
              <div className="col-span-3">
                <Select
                  value={formData.category_id.toString()}
                  onValueChange={handleSelectChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* Add more fields as needed */}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSubmitEdit} disabled={isLoading}>
              {isLoading ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
          </DialogHeader>
          <p>
            Êtes-vous sûr de vouloir supprimer le point d'intérêt "
            {getDisplayName()}"? Cette action ne peut pas être annulée.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={handleSubmitDelete}
              disabled={isLoading}>
              {isLoading ? "Suppression..." : "Supprimer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default POICard;
