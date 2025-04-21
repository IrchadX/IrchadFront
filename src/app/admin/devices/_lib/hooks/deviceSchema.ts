import * as z from "zod";

export const deviceFormSchema = z.object({
  software_version: z.string().min(1, { message: "Software version is required." }),
  date_of_service: z.string().min(1, { message: "Date of service is required." }),
  mac_address: z
  .string()
  .regex(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/, {
    message: "Adresse MAC invalide (format attendu : XX:XX:XX:XX:XX:XX)",
  }),  battery_capacity: z.string().min(1, { message: "Battery capacity is required." }),
  type_id: z.string().min(1, { message: "Device type is required." }),
  state_type_id: z.string().min(1, { message: "State type is required." }),
  user_id: z.string().optional(), 
  comm_state: z.boolean().optional(), 
});

export const defaultValues= {
    software_version: "",
    date_of_service: "",
    mac_address: "",
    battery_capacity: "",
    type_id: "",
    state_type_id: "",
    user_id: "",
    comm_state: true,
  }