import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

import { Checkbox } from "@/components/ui/checkbox";
import { inventoryStatus } from "@/app/_lib/inventory-stock-status";
import { productcategory } from "@/app/_lib/product-category-filter";
import { InventoryDataTableRowActions } from "./inventory-table-row-actions";
import { InventoryType } from "@/app/schema";

export const columns: ColumnDef<InventoryType>[] = [
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
    accessorKey: "product_image",
    header: ({ column }) => <DataTableColumnHeader column={column} title="" />,
    cell: ({ row }) => {
      const productImage = row.getValue("product_image") as string | undefined;

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
    accessorKey: "inventory_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product ID" />
    ),
    cell: ({ row }) => (
      <div className="w-20">{row.getValue("inventory_id")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "product_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Name" />
    ),
    cell: ({ row }) => row.getValue("product_name"),
  },
  {
    accessorKey: "quantity_in_stock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity in Stock" />
    ),
    cell: ({ row }) => row.getValue("quantity_in_stock"),
  },
  {
    accessorKey: "reorder_level",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reorder Level" />
    ),
    cell: ({ row }) => row.getValue("reorder_level"),
  },
  {
    accessorKey: "price_per_unit",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price per unit" />
    ),
    cell: ({ row }) => row.getValue("price_per_unit"),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = inventoryStatus.find(
        (status) => status.value === row.original.status
      );

      if (!status) return null;

      const Icon = status.icon;

      let colorClass = "";
      switch (status.value) {
        case "ACTIVE":
          colorClass = "text-green-500";
          break;
        case "LOW_STOCK":
          colorClass = "text-yellow-500";
          break;
        case "OUT_OF_STOCK":
          colorClass = "text-red-500";
          break;
        default:
          colorClass = "text-gray-500";
      }

      return (
        <div className="flex w-[6.25rem] items-center">
          <Icon className={`mr-2 size-4 ${colorClass}`} aria-hidden="true" />
          <span className="capitalize">{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return Array.isArray(value) && value.includes(row.getValue(id));
    },
  },
  // {
  //   accessorKey: "category_name",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Item Group" />
  //   ),
  //   cell: ({ row }) => row.getValue("category_name"),
  // },
  // {
  //   accessorKey: "product_categories",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Product Category" />
  //   ),
  //   cell: ({ row }) => row.getValue("product_categories"),
  // },
  {
    accessorKey: "specification",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Specification" />
    ),
    cell: ({ row }) => row.getValue("specification"),
  },
  {
    accessorKey: "product_categories",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Categories" />
    ),
    cell: ({ row }) => {
      const categories = row.getValue("product_categories") as Array<{
        category_name: string;
      }>;
      if (!categories || categories.length === 0) return null;

      return (
        <div className="flex flex-wrap space-x-2">
          {categories.map((category) => {
            const categoryData = productcategory.find(
              (cat) => cat.value === category.category_name
            );
            return categoryData ? (
              <span
                key={category.category_name}
                className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full"
              >
                {categoryData.label}
              </span>
            ) : null;
          })}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      // Filter rows based on selected categories
      const categories = row.getValue(id) as Array<{ category_name: string }>;
      return categories?.some(
        (category) => value.includes(category.category_name) // Check if any category_name matches the selected filter values
      );
    },
  },
  //   {
  //     accessorKey: "created_at",
  //     header: ({ column }) => (
  //       <DataTableColumnHeader column={column} title="Created At" />
  //     ),
  //     cell: ({ cell }) => formatDate(cell.getValue() as Date),
  //   },
  //   {
  //     accessorKey: "updated_at",
  //     header: ({ column }) => (
  //       <DataTableColumnHeader column={column} title="Updated At" />
  //     ),
  //     cell: ({ row }) => formatDate(row.getValue("updated_at") as Date),
  //   },

  // {
  //   accessorKey: "category_name",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Category" />
  //   ),
  //   cell: ({ row }) => row.getValue("category_name"),
  // },
  {
    id: "actions",
    header: () => <div>Actions</div>,
    cell: ({ row }) => <InventoryDataTableRowActions row={row} />,
  },
];
