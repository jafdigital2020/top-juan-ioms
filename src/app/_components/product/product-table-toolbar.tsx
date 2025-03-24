import { type Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";


import { DataTableViewOptionsInventory } from "./product-table-view-options";
import AddNewProductForm from "./add/add";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function ProductTableActions<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const [dialogContent, setDialogContent] = useState<React.ReactNode | null>(
    null
  );
  const handleAddClick = () => {
    setDialogContent(<AddNewProductForm />);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="px-1 pt-2">
          <Input
            placeholder="Search Product"
            value={
              (table.getColumn("name")?.getFilterValue() as string) ||
              ""
            }
            onChange={(e) => {
              table.getColumn("name")?.setFilterValue(e.target.value);
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
                Add Product
              </Button>
            </DialogTrigger>
            {dialogContent && <DialogContent>{dialogContent}</DialogContent>}
          </Dialog>
        </div>
      </div>
      <div className="flex justify-between items-center w-full">
        

        <div></div>
        <DataTableViewOptionsInventory table={table} />
      </div>
      {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}
    </div>
  );
}
