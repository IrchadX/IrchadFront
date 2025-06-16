"use client";

import { TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts";

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
import { fetchSalesByRegion } from "@/app/api/statistics";

// Couleurs vives qui fonctionnent bien en mode sombre et clair
const COLORS = [
  "#3AAFA9", // Teal vibrant
  "#FF6B6B", // Rouge corail vibrant
  "#4ECDC4", // Turquoise vibrant
  "#45B7D1", // Bleu vibrant
  "#96CEB4", // Vert menthe vibrant
  "#FFEAA7", // Jaune vibrant
];

// Configuration avec les couleurs personnalisées
const chartConfig = {
  ventes: {
    label: "Ventes",
    color: "#3AAFA9",
  },
} satisfies ChartConfig;

export function BarChartComponent() {
  const [chartData, setChartData] = useState<
    { modele: string; ventes: number }[]
  >([]);
  const [bestRegion, setBestRegion] = useState<{
    modele: string;
    ventes: number;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesData = await fetchSalesByRegion();
        const formattedData = salesData.map((item: any) => ({
          modele: item.city,
          ventes: item.sales,
        }));

        // Trouver la région avec le plus de ventes
        const best = formattedData.reduce(
          (max: any, current: any) =>
            current.ventes > max.ventes ? current : max,
          formattedData[0]
        );

        setBestRegion(best);
        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching sales by region:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card className="h-[400px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <CardHeader className="py-4">
        <CardTitle className="text-lg text-gray-800 dark:text-white">
          Ventes par Région
        </CardTitle>
        <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
          Nombre de ventes par région géographique
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[250px]">
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData} barCategoryGap={20}>
            <CartesianGrid
              vertical={false}
              stroke="#E5E7EB"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="modele"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fill: "#6B7280" }}
            />
            <YAxis hide />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value) => [`${value} unités`, "Ventes"]}
                />
              }
              wrapperStyle={{
                backgroundColor: "white",
                borderColor: "#E5E7EB",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Bar dataKey="ventes" radius={8} barSize={50}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="py-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-1">
            <div className="flex gap-2 font-medium leading-none text-gray-800 dark:text-white">
              {bestRegion && (
                <>
                  {bestRegion.modele} est la région avec le plus de ventes (
                  {bestRegion.ventes} unités){" "}
                  <TrendingUp className="h-4 w-4 text-green-500 dark:text-green-400" />
                </>
              )}
            </div>
            <div className="leading-none text-gray-500 dark:text-gray-400 text-xs">
              Affichage du total des ventes par région
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
