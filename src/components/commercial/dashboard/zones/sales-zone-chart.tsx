"use client"

import { TrendingUp } from "lucide-react"
import { useState, useEffect } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { fetchSalesByRegion } from "@/app/api/statistics"

// Couleurs pour chaque région
const COLORS = ["#9F9FF8", "#94E9B8", "#AEC7ED", "#92BFFF"]

// Configuration avec les couleurs personnalisées
const chartConfig = {
  ventes: {
    label: "Ventes",
    color: "#9F9FF8",
  },
} satisfies ChartConfig

export function BarChartComponent() {
  const [chartData, setChartData] = useState<{ modele: string; ventes: number }[]>([])
  const [bestRegion, setBestRegion] = useState<{ modele: string; ventes: number } | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesData = await fetchSalesByRegion()
        const formattedData = salesData.map((item: any) => ({
          modele: item.city,
          ventes: item.sales
        }))

        // Trouver la région avec le plus de ventes
        const best = formattedData.reduce((max: any, current: any) => 
          current.ventes > max.ventes ? current : max
        , formattedData[0])

        setBestRegion(best)
        setChartData(formattedData)
      } catch (error) {
        console.error("Error fetching sales by region:", error)
      }
    }

    fetchData()
  }, [])

  return (
    <Card className="h-[400px]">
      <CardHeader className="py-4">
        <CardTitle className="text-lg">Ventes par Région</CardTitle>
        <CardDescription className="text-sm">Nombre de ventes par région géographique</CardDescription>
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
              {bestRegion && (
                <>
                  {bestRegion.modele} est la région avec le plus de ventes ({bestRegion.ventes} unités){" "}
                  <TrendingUp className="h-4 w-4" />
                </>
              )}
            </div>
            <div className="leading-none text-muted-foreground text-xs">
              Affichage du total des ventes par région
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
