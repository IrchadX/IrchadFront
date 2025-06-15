"use client";

import { OfferCard } from "@/components/commercial/offers/offer_card";
import Title from "@/components/shared/title";
import { DevisCard } from "@/components/commercial/offers/devis_card";

export default function OffersPage() {
  return (
    <div className="container mx-auto py-10">
      <Title text="Obtenir un devis" lineLength="100px" />
      <div className="flex flex-col md:flex-row gap-6 mx-auto">
        <div className="flex-1 items-center justify-center">
          <OfferCard />
        </div>
      </div>
    </div>
  );
}
