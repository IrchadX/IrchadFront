"use client"

import { TrendingUp } from "lucide-react"
import { useState } from "react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import { Button } from "@/components/shared/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Sample data for different time periods
const yearlyData = [
  { period: "2019", devices: 1250 },
  { period: "2020", devices: 1850 },
  { period: "2021", devices: 2340 },
  { period: "2022", devices: 2780 },
  { period: "2023", devices: 3120 },
  { period: "2024", devices: 2890 },
]

const monthlyData = [
  { period: "Janvier", devices: 186 },
  { period: "Février", devices: 305 },
  { period: "Mars", devices: 237 },
  { period: "Avril", devices: 173 },
  { period: "Mai", devices: 209 },
  { period: "Juin", devices: 214 },
  { period: "Juillet", devices: 253 },
  { period: "Août", devices: 187 },
  { period: "Septembre", devices: 291 },
  { period: "Octobre", devices: 312 },
  { period: "Novembre", devices: 284 },
  { period: "Décembre", devices: 327 },
]

const dailyData = [
  { period: "Lun", devices: 42 },
  { period: "Mar", devices: 53 },
  { period: "Mer", devices: 37 },
  { period: "Jeu", devices: 45 },
  { period: "Ven", devices: 58 },
  { period: "Sam", devices: 76 },
  { period: "Dim", devices: 39 },
]

const chartConfig = {
  devices: {
    label: "Dispositifs",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

type TimePeriod = "année" | "mois" | "jour"

export function LineChartComponent() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("mois")

  // Select data based on time period
  const getChartData = () => {
    switch (timePeriod) {
      case "année":
        return yearlyData
      case "jour":
        return dailyData
      case "mois":
      default:
        return monthlyData
    }
  }

  // Get title based on time period
  const getTitle = () => {
    switch (timePeriod) {
      case "année":
        return "Ventes par Année"
      case "jour":
        return "Ventes par Jour"
      case "mois":
      default:
        return "Ventes par Mois"
    }
  }

  // Get description based on time period
  const getDescription = () => {
    switch (timePeriod) {
      case "année":
        return "2019 - 2024"
      case "jour":
        return "Dernière semaine"
      case "mois":
      default:
        return "Année courante"
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{getTitle()}</CardTitle>
          <CardDescription>{getDescription()}</CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Par {timePeriod}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTimePeriod("année")}>Par année</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTimePeriod("mois")}>Par mois</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTimePeriod("jour")}>Par jour</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={getChartData()}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="period" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Line dataKey="devices" type="linear" stroke="#EDA10D" strokeWidth={2} dot={true} />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Tendance à la hausse de 5.2%{" "}
          {timePeriod === "mois" ? "ce mois" : timePeriod === "année" ? "cette année" : "aujourd'hui"}{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Affichage du nombre total de dispositifs vendus par {timePeriod}
        </div>
      </CardFooter>
    </Card>
  )
}
