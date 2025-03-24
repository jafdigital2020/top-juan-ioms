import { Kbd } from "@/components/kbd";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { exportTableToCSV } from "@/lib/export";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Table } from "@tanstack/react-table";

import { Download, LayoutIcon } from "lucide-react";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

const columnNames: { [key: string]: string } = {
  user_id: "UserID",
  full_name: "Full Name",
  phone: "Phone",
  franchise_name: "Franchise Name",
  franchise_address: "Address",
};

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptionsFranchisee<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const [open, setOpen] = useState(false);

  useHotkeys("shift+c", () => {
    setTimeout(() => setOpen(true), 100);
  });

  return (
    <div className="flex justify-end px-2">
      <div className="flex items-center gap-4">
        {" "}
        {/* Align the buttons horizontally */}
        {/* Export Button with Tooltip */}
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={() =>
                          exportTableToCSV(table, {
                            filename: "franchisee",
                            excludeColumns: ["select", "actions"],
                          })
                        } variant="outline" size="sm">
                  <Download className="mr-2 size-4" aria-hidden="true" /> Export
                </Button>
              </TooltipTrigger>
              <TooltipContent className="flex items-center gap-2 border bg-accent font-semibold text-foreground dark:bg-background/95 dark:backdrop-blur-md dark:supports-[backdrop-filter]:bg-background/40">
                Export csv
                <div>
                  <Kbd variant="outline" className="font-sans">
                    ⇧
                  </Kbd>{" "}
                  <Kbd variant="outline" className="font-sans">
                    E
                  </Kbd>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {/* Toggle Columns Dropdown Menu with Tooltip */}
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    aria-label="Toggle columns"
                    variant="outline"
                    size="sm"
                    className="hidden h-8 lg:flex"
                  >
                    <LayoutIcon className="mr-2 size-4" />
                    Columns
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent className="flex items-center gap-2 border bg-accent font-semibold text-foreground dark:bg-background/95 dark:backdrop-blur-md dark:supports-[backdrop-filter]:bg-background/40">
                Toggle columns
                <div>
                  <Kbd variant="outline" className="font-sans">
                    ⇧
                  </Kbd>{" "}
                  <Kbd variant="outline" className="font-sans">
                    C
                  </Kbd>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DropdownMenuContent align="end" className="w-[150px]">
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {table
              .getAllColumns()
              .filter(
                (column) =>
                  typeof column.accessorFn !== "undefined" &&
                  column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {columnNames[column.id] || column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
