"use client";

import {API_URL} from "@/config/api";
import {fetchUserById, updateUser} from "@/app/api/users";

import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/button";
import { Calendar } from "@/components/shared/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shared/popover";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shared/form";

// Map your form types to user types
const userTypeMap = {
  "admin": 2,
  "commercial": 3,
  "decidor": 4,
  "aidant": 5,
  "client": 6,
};

const DEFAULT_COUNTRY = "DZ";
const wilayas = [
  "Adrar",
  "Chlef",
  "Laghouat",
  "Oum El Bouaghi",
  "Batna",
  "Béjaïa",
  "Biskra",
  "Béchar",
  "Blida",
  "Bouira",
  "Tamanrasset",
  "Tébessa",
  "Tlemcen",
  "Tiaret",
  "Tizi Ouzou",
  "Alger",
  "Djelfa",
  "Jijel",
  "Sétif",
  "Saïda",
  "Skikda",
  "Sidi Bel Abbès",
  "Annaba",
  "Guelma",
  "Constantine",
  "Médéa",
  "Mostaganem",
  "M'Sila",
  "Mascara",
  "Ouargla",
  "Oran",
  "El Bayadh",
  "Illizi",
  "Bordj Bou Arreridj",
  "Boumerdès",
  "El Tarf",
  "Tindouf",
  "Tissemsilt",
  "El Oued",
  "Khenchela",
  "Souk Ahras",
  "Tipaza",
  "Mila",
  "Aïn Defla",
  "Naâma",
  "Aïn Témouchent",
  "Ghardaïa",
  "Relizane",
]; //For wilaya selection

const formSchema = z.object({
  family_name: z.string().nonempty("Le nom est requis"), // Changed from last_name
  first_name: z.string().nonempty("Le prénom est requis"),
  birthDate: z.date().refine((date) => date <= new Date(), {
    message: "Date de naissance invalide",
  }),
  sex: z.string().nonempty("Le sexe est requis"), // Changed from sexe
  phone_number: z.string().refine((value) => {
    const phoneNumber = parsePhoneNumberFromString(value, DEFAULT_COUNTRY);
    return phoneNumber && phoneNumber.isValid();
  }, "Numéro de téléphone invalide"), // Changed from phone
  email: z
    .string()
    .nonempty("L'adresse email est requise")
    .email("L'adresse email doit être valide"),
  city: z.string().nonempty("La ville est requise"),
  street: z.string().nonempty("L'adresse est requise"), // Changed from address
  userTypeId: z.string().nonempty("Le type est requis"), // Changed from type
});
const passwordSchema = z
  .object({
    current_password: z.string().optional(),
    new_password: z
      .string()
      .nonempty("Le mot de passe est requis")
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .max(20, "Le mot de passe doit contenir au maximum 20 caractères"),
    confirm_new_password: z
      .string()
      .nonempty("La confirmation du mot de passe est requise"),
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    message: "Les nouveaux mots de passe ne correspondent pas",
    path: ["confirm_new_password"],
  });

interface UserModificationProps {
  userId: string;
  userTypes: { id: string; label: string }[];
}

