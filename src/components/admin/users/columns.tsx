"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Client = {
  id: string
  firstname: string
  lastname: string
  city: string
  phone: string
  email: string
  helper: string
  phone_helper: string
  registrationDate: string 
}

export const columns: ColumnDef<Client>[] = [
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
