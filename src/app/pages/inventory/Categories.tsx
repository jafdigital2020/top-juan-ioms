import AddNewCategory from "@/app/_components/inventory/categories/categories";
import CategoryList from "@/app/_components/inventory/categories/category-list";
import AddNewProductCategory from "@/app/_components/inventory/categories/product-categories";
import ProductCategoryList from "@/app/_components/inventory/categories/product-category-list";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LayoutGrid, Plus } from "lucide-react";
import { useState } from "react";

const Categories = () => {
  const [addCategoryDialog, setAddCategoryDialog] =
    useState<React.ReactNode | null>(null);
    const [addProductCategoryDialog, setAddProductCategoryDialog] =
    useState<React.ReactNode | null>(null);

  const handleAddNewCategories = () => {
    setAddCategoryDialog(<AddNewCategory />);
  };

  const handleAddNewProductCategories = () => {
    setAddProductCategoryDialog(<AddNewProductCategory />);
  };
  return (
    <div>
      <span className="text-2xl font-bold ">Categories</span>
      <div>
        <div className="w-auto h-44 border m-2 rounded-lg">
          <div className="flex justify-between">
            <div className="flex items-center  pt-4 px-3 ">
              <LayoutGrid className="w-4 h-4 mr-2 text-primary " />
              <p className="font-semibold text-sm dark:text-white">
                All Categories
              </p>
            </div>

            <div>
              <Dialog>
                <DialogTrigger asChild onClick={handleAddNewCategories}>
                  <Button
                    variant="ghost"
                    className=" px-6 text-sm text-primary-foreground dark:text-white "
                  >
                    <Plus className="w-4 h-4 mr-2 text-primary" /> Add
                    Categories
                  </Button>
                </DialogTrigger>
                {addCategoryDialog && (
                  <DialogContent>{addCategoryDialog}</DialogContent>
                )}
              </Dialog>
            </div>
          </div>
          <div className="pl-6">
            <CategoryList />
          </div>
        </div>
        <div className="w-auto h-44 border m-2 rounded-lg">
          <div className="flex justify-between">
            <div className="flex items-center  pt-4 px-3 ">
              <LayoutGrid className="w-4 h-4 mr-2 text-primary " />
              <p className="font-semibold text-sm dark:text-white">
                All Products Categories
              </p>
            </div>

            <div>
              <Dialog>
                <DialogTrigger asChild onClick={handleAddNewProductCategories}>
                  <Button
                    variant="ghost"
                    className=" px-6 text-sm text-primary-foreground dark:text-white "
                  >
                    <Plus className="w-4 h-4 mr-2 text-primary" /> Add
                  </Button>
                </DialogTrigger>
                {addProductCategoryDialog && (
                    <DialogContent>{addProductCategoryDialog}</DialogContent>
                  )}
              </Dialog>
            </div>
          </div>
          <div className="pl-6">
            <ProductCategoryList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
