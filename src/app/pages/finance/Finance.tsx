import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Finance = () => {
  return (
    <section className="container mx-auto p-4 ">
      {" "}
      <Tabs defaultValue="finance" className="w-full">
        <TabsList className="inline-flex h-9 items-center text-muted-foreground w-full justify-start rounded-none border-b bg-transparent p-0">
          <TabsTrigger
            className="inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            value="finance"
          >
            Income
          </TabsTrigger>
          <TabsTrigger
            className="inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            value="expenses"
          ></TabsTrigger>
        </TabsList>
        <TabsContent value="finance">
          <div className="flex flex-col lg:flex-row gap-4">
            <Card className="w-full lg:w-1/3 p-4   rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Income Summary</h2>
              <p className="text-gray-600">
                Overview of your income sources and amounts.
              </p>
            </Card>
            <Card className="w-full lg:w-2/3 p-4  rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Detailed Income</h2>
              <p className="text-gray-600">
                Breakdown of income by category and date.
              </p>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="expenses"></TabsContent>
      </Tabs>
    </section>
  );
};

export default Finance;
