import { HorizontalMenu } from "@/components/commercial/dashboard/horizontal-menu";
import { BriefcaseBusiness, CircleDollarSign } from "lucide-react";
import { KpiCard } from "@/components/shared/kpi-card";
import { BarChartComponent } from "@/components/commercial/dashboard/products/sales-type-chart";
import { ProductsTableComponent } from "@/components/commercial/dashboard/products/top-sales-table";

export default function ProductsPage() {
  return (
    <div className="container mx-auto p-4 flex flex-col gap-8">
      {/* Menu Horizontal */}
      <div className="flex justify-start">
        <HorizontalMenu />
      </div>

      {/* Section KPI */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Produits vendus"
          value="50,000"
          icon={BriefcaseBusiness}
          iconColor="#FFBB38"
          color="#FFF5D9"
        />
        <KpiCard
          title="Taux d'attachement"
          value="20%"
          icon={CircleDollarSign}
          iconColor="#FF82AC"
          color="#FFE0EB"
        />
      </div>

      {/* Section Graphiques et Tableau */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Bar Chart */}
        <div className="flex flex-col bg-white shadow-md rounded-lg p-4">
          <BarChartComponent />
        </div>

        {/* Products Table */}
        <div className="flex flex-col bg-white shadow-md rounded-lg p-4">
          <ProductsTableComponent />
        </div>
      </div>
    </div>
  );
}