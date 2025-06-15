// Pie Chart Component
"use client";
import { Pie, PieChart, Cell } from "recharts";

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

const chartData = [
  { category: "Zone Nord", percentage: 35, fill: "#3AAFA9" },
  { category: "Zone Sud", percentage: 30, fill: "#FF6B6B" },
  { category: "Zone Est", percentage: 20, fill: "#4ECDC4" },
  { category: "Zone Ouest", percentage: 15, fill: "#45B7D1" },
];

const VIVID_COLORS = ["#3AAFA9", "#FF6B6B", "#4ECDC4", "#45B7D1"];

const chartConfig = {
  percentage: {
    label: "Pourcentage",
  },
  "zone-nord": {
    label: "Zone Nord",
    color: "#3AAFA9",
  },
  "zone-sud": {
    label: "Zone Sud",
    color: "#FF6B6B",
  },
  "zone-est": {
    label: "Zone Est",
    color: "#4ECDC4",
  },
  "zone-ouest": {
    label: "Zone Ouest",
    color: "#45B7D1",
  },
} satisfies ChartConfig;

export function PieChartComponent() {
  return (
    <Card className="flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-gray-800 dark:text-white">
          Potentiel de développement par région
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Potentiel de développement
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] pb-0">
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent />}
              wrapperStyle={{
                backgroundColor: "white",
                borderColor: "#E5E7EB",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Pie
              data={chartData}
              dataKey="percentage"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ percentage }) => `${percentage}%`}
              labelLine={false}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={VIVID_COLORS[index % VIVID_COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="leading-none text-gray-500 dark:text-gray-400">
          Affichage du potentiel de développement moyen
        </div>
      </CardFooter>
    </Card>
  );
}
