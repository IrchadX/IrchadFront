"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ActionMenu } from "@/components/shared/action-menu";
import Link from "next/link";

export type Sale = {
  id: string;
  user_id : string;
  type: string;
  saleDate: string;
  price: string;
  offer: string;
  firstname: string;
  lastname: string;
  city: string;
};

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
    header: "Montant total",
  },
  {
    accessorKey: "user_id",
    header: "ID utilisateur",
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
  /*{
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <ActionMenu
        entityId={row.original.id}
        basePath="/commercial/sales"
        apiEndpoint="/sales"
      />
    ),
  },*/
  {
    id: "details",
    header: "Détails",
    cell: ({ row }) => (
      <Link
      href={`/commercial/sales/details?user_id=${row.original.user_id}&first_name=${row.original.firstname}&last_name=${row.original.lastname}&sale_date=${row.original.saleDate}`}
      className="text-main hover:underline"
    >
      Détails de l'offre
    </Link>
    ),
  },
];