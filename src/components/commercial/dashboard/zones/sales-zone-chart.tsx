"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Données de ventes par modèle
const chartData = [
  { modele: "Région 1", ventes: 186 },
  { modele: "Région 2", ventes: 305 },
  { modele: "Région 3", ventes: 237 },
  { modele: "Région 4", ventes: 240 },
]

// Couleurs pour chaque modèle
const COLORS = ["#9F9FF8", "#94E9B8", "#AEC7ED", "#92BFFF"]

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
        <CardTitle>Ventes par Région</CardTitle>
        <CardDescription>Nombre de ventes par région géographique</CardDescription>
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
          La région 2 contient le plus de ventes <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">Affichage du total des ventes par région</div>
      </CardFooter>
    </Card>
  )
}
