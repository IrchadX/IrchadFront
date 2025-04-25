"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
const chartData = [
  { month: "Janvier", revenue: 18600 },
  { month: "Février", revenue: 30500 },
  { month: "Mars", revenue: 23700 },
  { month: "Avril", revenue: 27300 },
  { month: "Mai", revenue: 32900 },
  { month: "Juin", revenue: 41400 },
]

const chartConfig = {
  revenue: {
    label: "Chiffre d'Affaires",
    color: "#3AAFA9",
  },
} satisfies ChartConfig

export function AreaChartComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Évolution du Chiffre d'Affaires</CardTitle>
        <CardDescription>Chiffre d'affaires total des 6 derniers mois</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 20,
              bottom: 10,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3AAFA9" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3AAFA9" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `${value / 1000}k €`} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Area dataKey="revenue" type="natural" fill="url(#colorRevenue)" fillOpacity={0.6} stroke="#3AAFA9" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Hausse de 25.8% ce mois-ci <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">Janvier - Juin 2024</div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
