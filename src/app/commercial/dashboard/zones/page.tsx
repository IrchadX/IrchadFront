import { HorizontalMenu } from "@/components/commercial/dashboard/horizontal-menu";
import {BarChartComponent} from "@/components/commercial/dashboard/zones/sales-zone-chart";
import {MarketPenetrationComponent} from "@/components/commercial/dashboard/zones/market-penetration-chart";
import {PieChartComponent} from "@/components/commercial/dashboard/zones/dev-potential-chart";

export default function ZonesPage() {
  return (
    <div className="container mx-auto p-4 flex flex-col gap-8">
      <div className="flex justify-start">
        <HorizontalMenu />
      </div>

      <div className="w-full flex flex-row gap-16 md:grid-cols-2 lg:grid-cols-4">
        {/* Bar Chart */}
        <div className="w-full flex flex-col gap-12">
          <div className="bg-white shadow-md rounded-lg p-4">
          <BarChartComponent />
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
          <PieChartComponent />
          </div>
        </div>

        {/* Market penetration component */}
        <div className="w-full flex flex-col bg-white shadow-md rounded-lg p-4">
          <div className="bg-white shadow-md rounded-lg p-4">
          <MarketPenetrationComponent />
          </div>
        </div>
      </div>
    </div>
  );
}