import { type Table } from "@tanstack/react-table";

import { Input } from "@/components/ui/input";

import { DataTableViewOptionsOrderQueue } from "./orders-queue-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function OrderQueueTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  // const [dialogContent, setDialogContent] = useState<React.ReactNode | null>(
  //   null
  // );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="px-1 pt-4">
          <Input
            placeholder="Search Orders"
            value={
              (table.getColumn("order_id")?.getFilterValue() as string) || ""
            }
            onChange={(e) => {
              table.getColumn("order_id")?.setFilterValue(e.target.value);
            }}
            className="h-8 w-[150px] lg:w-[250px]"
          />
        </div>
        <div>
          {" "}
          <DataTableViewOptionsOrderQueue table={table} />
        </div>
      </div>

      {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}
    </div>
  );
}
