"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/button";
import { Calendar } from "@/components/shared/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shared/popover";

import { parsePhoneNumberFromString } from "libphonenumber-js";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shared/form";

const DEFAULT_COUNTRY = "DZ"; //for phone number validation

const formSchema = z.object({
  last_name: z.string().nonempty("Le nom est requis"),
  first_name: z.string().nonempty("Le prénom est requis"),
  birth_date: z.date().refine((date) => date <= new Date(), {
    message: "Date de naissance invalide",
  }),
  sexe: z.string().nonempty("Le sexe est requis"),
  phone: z.string().refine((value) => {
    const phoneNumber = parsePhoneNumberFromString(value, DEFAULT_COUNTRY);
    return phoneNumber && phoneNumber.isValid();
  }, "Numéro de téléphone invalide"),
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
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  useEffect(() => {
    // Fetch user data based on userId
    async function fetchUserData() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`);
      const data = await response.json();
      setUserData(data);
      form.reset({
        last_name: data.family_name || "",
        first_name: data.first_name || "",
        //birth_date: data.birth_date || "",
        sexe: data.sexe || "",
        phone: data.phone_number || "",
        email: data.email || "",
        city: data.city || "",
        type: data.type || "",
      });
    }

    if (userId) {
      fetchUserData();
    }
  }, [userId, form]);

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
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <div className="flex bg-gray-50 rounded-md border border-gray-200 h-12">
                            <span className="flex items-center pl-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-gray-500">
                                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                                <line x1="16" x2="16" y1="2" y2="6" />
                                <line x1="8" x2="8" y1="2" y2="6" />
                                <line x1="3" x2="21" y1="10" y2="10" />
                              </svg>
                            </span>
                            <Input
                              placeholder="Choisir une date"
                              value={field.value ? field.value.toLocaleDateString() : ""}
                              className="border-0 bg-transparent"
                              readOnly
                            />
                          </div>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
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
                        <option value="commercial">Commercial</option>
                        <option value="decidor">Décideur</option>
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
              className="bg-black hover:bg-gray-700 text-white px-8 py-2 rounded-md mb-6 mt-0">
              Enregistrer
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}