"use client";

import { useSearchParams } from "next/navigation";
import { OfferDetailsCard } from "@/components/commercial/sales/sale_details";

export default function SaleDetailsPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("user_id");
  const firstName = searchParams.get("first_name");
  const lastName = searchParams.get("last_name");
  const saleDate = searchParams.get("sale_date");

  // Ensure userId is defined and valid
  if (!userId || Array.isArray(userId)) {
    return <div>Invalid user ID</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <OfferDetailsCard
        userId={parseInt(userId, 10)}
        firstName={firstName || "N/A"}
        lastName={lastName || "N/A"}
        saleDate={saleDate || "N/A"}
      />
    </div>
  );
}