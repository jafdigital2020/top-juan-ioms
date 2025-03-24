import { Card } from "@/components/ui/card";
import { OctagonAlert } from "lucide-react";

const StockAlert = () => {
  const alerts = [
    {
      item: "Vanilla Powder",
      threshold: 5,
      currentStock: 3,
      date: "February 24, 2025",
    },
    {
      item: "Cups",
      threshold: 10,
      currentStock: 8,
      date: "February 24, 2025",
    },
    {
      item: "Coffee Beans",
      threshold: 7,
      currentStock: 4,
      date: "February 24, 2025",
    },


  ];

  return (
    <Card className="p-4 ">
      <h2 className="text-lg font-semibold mb-2">Stock Alert</h2>
      <ul className="space-y-2 p-2">
        {alerts.map((alert, index) => (
          <li key={index} className="text-sm flex items-center space-x-2 p-2">
            <OctagonAlert className="text-red-600 w-5 h-5" />
            <div>
              <span className="font-bold text-red-600">{alert.item}</span> is
              below the threshold of{" "}
              <span className="font-bold">{alert.threshold}</span>.
              <div className="text-gray-500 text-xs">
                Current stock: {alert.currentStock}
              </div>
              <div className="text-gray-500 text-xs">Date: {alert.date}</div>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default StockAlert;
