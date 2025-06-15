"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shared/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface DeviceSalesData {
  model: string;
  sales: number;
}

interface ProductsTableComponentProps {
  deviceSalesData: DeviceSalesData[];
}

export function ProductsTableComponent({
  deviceSalesData,
}: ProductsTableComponentProps) {
  // Trier les données par nombre de ventes décroissant
  const sortedData = [...deviceSalesData].sort((a, b) => b.sales - a.sales);

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-0 pt-6 px-6 border-b border-gray-200 dark:border-gray-700">
        <CardTitle className="text-xl mb-6 font-medium text-gray-800 dark:text-white">
          Produits les plus vendus
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 m-2">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-gray-200 dark:border-gray-700">
              <TableHead className="font-medium text-gray-600 dark:text-gray-300">
                Modèle
              </TableHead>
              <TableHead className="font-medium text-gray-600 dark:text-gray-300 text-right">
                Ventes
              </TableHead>
              <TableHead className="font-medium text-gray-600 dark:text-gray-300 text-right">
                Part de marché
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((device, index) => {
              const totalSales = deviceSalesData.reduce(
                (sum, item) => sum + item.sales,
                0
              );
              const marketShare = ((device.sales / totalSales) * 100).toFixed(
                1
              );

              return (
                <TableRow
                  key={index}
                  className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <TableCell className="text-gray-800 dark:text-gray-200 font-medium">
                    {device.model}
                  </TableCell>
                  <TableCell className="text-gray-800 dark:text-gray-200 text-right">
                    <span className="font-semibold">{device.sales}</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-1">
                      unités
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                      {marketShare}%
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
