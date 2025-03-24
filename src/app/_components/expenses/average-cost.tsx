import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface DataItem {
  month: string;
  totalCost: string;
  purchases: {
    date: string;
    amount: string;
    quantity: number;
    product_name: string;
  }[];
  unitsSold: number;
  beginningInventory: number;
  endingInventory: number;
  averageCost: string;
  cogs: string;
}

const AverageCosting = () => {
  const [data, setData] = useState<DataItem[] | null>(null);
  const [selectedMonth, setSelectedMonth] = useState("March");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_PUBLIC_API_URL
          }/api/report/inventory/average-cost`
        );
        // Correctly access the nested data array
        const nestedData = response.data.success.data.success.data;
        setData(nestedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const filteredData = data.find((item) => item.month === selectedMonth);

  if (!filteredData) {
    return <div>No data available for the selected month.</div>;
  }

  const {
    totalCost,
    purchases,
    unitsSold,
    beginningInventory,
    endingInventory,
    averageCost,
    cogs,
  } = filteredData;

  return (
    <div className="min-h-screen p-6 ">
      <div className="mb-4">
        <div className="flex justify-between space-x-4">
          <div>
            <h1 className="text-lg font-bold mb-4 text-center font-poppin text-primary-foreground dark:text-white">
              Average Cost Inventory
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    {" "}
                    <Info className="h-3 w-3 mx-2" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      This represents the average cost of goods sold for each
                      month based on overall quantities.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </h1>
          </div>
          <div className="flex space-x-4">
            <div>
              <Select
                onValueChange={(value) => setSelectedMonth(value)}
                value={selectedMonth}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Month" />
                </SelectTrigger>
                <SelectContent>
                  {data.map((item: DataItem) => (
                    <SelectItem key={item.month} value={item.month}>
                      {item.month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025">2025</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6 p-4">
        {/* Summary */}
        <Card className=" rounded p-4 md:w-1/3">
          <h2 className="text-xl font-semibold mb-3">Summary</h2>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span className="font-medium text-sm">Total Cost:</span>
              <span>{totalCost}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium text-sm">Units Sold:</span>
              <span>{unitsSold}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium text-sm">Beginning Inventory:</span>
              <span>{beginningInventory}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium text-sm">Ending Inventory:</span>
              <span>{endingInventory}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium text-sm">
                Average Cost per Unit:
              </span>
              <span>{averageCost}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium text-sm">COGS:</span>
              <span>{cogs}</span>
            </li>
          </ul>
        </Card>
        {/* Purchases */}
        <Card className=" rounded p-4 md:flex-1">
          <h2 className="text-xl font-semibold mb-3">Purchases</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border-b px-4 py-2 text-left">Date</th>
                  <th className="border-b px-4 py-2 text-left">Product</th>
                  <th className="border-b px-4 py-2 text-left">Amount</th>
                  <th className="border-b px-4 py-2 text-left">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((purchase, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="border-b px-4 py-2">{purchase.date}</td>
                    <td className="border-b px-4 py-2">
                      {purchase.product_name}
                    </td>
                    <td className="border-b px-4 py-2">{purchase.amount}</td>
                    <td className="border-b px-4 py-2">{purchase.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AverageCosting;
