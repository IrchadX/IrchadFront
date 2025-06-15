"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/shared/button";
import { DevisCard } from "./devis_card";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/shared/input";
import { Label } from "@/components/shared/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { fetchAvailableDevices } from "@/app/api/devices";
import { fetchUserByName } from "@/app/api/users";
import {
  estimateTotalPrice,
  createBasicEnvironment,
  updateDeviceUser,
  createPurchaseHistory,
} from "@/app/api/offers";

export function OfferCard() {
  const [environments, setEnvironments] = useState([
    { id: 1, nom: "", type: "", surface: "", adresse: "" },
  ]);
  const [devices, setDevices] = useState<
    { id: number; type: string; softwareVersion: string; price: number }[]
  >([]);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userError, setUserError] = useState("");
  const [totalPrice, setTotalPrice] = useState("00.00 DA");
  const [accessPublic, setAccessPublic] = useState(false);

  useEffect(() => {
    const loadDevices = async () => {
      try {
        const availableDevices = await fetchAvailableDevices();
        setDevices(availableDevices);
      } catch (error) {
        console.error("Error fetching devices:", error);
        toast.error("Erreur lors du chargement des dispositifs.");
      }
    };

    loadDevices();
  }, []);

  const addEnvironment = () => {
    const newId =
      environments.length > 0
        ? Math.max(...environments.map((env) => env.id)) + 1
        : 1;
    setEnvironments([
      ...environments,
      { id: newId, nom: "", type: "", surface: "", adresse: "" },
    ]);
  };

  const removeEnvironment = (id: number) => {
    setEnvironments(environments.filter((env) => env.id !== id));
  };

  const updateEnvironment = (id: number, field: string, value: string) => {
    setEnvironments(
      environments.map((env) =>
        env.id === id ? { ...env, [field]: value } : env
      )
    );
  };

  const handleSubmit = async () => {
    try {
      if (environments.length === 0) {
        toast.error("Veuillez saisir au moins un environnement.");
        return;
      }

      const surfaces = environments.map((env) => ({
        surface: parseFloat(env.surface) || 0,
      }));
      const selectedDeviceObject = devices.find(
        (device) => device.id.toString() === selectedDevice
      );
      const devicePrice = selectedDeviceObject ? selectedDeviceObject.price : 0;

      const total = await estimateTotalPrice(surfaces, accessPublic, {
        price: devicePrice,
      });
      setTotalPrice(`${total} DA`);
      toast.success("Prix total estimé avec succès !");
    } catch (error) {
      console.error("Error during submission:", error);
      toast.error("Erreur lors du calcul du prix total.");
    }
  };

  const handleConfirmOffer = async () => {
    try {
      if (!firstName || !lastName) {
        setUserError("Veuillez remplir le prénom et le nom.");
        toast.error("Veuillez remplir le prénom et le nom.");
        return;
      }

      const user = await fetchUserByName(firstName, lastName);
      if (!user) {
        setUserError("Utilisateur introuvable ou non valide.");
        toast.error("Utilisateur introuvable ou non valide.");
        return;
      }

      setUserError("");
      const userId = user.id;

      if (environments.length === 0) {
        toast.error("Veuillez saisir au moins un environnement.");
        return;
      }

      const promises = environments.map(async (env) => {
        return await createBasicEnvironment(
          env.nom || "Nom par défaut",
          env.type || "Description par défaut",
          env.adresse || "Adresse par défaut",
          userId,
          false,
          parseFloat(env.surface) || 0
        );
      });

      await Promise.all(promises);
      toast.success("Les environnements ont été créés avec succès !");

      if (selectedDevice) {
        await updateDeviceUser(Number(selectedDevice), userId);
        toast.success("Dispositif assigné avec succès !");
        await createPurchaseHistory(
          userId,
          Number(selectedDevice),
          accessPublic
        );
        toast.success("Historique d'achat créé avec succès !");
      }

      alert("Les environnements ont été confirmés avec succès !");
    } catch (error) {
      console.error("Error confirming the environments:", error);
      toast.error(
        "Une erreur s'est produite lors de la confirmation des environnements."
      );
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <Card className="w-full max-w-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
        <CardHeader className="border-b border-gray-200 dark:border-gray-700">
          <CardTitle className="text-black dark:text-white">
            Formulaire d'inscription
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Veuillez remplir tous les champs pour continuer.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}>
            <div className="grid w-full items-center gap-6">
              {/* User Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label
                    htmlFor="nom"
                    className="text-gray-700 dark:text-gray-300">
                    Nom
                  </Label>
                  <Input
                    id="nom"
                    placeholder="Votre nom"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-black dark:text-white"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label
                    htmlFor="prenom"
                    className="text-gray-700 dark:text-gray-300">
                    Prénom
                  </Label>
                  <Input
                    id="prenom"
                    placeholder="Votre prénom"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-black dark:text-white"
                  />
                </div>
              </div>

              {userError && (
                <div className="text-red-500 dark:text-red-400 text-sm mt-2">
                  {userError}
                </div>
              )}

              {/* Device Selection */}
              <div className="flex flex-col space-y-1.5">
                <Label
                  htmlFor="dispositif"
                  className="text-gray-700 dark:text-gray-300">
                  Dispositif
                </Label>
                <Select onValueChange={(value) => setSelectedDevice(value)}>
                  <SelectTrigger
                    id="dispositif"
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-black dark:text-white">
                    <SelectValue placeholder="Sélectionner un dispositif" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                    {devices.map((device) => (
                      <SelectItem
                        key={device.id}
                        value={device.id.toString()}
                        className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        {device.type} - {device.softwareVersion} -{" "}
                        {device.price} DA
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Environments */}
              <div className="flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-gray-700 dark:text-gray-300">
                    Environnements
                  </Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addEnvironment}
                    className="flex items-center gap-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
                    <Plus className="h-4 w-4" /> Ajouter
                  </Button>
                </div>

                {environments.map((env) => (
                  <Card
                    key={env.id}
                    className="p-4 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label
                          htmlFor={`env-nom-${env.id}`}
                          className="text-gray-700 dark:text-gray-300">
                          Nom
                        </Label>
                        <Input
                          id={`env-nom-${env.id}`}
                          value={env.nom}
                          onChange={(e) =>
                            updateEnvironment(env.id, "nom", e.target.value)
                          }
                          placeholder="Nom de l'environnement"
                          className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-black dark:text-white"
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label
                          htmlFor={`env-type-${env.id}`}
                          className="text-gray-700 dark:text-gray-300">
                          Description
                        </Label>
                        <Input
                          id={`env-type-${env.id}`}
                          value={env.type}
                          onChange={(e) =>
                            updateEnvironment(env.id, "type", e.target.value)
                          }
                          placeholder="Description de l'environnement"
                          className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-black dark:text-white"
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label
                          htmlFor={`env-surface-${env.id}`}
                          className="text-gray-700 dark:text-gray-300">
                          Surface
                        </Label>
                        <Input
                          id={`env-surface-${env.id}`}
                          value={env.surface}
                          onChange={(e) =>
                            updateEnvironment(env.id, "surface", e.target.value)
                          }
                          placeholder="Surface en m²"
                          className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-black dark:text-white"
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label
                          htmlFor={`env-adresse-${env.id}`}
                          className="text-gray-700 dark:text-gray-300">
                          Adresse
                        </Label>
                        <Input
                          id={`env-adresse-${env.id}`}
                          value={env.adresse}
                          onChange={(e) =>
                            updateEnvironment(env.id, "adresse", e.target.value)
                          }
                          placeholder="Adresse complète"
                          className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-black dark:text-white"
                        />
                      </div>
                    </div>
                    {environments.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeEnvironment(env.id)}
                        className="mt-2 ml-auto text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">
                          Supprimer cet environnement
                        </span>
                      </Button>
                    )}
                  </Card>
                ))}
              </div>

              {/* Public Access Checkbox */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="acces-public"
                  checked={accessPublic}
                  onCheckedChange={(checked) =>
                    setAccessPublic(checked === true)
                  }
                  className="border-gray-300 dark:border-gray-600"
                />
                <Label
                  htmlFor="acces-public"
                  className="text-gray-700 dark:text-gray-300">
                  Autoriser l'accès aux environnements publics
                </Label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <Button
                type="submit"
                className="bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black px-8 py-2 rounded-md">
                Enregistrer
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex justify-between border-t border-gray-200 dark:border-gray-700 p-6">
          <Button
            variant="outline"
            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
            Annuler
          </Button>
        </CardFooter>
      </Card>

      <DevisCard totalPrice={totalPrice} onConfirm={handleConfirmOffer} />
    </div>
  );
}
