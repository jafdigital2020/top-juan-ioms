
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectLabel, SelectSeparator, SelectGroup } from "@/components/ui/select"; 
import axios from "axios";

import { useState, useEffect } from 'react';

interface Product {
  value: number;
  label: string;
}

export const fetchProduct = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_PUBLIC_API_URL}/api/product`);
    const products = response.data.success.data.map((product: any) => ({
      value: product.product_id,
      label: product.name,
    }));
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const SelectedProduct = ({ title, selectedValue, setSelectedValue }: { title: string, selectedValue: number | null, setSelectedValue: (value: number | null) => void }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await fetchProduct();
      setProducts(fetchedProducts);
    };

    getProducts();
  }, []);

  const handleProductChange = (newValue: string) => {
    setSelectedValue(parseInt(newValue)); 
  };

  return (
    <div>
      <Select onValueChange={handleProductChange} value={selectedValue !== null ? selectedValue.toString() : ''}>
        <SelectTrigger>
          <SelectValue placeholder={title} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Product</SelectLabel>
            <SelectSeparator />
            {products.map((product) => (
              <SelectItem key={product.value} value={product.value.toString()}>
                {product.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      
      {/* Display selected product */}
      {/* {selectedValue && (
        <div className="flex space-x-2 mt-2">
          <Separator orientation="vertical" className="h-6" />
          <Badge variant="secondary" className="px-1 font-normal">
            {products.find((product) => product.value === selectedValue)?.label}
          </Badge>
        </div>
      )} */}
    </div>
  );
};
