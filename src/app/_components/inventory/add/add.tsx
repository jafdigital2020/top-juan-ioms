import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "../../../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select"; // Assuming you have a Select component
import { SelectedCategory } from "./select-category";
import { useState } from "react";
import { SelectedProduct } from "./select-product";
import { toast } from "sonner";


const inventorySchema = z.object({
  product_id: z.number(),
  quantity_in_stock: z.coerce.number(),
  reorder_level: z.coerce.number(),
  status: z.enum(["ACTIVE", "LOW_STOCK", "OUT_OF_STOCK"]),
  specification: z.string(),
  product_categories: z.array(z.number()),
});

type InventoryType = z.infer<typeof inventorySchema>;

interface Option {
  label: string;
  value: string | number;
}

export default function AddNewInventoryForm() {
  const [selectedCategories, setSelectedCategories] = useState<Set<number>>(new Set());
  const form = useForm<InventoryType>({
    resolver: zodResolver(inventorySchema),
    defaultValues: {
      product_id: 0,
      quantity_in_stock: 0,
      reorder_level: 0,
      status: "ACTIVE",
      specification: "",
      product_categories: [],
    },
  });

  // Option arrays for status and other fields
  const statusOptions: Option[] = [
    { value: "ACTIVE", label: "Active" },
    { value: "LOW_STOCK", label: "Low Stock" },
    { value: "OUT_OF_STOCK", label: "Out of Stock" },
  ];
  const onSubmit = async (data: InventoryType) => {
    // Convert quantity_in_stock and reorder_level to numbers
    const formData = {
      ...data,
      quantity_in_stock: Number(data.quantity_in_stock),
      reorder_level: Number(data.reorder_level),
    };

    console.log("Form Values:", formData);

    try {
      const response = await fetch(`${import.meta.env.VITE_PUBLIC_API_URL}/api/inventory/item`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log("API Response:", result);
      
      toast.success("New Inventory Item Successfully Added");
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error, e.g., show an error message
      toast.error("An error occurred while adding the inventory item.");
    }
  };

  return (
    <div>
      <DialogHeader>
        <DialogTitle className="mb-2">Add New Inventory Item</DialogTitle>
      </DialogHeader>
      <DialogDescription></DialogDescription>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
            control={form.control}
            name="product_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                
                  <SelectedProduct
                    title="Select Product"
                    selectedValue={Number(field.value) || 0}
                    setSelectedValue={(value) => field.onChange(Number(value) || 0)} 
                  />
                </FormControl>
                {form.formState.errors.product_id && <FormMessage />}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="product_categories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Categories</FormLabel>
                <FormControl>
                  <SelectedCategory
                    title="Select Categories"
                    selectedValues={selectedCategories}
                    setSelectedValues={(values) => {
                      setSelectedCategories(values);
                      field.onChange(Array.from(values));
                    }}
                  />
                </FormControl>
                {form.formState.errors.product_categories && <FormMessage />}
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="quantity_in_stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                {form.formState.errors.quantity_in_stock && <FormMessage />}
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
                  <Input {...field} />
                </FormControl>
                {form.formState.errors.specification && <FormMessage />}
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="reorder_level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reorder Level</FormLabel>
                <FormControl>
                <Input {...field} type="number" />
                </FormControl>
                {form.formState.errors.reorder_level && <FormMessage />}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={String(option.value)}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                {form.formState.errors.status && <FormMessage />}
              </FormItem>
            )}
          />




          <div className="flex justify-end">
            <Button
              type="submit"
              className="mt-4 bg-primary hover:bg-primary-foreground text-white"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
