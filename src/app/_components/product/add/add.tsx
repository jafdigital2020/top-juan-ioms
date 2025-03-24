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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Info, Plus } from "lucide-react";
import AddNewCategory from "../../inventory/categories/categories";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/),
  sku: z.string(),
  image_path: z.any().nullable(), // Adjusted to accept any file type
  category_id: z.preprocess((value) => Number(value), z.number().int()),
  purchase_amount: z.string().regex(/^\d+(\.\d{1,2})?$/),
});

type ProductType = z.infer<typeof productSchema>;

export default function AddNewProductForm() {
  const [categories, setCategories] = useState<
    { category_id: number; category_name: string }[]
  >([]);
  const [addCategoryDialog, setAddCategoryDialog] =
    useState<React.ReactNode | null>(null);

  const handleAddNewCategories = () => {
    setAddCategoryDialog(<AddNewCategory />);
  };

  const form = useForm<ProductType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      sku: "",
      image_path: null,
      category_id: 0,
      purchase_amount: "",
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_PUBLIC_API_URL}/api/category`
        );
        setCategories(response.data.success.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const onSubmit = async (data: ProductType) => {
    console.log("Form Values:", data);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("sku", data.sku);
      formData.append("category_id", data.category_id.toString());
      formData.append("purchase_amount", data.purchase_amount);
      if (data.image_path) {
        formData.append("image_path", data.image_path as File);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_PUBLIC_API_URL}/api/product`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast("Product added successfully:", response.data);
        form.reset();
      } else {
        console.error("Failed to add product:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div>
      <DialogHeader>
        <DialogTitle className="mb-2">Add New Item</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value ?? ""} />
                </FormControl>
                {form.formState.errors.name && <FormMessage />}
              </FormItem>
            )}
          />
          <div className="flex items-center space-x-4 y-2">
            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select
                      value={String(field.value)}
                      onValueChange={(value) => field.onChange(Number(value))}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.category_id}
                            value={String(category.category_id)}
                          >
                            {category.category_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {form.formState.errors.category_id && <FormMessage />}
                </FormItem>
              )}
            />
            <Dialog>
              <DialogTrigger asChild onClick={handleAddNewCategories}>
                <Button className="ml-4 mt-8 text-white">
                  {" "}
                  <Plus />{" "}
                </Button>
              </DialogTrigger>
              {addCategoryDialog && (
                <DialogContent>{addCategoryDialog}</DialogContent>
              )}
            </Dialog>
          </div>

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center space-x-2 pt-4">
                  <span>Price</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        {" "}
                        <Info className="h-3 w-3" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Selling price amount</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>
                <FormControl>
                  <Input {...field} value={field.value ?? ""} />
                </FormControl>
                {form.formState.errors.price && <FormMessage />}
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
                  <Input {...field} value={field.value ?? ""} />
                </FormControl>
                {form.formState.errors.sku && <FormMessage />}
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
                  <Input {...field} value={field.value ?? ""} />
                </FormControl>
                {form.formState.errors.description && <FormMessage />}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image_path"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Attach Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        field.onChange(file); // Pass the file directly
                      }
                    }}
                  />
                </FormControl>
                {form.formState.errors.image_path && <FormMessage />}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="purchase_amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center space-x-2 pt-4">
                  <span>Cost Amount of Product</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        {" "}
                        <Info className="h-3 w-3" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          This is the purchase amount or cost amount of the
                          product
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>
                <FormControl>
                  <Input {...field} value={field.value ?? ""} />
                </FormControl>
                {form.formState.errors.price && <FormMessage />}
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
