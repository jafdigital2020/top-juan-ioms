import DeliveredOrdersTable from "@/app/_components/delivered-order/delivered-orders-table";

const DeliveredOrder = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-lg font-bold mb-2 mt-4 text-primary-foreground font-poppin dark:text-white">
        Delivered
      </h1>
      <div>
        <DeliveredOrdersTable />
      </div>
    </div>
  );
};

export default DeliveredOrder;
