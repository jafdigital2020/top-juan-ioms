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
  productName: string;
  purchase_amount: number;
  selling_price: string;
  total_cost: number;
  total_quantity: number;
  sold_quantity: number;
  revenue: number;
  cogs: number;
  profit: number;
}

const CostOfGoodsSold = () => {
  const [data, setData] = useState<DataItem[] | null>(null);
  const [selectedMonth, setSelectedMonth] = useState("March");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_PUBLIC_API_URL}/api/report/inventory/cogs`
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

  return (
    <div className="min-h-screen p-6 ">
      <div className="mb-4">
        <div className="flex justify-between space-x-4">
          <div>
            <h1 className="text-lg font-bold mb-4 text-center font-poppin text-primary-foreground dark:text-white">
              Cost of Goods Sold
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    {" "}
                    <Info className="h-3 w-3 mx-2" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Track monthly COGS with simplicity.</p>
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
                  <SelectItem value="March">March</SelectItem>
                  {/* Add more months as needed */}
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
        {/* Purchases */}
        <Card className="rounded p-4 md:flex-1">
          <h2 className="text-xl font-semibold mb-3">Purchases</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border-b px-4 py-2 text-left">Product Name</th>
                  <th className="border-b px-4 py-2 text-left">
                    Cost amount (per unit)
                  </th>
                  <th className="border-b px-4 py-2 text-left">
                    Selling Price (per unit)
                  </th>
                  <th className="border-b px-4 py-2 text-left">Total Cost</th>
                  <th className="border-b px-4 py-2 text-left">
                    Total Quantity
                  </th>
                  <th className="border-b px-4 py-2 text-left">
                    Sold Quantity
                  </th>
                  <th className="border-b px-4 py-2 text-left">Revenue</th>
                  <th className="border-b px-4 py-2 text-left">COGS</th>
                  <th className="border-b px-4 py-2 text-left">Profit</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="border-b px-4 py-2">{item.productName}</td>
                    <td className="border-b px-4 py-2">
                      ₱{item.purchase_amount}
                    </td>
                    <td className="border-b px-4 py-2">
                      ₱{item.selling_price}
                    </td>
                    <td className="border-b px-4 py-2">₱{item.total_cost}</td>
                    <td className="border-b px-4 py-2">
                      {item.total_quantity}
                    </td>
                    <td className="border-b px-4 py-2">{item.sold_quantity}</td>
                    <td className="border-b px-4 py-2">₱{item.revenue}</td>
                    <td className="border-b px-4 py-2">₱{item.cogs}</td>
                    <td className="border-b px-4 py-2">₱{item.profit}</td>
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

export default CostOfGoodsSold;
