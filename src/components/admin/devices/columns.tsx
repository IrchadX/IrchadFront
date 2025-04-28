import { ColumnDef } from "@tanstack/react-table";
import { Device } from "@/data/dispositifs";
import { Edit, Trash2, Ban } from "lucide-react";
import { Button } from "@/components/shared/button";

export const createColumns = (
  onEdit: (device: Device) => void,
  onDelete: (device: Device) => void,
  onBlock: (device: Device) => void
): ColumnDef<Device>[] => [
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "user_id",
    header: "User ID",
    meta: {
      hidden: true,
    },
  },
  {
    accessorKey: "state_type_id",
    header: "State Type ID",
    meta: {
      hidden: true,
    },
  },
  {
    accessorKey: "type_id",
    header: "Type ID",
    meta: {
      hidden: true,
    },
  },
  {
    accessorKey: "comm_state",
    header: "État de connexion",
  },
  {
    accessorKey: "battery",
    header: "Batterie",
  },
  {
    accessorKey: "last_position",
    header: "Dernière position",
  },
  {
    accessorKey: "actual_state",
    header: "État actuel",
  },
  {
    accessorKey: "client_name",
    header: "Prénom du client",
  },
  {
    accessorKey: "client_family_name",
    header: "Nom de famille du client",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const device = row.original;
      
      return (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => onEdit(device)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(device)}>
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onBlock(device)}>
            <Ban className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];


export const createColumns2 = (
  onAssign: (user_id: string, device_id:string) => void,
  onDelete: (device: Device) => void,
  onBlock: (device: Device) => void

): ColumnDef<Device>[] => [
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "state_type_id",
    header: "State Type ID",
    meta: {
      hidden: true,
    },
  },
  {
    accessorKey: "type_id",
    header: "Type ID",
    meta: {
      hidden: true,
    },
  },
  {
    accessorKey: "comm_state",
    header: "État de connexion",
  },
  {
    accessorKey: "battery_capacity",
    header: "Capacité de batterie",
  },
  {
    accessorKey: "actual_state",
    header: "État actuel",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const device = row.original;
      
      return (
        <div className="flex items-center justify-center gap-2">
          <p className="underline" onClick={() => onAssign(device.id ,device.user_id)}>
          Associer à un utilisateur
          </p>
          <Button variant="ghost" size="icon" onClick={() => onDelete(device)}>
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onBlock(device)}>
            <Ban className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];