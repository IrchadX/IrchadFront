import KpiCards from "@/components/decideur/kpi_cards";
import StatsCharts from "@/components/decideur/graphes";

export default function DashboardPage() {
  return (
    <div className="container mx-auto">
      <KpiCards />
      <StatsCharts />
    </div>
  );
}
