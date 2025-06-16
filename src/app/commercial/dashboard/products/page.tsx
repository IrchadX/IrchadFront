"use client";

import { HorizontalMenu } from "@/components/commercial/dashboard/horizontal-menu";
import { Package } from "lucide-react";
import { KpiCard } from "@/components/shared/kpi-card";
import { BarChartComponent } from "@/components/commercial/dashboard/products/sales-type-chart";
import { ProductsTableComponent } from "@/components/commercial/dashboard/products/top-sales-table";
import { useEffect, useState } from "react";
import {
  fetchMonthlyProductsSold,
  fetchSalesByDeviceType,
} from "@/app/api/statistics";
import { useLanguage } from "@/hooks/use-language";

export default function ProductsPage() {
  const [productsData, setProductsData] = useState<any>(null);
  const [deviceSalesData, setDeviceSalesData] = useState<any[]>([]);
  const [period, setPeriod] = useState<string>("");
  const { settings } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      try {
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

        const [products, deviceSales] = await Promise.all([
          fetchMonthlyProductsSold(dateString),
          fetchSalesByDeviceType(),
        ]);

        setProductsData(products);
        setDeviceSalesData(deviceSales);
      } catch (error) {
        console.error("Error fetching products data:", error);
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
      {/* Menu Horizontal */}
      <div className="flex justify-between items-center">
        <HorizontalMenu />
        {period && (
          <div className="text-sm text-muted-foreground">
            Données pour {period}
          </div>
        )}
      </div>

      {/* Section KPI */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Produits vendus"
          value={
            productsData
              ? productsData.totalProducts.toString()
              : "Chargement..."
          }
          icon={Package}
          iconColor="#16DBCC"
          color="#DCFAF8"
        />
      </div>

      {/* Section Graphiques et Tableau */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Bar Chart */}
        <div className="flex flex-col bg-white dark:bg-black shadow-md rounded-lg p-4">
          <BarChartComponent deviceSalesData={deviceSalesData} />
        </div>

        {/* Products Table */}
        <div className="flex flex-col bg-white  dark:bg-black  shadow-md rounded-lg p-4">
          <ProductsTableComponent deviceSalesData={deviceSalesData} />
        </div>
      </div>
    </div>
  );
}
