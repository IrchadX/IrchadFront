"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import KpiCards from "@/components/decideur/kpi_cards";
import StatsCharts from "@/components/decideur/graphes";

export default function DashboardPage() {
  const router = useRouter();

 /* useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      router.push("/login");
    }
  }, [router]);*/

  return (
    <div className="container mx-auto">
      <KpiCards />
      <StatsCharts />
    </div>
  );
}
