"use client";
import MetricsCards from "@/components/decideur/metrics_cards"; 
import Reports from "@/components/decideur/reports";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Rapports() {

  return (
    <div className="container mx-auto">      
      <MetricsCards /> 
      <Reports /> 
      
    </div>
  );
}