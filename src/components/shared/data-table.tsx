"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
} from "@tanstack/react-table";
import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shared/table";

import {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/shared/pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  columnVisibility?: VisibilityState;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  columnVisibility = {},
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [visibility, setVisibility] =
    useState<VisibilityState>(columnVisibility);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setVisibility,
    state: {
      columnFilters,
      columnVisibility: visibility,
    },
  });

  return (
    <div className="text-foreground bg-background">
      <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <Table>
          <TableHeader className="bg-[#2B7A78] dark:bg-[#1E4D4B] text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-none">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="py-3 text-white font-medium border-r border-teal-600 dark:border-teal-800 last:border-r-0">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="bg-[#F1F8F7] dark:bg-[#0F1F1E]">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="py-4 border-r border-gray-200 dark:border-gray-700 last:border-r-0">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-gray-500 dark:text-gray-400">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination className="mt-3 py-4 flex justify-end">
        <PaginationContent className="flex items-center space-x-1">
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                if (table.getCanPreviousPage()) {
                  table.previousPage();
                }
              }}
              className={`px-3 py-1 rounded-md border ${
                !table.getCanPreviousPage()
                  ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            />
          </PaginationItem>
          {Array.from({ length: table.getPageCount() }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={table.getState().pagination.pageIndex === index}
                onClick={() => table.setPageIndex(index)}
                className={`px-3 py-1 rounded-md border ${
                  table.getState().pagination.pageIndex === index
                    ? "bg-[#2B7A78] dark:bg-[#1E4D4B] text-white border-[#2B7A78] dark:border-[#1E4D4B]"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}>
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => table.nextPage()}
              className={`px-3 py-1 rounded-md border ${
                !table.getCanNextPage()
                  ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              } ${!table.getCanNextPage() ? "pointer-events-none" : ""}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
