
import { z } from "zod";
import { DialogHeader } from "../../../../components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";



const inventorySchema = z.object({
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
  product_image: z.string(),
});

export type InventoryType = z.infer<typeof inventorySchema>;

type viewProps = {
  inventory: InventoryType;
};

export default function InventoryViewDialog({ inventory }: viewProps) {
  return (
    <div className="p-6 bg-white rounded-lg ">
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold">View Details</DialogTitle>
      </DialogHeader>
      <div className="py-4">
        <img src={inventory.product_image} alt={inventory.product_name} className="w-full h-auto mb-4 rounded" />
        <h2 className="text-lg font-medium">{inventory.product_name}</h2>
        <p className="text-sm text-gray-600">Price per unit: {inventory.price_per_unit}</p>
        <p className="text-sm text-gray-600">Category: {inventory.category_name}</p>
        <p className="text-sm text-gray-600">Quantity in stock: {inventory.quantity_in_stock}</p>
        <p className="text-sm text-gray-600">Reorder level: {inventory.reorder_level}</p>
        <p className="text-sm text-gray-600">Status: {inventory.status}</p>

      </div>
    </div>
  );
}
