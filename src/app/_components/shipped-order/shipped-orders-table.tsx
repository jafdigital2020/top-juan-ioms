import { useEffect, useState } from "react";

import { DataTable } from "@/components/data-table/data-table";

import axios from "axios";

import { columns } from "./column";
import { FranchiseOrderType } from "@/app/schema";
import { ShippedOrdersTableToolbar } from "./shipped-orders-table-toolbar";

export default function ShippedOrdersTable() {
  const [ordersData, setOrdersData] = useState<FranchiseOrderType[]>([]);

  useEffect(() => {
    async function fetchOrderData() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_PUBLIC_API_URL}/api/order/shipped`,
          { withCredentials: true }
        );

        if (res.status !== 200) {
          throw new Error("Failed to fetch data");
        }

        // Access the nested data field in the response
        setOrdersData(res.data.success.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchOrderData();
  }, []);

  return (
    <DataTable
      columns={columns}
      data={ordersData}
      ToolbarComponent={ShippedOrdersTableToolbar}
    />
  );
}
