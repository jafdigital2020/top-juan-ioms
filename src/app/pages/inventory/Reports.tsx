import TransactionsOrdersTable from "@/app/_components/transactions/transactions-table";


const Reports = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-lg font-bold mb-2 mt-4 text-primary-foreground font-poppin dark:text-white">
        Reports
      </h1>
      <div>

<div>
  <TransactionsOrdersTable/>
</div>
      </div>
    </div>
  );
};

export default Reports;
