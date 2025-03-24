import { type Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import AddNewInventoryForm from "./add/add";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

import { DataTableViewOptionsInventory } from "./inventory-table-view-options";
import { productcategory } from "@/app/_lib/product-category-filter";
import { useNavigate } from "react-router-dom";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function InventoryTableActions<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const [dialogContent, setDialogContent] = useState<React.ReactNode | null>(
    null
  );
  const handleAddClick = () => {
    setDialogContent(<AddNewInventoryForm />);
  };
  const isFiltered = table.getState().columnFilters.length > 0;
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="px-1 pt-2">
          <Input
            placeholder="Search Product"
            value={
              (table.getColumn("product_name")?.getFilterValue() as string) ||
              ""
            }
            onChange={(e) => {
              table.getColumn("product_name")?.setFilterValue(e.target.value);
            }}
            className="h-8 w-[150px] lg:w-[250px]"
          />
        </div>
        <div className="flex justify-between space-x-2">
          <div>
            <Button
              size={"sm"}
              variant={"default"}
              className="text-white"
              onClick={() => navigate("/inventory/report")}
            >
              Inventory Report
            </Button>
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
      </div>
      <div className="flex justify-between items-center w-full">
        <div>
          {table.getColumn("product_categories") && (
            <DataTableFacetedFilter
              column={table.getColumn("product_categories")}
              title="Product Category"
              options={productcategory}
            />
          )}
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3 "
            >
              Reset
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

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
