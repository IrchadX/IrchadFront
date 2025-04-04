import { ColumnDef } from "@tanstack/react-table"
import { Device } from "@/data/dispositifs"


export const columns: ColumnDef<Device>[] = [
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "connection_state",
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
  ];
  