import { useEffect, useState } from "react";

import { DataTable } from "@/components/data-table/data-table";



import axios from "axios";

import { columns } from "./column";

import { TransactionsTableActionsToolbar } from "./transactions-table-toolbar";
import { TransactionType } from "@/app/schema";

export default function TransactionsOrdersTable() {
  const [ordersData, setOrdersData] = useState<TransactionType[]>([]);

  useEffect(() => {
    async function fetchOrderData() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_PUBLIC_API_URL}/api/report/order/transactions`,
          { withCredentials: true }
        );

        if (res.status !== 200) {
          throw new Error("Failed to fetch data");
        }

        const responseData = res.data;
        if (responseData.success && responseData.success.code === 200) {
          setOrdersData(responseData.success.data);
        } else {
          throw new Error("Unexpected response structure");
        }
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
      ToolbarComponent={TransactionsTableActionsToolbar}
    />
  );
}
