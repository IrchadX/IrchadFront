"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface DeviceSalesData {
  model: string;
  sales: number;
}

interface BarChartComponentProps {
  deviceSalesData: DeviceSalesData[];
}

// Couleurs pour chaque modèle
const COLORS = ["#9F9FF8", "#94E9B8", "#AEC7ED"]

// Configuration avec les couleurs personnalisées
const chartConfig = {
  ventes: {
    label: "Ventes",
    color: "#9F9FF8",
  },
} satisfies ChartConfig

export function BarChartComponent({ deviceSalesData }: BarChartComponentProps) {
  const chartData = deviceSalesData.map(item => ({
    modele: item.model,
    ventes: item.sales
  }));

  // Trouver le modèle le plus vendu
  const bestSeller = chartData.reduce((max, current) => 
    current.ventes > max.ventes ? current : max
  , chartData[0]);

  return (
    <Card className="h-[400px]">
      <CardHeader className="py-4">
        <CardTitle className="text-lg">Ventes par Modèle</CardTitle>
        <CardDescription className="text-sm">Nombre de ventes par type de modèle</CardDescription>
      </CardHeader>
      <CardContent className="h-[250px]">
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData} barCategoryGap={20}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="modele" tickLine={false} tickMargin={10} axisLine={false} />
            <YAxis hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent formatter={(value) => [`${value} unités`, "Ventes"]} />}
            />
            <Bar dataKey="ventes" radius={8} barSize={50}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="py-3">
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-1">
            <div className="flex gap-2 font-medium leading-none">
              {bestSeller && (
                <>
                  Le {bestSeller.modele} est le plus vendu avec {bestSeller.ventes} unités{" "}
                  <TrendingUp className="h-4 w-4" />
                </>
              )}
            </div>
            <div className="leading-none text-muted-foreground text-xs">
              Affichage du total des ventes par modèle
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
