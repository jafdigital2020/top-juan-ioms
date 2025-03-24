import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { processedOrderSchema } from "@/app/schema";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import ViewWaybillOrderDialog from "./dialogs/waybill-dialogs";

interface ProcessOrderDataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function ProcessOrderDataTableRowActions<TData>({
  row,
}: ProcessOrderDataTableRowActionsProps<TData>) {
  const order = processedOrderSchema.parse(row.original);
  const [dialogContent, setDialogContent] = useState<React.ReactNode | null>(
    null
  );

  const handlePrintWaybill = () => {
    setDialogContent(<ViewWaybillOrderDialog order={order} />);
  };

  const [loading, setLoading] = useState(false);

  const handleShippedOrder = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_PUBLIC_API_URL}/api/order/shipped-order`,
        { order_id: order.order_id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast("Order shipped successfully!");
      } else {
        throw new Error("Failed to ship the order.");
      }
    } catch (error: any) {
      toast(
        error?.message || "An error occurred while processing the request."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <Button
          onClick={handleShippedOrder}
          size={"sm"}
          variant="default"
          className="text-white"
          disabled={loading}
        >
          <span className="sr-only">Open menu</span>
          {loading ? "Processing..." : "Ship"}
        </Button>

        <Dialog>
          <DialogTrigger asChild onClick={handlePrintWaybill}>
            <Button size={"sm"} variant="default" className="text-white mx-2">
              Print Waybill
            </Button>
          </DialogTrigger>
          {dialogContent && <DialogContent>{dialogContent}</DialogContent>}
        </Dialog>
      </div>
    </>
  );
}
