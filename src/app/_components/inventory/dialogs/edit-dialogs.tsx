import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Label } from "recharts";

type EditProps = {
  inventory: {
    inventory_id: number;
    quantity_in_stock: number;
    reorder_level: number;
    specification: string;
    product_id: number;
  };
};

const editSchema = z.object({
  inventory_id: z.number(),
  product_id: z.number(),
  quantity_in_stock: z
    .number()
    .min(0, { message: "Quantity must be a positive number" }),
  reorder_level: z
    .number()
    .min(0, { message: "Reorder level must be a positive number" }),
  specification: z.string().min(1, { message: "Specification is required" }),
});

type editSchemaType = z.infer<typeof editSchema>;

export default function InventoryEditDialog({ inventory }: EditProps) {
  const form = useForm<editSchemaType>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      inventory_id: inventory.inventory_id,
      quantity_in_stock: 0,
      reorder_level: inventory.reorder_level,
      specification: inventory.specification,
      product_id: inventory.product_id,
    },
  });

  async function onSubmit(values: editSchemaType) {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_PUBLIC_API_URL}/api/inventory/item/${
          values.inventory_id
        }`,
        values
      );
      if (response.status === 200) {
        toast.success("Inventory updated successfully!");
        console.log(response.data);
      } else {
        toast.error("Failed to update inventory.");
      }
    } catch (error) {
      toast.error("An error occurred while updating the inventory.");
    }
  }

  return (
    <div>
      <DialogHeader>
        <DialogTitle>Edit Inventory Details</DialogTitle>
      </DialogHeader>
      <div className="py-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
            <FormField
              control={form.control}
              name="quantity_in_stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity in Stock</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-sm text-gray-600">
              Qty Available: {inventory.quantity_in_stock}
            </p>
            <Label>Reorder Level</Label>
            <FormField
              control={form.control}
              name="reorder_level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reorder Level</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specification</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mt-2 w-full bg-primary text-white hover:bg-primary-foreground"
            >
              Update Details
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
