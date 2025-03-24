import OrderCompleted from "@/components/overview/employee/OrderCompleted";
import TransactionActivity from "@/components/overview/employee/TransactionsActivity";
import BestSellerList from "@/components/overview/inventory/BestSellerList";
import RecentActivity from "@/app/_components/activity/recent-activity";

const OverviewDashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-lg font-bold mb-2 mt-4 text-primary">
        Dashboard Overview
      </h1>
      <h2 className="text-sm text-gray-500 mb-4">
        A way to manage product with care and precision
      </h2>
      <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-7">
        <div className="col-span-1 sm:col-span-1 md:col-span-4 lg:col-span-5  h-auto ">
          <OrderCompleted />
        </div>
        <div className="col-span-1 sm:col-span-2 md:col-span-4 lg:col-span-2 h-auto row-span-2">
          {/* <StockAlert /> */}
          <RecentActivity />
        </div>
        <div className="col-span-1 sm:col-span-2 md:col-span-4 lg:col-span-5 row-span-4 ">
          <h1 className="text-primary-foreground font-semibold mb-3 text-sm ">
            Orders Data
          </h1>

          <TransactionActivity />
        </div>
        <div className="col-span-1 sm:col-span-2 md:col-span-4 lg:col-span-2 row-span-2 ">
          <h1 className="text-primary-foreground font-semibold mb-4 text-sm ">
            Best Seller
          </h1>
          <BestSellerList />
        </div>
      </div>
    </div>
  );
};
export default OverviewDashboard;
