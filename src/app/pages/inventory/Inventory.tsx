import InventoryTable from "@/app/_components/inventory/inventory-table";

const Inventory = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-lg font-bold mb-2 mt-4 mx-2 text-primary-foreground font-poppin dark:text-white">
        Inventory
      </h1>

      <div>
        <InventoryTable />
      </div>
    </div>
  );
};

export default Inventory;
