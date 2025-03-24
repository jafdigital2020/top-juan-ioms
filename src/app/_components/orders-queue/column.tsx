import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";



import { ProcessedOrderType } from "@/app/schema";
import { OrderQueueDataTableRowActions } from "./orders-queue-table-row-actions";


export const columns: ColumnDef<ProcessedOrderType>[] = [
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
    accessorKey: "outlet_franchise_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Outlet Franchise Name" />
    ),
    cell: ({ row }) => row.getValue("outlet_franchise_name"),
  },
  {
    accessorKey: "approved_by_user_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Franchisee" />
    ),
    cell: ({ row }) => row.getValue("approved_by_user_name"),
  },
  {
    accessorKey: "orderItems",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Products" />
    ),
    cell: ({ row }) => {
      const orderItems = row.getValue("orderItems") as { product_name: string, quantity: number }[];
      return orderItems.map((item) => `${item.product_name} x${item.quantity}`).join(", ");
        },
  },
  {
    accessorKey: "total_amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Amount" />
    ),
    cell: ({ row }) => row.getValue("total_amount"),
  },
  {
    accessorKey: "order_status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => row.getValue("order_status"),
  },
  {
    accessorKey: "placed_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Placed At" />
    ),
    cell: ({ row }) => row.getValue("placed_at"),
  },



  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => <OrderQueueDataTableRowActions row={row} />,
  },
];
