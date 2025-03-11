"use client";

import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/shared/input";
import { Label } from "@/components/shared/label";
import Title from "@/components/shared/title";
import { TextArea } from "@/components/shared/text-area";
import Image from "next/image";

interface AddEnvCardProps {
  showValues: boolean;
}

const AddEnvCard = ({ showValues }: AddEnvCardProps) => {
  const [nom, setNom] = useState("Nom de l'environnement");
  const [adresse, setAdresse] = useState("Adresse de l'environnement");
  const [visibility, setVisibility] = useState("public");
  const [selectedUser, setSelectedUser] = useState("");

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto border-main-40 border">
      <Title text="Informations" lineLength="0" />
      {/* Nom */}
      <div className="mb-4 gap-2">
        <Label htmlFor="nom">Nom</Label>
        {showValues ? (
          <p className="mt-1 text-gray-700">{nom}</p>
        ) : (
          <Input
            id="nom"
            placeholder="Nom de l’envrionnement..."
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        )}
      </div>

      {/* Adresse */}
      <div className="mb-4">
        <Label htmlFor="adresse">Adresse</Label>
        {showValues ? (
          <p className="mt-1 text-gray-700">{adresse}</p>
        ) : (
          <TextArea
            id="adresse"
            placeholder="Adresse de l’environnementx"
            className="mt-1"
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
          />
        )}
      </div>

      {/* Visibility Toggle */}
      <div className="mb-4 grid grid-cols-[10%,80%,10%] border-main-40 border p-4 rounded-[6px]">
        <Image
          src="/assets/shared/visible.png"
          alt="eye icon"
          width={15}
          height={15}
          className="my-auto"
        />
        <div className="flex flex-col items-start justify-start">
          <Label>Visibilité</Label>

          <p className="mt-1 text-gray-700">
            {visibility === "private" ? "Privé" : "Public"}
          </p>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Switch
            id="visibility"
            checked={visibility === "private"}
            onCheckedChange={(checked) =>
              setVisibility(checked ? "private" : "public")
            }
          />
        </div>{" "}
      </div>

      {/* Utilisateur Dropdown (Visible only when visibility is private) */}
      {visibility === "private" && (
        <div className="mb-4">
          <Label htmlFor="utilisateur">Utilisateur</Label>
          {showValues ? (
            <p className="mt-1 text-gray-700">
              {selectedUser || "Aucun utilisateur sélectionné"}
            </p>
          ) : (
            <Select onValueChange={setSelectedUser} value={selectedUser}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Sélectionnez un utilisateur" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user1">Utilisateur 1</SelectItem>
                <SelectItem value="user2">Utilisateur 2</SelectItem>
                <SelectItem value="user3">Utilisateur 3</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      )}
    </div>
  );
};

export default AddEnvCard;
