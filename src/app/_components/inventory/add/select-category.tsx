import { Badge } from "@/components/ui/badge";

import { MultiSelect } from "@/components/ui/multi-select";

import { Separator } from "@/components/ui/separator";
import axios from "axios";

import { useState, useEffect } from 'react';


interface ProductCategory {
    value: number;
    label: string;
  }
  
  export const fetchProductCategories = async (): Promise<ProductCategory[]> => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_PUBLIC_API_URL}/api/product/category`);
      const categories = response.data.success.data.map((category: any) => ({
        value: category.product_category_id,
        label: category.category_name,
      }));
      return categories;
    } catch (error) {
      console.error('Error fetching product categories:', error);
      return [];
    }
  };
  
  export const SelectedCategory = ({ title, selectedValues, setSelectedValues }: { title: string, selectedValues: Set<number>, setSelectedValues: (values: Set<number>) => void }) => {
    const [categories, setCategories] = useState<ProductCategory[]>([]);
  
    useEffect(() => {
      const getCategories = async () => {
        const fetchedCategories = await fetchProductCategories();
        setCategories(fetchedCategories);
      };
  
      getCategories();
    }, []);
  
    // Convert selectedValues Set to Array for MultiSelect component
    const selectedCategoryValues = Array.from(selectedValues);
  
    const handleCategoryChange = (newSelectedValues: string[]) => {
      const newSet = new Set(newSelectedValues.map((val) => parseInt(val)));  // Convert back to Set<number>
      setSelectedValues(newSet);
    };
  
    return (
      <div>
        <MultiSelect
          options={categories.map((category) => ({
            label: category.label,
            value: category.value.toString(),  // Convert value to string
          }))}
          onValueChange={handleCategoryChange}
          defaultValue={selectedCategoryValues.map((value) => value.toString())}  // Initialize with selected values
          placeholder={title}
          maxCount={3}
          animation={0.3}
        />
        {/* Display selected values */}
        {selectedValues.size > 0 && (
          <div className="flex space-x-2 mt-2">
            <Separator orientation="vertical" className="h-6" />
            <Badge variant="secondary" className="px-1 font-normal">
              {selectedValues.size} selected
            </Badge>
            <div className="flex space-x-1">
              {selectedValues.size > 2 ? (
                <Badge variant="secondary" className="px-1 font-normal">
                  {selectedValues.size} selected
                </Badge>
              ) : (
                categories
                  .filter((option) => selectedValues.has(option.value))
                  .map((option) => (
                    <Badge variant="default" key={option.value} className="px-1 font-normal text-white">
                      {option.label}
                    </Badge>
                  ))
              )}
            </div>
          </div>
        )}
      </div>
    );
  };