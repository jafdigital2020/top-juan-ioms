import AverageCosting from "@/app/_components/expenses/average-cost";
import CostOfGoodsSold from "@/app/_components/expenses/cogs";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const InventoryReport = () => {
  return (
    <section className="container mx-auto p-4 ">
      {" "}
      <Tabs defaultValue="cogs" className="w-full">
        <TabsList className="inline-flex h-9 items-center text-muted-foreground w-full justify-start rounded-none border-b bg-transparent p-0">
          <TabsTrigger
            className="inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            value="cogs"
          >
            COGS
          </TabsTrigger>
          <TabsTrigger
            className="inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            value="averagecost"
          >
            Average Costing
          </TabsTrigger>
        </TabsList>
        <TabsContent value="cogs">
          <CostOfGoodsSold />
        </TabsContent>
        <TabsContent value="averagecost">
          <AverageCosting />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default InventoryReport;
