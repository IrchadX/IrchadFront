import { Button } from "@/components/shared/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DevisCardProps {
  totalPrice: string;
  onConfirm: () => void;
}

export function DevisCard({ totalPrice, onConfirm }: DevisCardProps) {
  return (
    <Card className="w-[350px] h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
      <CardHeader className="border-b border-gray-200 dark:border-gray-700">
        <CardTitle className="text-black dark:text-white">Devis</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Résumé de votre devis
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex justify-between items-center py-4">
          <span className="font-medium text-lg text-gray-700 dark:text-gray-300">
            Montant :
          </span>
          <span className="text-xl font-bold text-black dark:text-white">
            {totalPrice}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex gap-5 justify-between border-t border-gray-200 dark:border-gray-700 p-6">
        <Button
          variant="outline"
          className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
          Annuler
        </Button>
        <Button
          onClick={onConfirm}
          className="bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black">
          Confirmer l'offre
        </Button>
      </CardFooter>
    </Card>
  );
}
