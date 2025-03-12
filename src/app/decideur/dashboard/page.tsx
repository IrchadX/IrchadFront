import KpiCards from "@/components/decideur/kpi_cards";

export default function DashboardPage() {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">Tableau de bord</h1>
      
      <KpiCards />
      
    </div>
  );
}