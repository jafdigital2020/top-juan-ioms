import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";

import { DialogHeader, DialogTitle } from "../../../../components/ui/dialog";

import { orderItemSchema, ProcessedOrderType} from "@/app/schema";

type ViewProps = {
  order: ProcessedOrderType;
};

const editOrderSchema = z.object({
  order_id: z.number(),
  user_name: z.string(),
  order_status: z.string(),
  payment_status: z.string(),
  total_amount: z.string(),
  orderItems: z.array(orderItemSchema),

});

type ViewOrderSchemaType = z.infer<typeof editOrderSchema>;

export default function ViewProcessedOrderDialog({ order }: ViewProps) {
  const form = useForm<ViewOrderSchemaType>({
    resolver: zodResolver(editOrderSchema),
    defaultValues: {
      order_id: order.order_id,
      user_name: order.outlet_franchise_name,
      order_status: order.order_status,
      total_amount: order.total_amount,
      orderItems: order.orderItems,
    },
  });

  interface OrderItem {
    product_name: string;
    quantity: number;
    unit_price: string;
    total_price: string;
  }

  return (
    <div>
      <DialogHeader>
        <DialogTitle>Order Details</DialogTitle>
      </DialogHeader>
      <FormProvider {...form}>
        <div className="py-4">
        <FormField
          control={form.control}
          name="user_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employee</FormLabel>
              <FormControl>
                <Input type="text" {...field} readOnly />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="order_status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Order Status</FormLabel>
              <FormControl>
                <Input type="text" {...field} readOnly />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="total_amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Amount</FormLabel>
              <FormControl>
                <Input type="text" {...field} readOnly />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
        </div>

     

      </FormProvider>
      </div>
 
  );
}
