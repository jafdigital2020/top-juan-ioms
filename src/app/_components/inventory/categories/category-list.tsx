import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

// Define an interface for the category data structure
interface Category {
  category_id: number;
  category_name: string;
  description: string;
}

const CategoryList = () => {
  // Initialize the state to hold the category data
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  // Fetch the category data when the component mounts
  const fetchCategoryList = async () => {
    try {
      // Fetch data from the API
      const response = await fetch(
        `${import.meta.env.VITE_PUBLIC_API_URL}/api/category`
      );
      const data = await response.json();

      // Check if the request was successful and update the state
      if (data.success?.code === 200) {
        setCategoryList(data.success.data);
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Call the fetchCategoryList function on component mount
  useEffect(() => {
    fetchCategoryList();
  }, []);

  return (
    <div className="flex flex-wrap">
      {categoryList.map((category) => (
        <div key={category.category_id} className="m-2 p-auto">
          <span className="flex items-center border pl-4 rounded-full text-sm font-semibold text-primary">
            {category.category_name}
            <Button variant="ghost" size="sm" className="ml-2 rounded-lg">
              <ChevronDown className="w-3 h-3" strokeWidth={1} />
            </Button>
          </span>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
