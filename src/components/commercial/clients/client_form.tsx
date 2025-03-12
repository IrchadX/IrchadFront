"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/shared/button";
import { Calendar } from "@/components/shared/calendar";

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

const formSchema = z.object({
  last_name: z.string().nonempty(),
  first_name: z.string().nonempty(),
  birth_date: z.date(),
  phone: z.string().nonempty(),
  email: z.string().email(),
  address: z.string().nonempty(),
  last_name_helper: z.string().nonempty(),
  first_name_helper: z.string().nonempty(),
  phone_helper: z.string().nonempty(),
});

export function ClientForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      last_name: "",
      first_name: "",
      birth_date: new Date(),
      phone: "",
      email: "",
      address: "",
      last_name_helper: "",
      first_name_helper: "",
      phone_helper: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="max-w-full">      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {/* First column */}
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
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                                <line x1="16" x2="16" y1="2" y2="6" />
                                <line x1="8" x2="8" y1="2" y2="6" />
                                <line x1="3" x2="21" y1="10" y2="10" />
                              </svg>
                            </span>
                            <Input
                              placeholder="Choisir une date"
                              value={field.value ? field.value.toLocaleDateString() : ''}
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
                name="last_name_helper"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Nom de Aidant</FormLabel>
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
                name="phone_helper"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">N. Tel Aidant</FormLabel>
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
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Adresse</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Type your message here." 
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
                name="first_name_helper"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Prénom de Aidant</FormLabel>
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
            </div>
          </div>
          
          <div className="mt-8">
            <Button 
              type="submit" 
              className="bg-black hover:bg-gray-700 text-white px-8 py-2 rounded-md"
            >
              Enregistrer
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}