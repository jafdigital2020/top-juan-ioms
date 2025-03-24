
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { processedOrderSchema } from "@/app/schema";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";


interface OrderQueueDataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function OrderQueueDataTableRowActions<TData>({
  row,
}: OrderQueueDataTableRowActionsProps<TData>) {
  const processOrder = processedOrderSchema.parse(row.original)
  const [loading, setLoading] = useState(false)
  const handleProcessOrder = async () => {
    try {
      setLoading(true)
      const res = await axios.post(`${import.meta.env.VITE_PUBLIC_API_URL}/api/order/process`, {
        order_id: processOrder.order_id,
        processed_by_user_id: 1,
      })
      console.log(res)
      toast("Order Processing")
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
  return (
    <>


      <Button onClick={handleProcessOrder} size={"sm"} variant="default" className="text-white" disabled={loading}>
        <span className="sr-only">Open menu</span>
        {loading ? "Processing..." : "Process Order"}
      </Button>
    </>
  );
}
