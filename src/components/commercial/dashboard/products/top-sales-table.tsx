"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shared/table"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface DeviceSalesData {
  model: string;
  sales: number;
}

interface ProductsTableComponentProps {
  deviceSalesData: DeviceSalesData[];
}

export function ProductsTableComponent({ deviceSalesData }: ProductsTableComponentProps) {
  // Trier les données par nombre de ventes décroissant
  const sortedData = [...deviceSalesData].sort((a, b) => b.sales - a.sales);

  return (
    <Card className="bg-white shadow-sm rounded-lg overflow-hidden">
      <CardHeader className="pb-0 pt-6 px-6 border-b">
        <CardTitle className="text-xl mb-6 font-medium text-gray-800">Produits les plus vendus</CardTitle>
      </CardHeader>
      <CardContent className="p-0 m-2">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-medium text-gray-600">Modèle</TableHead>
              <TableHead className="font-medium text-gray-600 text-right">Ventes</TableHead>
              <TableHead className="font-medium text-gray-600 text-right">Part de marché</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((device, index) => {
              const totalSales = deviceSalesData.reduce((sum, item) => sum + item.sales, 0);
              const marketShare = ((device.sales / totalSales) * 100).toFixed(1);

              return (
                <TableRow key={index} className="border-t border-gray-100 hover:bg-gray-50">
                  <TableCell className="text-gray-800">{device.model}</TableCell>
                  <TableCell className="text-gray-800 text-right">{device.sales} unités</TableCell>
                  <TableCell className="text-right">
                    <span className="text-emerald-500">
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
  )
}
