"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/shared/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/shared/input"
import { Label } from "@/components/shared/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export function OfferCard() {
  const [environments, setEnvironments] = useState([{ id: 1, nom: "", type: "", surface: "", adresse: "" }])

  const addEnvironment = () => {
    const newId = environments.length > 0 ? Math.max(...environments.map((env) => env.id)) + 1 : 1
    setEnvironments([...environments, { id: newId, nom: "", type: "", surface: "", adresse: "" }])
  }

  const removeEnvironment = (id: number) => {
    setEnvironments(environments.filter((env) => env.id !== id))
  }

  const updateEnvironment = (id: number, field: string, value: string) => {
    setEnvironments(environments.map((env) => (env.id === id ? { ...env, [field]: value } : env)))
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Formulaire d'inscription</CardTitle>
        <CardDescription>Veuillez remplir tous les champs pour continuer.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="nom">Nom</Label>
                <Input id="nom" placeholder="Votre nom" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="prenom">Prénom</Label>
                <Input id="prenom" placeholder="Votre prénom" />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="dispositif">Dispositif</Label>
              <Select>
                <SelectTrigger id="dispositif">
                  <SelectValue placeholder="Sélectionner un dispositif" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="dispositif1">Dispositif 1</SelectItem>
                  <SelectItem value="dispositif2">Dispositif 2</SelectItem>
                  <SelectItem value="dispositif3">Dispositif 3</SelectItem>
                  <SelectItem value="dispositif4">Dispositif 4</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <Label>Environnements</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addEnvironment}
                  className="flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" /> Ajouter
                </Button>
              </div>

              {environments.map((env) => (
                <Card key={env.id} className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor={`env-nom-${env.id}`}>Nom</Label>
                      <Input
                        id={`env-nom-${env.id}`}
                        value={env.nom}
                        onChange={(e) => updateEnvironment(env.id, "nom", e.target.value)}
                        placeholder="Nom de l'environnement"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor={`env-type-${env.id}`}>Type</Label>
                      <Input
                        id={`env-type-${env.id}`}
                        value={env.type}
                        onChange={(e) => updateEnvironment(env.id, "type", e.target.value)}
                        placeholder="Type d'environnement"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor={`env-surface-${env.id}`}>Surface</Label>
                      <Input
                        id={`env-surface-${env.id}`}
                        value={env.surface}
                        onChange={(e) => updateEnvironment(env.id, "surface", e.target.value)}
                        placeholder="Surface en m²"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor={`env-adresse-${env.id}`}>Adresse</Label>
                      <Input
                        id={`env-adresse-${env.id}`}
                        value={env.adresse}
                        onChange={(e) => updateEnvironment(env.id, "adresse", e.target.value)}
                        placeholder="Adresse complète"
                      />
                    </div>
                  </div>
                  {environments.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeEnvironment(env.id)}
                      className="mt-2 ml-auto"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Supprimer cet environnement</span>
                    </Button>
                  )}
                </Card>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="acces-public" />
              <Label htmlFor="acces-public">Autoriser l'accès aux environnements publics</Label>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Annuler</Button>
        <Button>Soumettre</Button>
      </CardFooter>
    </Card>
  )
}
