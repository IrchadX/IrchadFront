import { ColumnDef } from "@tanstack/react-table"
import { Device } from "@/data/dispositifs"
import { Edit, Trash2, Ban } from "lucide-react"
import { Button } from "@/components/shared/button"

export const columns: ColumnDef<Device>[] = [
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
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const device = row.original;
      
      return (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => handleEdit(device.id, device.user_id)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleDelete(device.id, device.user_id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleBlock(device.id, device.user_id)}>
            <Ban className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];

function handleEdit(deviceId: number, userId: number) {
  console.log(`Edit device ${deviceId} for user ${userId}`);
}

function handleDelete(deviceId: number, userId: number) {
  console.log(`Delete device ${deviceId} for user ${userId}`);
}

function handleBlock(deviceId: number, userId: number) {
  console.log(`Block device ${deviceId} for user ${userId}`);
}