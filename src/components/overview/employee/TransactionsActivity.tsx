import { useEffect, useState } from "react";
import moment from "moment";

import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

type Order = {
  date: string;
  transactionId: string;
  amount: string;
  paymentStatus: string;
  franchiseOutlet: string;
};

const TransactionActivity = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_PUBLIC_API_URL
          }/api/report/order/transactions`,
          {
            credentials: "include",
          }
        );
        const result = await response.json();
        if (result.success && result.success.code === 200) {
          const fetchedOrders = result.success.data
            .map((order: any) => ({
              date: order.placed_at,
              transactionId: order.transaction_id.toString(),
              amount: order.total_amount,
              paymentStatus: order.payment_status,
              franchiseOutlet: order.franchise_name,
            }))
            .sort((a: Order, b: Order) => moment(b.date).diff(moment(a.date)))
            .slice(0, 10);
          setOrders(fetchedOrders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Card className="p-4">
      <div className="flex justify-between p-3">
        <h1 className="font-bold text-xl text-gray-500 mb-3">
          Recent Transactions
        </h1>
        <div className="flex mb-3">
          {/* Optional Filter and View All buttons can go here */}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w[540px]">
          <thead>
            <tr>
              <th className="text-[12px] uppercase tracking-wide font-bold text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                Transaction ID
              </th>
              <th className="text-[12px] uppercase tracking-wide font-bold text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                Franchise Outlet
              </th>
              <th className="text-[12px] uppercase tracking-wide font-bold text-gray-400 py-2 px-4 bg-gray-50 text-left">
                Amount
              </th>
              <th className="text-[12px] uppercase tracking-wide font-bold text-gray-400 py-2 px-4 bg-gray-50 text-left">
                Date Time
              </th>
              <th className="text-[12px] uppercase tracking-wide font-bold text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                Payment Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.transactionId}>
                <td className="py-2 px-2 border-b border-b-gray-50">
                  <div className="flex items-center">
                    <Link
                      to="#"
                      className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                    >
                      {order.transactionId}
                    </Link>
                  </div>
                </td>
                <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                  <span className="text-[13px] text-gray-500">
                    <span className="text-cyan-800 font-bold"></span>
                    {order.franchiseOutlet}
                  </span>
                </td>
                <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                  <span className="text-[13px] text-gray-500">
                    <span className="text-cyan-800 font-bold"></span>
                    {order.amount}
                  </span>
                </td>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <span className="text-[13px] font-medium text-gray-400">
                    {moment(order.date).fromNow()}
                  </span>
                </td>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <span
                    className={`inline-block p-1 rounded ${
                      order.paymentStatus === "completed"
                        ? "bg-emerald-500/10 text-emerald-500"
                        : order.paymentStatus === "in progress"
                        ? "bg-red-500/10 text-red-500"
                        : order.paymentStatus === "pending"
                        ? "bg-gray-500/10 text-gray-500"
                        : ""
                    } font-medium text-[12px] leading-none`}
                  >
                    {order.paymentStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default TransactionActivity;
