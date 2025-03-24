import { type Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddNewFranchiseeForm from "./add/add";
import { useState } from "react";
import { DataTableViewOptionsFranchisee } from "./franchise-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function FranchiseTableActionsToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const [dialogContent, setDialogContent] = useState<React.ReactNode | null>(
    null
  );
  const handleAddClick = () => {
    setDialogContent(<AddNewFranchiseeForm />);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="px-1 pt-2">
          <Input
            placeholder="Search Franchisee"
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
                Add Franchise
              </Button>
            </DialogTrigger>
            {dialogContent && <DialogContent>{dialogContent}</DialogContent>}
          </Dialog>
        </div>
      </div>

      {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}

      <div>
        {" "}
        <DataTableViewOptionsFranchisee table={table} />
      </div>
    </div>
  );
}
