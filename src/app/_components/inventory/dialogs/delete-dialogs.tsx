import { InventoryType } from "@/app/schema";
import AlertDialog from "@/components/alert-dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { toast } from "sonner";

type DeleteProps = {
  inventory: InventoryType;
  isOpen: boolean;
  showActionToggle: (open: boolean) => void;
};

export default function CancelOrderDialog({
  inventory,
  isOpen,
  showActionToggle,
}: DeleteProps) {
  const handleCancelOrder = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_PUBLIC_API_URL}/api/inventory/delete/${
          inventory.inventory_id
        }`,
        { withCredentials: true }
      );

      if (!res.data.success) {
        throw new Error(res.data.message || "An error occured");
      }
      toast.success("Order Cancelled !");
      showActionToggle(false);
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while deleting the inventory.");
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={showActionToggle}>
      <div className="text-center w-72 ">
        <Trash className="w-48 h-32 mx-auto block" />
        <h3 className="text-lg font-black text-gray-800">
          Are you sure you want to cancel this inventory?
        </h3>
        <p className="text-sm text-gray-500">
          Please note, this action can’t be undone. You can’t cancel the
          inventory for{" "}
          {/* <b>{inventory.product_name}</b> with inventory ID <b>{inventory.inventory_id}</b> once it has been processed. */}
        </p>
        <div className="flex justify-between mx-12 my-4">
          <Button
            onClick={() => showActionToggle(false)}
            className="text-white"
          >
            Cancel
          </Button>
          <Button onClick={handleCancelOrder} variant={"destructive"}>
            Confirm
          </Button>
        </div>
      </div>
    </AlertDialog>
  );
}
