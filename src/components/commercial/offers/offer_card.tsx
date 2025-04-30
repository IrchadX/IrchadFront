"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast"; // Import react-hot-toast

import { Button } from "@/components/shared/button";
import { DevisCard } from "./devis_card";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/shared/input";
import { Label } from "@/components/shared/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { fetchAvailableDevices } from "@/app/api/devices";
import { fetchUserByName } from "@/app/api/users";
import { estimateTotalPrice, createBasicEnvironment, updateDeviceUser, createPurchaseHistory } from "@/app/api/offers";

export function OfferCard() {
  const [environments, setEnvironments] = useState([{ id: 1, nom: "", type: "", surface: "", adresse: "" }]);
  const [devices, setDevices] = useState<{ id: number; type: string; softwareVersion: string; price: number }[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [firstName, setFirstName] = useState(""); // Separate state for first name
  const [lastName, setLastName] = useState(""); // Separate state for last name
  const [userError, setUserError] = useState("");
  const [totalPrice, setTotalPrice] = useState("00.00 DA");
  const [accessPublic, setAccessPublic] = useState(false);

  // Fetch devices when the component mounts
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
    const newId = environments.length > 0 ? Math.max(...environments.map((env) => env.id)) + 1 : 1;
    setEnvironments([...environments, { id: newId, nom: "", type: "", surface: "", adresse: "" }]);
  };

  const removeEnvironment = (id: number) => {
    setEnvironments(environments.filter((env) => env.id !== id));
  };

  const updateEnvironment = (id: number, field: string, value: string) => {
    setEnvironments(environments.map((env) => (env.id === id ? { ...env, [field]: value } : env)));
  };

  const handleSubmit = async () => {
    try {
      // Vérifiez qu'il y a au moins un environnement
      if (environments.length === 0) {
        toast.error("Veuillez saisir au moins un environnement.");
        return;
      }

      // Préparer les données pour le calcul du prix total
      const surfaces = environments.map((env) => ({ surface: parseFloat(env.surface) || 0 }));
      const selectedDeviceObject = devices.find((device) => device.id.toString() === selectedDevice);
      const devicePrice = selectedDeviceObject ? selectedDeviceObject.price : 0;

      // Calculer le prix total
      const total = await estimateTotalPrice(surfaces, accessPublic, { price: devicePrice });
      setTotalPrice(`${total} DA`);
      toast.success("Prix total estimé avec succès !");
      console.log("******************Total price:", total);
    } catch (error) {
      console.error("Error during submission:", error);
      toast.error("Erreur lors du calcul du prix total.");
    }
  };

  const handleConfirmOffer = async () => {
    try {
      // Vérifiez que les champs prénom et nom sont remplis
      if (!firstName || !lastName) {
        setUserError("Veuillez remplir le prénom et le nom.");
        toast.error("Veuillez remplir le prénom et le nom.");
        return;
      }
  
      // Vérifiez si l'utilisateur existe
      const user = await fetchUserByName(firstName, lastName);
      if (!user) {
        setUserError("Utilisateur introuvable ou non valide.");
        toast.error("Utilisateur introuvable ou non valide.");
        return;
      }
  
      setUserError(""); // Clear the error if the user exists
  
      const userId = user.id;
  
      // Vérifiez qu'il y a au moins un environnement
      if (environments.length === 0) {
        toast.error("Veuillez saisir au moins un environnement.");
        return;
      }
  
      // Confirm environments
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
  
      const results = await Promise.all(promises);
      console.log("Environments created successfully:", results);
      toast.success("Les environnements ont été créés avec succès !");
  
      if (selectedDevice) {
        await updateDeviceUser(Number(selectedDevice), userId);
        console.log(`Device ID ${selectedDevice} assigned to user ID ${userId}`);
        toast.success("Dispositif assigné avec succès !");
  
        // Create purchase history
        await createPurchaseHistory(userId, Number(selectedDevice), accessPublic);
        console.log("Purchase history created successfully.");
        toast.success("Historique d'achat créé avec succès !");
      }
  
      alert("Les environnements ont été confirmés avec succès !");
    } catch (error) {
      console.error("Error confirming the environments:", error);
      toast.error("Une erreur s'est produite lors de la confirmation des environnements.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Formulaire d'inscription</CardTitle>
          <CardDescription>Veuillez remplir tous les champs pour continuer.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="grid w-full items-center gap-6">
              {/* User Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="nom">Nom</Label>
                  <Input
                    id="nom"
                    placeholder="Votre nom"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="prenom">Prénom</Label>
                  <Input
                    id="prenom"
                    placeholder="Votre prénom"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
              </div>

              {/* Display User Error */}
              {userError && (
                <div className="text-red-500 text-sm mt-2">
                  {userError}
                </div>
              )}

              {/* Device Selection */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="dispositif">Dispositif</Label>
                <Select onValueChange={(value) => setSelectedDevice(value)}>
                  <SelectTrigger id="dispositif">
                    <SelectValue placeholder="Sélectionner un dispositif" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {devices.map((device) => (
                      <SelectItem key={device.id} value={device.id.toString()}>
                        {device.type} - {device.softwareVersion} - {device.price} DA
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Environments */}
              <div className="flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Environnements</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addEnvironment}
                    className="flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" /> Ajouter
                  </Button>
                </div>

                {environments.map((env) => (
                  <Card key={env.id} className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor={`env-nom-${env.id}`}>Nom</Label>
                        <Input
                          id={`env-nom-${env.id}`}
                          value={env.nom}
                          onChange={(e) => updateEnvironment(env.id, "nom", e.target.value)}
                          placeholder="Nom de l'environnement"
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor={`env-type-${env.id}`}>Description</Label>
                        <Input
                          id={`env-type-${env.id}`}
                          value={env.type}
                          onChange={(e) => updateEnvironment(env.id, "type", e.target.value)}
                          placeholder="Description de l'environnement"
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor={`env-surface-${env.id}`}>Surface</Label>
                        <Input
                          id={`env-surface-${env.id}`}
                          value={env.surface}
                          onChange={(e) => updateEnvironment(env.id, "surface", e.target.value)}
                          placeholder="Surface en m²"
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor={`env-adresse-${env.id}`}>Adresse</Label>
                        <Input
                          id={`env-adresse-${env.id}`}
                          value={env.adresse}
                          onChange={(e) => updateEnvironment(env.id, "adresse", e.target.value)}
                          placeholder="Adresse complète"
                        />
                      </div>
                    </div>
                    {environments.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeEnvironment(env.id)}
                        className="mt-2 ml-auto"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Supprimer cet environnement</span>
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
                  onCheckedChange={(checked) => setAccessPublic(checked === true)}
                />
                <Label htmlFor="acces-public">Autoriser l'accès aux environnements publics</Label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <Button
                type="submit"
                className="bg-black hover:bg-gray-700 text-white px-8 py-2 rounded-md"
              >
                Enregistrer
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Annuler</Button>
        </CardFooter>
      </Card>

      <DevisCard totalPrice={totalPrice} onConfirm={handleConfirmOffer} />
    </div>
  );
}