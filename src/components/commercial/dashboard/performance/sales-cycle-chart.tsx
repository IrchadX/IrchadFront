"use client"
import { Pie, PieChart } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
const chartData = [
  { category: "Configuration", percentage: 35, fill: "var(--color-configuration)" },
  { category: "Compte client", percentage: 30, fill: "var(--color-compte-client)" },
  { category: "Autres", percentage: 20, fill: "var(--color-autres)" },
  { category: "Devis", percentage: 15, fill: "var(--color-devis)" },
]

const chartConfig = {
  percentage: {
    label: "Pourcentage",
  },
  configuration: {
    label: "Configuration",
    color: "rgb(255, 105, 180)", // Pink/magenta color
  },
  "compte-client": {
    label: "Compte client",
    color: "rgb(64, 145, 140)", // Teal/green color
  },
  autres: {
    label: "Autres",
    color: "rgb(95, 201, 174)", // Mint green color
  },
  devis: {
    label: "Devis",
    color: "rgb(255, 153, 51)", // Orange color
  },
} satisfies ChartConfig

export function PieChartComponent() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Cycle de vente moyen</CardTitle>
        <CardDescription>Répartition des étapes</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie data={chartData} dataKey="percentage" label nameKey="category" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">Affichage du cycle de vente moyen</div>
      </CardFooter>
    </Card>
  )
}
