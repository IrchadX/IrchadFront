"use client";

import { HorizontalMenu } from "@/components/commercial/dashboard/horizontal-menu";
import { BarChartComponent } from "@/components/commercial/dashboard/zones/sales-zone-chart";
import { MarketPenetrationComponent } from "@/components/commercial/dashboard/zones/market-penetration-chart";
import { PieChartComponent } from "@/components/commercial/dashboard/zones/dev-potential-chart";
import { useEffect } from "react";
import { useLanguage } from "@/hooks/use-language";

export default function ZonesPage() {
  const { settings } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Les composants de graphiques gèrent leur propre chargement de données
        // Nous pouvons ajouter ici d'autres appels API si nécessaire
      } catch (error) {
        console.error("Error fetching zones data:", error);
      }
    };

    fetchData();

    // Add auto-refresh if enabled
    let intervalId: NodeJS.Timeout;
    if (settings.autoRefreshInterval > 0) {
      intervalId = setInterval(fetchData, settings.autoRefreshInterval * 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [settings.autoRefreshInterval]);

  return (
    <div className="container mx-auto p-4 flex flex-col gap-8">
      <div className="flex justify-start">
        <HorizontalMenu />
      </div>

      {/* Two column grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart Section */}
        <div className="bg-white  dark:bg-gray-900 justify-center items-center flex shadow-md rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <BarChartComponent />
        </div>

        {/* Market Penetration Section */}
        <div className="bg-white  dark:bg-gray-900 justify-center items-center flex shadow-md rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <MarketPenetrationComponent />
        </div>
      </div>

      {/* Full width section for development potential chart if needed */}
      <div className="bg-white  dark:bg-gray-900 shadow-md rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <PieChartComponent />
      </div>
    </div>
  );
}