export function UserModification({ userId, userTypes }: UserModificationProps) {
  const [userData, setUserData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_new_password: "",
    },
  });

  const onPasswordSubmit = async (values: z.infer<typeof passwordSchema>) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        `${API_URL}/users/${userId}/update-password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentPassword: values.current_password,
            newPassword: values.new_password,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Échec de la mise à jour du mot de passe"
        );
      }

      setPasswordSuccess("Mot de passe mis à jour avec succès !");
      passwordForm.reset();
    } catch (error) {
      console.error("Error updating password:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Échec de la mise à jour du mot de passe"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      family_name: "",
      first_name: "",
      birthDate: new Date(),
      sex: "",
      phone_number: "",
      email: "",
      city: "",
      street: "",
      userTypeId: "",
    },
  });

  useEffect(() => {
    // Fetch user data based on userId
    async function fetchUserData() {
      const data = await fetchUserById(Number(userId));
      setUserData(data);
      form.reset({
        family_name: data.family_name || "",
        first_name: data.first_name || "",
        birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
        sex: data.sex || "",
        phone_number: data.phone_number || "",
        email: data.email || "",
        city: data.city || "",
        street: data.street || "",
        userTypeId: data.user_type.id ? String(data.user_type.id) : "",
      });
    }

    if (userId) {
      fetchUserData();
    }
  }, [userId, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      // Map form values to UpdateUserDto
      const updateUserDto = {
        firstName: values.first_name,
        familyName: values.family_name, // Changed from last_name
        email: values.email,
        phoneNumber: values.phone_number, // Changed from phone
        birthDate: values.birthDate.toISOString(),
        sex: values.sex, 
        city: values.city,
        street: values.street, // Changed from address
        userTypeId: parseInt(values.userTypeId, 10), 
      };

      // Call the update API endpoint
      const response = await updateUser(Number(userId), updateUserDto);

      if (!response) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update user");
      }

      setSuccess("Utilisateur mis à jour avec succès !");
    } catch (error) {
      console.error("Error updating user:", error);
      setError(
        error instanceof Error ? error.message : "Failed to update user"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }


  return (
    <div className="max-w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
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
                    <FormLabel className="text-gray-700 font-medium">
                      Nom
                    </FormLabel>
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
                name="birthDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Date de naissance
                    </FormLabel>
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
                                <rect
                                  width="18"
                                  height="18"
                                  x="3"
                                  y="4"
                                  rx="2"
                                  ry="2"
                                />
                                <line x1="16" x2="16" y1="2" y2="6" />
                                <line x1="8" x2="8" y1="2" y2="6" />
                                <line x1="3" x2="21" y1="10" y2="10" />
                              </svg>
                            </span>
                            <Input
                              placeholder="Choisir une date"
                              value={
                                field.value
                                  ? field.value.toLocaleDateString()
                                  : ""
                              }
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
                    <FormLabel className="text-gray-700 font-medium">
                      Adresse Email
                    </FormLabel>
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
                    <FormLabel className="text-gray-700 font-medium">
                      Ville
                    </FormLabel>
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

            {/* Second column */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Prénom
                    </FormLabel>
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
                    <FormLabel className="text-gray-700 font-medium">
                      N. Tel
                    </FormLabel>
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
                    <FormLabel className="text-gray-700 font-medium">
                      Sexe
                    </FormLabel>
                    <FormControl>
                      <select
                        className="bg-gray-50 rounded-md border-gray-200 p-2 h-12 w-full"
                        {...field}>
                        <option value="">Sélectionner le sexe</option>
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
                      {...field}
                    >
                      <option value="">Sélectionner un type</option>
                      {userTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.label}
                        </option>
                      ))}
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
              className="bg-black hover:bg-gray-700 text-white px-8 py-2 rounded-md"
              disabled={isSubmitting}>
              {isSubmitting ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </div>
        </form>
      </Form>
      {/* Password Update Section */}
      <Form {...passwordForm}>
        <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {passwordSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {passwordSuccess}
            </div>
          )}

          <div className="mt-8 space-y-4 bg-white rounded-md border border-gray-200 shadow-md p-4">
            <h2 className="text-lg font-medium text-gray-700">
              Mettre à jour le mot de passe
            </h2>
            <div>
              <FormField
                control={passwordForm.control}
                name="current_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Mot de passe actuel
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showCurrentPassword ? "text" : "password"}
                          placeholder="Mot de passe actuel"
                          className="bg-gray-50 rounded-md border-gray-200 p-2 h-12"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                          onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                          }>
                          {showCurrentPassword ? <FaEye /> : <FaEyeSlash />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={passwordForm.control}
                name="new_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Nouveau mot de passe
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Nouveau mot de passe"
                          className="bg-gray-50 rounded-md border-gray-200 p-2 h-12"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                          onClick={() => setShowNewPassword(!showNewPassword)}>
                          {showNewPassword ? <FaEye /> : <FaEyeSlash />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={passwordForm.control}
                name="confirm_new_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Confirmer le nouveau mot de passe
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmNewPassword ? "text" : "password"}
                          placeholder="Confirmer le nouveau mot de passe"
                          className="bg-gray-50 rounded-md border-gray-200 p-2 h-12"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                          onClick={() =>
                            setShowConfirmNewPassword(!showConfirmNewPassword)
                          }>
                          {showConfirmNewPassword ? <FaEye /> : <FaEyeSlash />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="bg-black hover:bg-gray-700 text-white px-8 py-2 rounded-md mt-4"
                disabled={isSubmitting}>
                {isSubmitting
                  ? "Mise à jour en cours..."
                  : "Confirmer la mise à jour du mot de passe"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
