import ShippedOrdersTable from "@/app/_components/shipped-order/shipped-orders-table"


const Shipping = () => {
  return (
         <div className="container mx-auto">
           <h1 className="text-lg font-bold mb-2 mt-4 text-primary-foreground font-poppin dark:text-white">
             Shipping
           </h1>
           <div>
             <ShippedOrdersTable />
           </div>
         </div>
  )
}

export default Shipping