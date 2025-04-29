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

        // Fetch environments, device, and public pricing in parallel
        const [environments, device, public_pricing] = await Promise.all([
          fetchUserEnvironmentsWithPricing(userId).catch((err) => {
            if (err.message.includes("Aucun environnement trouvé")) {
              throw new Error("Aucun environnement trouvé pour cet utilisateur.");
            }
            throw new Error("Erreur lors de la récupération des environnements.");
          }),
          fetchUserDevice(userId).catch((err) => {
            throw new Error("Erreur lors de la récupération du dispositif de l'utilisateur.");
          }),
          fetchUserPublicEnvironmentsPricing(userId).catch((err) => {
            throw new Error("Erreur lors de la récupération des environnements publics.");
          }),
        ]);

        // Calculate total price
        const totalPrice = calculateTotalPrice(environments, device[0], public_pricing);

        // Map data to match the `OffreDetails` structure
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

        // Set total price
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

  if (loading) return <div>Chargement des détails de l'offre...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  if (!offerDetails) return <div>Aucun détail d'offre disponible.</div>;

  // Calculate total price of environments
  const totalEnvironnements = offerDetails.environnements.reduce(
    (sum, env) => sum + env.prix,
    0
  );

  // Format price with currency symbol
  const formatPrice = (price: number) => `${price.toFixed(2)} DA`;

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <Title text="Détails de l'offre" lineLength="100px" />
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Client information */}
        <div className="space-y-2">
          <h3 className="font-medium text-sm text-muted-foreground">
            Informations client
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Nom & Prénom</p>
              <p>{offerDetails.nomPrenom}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Date de vente</p>
              <p>{offerDetails.dateVente}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Dispositif */}
        <div className="space-y-2">
          <h3 className="font-medium text-sm text-muted-foreground">
            Dispositif
          </h3>
          <div className="flex justify-between">
            <p>{offerDetails.dispositif}</p>
            <p className="font-medium">
              {formatPrice(offerDetails.prixDispositif)}
            </p>
          </div>
        </div>

        <Separator />

        {/* Environnements */}
        <div className="space-y-4">
          <h3 className="font-medium text-sm text-muted-foreground">
            Environnements
          </h3>

          <div className="space-y-4">
            {offerDetails.environnements.map((env, index) => (
              <div key={index} className="bg-muted/40 p-3 rounded-md">
                <div className="flex justify-between mb-1">
                  <p className="font-medium">{env.nom}</p>
                  <p className="font-medium">{formatPrice(env.prix)}</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Adresse: {env.adresse}</p>
                  <p>Surface: {env.surface}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between pt-2">
            <p className="font-medium">Total des environnements</p>
            <p className="font-medium">{formatPrice(totalEnvironnements)}</p>
          </div>
        </div>

        <Separator />

        {/* Accès environnements publics */}
        <div className="flex justify-between items-center">
          <p className="font-medium">Accès aux environnements publics</p>
          <div>
            {offerDetails.accesEnvironnementsPublics !== 0 ? (
              <div className="flex items-center text-green-600">
                <Check className="h-5 w-5 mr-1" />
                <span>Oui</span>
              </div>
            ) : (
              <div className="flex items-center text-red-600">
                <X className="h-5 w-5 mr-1" />
                <span>Non</span>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Montant total */}
        <div className="flex justify-between items-center pt-2">
          <p className="font-semibold text-lg">Montant total</p>
          <p className="font-bold text-xl">
            {montantTotal !== null ? formatPrice(montantTotal) : "Chargement..."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}