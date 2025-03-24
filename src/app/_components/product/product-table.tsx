import { useEffect, useState } from "react";

import { DataTable } from "@/components/data-table/data-table";

import { columns } from "./column";

import axios from "axios";
import { ProductType } from "@/app/schema";
import { ProductTableActions } from "./product-table-toolbar";

export default function ProductTable() {
  const [productData, setProductData] = useState<ProductType[]>([]);

  useEffect(() => {
    async function fetchProductData() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_PUBLIC_API_URL}/api/product`,
          { withCredentials: true }
        );

        if (res.status !== 200) {
          throw new Error("Failed to fetch data");
        }

        // Access the nested data field in the response
        setProductData(res.data.success.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchProductData();
  }, []);

  return (
    <DataTable
      columns={columns}
      data={productData}
      ToolbarComponent={ProductTableActions}
    />
  );
}
