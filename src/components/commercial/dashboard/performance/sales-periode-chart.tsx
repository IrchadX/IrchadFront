"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { useState, useEffect } from "react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import { Button } from "@/components/shared/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { fetchDailySales, fetchMonthlySales, fetchYearlySales } from "@/app/api/statistics"

const chartConfig = {
  devices: {
    label: "Dispositifs",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

type TimePeriod = "année" | "mois" | "jour"

export function LineChartComponent() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("mois")
  const [chartData, setChartData] = useState<{ period: string; devices: number }[]>([])
  const [growthRate, setGrowthRate] = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data: { period: string; devices: number }[] = []
        const currentDate = new Date()

        switch (timePeriod) {
          case "année": {
            const yearlyData = await fetchYearlySales()
            data = yearlyData.map((item: any) => ({
              period: item.year.toString(),
              devices: item.count
            }))
            break
          }
          case "mois": {
            const monthlyData = await fetchMonthlySales(currentDate.getFullYear())
            data = monthlyData.map((item: any) => ({
              period: new Date(0, item.month - 1).toLocaleString('fr-FR', { month: 'long' }),
              devices: item.count
            }))
            break
          }
          case "jour": {
            const dailyData = await fetchDailySales(currentDate.toISOString().split('T')[0])
            data = dailyData.map((item: any) => ({
              period: new Date(item.date).toLocaleString('fr-FR', { weekday: 'short' }),
              devices: item.count
            }))
            break
          }
        }

        // Calculate growth rate
        if (data.length >= 2) {
          const current = data[data.length - 1].devices
          const previous = data[data.length - 2].devices
          const growth = ((current - previous) / previous) * 100
          setGrowthRate(growth)
        }

        setChartData(data)
      } catch (error) {
        console.error("Error fetching sales data:", error)
      }
    }

    fetchData()
  }, [timePeriod])

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
    const currentDate = new Date()
    switch (timePeriod) {
      case "année":
        return `${currentDate.getFullYear() - 5} - ${currentDate.getFullYear()}`
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
            data={chartData}
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
          {growthRate >= 0 ? (
            <>
              Tendance à la hausse de {growthRate.toFixed(1)}%{" "}
              {timePeriod === "mois" ? "ce mois" : timePeriod === "année" ? "cette année" : "aujourd'hui"}{" "}
              <TrendingUp className="h-4 w-4" />
            </>
          ) : (
            <>
              Tendance à la baisse de {Math.abs(growthRate).toFixed(1)}%{" "}
              {timePeriod === "mois" ? "ce mois" : timePeriod === "année" ? "cette année" : "aujourd'hui"}{" "}
              <TrendingDown className="h-4 w-4" />
            </>
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Affichage du nombre total de dispositifs vendus par {timePeriod}
        </div>
      </CardFooter>
    </Card>
  )
}
