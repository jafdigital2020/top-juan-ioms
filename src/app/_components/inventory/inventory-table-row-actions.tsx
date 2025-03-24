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
import { inventorySchema } from "@/app/schema";
import InventoryViewDialog from "./dialogs/view-dialogs";
import InventoryEditDialog from "./dialogs/edit-dialogs";

interface InventoryDataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function InventoryDataTableRowActions<TData>({
  row,
}: InventoryDataTableRowActionsProps<TData>) {
  const [dialogContent, setDialogContent] = useState<React.ReactNode | null>(
    null
  );
  const inventory = inventorySchema.parse(row.original);

  const handleViewClick = () => {
    setDialogContent(<InventoryViewDialog inventory={inventory} />);
  };

  const handleEditClick = () => {
    setDialogContent(<InventoryEditDialog inventory={inventory} />);
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
              navigator.clipboard.writeText(inventory.inventory_id.toString())
            }
          >
            <Clipboard className="mr-2 h-4 w-4" />
            Copy reference ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DialogTrigger asChild onClick={handleViewClick}>
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
