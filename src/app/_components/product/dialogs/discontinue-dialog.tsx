import { ProductType } from "@/app/schema";
import AlertDialog from "@/components/alert-dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

type DeleteProps = {
  product: ProductType;
  isOpen: boolean;
  showActionToggle: (open: boolean) => void;
};

export default function ProductDiscontinueDialog({
  product,
  isOpen,
  showActionToggle,
}: DeleteProps) {
  const handleDiscontinueProduct = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_PUBLIC_API_URL}/api/product/discontinue/${
          product.product_id
        }`,
        { withCredentials: true }
      );

      if (!res.data.success) {
        throw new Error(res.data.message || "An error occured");
      }

      showActionToggle(false);
      toast.success("Product discontinued successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to discontinue product");
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={showActionToggle}>
      <div className="text-center w-72 ">
        <h3 className="text-lg font-black text-gray-800">
          Are you sure you want to discontinue this item?
        </h3>
        <p className="text-sm text-gray-500">
          This action is reversible. You are about to discontinue{" "}
          <b>{product.name}</b>. Are you sure you want to proceed?
        </p>
        <div className="flex justify-between mx-12 my-4">
          <Button
            onClick={() => showActionToggle(false)}
            className="text-white"
          >
            Cancel
          </Button>
          <Button onClick={handleDiscontinueProduct} variant={"destructive"}>
            Discontinue
          </Button>
        </div>
      </div>
    </AlertDialog>
  );
}
