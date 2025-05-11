import { HorizontalMenu } from "@/components/commercial/dashboard/horizontal-menu";
import { KpiCard } from "@/components/shared/kpi-card";
import { BriefcaseBusiness, CircleDollarSign, ChartNoAxesCombined } from "lucide-react";
import { AreaChartComponent } from "@/components/commercial/dashboard/performance/revenue-chart";
import { LineChartComponent } from "@/components/commercial/dashboard/performance/sales-periode-chart";
import { PieChartComponent } from "@/components/commercial/dashboard/performance/sales-cycle-chart";

export default function PerformancePage() {
  return (
    <div className="container mx-auto p-4 flex flex-col gap-8">
      <div className="flex justify-start">
        <HorizontalMenu />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Marge brute"
          value="$50,000"
          icon={BriefcaseBusiness}
          iconColor="#FFBB38"
          color="#FFF5D9"
        />
        <KpiCard
          title="Marge nette"
          value="$34,000"
          icon={CircleDollarSign}
          iconColor="#16DBCC"
          color="#DCFAF8"
        />
        <KpiCard
          title="Taux de conversion"
          value="43%"
          icon={ChartNoAxesCombined}
          iconColor="#FF82AC"
          color="#FFE0EB"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AreaChartComponent />
        </div>
        <div>
          <PieChartComponent />
        </div>
      </div>
      <div>
        <LineChartComponent />
      </div>
    </div>
  );
}