import { useEffect, useState } from "react";

import { DataTable } from "@/components/data-table/data-table";

import { columns } from "./column";
import { InventoryTableActions } from "./inventory-table-toolbar";
import axios from "axios";
import { InventoryType } from "@/app/schema";

export default function InventoryTable() {
  const [inventoryData, setInventoryData] = useState<InventoryType[]>([]);

  useEffect(() => {
    async function fetchInventoryData() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_PUBLIC_API_URL}/api/inventory/item`,
          { withCredentials: true }
        );

        if (res.status !== 200) {
          throw new Error("Failed to fetch data");
        }

        // Access the nested data field in the response
        setInventoryData(res.data.success.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchInventoryData();
  }, []);

  return (
    <DataTable
      columns={columns}
      data={inventoryData}
      ToolbarComponent={InventoryTableActions}
    />
  );
}
