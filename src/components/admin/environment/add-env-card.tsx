"use client";

import React, { useState, useEffect } from "react";
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
import {fetchMalvoyantUsers} from "@/app/api/users";

interface User {
  id: number;
  first_name: string;
  family_name: string;
  email: string;
}

export interface AddEnvCardProps {
  showValues: boolean;
  environmentInfo: {
    name: string;
    description: string;
    address: string;
    isPublic: boolean;
    userId: number | null;
  };
  setEnvironmentInfo: (info: {
    name: string;
    description: string;
    address: string;
    isPublic: boolean;
    userId: number | null;
  }) => void;
}

const AddEnvCard = ({
  showValues,
  environmentInfo,
  setEnvironmentInfo,
}: AddEnvCardProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Function to get the full name of a user by ID
  const getUserNameById = (userId: number | null) => {
    if (!userId) return "Aucun utilisateur sélectionné";
    const user = users.find((u) => u.id === userId);
    return user
      ? `${user.first_name} ${user.family_name}`
      : "Utilisateur inconnu";
  };
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto border-main-40 border">
      <Title text="Informations" lineLength="0" />
      {/* Nom */}
      <div className="mb-4 gap-2">
        <Label htmlFor="nom">Nom</Label>
        {showValues ? (
          <p className="mt-1 text-gray-700">{environmentInfo.name}</p>
        ) : (
          <Input
            id="nom"
            placeholder="Nom de l'environnement..."
            value={environmentInfo.name}
            onChange={(e) =>
              setEnvironmentInfo({ ...environmentInfo, name: e.target.value })
            }
          />
        )}
      </div>
      <div className="mb-4 gap-2">
        <Label htmlFor="nom">Description</Label>
        {showValues ? (
          <p className="mt-1 text-gray-700">{environmentInfo.description}</p>
        ) : (
          <Input
            id="description"
            placeholder="Description de l'environnement..."
            value={environmentInfo.description}
            onChange={(e) =>
              setEnvironmentInfo({
                ...environmentInfo,
                description: e.target.value,
              })
            }
          />
        )}
      </div>

      {/* Adresse */}
      <div className="mb-4">
        <Label htmlFor="adresse">Adresse</Label>
        {showValues ? (
          <p className="mt-1 text-gray-700">{environmentInfo.address}</p>
        ) : (
          <TextArea
            id="adresse"
            placeholder="Adresse de l'environnement"
            className="mt-1"
            value={environmentInfo.address}
            onChange={(e) =>
              setEnvironmentInfo({
                ...environmentInfo,
                address: e.target.value,
              })
            }
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
          <p className="mt-1 text-gray-700">Public</p>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Switch
            id="visibility"
            checked={environmentInfo.isPublic}
            onCheckedChange={(checked) =>
              setEnvironmentInfo({
                ...environmentInfo,
                isPublic: checked,
                userId: checked ? null : environmentInfo.userId,
              })
            }
          />
        </div>
      </div>

      {/* Utilisateur Dropdown (Visible only when visibility is private) */}
      {!environmentInfo.isPublic && (
        <div className="mb-4">
          <Label htmlFor="utilisateur">Utilisateur</Label>
          {showValues ? (
            <p className="mt-1 text-gray-700">
              {getUserNameById(environmentInfo.userId)}
            </p>
          ) : (
            <>
              {loading ? (
                <p className="mt-1 text-gray-700">
                  Chargement des utilisateurs...
                </p>
              ) : error ? (
                <p className="mt-1 text-red-500">Erreur: {error}</p>
              ) : (
                <Select
                  onValueChange={(value) =>
                    setEnvironmentInfo({
                      ...environmentInfo,
                      userId: value ? parseInt(value) : null,
                    })
                  }
                  value={environmentInfo.userId?.toString() || ""}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Sélectionnez un utilisateur" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id.toString()}>
                        {`${user.first_name} ${user.family_name}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
export default AddEnvCard;