import { z } from "zod";
import { DialogHeader } from "../../../../components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
const productSchema = z.object({
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

type viewProps = {
  product: ProductType;
};

export default function ProductViewDialog({ product }: viewProps) {
  return (
    <div className="p-6 bg-white rounded-lg">
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold">View Details</DialogTitle>
      </DialogHeader>
      <div className="py-4"></div>
        <img src={product.image_path || ''} alt={product.name} className="w-full h-auto mb-4 rounded" />
        <h2 className="text-lg font-medium">{product.name}</h2>
        <p className="text-sm text-gray-600">Price: {product.price}</p>
        <p className="text-sm text-gray-600">SKU: {product.sku}</p>
        <p className="text-sm text-gray-600">Category ID: {product.category_id}</p>
        <p className="text-sm text-gray-600">Description: {product.description}</p>
      </div>
  );
}
