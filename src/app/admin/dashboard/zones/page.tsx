import { HorizontalMenu } from "@/components/commercial/dashboard/horizontal-menu";
import { BarChartComponent } from "@/components/commercial/dashboard/zones/sales-zone-chart";
import { MarketPenetrationComponent } from "@/components/commercial/dashboard/zones/market-penetration-chart";
import { PieChartComponent } from "@/components/commercial/dashboard/zones/dev-potential-chart";

export default function ZonesPage() {
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
    </div>
  );
}
