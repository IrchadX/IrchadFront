"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultValues } from "../_lib/hooks/deviceSchema";
import Link from "next/link";
import { DeviceService } from "../_lib/services/deviceService";
import { deviceFormSchema } from "../_lib/hooks/deviceSchema";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/shared/form";
import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/button";

const formSchema = deviceFormSchema ;
export default function DeviceForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deviceTypes, setDeviceTypes] = useState([]);
  const [deviceStates, setDeviceStates] = useState([]);
  const [users, setUsers] = useState([]);
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  useEffect(() => {
    const loadFormData = async () => {
      const [types, states, usersList] = await Promise.all([
        DeviceService.fetchDeviceTypes(),
        DeviceService.fetchDeviceStates(),
        DeviceService.fetchUsers()
      ]);
      
      setDeviceTypes(types);
      setDeviceStates(states);
      setUsers(usersList);
      console.log("deviceStates from backend:", states); // 🔍 What does this print?
      console.log("usersList from backend:", usersList); // 🔍 What does this print?
      console.log("deviceTypes from backend:", types); // 🔍 What does this print?
    };
    console.log('hrrrrrrrrrrrrrrrrrrre') ;
    console.log(deviceTypes) ;
    
    loadFormData();
    console.log(deviceTypes) ;
  }, []);

  // Form submission handler
  async function onSubmit(values) {
    
    const dataToSubmit = {
      ...values,
      comm_state: true,
      user_id: values.user_id === "" ? null : parseInt(values.user_id),
    };
    console.log("Form submitted wuuuuuuth values:", dataToSubmit);

    setIsSubmitting(true);
    
    try {
      await DeviceService.addDevice(dataToSubmit);
      alert('Device added successfully!');
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to add device. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  const DeviceTypeAndVersionRow = () => (
    <div className="flex gap-10">
      <FormField
        control={form.control}
        name="type_id"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Type d'appareil</FormLabel>
            <Select 
              onValueChange={field.onChange}
              value={field.value}
            >
              <SelectTrigger className="py-7 w-full bg-main/5 rounded-[8px] border border-black/30 focus:outline-none">
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                {deviceTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id.toString()}>
                    {type.type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="software_version"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Version du logiciel</FormLabel>
            <FormControl>
              <Input placeholder="1.1" {...field} className="py-7 bg-main/5 rounded-[8px] border border-black/30 w-full" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );

  const DateAndStateRow = () => (
    <div className="flex gap-10">
      <FormField
        control={form.control}
        name="date_of_service"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Date de mise en service</FormLabel>
            <FormControl className="relative w-full">
              <div>
                <Input
                  type="date"
                  {...field}
                  className="py-7 w-full bg-main/5 rounded-[8px] border border-black/30"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  📅
                </span>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="state_type_id"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Etat initial</FormLabel>
            <Select 
              onValueChange={field.onChange}
              value={field.value}
            >
              <SelectTrigger className="py-7 w-full bg-main/5 rounded-[8px] border border-black/30 focus:outline-none">
                <SelectValue placeholder="Sélectionner un état" />
              </SelectTrigger>
              <SelectContent>
                {deviceStates.map((state) => (
                  <SelectItem key={state.id} value={state.id.toString()}>
                    {state.state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );

  const MacAndBatteryRow = () => (
    <div className="flex gap-10">
      <FormField
        control={form.control}
        name="mac_address"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Adresse Mac</FormLabel>
            <FormControl className="relative w-full">
              <Input  
                placeholder="xx-xx-xx-xx-xx-xx"  
                {...field}
                className="py-7 w-full bg-main/5 rounded-[8px] border border-black/30"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="battery_capacity"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Capacité de la batterie</FormLabel>
            <FormControl className="relative w-full">
              <Input  
                placeholder="5000 mAh"  
                {...field}
                className="py-7 w-full bg-main/5 rounded-[8px] border border-black/30"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );

  const UserSelectRow = () => (
    <div className="flex gap-10">
      <FormField
        control={form.control}
        name="user_id"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Associer à un utilisateur (Optionnel)</FormLabel>
            <Select 
              onValueChange={field.onChange}
              value={field.value}
            >
              <SelectTrigger className="py-7 w-full bg-main/5 rounded-[8px] border border-black/30 focus:outline-none">
                <SelectValue placeholder="Sélectionner un utilisateur" />
              </SelectTrigger>
              <SelectContent>
               
                {users.length >0 && users.map((user) => (
                  <SelectItem key={user.id} value={user.id.toString()}>
                    {user.family_name}
                    {user.first_name }

                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
                <div className="flex-1"></div>

    </div>
  );
  
  return (
    <div>
      <div className="flex mb-2 justify-end gap-2">
        <Button className="px-8 font-montserrat tracking-wide">
          <Link href="/admin/devices">Retour</Link>
        </Button>
      </div>
      <div className="max-w-[70vw] relative mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mx-auto">
            <DeviceTypeAndVersionRow />
            <DateAndStateRow />
            <MacAndBatteryRow />
            <UserSelectRow />
            <Button 
              type="submit" 
              className="w-[180px] font-montserrat ml-auto py-6 flex justify-center items-center text-[15px] tracking-wide" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Soumission en cours..." : "Ajouter dispositif"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}