import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import OrdersQueueTable from "@/app/_components/orders-queue/orders-queue-table"
import ProcessedOrderTable from "@/app/_components/processed-order/processed-order-table"
import ShippedOrdersTable from "@/app/_components/shipped-order/shipped-orders-table"
import DeliveredOrdersTable from "@/app/_components/delivered-order/delivered-orders-table"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"


const Orders = () => {
  const [queueCount, setQueueCount] = useState(0); 
  const [processedCount, setProcessedCount] = useState(0);
  return (
        <div className="container mx-auto">
          <h1 className="text-lg font-bold mb-2 mt-4    mx-6 text-primary-foreground font-poppin dark:text-white">
            Orders
          </h1>
          <div>
          <section className="container mx-auto p-4 "> 
            <Tabs defaultValue="ordersQueue" className="w-full">
                <TabsList className="inline-flex h-9 items-center text-muted-foreground w-full justify-start rounded-none border-b bg-transparent p-0">
                  <TabsTrigger
                    className="inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                    value="ordersQueue"
                  >
                     <span className="ml-2 text-xs text-muted-foreground">Queue <Badge className="mx-2 text-white text-xs">{queueCount}</Badge></span>
                  </TabsTrigger>
                  <TabsTrigger
                    className="inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                    value="packingAndShipment"
                  >
                 <span className="ml-2 text-xs text-muted-foreground">Packing and Shipment <Badge className="mx-2 text-white text-xs">{processedCount}</Badge></span>
                  </TabsTrigger>
                  <TabsTrigger
                    className="inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                    value="shipping"
                  >
                    Shipping
                  </TabsTrigger>
                  <TabsTrigger
                    className="inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                    value="delivered"
                  >
                    Delivered
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="ordersQueue">
                  
                <OrdersQueueTable ordersQueueCount={(count) => setQueueCount(count)} 
          />
                
                </TabsContent>
                <TabsContent value="packingAndShipment">
                  <ProcessedOrderTable ordersProcessedCount={(count) => setProcessedCount(count)} />
                </TabsContent>
                <TabsContent value="shipping">
                 <ShippedOrdersTable/>
                </TabsContent>
                <TabsContent value="delivered">
                <DeliveredOrdersTable/>
                </TabsContent>
            </Tabs>
   </section>
          </div>
        </div>
   
  )
}

export default Orders