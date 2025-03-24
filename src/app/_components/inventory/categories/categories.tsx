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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categorySchema = z.object({
  category_name: z
    .string()
    .min(1, "Category name is required")
    .max(100, "Category name cannot exceed 100 characters"),
  description: z.string().optional(),
  item_type: z.string().min(1, "Item type is required"),
});

type CategorySchemaType = z.infer<typeof categorySchema>;

export default function AddNewCategory() {
  const itemTypes = [
    {
      value: "PRODUCT",
      label: "Product",
    },
    {
      value: "EQUIPMENT",
      label: "Equipment",
    },
  ];

  const form = useForm<CategorySchemaType>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      category_name: "",
      description: "",
      item_type: "",
    },
  });

  const onSubmit = async (data: CategorySchemaType) => {
    console.log("Form Values:", data);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PUBLIC_API_URL}/api/category`,
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

      toast.success("New Category Successfully Added");
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
            <FormField
              control={form.control}
              name="item_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select item type" />
                    </SelectTrigger>
                    <SelectContent>
                      {itemTypes.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.item_type && <FormMessage />}
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
