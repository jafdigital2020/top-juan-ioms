import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { EmployeeDataTableRowActions } from "./employee-table-row-actions";
import { EmployeeUserType } from "@/app/schema";

export const columns: ColumnDef<EmployeeUserType>[] = [
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
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => row.getValue("email"),
  },
  {
    accessorFn: (row) => row.employeeInfo?.job_title,
    id: "job_title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Job Title" />
    ),
    cell: ({ row }) => row.getValue("job_title"),
  },
  {
    id: "actions",
    header: () => <div>Actions</div>,
    cell: ({ row }) => <EmployeeDataTableRowActions row={row} />,
  },
];
