import { type Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Kbd } from "@/components/kbd";
import { Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import AddNewEmployeeForm from "./add/add";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { exportTableToCSV } from "@/lib/export";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function EmployeeTableActions<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const [dialogContent, setDialogContent] = useState<React.ReactNode | null>(
    null
  );
  const handleAddClick = () => {
    setDialogContent(<AddNewEmployeeForm />);
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="px-1 pt-2">
          <Input
            placeholder="Search Employee"
            value={
              (table.getColumn("full_name")?.getFilterValue() as string) || ""
            }
            onChange={(e) => {
              table.getColumn("full_name")?.setFilterValue(e.target.value);
            }}
            className="h-8 w-[150px] lg:w-[250px]"
          />
        </div>
        <div>
          <Dialog>
            <DialogTrigger asChild onClick={handleAddClick}>
              <Button
                size={"sm"}
                variant={"outlineprimary"}
                className="text-primary-foreground dark:text-white"
              >
                Add Employee
              </Button>
            </DialogTrigger>
            {dialogContent && <DialogContent>{dialogContent}</DialogContent>}
          </Dialog>
        </div>
      </div>
      <div className="flex justify-between items-center w-full">
        <div></div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={() =>
          exportTableToCSV(table, {
            filename: "employees",
            excludeColumns: ["select", "actions"],
          })
        } variant="outline" size="sm" className="ml-auto">
                <Download   className="mr-2 size-4" aria-hidden="true" /> Export
              </Button>
            </TooltipTrigger>
            <TooltipContent className="flex items-center gap-2 border bg-accent font-semibold text-foreground dark:bg-background/95 dark:backdrop-blur-md dark:supports-[backdrop-filter]:bg-background/40">
              Export csv
              <div>
                <Kbd variant="outline" className="font-sans">
                  {" "}
                  ⇧{" "}
                </Kbd>{" "}
                <Kbd variant="outline" className="font-sans">
                  {" "}
                  E{" "}
                </Kbd>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div></div>
      </div>
      {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}
    </div>
  );
}
