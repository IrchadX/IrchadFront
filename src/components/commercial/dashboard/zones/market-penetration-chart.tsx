"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { fetchMarketPenetration } from "@/app/api/statistics"

interface RegionData {
  region: string;
  penetration: number;
  totalCustomers: number;
  potentialMarket: number;
}

export function MarketPenetrationComponent() {
  const [regions, setRegions] = useState<RegionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        const dateString = lastMonth.toISOString().split('T')[0];

        //const data = await fetchMarketPenetration(dateString);
        const data = await fetchMarketPenetration("2025-04-01"); //just for testing since the current month doesn't have any sales

        setRegions(data);
      } catch (error) {
        console.error("Error fetching market penetration data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <Card className="bg-white shadow-sm rounded-lg overflow-hidden">
        <CardHeader className="pb-2 pt-6 px-6 border-b border-gray-100">
          <CardTitle className="text-xl font-medium text-gray-800">Pénétration du marché par région</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">Chargement des données...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white shadow-sm rounded-lg overflow-hidden">
      <CardHeader className="pb-2 pt-6 px-6 border-b border-gray-100">
        <CardTitle className="text-xl font-medium text-gray-800">Pénétration du marché par région</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-5">
        {regions.map((region, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="w-20 text-gray-500 font-medium">{region.region}</div>
            <div className="flex-1">
              <Progress value={region.penetration} className="h-2 bg-gray-100"/>
            </div>
            <div className="w-24 text-right">
              <div className="text-gray-500 font-medium">{region.penetration}%</div>
              <div className="text-xs text-gray-400">
                {region.totalCustomers.toLocaleString()} / {region.potentialMarket.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
