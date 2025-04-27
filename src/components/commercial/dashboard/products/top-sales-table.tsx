"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shared/table"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

// Définition du type pour les données des produits
interface Produit {
  id: string
  nom: string
  prix: number
  roi: number
}

// Données des produits
const produits: Produit[] = [
  { id: "PR001", nom: "Produit 1", prix: 520, roi: 5 },
  { id: "PR002", nom: "Produit 2", prix: 480, roi: 10 },
  { id: "PR003", nom: "Produit 3", prix: 350, roi: -3 },
  { id: "PR004", nom: "Produit 4", prix: 940, roi: 2 },
  { id: "PR005", nom: "Produit 5", prix: 670, roi: -12 },
]

export function ProductsTableComponent() {
  return (
    <Card className="bg-white shadow-sm rounded-lg overflow-hidden">
      <CardHeader className="pb-0 pt-6 px-6 border-b">
        <CardTitle className="text-xl font-medium text-gray-800">Produits les plus vendus</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-medium text-gray-600 w-[100px]">Id</TableHead>
              <TableHead className="font-medium text-gray-600">Nom</TableHead>
              <TableHead className="font-medium text-gray-600">Prix</TableHead>
              <TableHead className="font-medium text-gray-600 text-right">ROI</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {produits.map((produit) => (
              <TableRow key={produit.id} className="border-t border-gray-100 hover:bg-gray-50">
                <TableCell className="text-gray-500 font-mono">{produit.id}</TableCell>
                <TableCell className="text-gray-800">{produit.nom}</TableCell>
                <TableCell className="text-gray-800">${produit.prix}</TableCell>
                <TableCell className="text-right">
                  <span className={produit.roi >= 0 ? "text-emerald-500" : "text-red-500"}>
                    {produit.roi >= 0 ? "+" : ""}
                    {produit.roi}%
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
