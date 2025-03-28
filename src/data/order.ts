export type OrderStatus = "pending" | "processing" | "delivered" | "cancel";
export type OrderMethod = "cash" | "card" | "credit";

export type Order = {
  id: string;
  invoiceNo: string;
  orderTime: Date | string;
  customerName: string;
  method: OrderMethod;
  amount: string;
  status: OrderStatus;
  subRows?: Order[];
};

export const ORDER_STATUSES: OrderStatus[] = [
  "pending",
  "processing",
  "delivered",
  "cancel",
];

export const ORDER_METHODS: OrderMethod[] = ["card", "cash", "credit"];
