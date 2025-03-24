import { useState } from "react";
import { Row } from "@tanstack/react-table";
import { Clipboard, Edit, Eye, MoreHorizontal } from "lucide-react";

import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { shippedOrderSchema } from "@/app/schema";
import ViewOrderDialog from "./dialog/view-dialogs";
import EditShippedOrderDialog from "./dialog/edit-dialog";

interface OrderDataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function ShippedOrderDataTableRowActions<TData>({
  row,
}: OrderDataTableRowActionsProps<TData>) {
  const [dialogContent, setDialogContent] = useState<React.ReactNode | null>(
    null
  );
  const shippedOrder = shippedOrderSchema.parse(row.original);
  //
  const handleViewClick = () => {
    setDialogContent(<ViewOrderDialog order={shippedOrder} />);
  };

  const handleEditClick = () => {
    setDialogContent(<EditShippedOrderDialog order={shippedOrder} />);
  };

  return (
    <Dialog>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4 " />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() =>
              navigator.clipboard.writeText(shippedOrder.order_id.toString())
            }
          >
            <Clipboard className="mr-2 h-4 w-4" />
            Copy reference ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DialogTrigger asChild onSelect={handleViewClick}>
            <DropdownMenuItem>
              {" "}
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger asChild onClick={handleEditClick}>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Mark as Delivered
            </DropdownMenuItem>
          </DialogTrigger>

          {/* <DropdownMenuItem
            onSelect={() => setShowDeleteDialog(true)}
            className="text-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Details
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
      {dialogContent && <DialogContent>{dialogContent}</DialogContent>}
      {/* <RecipientDeleteDialog
        recipient={recipient}
        isOpen={showDeleteDialog}
        showActionToggle={setShowDeleteDialog}
      /> */}
    </Dialog>
  );
}
