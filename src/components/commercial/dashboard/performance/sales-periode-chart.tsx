"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { useState, useEffect } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import { Button } from "@/components/shared/button";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  fetchDailySales,
  fetchMonthlySales,
  fetchYearlySales,
} from "@/app/api/statistics";

const chartConfig = {
  devices: {
    label: "Dispositifs",
    color: "#EDA10D",
  },
} satisfies ChartConfig;

type TimePeriod = "année" | "mois" | "jour";

export function LineChartComponent() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("mois");
  const [chartData, setChartData] = useState<
    { period: string; devices: number }[]
  >([]);
  const [growthRate, setGrowthRate] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data: { period: string; devices: number }[] = [];
        const currentDate = new Date();

        switch (timePeriod) {
          case "année": {
            const yearlyData = await fetchYearlySales();
            data = yearlyData.map((item: any) => ({
              period: item.year.toString(),
              devices: item.count,
            }));
            break;
          }
          case "mois": {
            const monthlyData = await fetchMonthlySales(
              currentDate.getFullYear()
            );
            data = monthlyData.map((item: any) => ({
              period: new Date(0, item.month - 1).toLocaleString("fr-FR", {
                month: "long",
              }),
              devices: item.count,
            }));
            break;
          }
          case "jour": {
            const dailyData = await fetchDailySales(
              currentDate.toISOString().split("T")[0]
            );
            data = dailyData.map((item: any) => ({
              period: new Date(item.date).toLocaleString("fr-FR", {
                weekday: "short",
              }),
              devices: item.count,
            }));
            break;
          }
        }

        if (data.length >= 2) {
          const current = data[data.length - 1].devices;
          const previous = data[data.length - 2].devices;
          const growth = ((current - previous) / previous) * 100;
          setGrowthRate(growth);
        }

        setChartData(data);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchData();
  }, [timePeriod]);

  const getTitle = () => {
    switch (timePeriod) {
      case "année":
        return "Ventes par Année";
      case "jour":
        return "Ventes par Jour";
      default:
        return "Ventes par Mois";
    }
  };

  const getDescription = () => {
    const currentDate = new Date();
    switch (timePeriod) {
      case "année":
        return `${
          currentDate.getFullYear() - 5
        } - ${currentDate.getFullYear()}`;
      case "jour":
        return "Dernière semaine";
      default:
        return "Année courante";
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between border-b border-gray-200 dark:border-gray-700">
        <div>
          <CardTitle className="text-gray-800 dark:text-white">
            {getTitle()}
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            {getDescription()}
          </CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
              Par {timePeriod}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <DropdownMenuItem
              onClick={() => setTimePeriod("année")}
              className="hover:bg-gray-100 dark:hover:bg-gray-700">
              Par année
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTimePeriod("mois")}
              className="hover:bg-gray-100 dark:hover:bg-gray-700">
              Par mois
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTimePeriod("jour")}
              className="hover:bg-gray-100 dark:hover:bg-gray-700">
              Par jour
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}>
            <CartesianGrid
              vertical={false}
              stroke="#E5E7EB"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="period"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: "#6B7280" }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
              wrapperStyle={{
                backgroundColor: "white",
                borderColor: "#E5E7EB",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Line
              dataKey="devices"
              type="linear"
              stroke="#EDA10D"
              strokeWidth={2}
              dot={{ fill: "#EDA10D", strokeWidth: 2, r: 4 }}
              activeDot={{ fill: "#EDA10D", strokeWidth: 0, r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm border-t border-gray-200 dark:border-gray-700">
        <div className="flex gap-2 font-medium leading-none text-gray-800 dark:text-white">
          {growthRate >= 0 ? (
            <>
              Tendance à la hausse de {growthRate.toFixed(1)}%{" "}
              {timePeriod === "mois"
                ? "ce mois"
                : timePeriod === "année"
                ? "cette année"
                : "aujourd'hui"}{" "}
              <TrendingUp className="h-4 w-4 text-green-500 dark:text-green-400" />
            </>
          ) : (
            <>
              Tendance à la baisse de {Math.abs(growthRate).toFixed(1)}%{" "}
              {timePeriod === "mois"
                ? "ce mois"
                : timePeriod === "année"
                ? "cette année"
                : "aujourd'hui"}{" "}
              <TrendingDown className="h-4 w-4 text-red-500 dark:text-red-400" />
            </>
          )}
        </div>
        <div className="leading-none text-gray-500 dark:text-gray-400">
          Affichage du nombre total de dispositifs vendus par {timePeriod}
        </div>
      </CardFooter>
    </Card>
  );
}
