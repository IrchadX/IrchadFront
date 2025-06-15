"use client";

import { HorizontalMenu } from "@/components/commercial/dashboard/horizontal-menu";
import { KpiCard } from "@/components/shared/kpi-card";
import LoadingSpinner from "@/components/shared/loading";
import { TrendingUp, TrendingDown, DollarSign, Receipt } from "lucide-react";
import { AreaChartComponent } from "@/components/commercial/dashboard/performance/revenue-chart";
import { LineChartComponent } from "@/components/commercial/dashboard/performance/sales-periode-chart";
import { PieChartComponent } from "@/components/commercial/dashboard/performance/sales-cycle-chart";
import { useEffect, useState } from "react";
import { fetchGrossMargin, fetchNetMargin } from "@/app/api/statistics";

export default function PerformancePage() {
  const [grossMarginData, setGrossMarginData] = useState<any>(null);
  const [netMarginData, setNetMarginData] = useState<any>(null);
  const [period, setPeriod] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Obtenir la date du mois dernier
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        const dateString = lastMonth.toISOString().split("T")[0];

        // Formater la période pour l'affichage
        const periodText = lastMonth.toLocaleDateString("fr-DZ", {
          month: "long",
          year: "numeric",
        });
        setPeriod(periodText);

        const [grossMargin, netMargin] = await Promise.all([
          fetchGrossMargin(dateString),
          fetchNetMargin(dateString),
        ]);

        setGrossMarginData(grossMargin);
        setNetMarginData(netMargin);
      } catch (error) {
        console.error("Error fetching margin data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fonction pour formater les montants en dinars algériens
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-DZ", {
      style: "currency",
      currency: "DZD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Afficher le spinner de chargement pendant que les données sont récupérées
  if (isLoading) {
    return (
      <div className="container mx-auto p-4 flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <HorizontalMenu />
        </div>
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <HorizontalMenu />
        {period && (
          <div className="text-sm text-muted-foreground">
            Données pour {period}
          </div>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Marge brute"
          value={
            grossMarginData
              ? formatCurrency(grossMarginData.grossMargin)
              : "Chargement..."
          }
          icon={TrendingUp}
          iconColor="#16DBCC"
          color="#DCFAF8"
        />
        <KpiCard
          title="Marge nette"
          value={
            netMarginData
              ? `${netMarginData.netMarginPercentage.toFixed(1)}%`
              : "Chargement..."
          }
          icon={DollarSign}
          iconColor="#FFBB38"
          color="#FFF5D9"
        />
        <KpiCard
          title="Coût de ventes"
          value={
            grossMarginData
              ? formatCurrency(grossMarginData.cogs)
              : "Chargement..."
          }
          icon={TrendingDown}
          iconColor="#FF82AC"
          color="#FFE0EB"
        />
        <KpiCard
          title="Charges"
          value={
            netMarginData
              ? formatCurrency(netMarginData.expenses)
              : "Chargement..."
          }
          icon={Receipt}
          iconColor="#9F9FF8"
          color="#F0F0FF"
        />
      </div>

      <div>
        <AreaChartComponent />
      </div>
      <div>
        <LineChartComponent />
      </div>
    </div>
  );
}
