import { Button } from "@/components/shared/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function DevisCard() {
  // You can replace this with your actual total calculation
  const totalPrice = "00.00 DA"

  return (
    <Card className="w-[350px] h-full">
      <CardHeader>
        <CardTitle>Devis</CardTitle>
        <CardDescription>Résumé de votre devis</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center py-4">
          <span className="font-medium text-lg">Montant :</span>
          <span className="text-xl font-bold">{totalPrice}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Annuler</Button>
        <Button>Confirmer l'offre</Button>
      </CardFooter>
    </Card>
  )
}
