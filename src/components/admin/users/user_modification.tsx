"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shared/form";

const formSchema = z.object({
  last_name: z.string().nonempty("Le nom est requis"),
  first_name: z.string().nonempty("Le prénom est requis"),
  birth_date: z.date().refine((date) => date <= new Date(), {
    message: "Date de naissance invalide",
  }),
  sexe: z.string().nonempty("Le sexe est requis"),
  phone: z
    .string()
    .nonempty("Le numéro de téléphone est requis")
    .regex(/^\d{10}$/, "Le numéro de téléphone doit contenir 10 chiffres"),
  email: z
    .string()
    .nonempty("L'adresse email est requise")
    .email("L'adresse email doit être valide"),
  city: z.string().nonempty("La ville est requise"),
  type: z.string().nonempty("Le type est requis"),
});

interface UserModificationProps {
  userId: string;
}

export function UserModification({ userId }: UserModificationProps) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data based on userId
    async function fetchUserData() {

      //fetching data here
      const response = await fetch(`http://localhost:3000/users/${userId}`);
      
      const data = await response.json();
      setUserData(data);
    }

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: userData ?? {},
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Handle form submission
    console.log(values);
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Nom</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nom"
                        className="bg-gray-50 rounded-md border-gray-200 p-2 h-12"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="birth_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Date de naissance</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        className="bg-gray-50 rounded-md border-gray-200 p-2 h-12"
                        {...field}
                        value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Adresse Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="loremipsum@gmail.com"
                        className="bg-gray-50 rounded-md border-gray-200 p-2 h-12"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sexe"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Sexe</FormLabel>
                    <FormControl>
                      <select
                        className="bg-gray-50 rounded-md border-gray-200 p-2 h-12 w-full"
                        {...field}>
                        <option value="">Sélectionner le sexe</option>
                        <option value="man">Homme</option>
                        <option value="woman">Femme</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Ville</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ville"
                        className="bg-gray-50 rounded-md border-gray-200 p-2 h-12"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Prénom</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Prénom"
                        className="bg-gray-50 rounded-md border-gray-200 p-2 h-12"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">N. Tel</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="05 55 55 55 55"
                        className="bg-gray-50 rounded-md border-gray-200 p-2 h-12"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Type</FormLabel>
                    <FormControl>
                      <select
                        className="bg-gray-50 rounded-md border-gray-200 p-2 h-12 w-full"
                        {...field}>
                        <option value="">Sélectionner un type</option>
                        <option value="admin">Admin</option>
                        <option value="superadmin">Superadmin</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="mt-8">
            <Button
              type="submit"
              className="bg-black hover:bg-gray-700 text-white px-8 py-2 rounded-md">
              Enregistrer
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}