import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { FranchiseUserType } from "@/app/schema";
import { FranchiseDataTableRowActions } from "./franchise-table-row-actions";

export const columns: ColumnDef<FranchiseUserType>[] = [
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
    accessorKey: "user_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User ID" />
    ),
    cell: ({ row }) => row.getValue("user_id"),
  },
  {
    accessorFn: (row) => `${row.first_name} ${row.last_name}`,
    id: "full_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Full Name" />
    ),
    cell: ({ row }) => row.getValue("full_name"),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => row.getValue("phone"),
  },
  {
    accessorKey: "franchise_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Franchise Name" />
    ),
    cell: ({ row }) => {
      const outlets = row.original.outlets;
      return outlets.length > 0 ? outlets[0].franchise_name : "N/A";
    },
  },
  {
    accessorKey: "franchise_address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Franchise Address" />
    ),
    cell: ({ row }) => {
      const outlets = row.original.outlets;
      return outlets.length > 0 ? outlets[0].address : "N/A";
    },
  },
  {
    id: "actions",
    header: () => <div>Actions</div>,
    cell: ({ row }) => <FranchiseDataTableRowActions row={row} />,
  },
];
