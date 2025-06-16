"use client";
import { TrendingUp } from "lucide-react";
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

interface DeviceSalesData {
  model: string;
  sales: number;
}

interface BarChartComponentProps {
  deviceSalesData: DeviceSalesData[];
}

// Couleurs vives qui fonctionnent bien en mode sombre et clair
const COLORS = [
  "#3AAFA9", // Teal vibrant (comme dans l'exemple area chart)
  "#FF6B6B", // Rouge corail vibrant
  "#4ECDC4", // Turquoise vibrant
  "#45B7D1", // Bleu vibrant
  "#96CEB4", // Vert menthe vibrant
  "#FFEAA7", // Jaune vibrant
  "#DDA0DD", // Violet vibrant
  "#FFB347", // Orange vibrant
];

// Configuration avec les couleurs personnalisées
const chartConfig = {
  ventes: {
    label: "Ventes",
    color: "#3AAFA9",
  },
} satisfies ChartConfig;

export function BarChartComponent({ deviceSalesData }: BarChartComponentProps) {
  const chartData = deviceSalesData.map((item) => ({
    modele: item.model,
    ventes: item.sales,
  }));

  // Trouver le modèle le plus vendu
  const bestSeller = chartData.reduce(
    (max, current) => (current.ventes > max.ventes ? current : max),
    chartData[0]
  );

  return (
    <Card className="h-[400px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <CardHeader className="py-4">
        <CardTitle className="text-lg text-gray-800 dark:text-white">
          Ventes par Modèle
        </CardTitle>
        <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
          Nombre de ventes par type de modèle
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
              {bestSeller && (
                <>
                  Le {bestSeller.modele} est le plus vendu avec{" "}
                  {bestSeller.ventes} unités{" "}
                  <TrendingUp className="h-4 w-4 text-green-500 dark:text-green-400" />
                </>
              )}
            </div>
            <div className="leading-none text-gray-500 dark:text-gray-400 text-xs">
              Affichage du total des ventes par modèle
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
