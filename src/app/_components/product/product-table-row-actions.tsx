import { useState } from "react";
import { Row } from "@tanstack/react-table";
import {
  Clipboard,
  Edit,
  Eye,
  MoreHorizontal,
  RefreshCwOff,
} from "lucide-react";

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
import { productSchema } from "@/app/schema";
import ProductEditDialog from "./dialogs/edit-dialog";
import ProductDiscontinueDialog from "./dialogs/discontinue-dialog";
import ProductViewDialog from "./dialogs/view-dialogs";

interface ProductDataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function ProductDataTableRowActions<TData>({
  row,
}: ProductDataTableRowActionsProps<TData>) {
  const [dialogContent, setDialogContent] = useState<React.ReactNode | null>(
    null
  );
  const [showDiscontinueDialog, setShowDiscontinueDialog] =
    useState<boolean>(false);
  const product = productSchema.parse(row.original);

  const handleViewClick = () => {
    setDialogContent(<ProductViewDialog product={product} />);
  };

  const handleEditClick = () => {
    setDialogContent(<ProductEditDialog product={product} />);
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
              navigator.clipboard.writeText(product.product_id.toString())
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

          <DropdownMenuItem
            onSelect={() => setShowDiscontinueDialog(true)}
            className="text-red-600"
          >
            <RefreshCwOff className="mr-2 h-4 w-4" />
            Discontinue Product
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {dialogContent && <DialogContent>{dialogContent}</DialogContent>}
      <ProductDiscontinueDialog
        product={product}
        isOpen={showDiscontinueDialog}
        showActionToggle={setShowDiscontinueDialog}
      />
    </Dialog>
  );
}
