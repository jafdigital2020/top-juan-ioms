import { type Table } from "@tanstack/react-table";

import { Input } from "@/components/ui/input";

import { DataTableViewOptionsTransactions } from "./transactions-table-view-options";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DatePicker from "@/components/ui/datepicker";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ORDER_METHODS, ORDER_STATUSES } from "@/data/order";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function TransactionsTableActionsToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex flex-col gap-2">
      {/* <div className="flex justify-between items-center">
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
      </div>


      <div>
  
        <DataTableViewOptionsTransactions table={table} />
      </div> */}

      <Card className="mb-5 p-5">
        <form className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4 lg:gap-6">
            <Input
              type="search"
              placeholder="Search Franchisee"
              value={
                (table
                  .getColumn("franchise_name")
                  ?.getFilterValue() as string) || ""
              }
              onChange={(e) => {
                table
                  .getColumn("franchise_name")
                  ?.setFilterValue(e.target.value);
              }}
              className="h-12 md:basis-1/5"
            />

            <Select>
              <SelectTrigger className="capitalize md:basis-1/5">
                <SelectValue placeholder="Status" />
              </SelectTrigger>

              <SelectContent>
                {ORDER_STATUSES.map((status) => (
                  <SelectItem
                    value={status}
                    key={status}
                    className="capitalize"
                  >
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="md:basis-1/5">
                <SelectValue placeholder="Limit" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="5">Last 5 days</SelectItem>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="14">Last 14 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="capitalize md:basis-1/5">
                <SelectValue placeholder="Method" />
              </SelectTrigger>

              <SelectContent>
                {ORDER_METHODS.map((method) => (
                  <SelectItem
                    value={method}
                    key={method}
                    className="capitalize"
                  >
                    {method}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <DataTableViewOptionsTransactions table={table} />
          </div>

          <div className="flex flex-col md:flex-row md:items-end gap-4 lg:gap-6">
            <div className="md:basis-[35%]">
              <Label className="text-muted-foreground font-normal">
                Start date
              </Label>
              <DatePicker />
            </div>

            <div className="md:basis-[35%]">
              <Label className="text-muted-foreground font-normal">
                End date
              </Label>
              <DatePicker />
            </div>

            <div className="flex flex-wrap sm:flex-nowrap gap-4 md:basis-[30%]">
              <Button size="lg" className="h-12 flex-grow text-white">
                Filter
              </Button>
              <Button
                size="lg"
                variant="outlineprimary"
                className="h-12 flex-grow"
              >
                Reset
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
