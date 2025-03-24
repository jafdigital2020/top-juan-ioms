import * as z from "zod";

//employee
export const employeeUserSchema = z.object({
  user_id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  address: z.string().nullable(),
  phone: z.string().nullable(),
  password: z.string(),
  role_id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  is_active: z.boolean(),
  employeeInfo: z.object({
    employee_id: z.number(),
    user_id: z.number(),
    job_title: z.string(),
    date_of_joining: z.string(),
    contact_number: z.string(),
    emergency_contact_name: z.string(),
    emergency_contact_number: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
  }),
});

export type EmployeeUserType = z.infer<typeof employeeUserSchema>;

// franchisee

export const franchiseUserSchema = z.object({
  user_id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  address: z.string(),
  phone: z.string(),
  password: z.string(),
  role_id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  is_active: z.boolean(),
  outlets: z.array(
    z.object({
      outlet_id: z.number(),
      franchisee_id: z.number(),
      franchise_name: z.string(),
      address: z.string(),
      city: z.string(),
      province: z.string(),
      status: z.string(),
      created_at: z.string(),
      updated_at: z.string(),
    })
  ),
  contracts: z.array(
    z.object({
      contract_id: z.number(),
      agreement_start: z.string(),
      agreement_end: z.string(),
      status: z.string(),
      document_url: z.string().url().optional().nullable(),
      created_at: z.string(),
      updated_at: z.string(),
      franchisee_id: z.number(),
    })
  ),
});

export type FranchiseUserType = z.infer<typeof franchiseUserSchema>;

// inventory

export const inventorySchema = z.object({
  inventory_id: z.number(),
  product_id: z.number(),
  quantity_in_stock: z.number(),
  reorder_level: z.number(),
  status: z.enum(["ACTIVE", "LOW_STOCK", "OUT_OF_STOCK"]),
  created_at: z.string(),
  updated_at: z.string(),
  product_name: z.string(),
  specification: z.string(),
  price_per_unit: z.string(),
  category_name: z.string(),
  product_categories: z
      .array(
        z.object({
          product_category_id: z.number().int(),
        })
      )
      .default([]),
  product_image: z.string(),
});

export type InventoryType = z.infer<typeof inventorySchema>;

// orders
export const franchiseOrderSchema = z.object({
  order_id: z.number(),
  franchisee_id: z.number(),
  franchise_name: z.string(),
  product_name: z.string(),
  amount: z.number(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type FranchiseOrderType = z.infer<typeof franchiseOrderSchema>;

export const orderItemSchema = z.object({
  order_item_id: z.number(),
  product_id: z.number(),
  quantity: z.number(),
  unit_price: z.string(),
  discount_applied: z.string(),
  total_price: z.string(),
  product_name: z.string(),
});

// processed orders / queue
export const processedOrderSchema = z.object({
  order_id: z.number(),
  order_status: z.string(),
  payment_status: z.string(),
  total_amount: z.string(),
  placed_at: z.string(),
  outlet_franchise_name: z.string(),
  orderItems: z.array(orderItemSchema),
  shipment_status: z.string().nullable().optional(),
});

export type ProcessedOrderType = z.infer<typeof processedOrderSchema>;

// shipment tracking
export const shipmentTrackingSchema = z.object({
  tracking_id: z.number(),
  shipment_id: z.number(),
  status: z.string(),
  location: z.string(),
  description: z.string(),
  timestamp: z.string(),
});

// shipped orders
export const shippedOrderSchema = z.object({
  order_id: z.number(),
  order_status: z.string(),
  total_amount: z.string(),
  placed_at: z.string(),
  updated_at: z.string(),
  orderItems: z.array(orderItemSchema),
  tracking_number: z.string().nullable(),
  shipmentTrackings: z.array(shipmentTrackingSchema),
  outlet_franchise_name: z.string(),
  outlet_address: z.string(),
});

export type ShippedOrderType = z.infer<typeof shippedOrderSchema>;

// delivered orders
export const deliveredOrderSchema = z.object({
  order_id: z.number(),
  order_status: z.string(),
  total_amount: z.string(),
  placed_at: z.string(),
  updated_at: z.string(),
  orderItems: z.array(orderItemSchema),
  tracking_number: z.string().nullable(),
  shipmentTrackings: z.array(shipmentTrackingSchema),
  outlet_franchise_name: z.string(),
  outlet_address: z.string(),
  payment_method_name: z.string(),
});

export type deliveredOrderType = z.infer<typeof deliveredOrderSchema>;

//products
export const productSchema = z.object({
  product_id: z.number().int(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/), // Decimal with 2 decimal places
  purchase_amount: z.string().regex(/^\d+(\.\d{1,2})?$/), // Decimal with 2 decimal places
  sku: z.string(),
  image_path: z.string().nullable(),
  category_id: z.number().int(),
  created_at: z.string().default(() => new Date().toISOString()),
  updated_at: z.string().default(() => new Date().toISOString()),
});

export type ProductType = z.infer<typeof productSchema>;


//
export const transactionSchema = z.object({
  transaction_id: z.number().int(),
  order_id: z.number().int(),
  total_amount: z.string().regex(/^\d+(\.\d{1,2})?$/), // Decimal with 2 decimal places
  payment_status: z.string(),
  placed_at: z.string(),
  transaction_date: z.string(),
  customer_name: z.string(),
  franchise_name: z.string(),
  franchise_location: z.string(),
  payment_method: z.string(),
  payments: z.array(
    z.object({
      amount_paid: z.string().regex(/^\d+(\.\d{1,2})?$/), // Decimal with 2 decimal places
      payment_date: z.string(),
      payment_status: z.string(),
    })
  ),
});

export type TransactionType = z.infer<typeof transactionSchema>;
