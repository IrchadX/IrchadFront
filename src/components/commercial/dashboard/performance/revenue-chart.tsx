"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { fetchMonthlyRevenue } from "@/app/api/statistics";

const chartConfig = {
  revenue: {
    label: "Chiffre d'Affaires",
    color: "#3AAFA9",
  },
} satisfies ChartConfig;

export function AreaChartComponent() {
  const [chartData, setChartData] = useState<
    { month: string; revenue: number }[]
  >([]);
  const [growthRate, setGrowthRate] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentDate = new Date();
        const months: string[] = [];
        const revenues: number[] = [];

        for (let i = 5; i >= 0; i--) {
          const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - i,
            1
          );
          const monthName = date.toLocaleString("fr-FR", { month: "long" });
          const revenue = await fetchMonthlyRevenue(
            date.toISOString().split("T")[0]
          );
          months.push(monthName);
          revenues.push(revenue.totalRevenue);
        }

        const currentMonth = revenues[revenues.length - 1];
        const previousMonth = revenues[revenues.length - 2];
        const growth = ((currentMonth - previousMonth) / previousMonth) * 100;
        setGrowthRate(growth);

        setChartData(
          months.map((month, index) => ({
            month,
            revenue: revenues[index],
          }))
        );
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-gray-800 dark:text-white">
          Évolution du Chiffre d'Affaires
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Chiffre d'affaires total des 6 derniers mois
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12, top: 20, bottom: 10 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3AAFA9" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3AAFA9" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="#E5E7EB"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
              tick={{ fill: "#6B7280" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value / 1000}k DA`}
              tick={{ fill: "#6B7280" }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
              wrapperStyle={{
                backgroundColor: "white",
                borderColor: "#E5E7EB",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Area
              dataKey="revenue"
              type="natural"
              fill="url(#colorRevenue)"
              fillOpacity={0.6}
              stroke="#3AAFA9"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="border-t border-gray-200 dark:border-gray-700">
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none text-gray-800 dark:text-white">
              {growthRate >= 0 ? (
                <>
                  Hausse de {growthRate.toFixed(1)}% ce mois-ci
                  <TrendingUp className="h-4 w-4 text-green-500 dark:text-green-400" />
                </>
              ) : (
                <>
                  Baisse de {Math.abs(growthRate).toFixed(1)}% ce mois-ci
                  <TrendingDown className="h-4 w-4 text-red-500 dark:text-red-400" />
                </>
              )}
            </div>
            <div className="flex items-center gap-2 leading-none text-gray-500 dark:text-gray-400">
              {chartData.length > 0 &&
                `${chartData[0].month} - ${
                  chartData[chartData.length - 1].month
                } ${new Date().getFullYear()}`}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
