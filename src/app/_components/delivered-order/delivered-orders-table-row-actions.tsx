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

import ViewOrderDialog from "./dialog/view-dialogs";
import { deliveredOrderSchema } from "@/app/schema";

interface OrderDataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DeliveredOrderDataTableRowActions<TData>({
  row,
}: OrderDataTableRowActionsProps<TData>) {
  const [dialogContent, setDialogContent] = useState<React.ReactNode | null>(
    null
  );

  const deliveredOrder = deliveredOrderSchema.parse(row.original);
  //
  const handleViewClick = () => {
    setDialogContent(<ViewOrderDialog order={deliveredOrder} />);
  };

  const handleEditClick = () => {
    // setDialogContent(<RecipientEditDialog recipient={recipient} />);
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
              navigator.clipboard.writeText(deliveredOrder.order_id.toString())
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
              Edit Details
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
