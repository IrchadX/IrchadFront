"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ActionMenu } from "@/components/shared/action-menu"

export type User = {
  id: string
  firstname: string
  lastname: string
  city: string
  phone: string
  email: string
  sexe: string
  age: string
  type: string
  registrationDate: string 
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "lastname",
    header: "Nom",
  },
  {
    accessorKey: "firstname",
    header: "Prénom",
  },
  {
    accessorKey: "age",
    header: "Âge",
  },
  {
    accessorKey: "sex",
    header: "Sexe",
  },
  {
    accessorKey: "city",
    header: "Ville",
  },
  {
    accessorKey: "phone",
    header: "Téléphone",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "userType",
    header: "Type d'utilisateur",
  },
  {
    accessorKey: "registrationDate",
    header: "Date d'inscription",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionMenu userId={row.original.id} />, 
  },
];
