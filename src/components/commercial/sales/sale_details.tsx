"use client";

import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Title from "@/components/shared/title";
import {
  fetchUserEnvironmentsWithPricing,
  fetchUserDevice,
  fetchUserPublicEnvironmentsPricing,
  calculateTotalPrice,
} from "@/app/api/offers";

interface Environnement {
  nom: string;
  adresse: string;
  surface: string;
  prix: number;
}

interface OffreDetails {
  nomPrenom: string;
  dateVente: string;
  dispositif: string;
  prixDispositif: number;
  environnements: Environnement[];
  accesEnvironnementsPublics: number;
}

export function OfferDetailsCard({
  userId,
  firstName,
  lastName,
  saleDate,
}: {
  userId: number;
  firstName: string;
  lastName: string;
  saleDate: string;
}) {
  const [offerDetails, setOfferDetails] = useState<OffreDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [montantTotal, setMontantTotal] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadOfferDetails() {
      try {
        setLoading(true);
        setError(null);

        const [environments, device, public_pricing] = await Promise.all([
          fetchUserEnvironmentsWithPricing(userId).catch((err) => {
            if (err.message.includes("Aucun environnement trouvé")) {
              throw new Error(
                "Aucun environnement trouvé pour cet utilisateur."
              );
            }
            throw new Error(
              "Erreur lors de la récupération des environnements."
            );
          }),
          fetchUserDevice(userId).catch((err) => {
            throw new Error(
              "Erreur lors de la récupération du dispositif de l'utilisateur."
            );
          }),
          fetchUserPublicEnvironmentsPricing(userId).catch((err) => {
            throw new Error(
              "Erreur lors de la récupération des environnements publics."
            );
          }),
        ]);

        const totalPrice = calculateTotalPrice(
          environments,
          device[0],
          public_pricing
        );

        const mappedDetails: OffreDetails = {
          nomPrenom: `${firstName} ${lastName}`,
          dateVente: saleDate || "N/A",
          dispositif: device[0]?.device_type?.type || "N/A",
          prixDispositif: device[0]?.price || 0,
          environnements: environments.map((env: any) => ({
            nom: env.name,
            adresse: env.address,
            surface: `${env.surface} m²`,
            prix: parseFloat(env.price),
          })),
          accesEnvironnementsPublics: public_pricing,
        };

        setOfferDetails(mappedDetails);
        setMontantTotal(totalPrice);
      } catch (err: any) {
        console.error("Error loading offer details:", err);
        setError(err.message || "Une erreur inattendue s'est produite.");
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      loadOfferDetails();
    }
  }, [userId]);

  if (loading)
    return (
      <div className="text-black dark:text-white p-4">
        Chargement des détails de l'offre...
      </div>
    );

  if (error)
    return <div className="text-red-500 dark:text-red-400 p-4">{error}</div>;

  if (!offerDetails)
    return (
      <div className="text-black dark:text-white p-4">
        Aucun détail d'offre disponible.
      </div>
    );

  const totalEnvironnements = offerDetails.environnements.reduce(
    (sum, env) => sum + env.prix,
    0
  );

  const formatPrice = (price: number) => `${price.toFixed(2)} DA`;

  return (
    <Card className=" mx-auto w-full max-w-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
      <CardHeader className="border-b border-gray-200 dark:border-gray-700">
        <Title text="Détails de l'offre" lineLength="100px" />
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        {/* Client information */}
        <div className="space-y-2">
          <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400">
            Informations client
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Nom & Prénom
              </p>
              <p className="text-black dark:text-white">
                {offerDetails.nomPrenom}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Date de vente
              </p>
              <p className="text-black dark:text-white">
                {offerDetails.dateVente}
              </p>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-200 dark:bg-gray-700" />

        {/* Dispositif */}
        <div className="space-y-2">
          <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400">
            Dispositif
          </h3>
          <div className="flex justify-between">
            <p className="text-black dark:text-white">
              {offerDetails.dispositif}
            </p>
            <p className="font-medium text-black dark:text-white">
              {formatPrice(offerDetails.prixDispositif)}
            </p>
          </div>
        </div>

        <Separator className="bg-gray-200 dark:bg-gray-700" />

        {/* Environnements */}
        <div className="space-y-4">
          <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400">
            Environnements
          </h3>

          <div className="space-y-4">
            {offerDetails.environnements.map((env, index) => (
              <div
                key={index}
                className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between mb-1">
                  <p className="font-medium text-black dark:text-white">
                    {env.nom}
                  </p>
                  <p className="font-medium text-black dark:text-white">
                    {formatPrice(env.prix)}
                  </p>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p>Adresse: {env.adresse}</p>
                  <p>Surface: {env.surface}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between pt-2">
            <p className="font-medium text-gray-700 dark:text-gray-300">
              Total des environnements
            </p>
            <p className="font-medium text-black dark:text-white">
              {formatPrice(totalEnvironnements)}
            </p>
          </div>
        </div>

        <Separator className="bg-gray-200 dark:bg-gray-700" />

        {/* Accès environnements publics */}
        <div className="flex justify-between items-center">
          <p className="font-medium text-gray-700 dark:text-gray-300">
            Accès aux environnements publics
          </p>
          <div>
            {offerDetails.accesEnvironnementsPublics !== 0 ? (
              <div className="flex items-center text-green-600 dark:text-green-400">
                <Check className="h-5 w-5 mr-1" />
                <span>Oui</span>
              </div>
            ) : (
              <div className="flex items-center text-red-600 dark:text-red-400">
                <X className="h-5 w-5 mr-1" />
                <span>Non</span>
              </div>
            )}
          </div>
        </div>

        <Separator className="bg-gray-200 dark:bg-gray-700" />

        {/* Montant total */}
        <div className="flex justify-between items-center pt-2">
          <p className="font-semibold text-lg text-gray-800 dark:text-gray-200">
            Montant total
          </p>
          <p className="font-bold text-xl text-black dark:text-white">
            {montantTotal !== null
              ? formatPrice(montantTotal)
              : "Chargement..."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
