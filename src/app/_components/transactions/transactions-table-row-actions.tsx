import { Row } from "@tanstack/react-table";
import { Clipboard, Edit, Eye, MoreHorizontal } from "lucide-react";

import { Button } from "../../../components/ui/button";
import { Dialog, DialogTrigger } from "../../../components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { franchiseUserSchema } from "@/app/schema";

interface OrderDataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function TransactionsDataTableRowActions<TData>({
  row,
}: OrderDataTableRowActionsProps<TData>) {
  // const [dialogContent, setDialogContent] = useState<React.ReactNode | null>(
  //   null
  // );
  const franchiseUser = franchiseUserSchema.parse(row.original);

  const handleViewClick = () => {
    // setDialogContent(<RecipientViewDialog recipient={recipient} />);
  };

  const handleEditClick = () => {
    // setDialogContent(<RecipientEditDialog recipient={recipient} />);
  };

  return (
    <Dialog>
      <DropdownMenu>
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
              navigator.clipboard.writeText(franchiseUser.user_id.toString())
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
      {/* {dialogContent && <DialogContent>{dialogContent}</DialogContent>} */}
      {/* <RecipientDeleteDialog
        recipient={recipient}
        isOpen={showDeleteDialog}
        showActionToggle={setShowDeleteDialog}
      /> */}
    </Dialog>
  );
}
