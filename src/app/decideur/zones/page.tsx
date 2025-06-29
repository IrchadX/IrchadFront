"use client";
import Heatmap from "@/components/decideur/heatmap";
import Alerts from "@/components/decideur/alertes";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Zones() {
  return (
    <div className="w-full container mx-auto flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6 p-6">
      <Alerts />
      <Heatmap />
    </div>
  );
}
