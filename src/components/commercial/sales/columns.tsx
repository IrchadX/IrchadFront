"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ActionMenu } from "@/components/shared/action-menu"

export type Sale = {
  id: string
  type: string
  saleDate: string 
  price: string
  offer: string
  firstname: string
  lastname: string
  city: string
}

export const columns: ColumnDef<Sale>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "saleDate",
    header: "Date de vente",
  },
  {
    accessorKey: "price",
    header: "Montant",
  },
  {
    accessorKey: "offer",
    header: "Offre",
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
    accessorKey: "city",
    header: "Ville",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionMenu userId={row.original.id} basePath="/commercial/clients/users"/>, 
  },
];
