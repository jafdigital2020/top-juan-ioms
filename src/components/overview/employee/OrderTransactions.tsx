import ongoingOrders from "../../../data/ongoingorder"; // Ensure this path is correct
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

type Order = {
  date: string;
  orderId: string;
  amount: string;
  trackingCode: string;
};

const ordersData = ongoingOrders.map((order: Order) => ({
  order_id: order.orderId,
  amount: order.amount,
  date: order.date,
  status: order.trackingCode, // Assuming trackingCode represents status
}));

const OrderTransactions = () => (
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
              Order ID
            </th>
            <th className="text-[12px] uppercase tracking-wide font-bold text-gray-400 py-2 px-4 bg-gray-50 text-left">
              Amount
            </th>
            <th className="text-[12px] uppercase tracking-wide font-bold text-gray-400 py-2 px-4 bg-gray-50 text-left">
              Date Time
            </th>
            <th className="text-[12px] uppercase tracking-wide font-bold text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {ordersData.map((activity) => (
            <tr key={activity.order_id}>
              <td className="py-2 px-2 border-b border-b-gray-50">
                <div className="flex items-center">
                  <Link
                    to="#"
                    className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                  >
                    {activity.order_id}
                  </Link>
                </div>
              </td>
              <td className="py-2 px-4 border-b border-b-gray-50 text-left">
                <span className="text-[13px] text-gray-500">
                  <span className="text-cyan-800 font-bold"></span>
                  {activity.amount}
                </span>
              </td>
              <td className="py-2 px-4 border-b border-b-gray-50">
                <span className="text-[13px] font-medium text-gray-400">
                  {activity.date}
                </span>
              </td>
              <td className="py-2 px-4 border-b border-b-gray-50">
                <span
                  className={`inline-block p-1 rounded ${
                    activity.status === "Completed"
                      ? "bg-emerald-500/10 text-emerald-500"
                      : activity.status === "In Progress"
                      ? "bg-red-500/10 text-red-500"
                      : activity.status === "Pending"
                      ? "bg-gray-500/10 text-gray-500"
                      : ""
                  } font-medium text-[12px] leading-none`}
                >
                  {activity.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Card>
);

export default OrderTransactions;
