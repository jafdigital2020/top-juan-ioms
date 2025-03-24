import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormItem,
  FormLabel,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";

import { DialogHeader, DialogTitle } from "../../../../components/ui/dialog";

import { orderItemSchema, ShippedOrderType } from "@/app/schema";
import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

type EditProps = {
  order: ShippedOrderType;
};

const editOrderSchema = z.object({
  order_id: z.number(),
  user_name: z.string(),
  order_status: z.string(),
  payment_status: z.string(),
  total_amount: z.string(),
  orderItems: z.array(orderItemSchema),
  outlet_franchise_name: z.string(),
  outlet_address: z.string(),
});

type EditOrderSchemaType = z.infer<typeof editOrderSchema>;

export default function EditShippedOrderDialog({ order }: EditProps) {
  const form = useForm<EditOrderSchemaType>({
    resolver: zodResolver(editOrderSchema),
    defaultValues: {
      order_id: order.order_id,
      user_name: order.outlet_franchise_name,
      order_status: order.order_status,
      total_amount: order.total_amount,
      outlet_franchise_name: order.outlet_franchise_name,
      outlet_address: order.outlet_address,
      orderItems: order.orderItems,
    },
  });

  interface OrderItem {
    product_name: string;
    quantity: number;
    unit_price: string;
    total_price: string;
  }

  const handleDeliveredOrder = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_PUBLIC_API_URL}/api/order/delivered-order`,
        { order_id: order.order_id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast("Order marked as delivered");
      } else {
        toast.error("Failed to mark order as delivered");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to mark order as delivered");
    }
  };
  return (
    <div>
      <DialogHeader>
        <DialogTitle>Order Details : {order.order_status}</DialogTitle>
      </DialogHeader>
      <FormProvider {...form}>

        <div className="flex justify-between space-x-4">
          <FormItem className="flex-1">
            <FormLabel>Outlet Franchise Name</FormLabel>
            <FormControl>
              <Input type="text" value={form.watch("outlet_franchise_name")} readOnly />
            </FormControl>
          </FormItem>
          <FormItem className="flex-1">
            <FormLabel>Employee</FormLabel>
            <FormControl>
              <Input type="text" value={form.watch("user_name")} readOnly />
            </FormControl>
          </FormItem>
        </div>

        <div className="py-2 space-y-4">

          <FormItem className="mt-2">
            <FormLabel>Outlet Address</FormLabel>
            <FormControl>
              <Textarea value={form.watch("outlet_address")} readOnly />
            </FormControl>
          </FormItem>
          <div>
            <FormLabel className="pb-4">Order Items</FormLabel>
            <div className="grid grid-cols-4 gap-1 text-sm font-semibold">
              <div>Product</div>
              <div>Qty</div>
              <div>Unit Price</div>
            </div>

          </div>
          {form.watch("orderItems").map((item: OrderItem, index: number) => (
            <div key={index}>
              <div className="grid grid-cols-4 gap-2 my-2 items-center">
                <span className="text-xs">{item.product_name}</span>
                <Input type="number" value={item.quantity} readOnly className="w-20" />
                <Input type="number" value={item.unit_price} readOnly className="w-20" />
                <Input type="number" value={item.total_price} readOnly className="w-20" />
              </div>
            </div>
          ))}
          <div className="flex justify-end px-">
            <span className="text-sm font-semibold">Total: {order.total_amount}</span>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button onClick={handleDeliveredOrder} variant={"default"} className="text-white" >Delivered</Button>
        </div>

      </FormProvider>
   
    </div>
  );
}
