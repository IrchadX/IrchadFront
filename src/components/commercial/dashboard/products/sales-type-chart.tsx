"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Données de ventes par modèle
const chartData = [
  { modele: "Modèle A", ventes: 186 },
  { modele: "Modèle B", ventes: 305 },
  { modele: "Modèle C", ventes: 237 },
]

// Couleurs pour chaque modèle
const COLORS = ["#9F9FF8", "#94E9B8", "#AEC7ED"]

// Configuration avec les couleurs personnalisées
const chartConfig = {
  ventes: {
    label: "Ventes",
    color: "#9F9FF8", // Cette couleur sera remplacée par les couleurs personnalisées
  },
} satisfies ChartConfig

export function BarChartComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ventes par Modèle</CardTitle>
        <CardDescription>Nombre de ventes par type de modèle</CardDescription>
      </CardHeader>
      <CardContent>
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
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Le Modèle B est le plus vendu <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">Affichage du total des ventes par modèle</div>
      </CardFooter>
    </Card>
  )
}
