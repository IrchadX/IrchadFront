import { HorizontalMenu } from "@/components/commercial/dashboard/horizontal-menu";
import { KpiCard } from "@/components/shared/kpi-card";
import { BriefcaseBusiness, CircleDollarSign, ChartNoAxesCombined} from "lucide-react"

export default function PerformancePage() {
  return (
    <div className="container mx-auto p-4 flex flex-col justify-start items-start gap-6">
        <HorizontalMenu />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <KpiCard title="Marge brute" value="$50,000" icon={BriefcaseBusiness} iconColor="#FFBB38" color="#FFF5D9" />
            <KpiCard title="Marge nette" value="$34,000" icon={CircleDollarSign} iconColor="#16DBCC" color="#DCFAF8" />
            <KpiCard title="Marge brute" value="$50,000" icon={ChartNoAxesCombined} iconColor="#FF82AC" color="#FFE0EB" />
        </div>
    </div>
    
  );
}