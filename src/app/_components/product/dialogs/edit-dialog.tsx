import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type EditProps = {
  product: {
    product_id: number;
    name: string;
    description: string | null;
    price: string;
    sku: string;
    image_path: string | null;
    category_id: number;
  };
};
const editSchema = z.object({
  product_id: z.number(),
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/).min(0, { message: "Price must be a positive number" }),
  sku: z.string().min(1, { message: "SKU is required" }),
  image_path: z.string().url({ message: "Invalid URL" }),
  category_id: z.number(),
});

type editSchemaType = z.infer<typeof editSchema>;

export default function ProductEditDialog({ product }: EditProps) {
  const form = useForm<editSchemaType>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      product_id: product.product_id,
      name: product.name,
      description: product.description ?? undefined,
      price: product.price,
      sku: product.sku,
      image_path: product.image_path ?? undefined,
      category_id: product.category_id,
    },
  });

  async function onSubmit(values: editSchemaType) {
    const updatedValues = {
      ...values,
      price: parseFloat(values.price),
    };

    try {
      const response = await axios.put(`${import.meta.env.VITE_PUBLIC_API_URL}/api/product/${updatedValues.product_id}`, updatedValues);
      if (response.status === 200) {
        toast.success("Product updated successfully!");
        console.log(response.data);
      } else {
        toast.error("Failed to update product.");
      }
    } catch (error) {
      toast.error("An error occurred while updating the product.");
    }
  }

  return (
    <div>
      <DialogHeader>
        <DialogTitle>Edit Product Details</DialogTitle>
      </DialogHeader>
      <div className="py-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
           <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                    <Input
                      type="text"
                      {...field}
                      onChange={(e) => {
                      let value = e.target.value;
                      if (!/^\d*\.?\d*$/.test(value)) {
                        return;
                      }
                      field.onChange(value);
                      }}
                    />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  )}
                />
            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SKU</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image_path"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category ID</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => {
                        let value = parseInt(e.target.value);
                        if (value < 0) {
                          value = 0;
                        }
                        field.onChange(isNaN(value) ? 0 : value);
                      }}
                    />
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
