import { useEffect, useState } from "react";


import { DataTable } from "@/components/data-table/data-table";

import axios from "axios";

import { columns } from "./column";


import { ProcessedOrderType } from "@/app/schema";
import { OrderQueueTableToolbar } from "./orders-queue-table-toolbar";

export default function OrdersQueueTable({ ordersQueueCount }: { ordersQueueCount: (count: number) => void }) {
  const [ordersData, setOrdersData] = useState<ProcessedOrderType[]>([]);

  useEffect(() => {
    async function fetchOrderData() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_PUBLIC_API_URL}/api/order/queue`,
          { withCredentials: true }
        );

        if (res.status !== 200) {
          throw new Error("Failed to fetch data");
        }

        // Access the nested data field in the response
        const data = res.data.success.data;
        setOrdersData(data);
        ordersQueueCount(data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchOrderData();
  }, [ordersQueueCount]);

  return (
    <DataTable
      columns={columns}
      data={ordersData}
      ToolbarComponent={OrderQueueTableToolbar}
    />
  );
}
