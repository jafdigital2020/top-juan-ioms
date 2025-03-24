import { Store } from "lucide-react";

interface Outlet {
  franchise_name: string;
  franchisee_name: string;
  total_orders: number;
}

interface OutletCardProps {
  outlet: Outlet;
}

const OutletCard: React.FC<OutletCardProps> = ({ outlet }) => {
  return (
    <div className="p-4 flex justify-between items-center ">
      <div className="flex-grow">
        <div className="flex flex-col items-start space-y-1">
          <div className="flex items-center space-x-2">
            <Store />
            <div className=" font-semibold text-primary-foreground text-lg dark:text-white">
              {outlet.franchise_name}
            </div>
          </div>
          <div className="text-sm text-gray-500 ml-8">
            {outlet.franchisee_name}
          </div>{" "}
        </div>
      </div>
      <div className="text-right">
        <div className="text-lg font-semibold">
          <div className="text-primary font-semibold text-sm">Ordered</div>
          <span className="text-sm text-center block">
            {" "}
            {outlet.total_orders}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OutletCard;
