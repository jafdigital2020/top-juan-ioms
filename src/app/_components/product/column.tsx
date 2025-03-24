import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

import { Checkbox } from "@/components/ui/checkbox";

import {  ProductType } from "@/app/schema";
import { ProductDataTableRowActions } from "./product-table-row-actions";


export const columns: ColumnDef<ProductType>[] = [
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
    accessorKey: "image_path",
    header: ({ column }) => <DataTableColumnHeader column={column} title="" />,
    cell: ({ row }) => {
      const productImage = row.getValue("image_path") as string | undefined;

      return (
        <div className="flex space-x-2">
          {productImage && (
            <img src={productImage} alt="Product" className="h-8 w-8" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "product_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product ID" />
    ),
    cell: ({ row }) => (
      <div className="w-20">{row.getValue("product_id")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Name" />
    ),
    cell: ({ row }) => row.getValue("name"),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => row.getValue("description"),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => row.getValue("price"),
  },
  {
    accessorKey: "sku",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SKU" />
    ),
    cell: ({ row }) => row.getValue("sku"),
  },
  // {
  //   accessorKey: "created_at",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Created At" />
  //   ),
  //   cell: ({ row }) => row.getValue("created_at"),
  // },
  {
    accessorKey: "updated_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated At" />
    ),
    cell: ({ row }) => row.getValue("updated_at"),
  },
  {
    id: "actions",
    header: () => <div>Actions</div>,
    cell: ({ row }) => <ProductDataTableRowActions row={row} />,
  },
];
