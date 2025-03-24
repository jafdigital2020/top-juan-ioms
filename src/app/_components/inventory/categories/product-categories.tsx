import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

const productCategorySchema = z.object({
  category_name: z
    .string()
    .min(1, "Category name is required")
    .max(100, "Category name cannot exceed 100 characters"),
  description: z.string().optional(),

});

type ProductCategorySchemaType = z.infer<typeof productCategorySchema>;

export default function AddNewProductCategory() {


  const form = useForm<ProductCategorySchemaType>({
    resolver: zodResolver(productCategorySchema),
    defaultValues: {
      category_name: "",
      description: "",
   
    },
  });

  const onSubmit = async (data: ProductCategorySchemaType) => {
    console.log("Form Values:", data);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PUBLIC_API_URL}/api/product/category`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add category");
      }

      toast.success("New Product Category Successfully Added");
      form.reset()
    } catch (err) {
      console.log(err);
      throw Error("An error occurred while adding the category.");
    }
  };

  return (
    <div className="h-auto">
      <DialogHeader>
        <DialogTitle className="mb-2">Add New Category</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="category_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  {form.formState.errors.category_name && <FormMessage />}
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
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              className="mt-4 bg-primary hover:bg-primary-700 text-white"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
