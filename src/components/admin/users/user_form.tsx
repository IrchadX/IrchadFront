"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { Button } from "@/components/shared/button";
import { Calendar } from "@/components/shared/calendar";
import { parsePhoneNumberFromString } from "libphonenumber-js";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shared/form";
import { Input } from "@/components/shared/input";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shared/popover";

const DEFAULT_COUNTRY = "DZ"; 
const wilayas = [
  "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra", "Béchar", "Blida", "Bouira",
  "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret", "Tizi Ouzou", "Alger", "Djelfa", "Jijel", "Sétif", "Saïda",
  "Skikda", "Sidi Bel Abbès", "Annaba", "Guelma", "Constantine", "Médéa", "Mostaganem", "M'Sila", "Mascara",
  "Ouargla", "Oran", "El Bayadh", "Illizi", "Bordj Bou Arreridj", "Boumerdès", "El Tarf", "Tindouf", "Tissemsilt",
  "El Oued", "Khenchela", "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent", "Ghardaïa",
  "Relizane"
]; //For wilaya selection


const formSchema = z.object({
  family_name: z
    .string()
    .nonempty("Le nom est requis")
    .regex(/^[a-zA-Z\s]*$/, "Le nom ne doit contenir que des lettres ou des espaces"),
  first_name: z
    .string()
    .nonempty("Le prénom est requis")
    .regex(/^[a-zA-Z\s]*$/, "Le prénom ne doit contenir que des lettres ou des espaces"),
  birth_date: z.date().refine((date) => date <= new Date(), {
    message: "Date de naissance invalide",
  }),
  sex: z.string().nonempty("Le sexe est requis"),
  phone_number: z.string().refine((value) => {
    const phoneNumber = parsePhoneNumberFromString(value, DEFAULT_COUNTRY);
    return phoneNumber && phoneNumber.isValid();
  }, "Numéro de téléphone invalide"),
  email: z
    .string()
    .nonempty("L'adresse email est requise")
    .email("L'adresse email doit être valide"),
  password: z
    .string()
    .nonempty("Le mot de passe est requis")
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .max(20, "Le mot de passe doit contenir au maximum 20 caractères"),
  confirm_password: z
    .string()
    .nonempty("La confirmation du mot de passe est requise"),
  city: z.string().nonempty("La ville est requise"),
  street: z.string().nonempty("L'adresse est requise"),
  userTypeId: z.string().nonempty("Le type est requis"),
}).refine((data) => data.password === data.confirm_password, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirm_password"],
});

// Map your form types to user types
const userTypeMap = {
  "admin": 1,
  "commercial": 2,
  "decidor": 3
};

export function UserForm() {
  // Form state
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      family_name: "",
      first_name: "",
      birth_date: new Date(),
      sex: "",
      phone_number: "",
      email: "",
      password: "",
      confirm_password: "",
      city: "",
      street: "",
      userTypeId: "",
    },
  });

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    
    try {
      // Format the date as YYYY-MM-DD
      const formattedDate = values.birth_date.toISOString().split('T')[0];
      
      // Prepare data according to your backend API structure
      const userData = {
        firstName: values.first_name,
        familyName: values.family_name,
        email: values.email,
        phoneNumber: values.phone_number,
        password: values.password,
        userTypeId: userTypeMap[values.userTypeId as keyof typeof userTypeMap] || null,
        birthDate: formattedDate,
        sex: values.sex,
        city: values.city,
        street: values.street
      };

      // Make the API call to create user
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create user');
      }

      const data = await response.json();
      console.log('User created successfully:', data);
      setSubmitSuccess(true);
      
      // Optional: Reset the form after successful submission
      form.reset();
      
    } catch (error) {
      console.error('Error creating user:', error);
      setSubmitError(error instanceof Error ? error.message : 'Une erreur s\'est produite');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    
<div className="max-w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {submitError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {submitError}
            </div>
          )}
          
          {submitSuccess && (
            <div className="bg-green-400 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              L'utilisateur a été créé avec succès!
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {/* First column */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="family_name"
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
                              className="bg-transparent w-full h-full pl-2 border-none focus:outline-none"
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
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Wilaya</FormLabel>
                    <FormControl>
                      <select
                        className="bg-gray-50 rounded-md border-gray-200 p-2 h-12 w-full"
                        {...field}
                      >
                        <option value="">Sélectionner une wilaya</option>
                        {wilayas.map((wilaya, index) => (
                          <option key={index} value={wilaya}>
                            {wilaya}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Adresse</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Adresse"
                        className="bg-gray-50 rounded-md border-gray-200 p-2 h-12"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Second column */}
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
                name="phone_number"
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
                name="sex"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Sexe</FormLabel>
                    <FormControl>
                      <select
                        className="bg-gray-50 rounded-md border-gray-200 p-2 h-12 w-full"
                        {...field}>
                        <option value="">sexe</option>
                        <option value="homme">Homme</option>
                        <option value="femme">Femme</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="userTypeId"
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

              {/* Empty div to align with "Adresse" in the first column */}
              <div></div>
            </div>
          </div>
         
      {/* Password and Confirm Password fields aligned horizontally */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-medium">Mot de passe</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Mot de passe"
                    className="bg-gray-50 rounded-md border-gray-200 p-2 h-12"
                    {...field}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-medium">Confirmer le mot de passe</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirmer le mot de passe"
                    className="bg-gray-50 rounded-md border-gray-200 p-2 h-12"
                    {...field}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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