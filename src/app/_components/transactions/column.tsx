import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";


import {  TransactionType } from "@/app/schema";
import { formatDate } from "@/lib/utils";

export const columns: ColumnDef<TransactionType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "transaction_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Transaction ID" />
    ),
    cell: ({ row }) => row.getValue("transaction_id"),
  },
  {
    accessorKey: "franchise_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Franchise Name" />
    ),
    cell: ({ row }) => row.getValue("franchise_name"),
  },
  {
    accessorKey: "total_amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Amount" />
    ),
    cell: ({ row }) => row.getValue("total_amount"),
  },
  {
    accessorKey: "payment_status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Status" />
    ),
    cell: ({ row }) => row.getValue("payment_status"),
  },

  {
    accessorKey: "transaction_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Transaction Date" />
    ),
    cell: ({ row }) => formatDate(row.getValue("transaction_date")),
  },


  {
    accessorKey: "franchise_location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Franchise Location" />
    ),
    cell: ({ row }) => row.getValue("franchise_location"),
  },

];
