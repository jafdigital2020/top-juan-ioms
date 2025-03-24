import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";

import { deliveredOrderType } from "@/app/schema";
import { DeliveredOrderDataTableRowActions } from "./delivered-orders-table-row-actions";

export const columns: ColumnDef<deliveredOrderType>[] = [
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
    accessorKey: "order_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order ID" />
    ),
    cell: ({ row }) => row.getValue("order_id"),
  },
  {
    accessorKey: "orderItems",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Products" />
    ),
    cell: ({ row }) => {
      const orderItems = row.getValue("orderItems") as {
        product_name: string;
        quantity: number;
      }[];
      return orderItems
        .map((item) => `${item.product_name} x${item.quantity}`)
        .join(", ");
    },
  },

  {
    accessorKey: "user_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Franchise Name" />
    ),
    cell: ({ row }) => row.getValue("user_name"),
  },

  {
    accessorKey: "total_amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => row.getValue("total_amount"),
  },
  {
    accessorKey: "tracking_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tracking ID" />
    ),
    cell: ({ row }) => row.getValue("tracking_number"),
  },
  {
    accessorKey: "order_status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => row.getValue("order_status"),
  },

  {
    id: "actions",
    header: () => <div>Actions</div>,
    cell: ({ row }) => <DeliveredOrderDataTableRowActions row={row} />,
  },
];
