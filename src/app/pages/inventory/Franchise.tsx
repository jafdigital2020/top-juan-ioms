import FranchiseTable from "@/app/_components/franchisee/franchise-table";

const Franchise = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-lg font-bold mb-2 mt-4 text-primary-foreground font-poppin dark:text-white">
        Franchise
      </h1>
      <div>
        <FranchiseTable />
      </div>
    </div>
  );
};

export default Franchise;
