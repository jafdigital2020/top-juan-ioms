import ProductRevenueChart from "@/app/_components/charts/product-revenue";
import BestSellerList from "../../../components/overview/inventory/BestSellerList";

import OrderProvided from "../../../components/overview/inventory/OrderProvided";
import FranchiseOutletCard from "@/components/overview/inventory/FranchiseOutletCard";

const Dashboard = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-lg font-bold mb-2 mt-4 text-primary">
        Sales Report Overview
      </h1>

      <div>Dashboard</div>
      <h2 className="text-sm text-gray-500">
        An anyway to manage sales with care and precision
      </h2>

      <div className="grid grid-cols-1 gap-4 pt-2  md:grid-cols-9 lg:grid-cols-8">
        <div className="col-span-1 sm:col-span-1 md:col-span-9 lg:col-span-5  h-auto ">
          <OrderProvided />
        </div>

        <div className="col-span-1 sm:col-span-2 md:col-span-9 lg:col-span-3 h-auto row-span-2">
          <h1 className="text-primary-foreground font-semibold text-sm mb-2">
            Franchise Outlets
          </h1>
          <FranchiseOutletCard />
        </div>
        <div className="col-span-1 sm:col-span-2 md:col-span-9 lg:col-span-5 row-span-4 ">
          <h1 className="text-primary-foreground font-semibold mb-3 text-sm ">
            Performance Overview
          </h1>

          <ProductRevenueChart />
        </div>
        <div className="col-span-1 sm:col-span-2 md:col-span-9 lg:col-span-3 row-span-2 ">
          <h1 className="text-primary-foreground font-semibold text-sm">
            Best Seller List
          </h1>
          <BestSellerList />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
