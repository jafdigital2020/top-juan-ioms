import { ChartCard } from "@/components/ui/charts-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Cell } from "recharts";

const API_URL = import.meta.env.VITE_PUBLIC_API_URL;
const COLORS = [
  "hsl(28.4, 72.5%, 25.7%)",
  "hsl(28.4, 72.5%, 35.7%)",
  "hsl(28.4, 72.5%, 45.7%)",
  "hsl(28.4, 72.5%, 55.7%)",
  "hsl(28.4, 72.5%, 65.7%)",
];

export default function BestSellerChart() {
  interface Product {
    name: string;
    sold_quantity: number;
  }

  const [data, setData] = useState<Product[]>([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  useEffect(() => {
    const fetchData = async () => {
      const filterBy = month ? `month&month=${month}&year=${year}` : "overall";
      const response = await fetch(
        `${API_URL}/api/analytics/best-product/data?filterBy=${filterBy}`
      );
      const result = await response.json();

      // Transform the data
      interface Product {
        name: string;
        sold_quantity: number;
      }

      interface ApiResponse {
        success: {
          data: {
            bestSellingProduct: Product[];
          };
        };
      }

      const transformedData: Product[] = (
        result as ApiResponse
      ).success.data.bestSellingProduct.map((product) => ({
        name: product.name,
        sold_quantity: product.sold_quantity,
      }));

      setData(transformedData);
    };

    fetchData();
  }, [year, month]);

  return (
    <div>
      <ChartCard
        title="Best Selling Products"
        description="A pie chart showing best selling products."
      >
        <div className="flex justify-end gap-2 ">
          <Select
            value={year.toString()}
            onValueChange={(value) => setYear(Number(value))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {[...Array(10)].map((_, i) => (
                <SelectItem
                  key={i}
                  value={(new Date().getFullYear() - i).toString()}
                >
                  {new Date().getFullYear() - i}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={month.toString()}
            onValueChange={(value) => setMonth(Number(value))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <SelectItem key={m} value={m.toString()}>
                  {m.toString().padStart(2, "0")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <ResponsiveContainer
          width="100%"
          minHeight={300}
          className="-mx-5 mt-2"
        >
          <PieChart width={730} height={250}>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
              }}
              itemStyle={{
                color: "inherit",
              }}
            />
            <Legend />
            <Pie
              data={data}
              dataKey="sold_quantity"
              nameKey="name"
              cx="50%"
              cy="50%"
              fill="hsl(var(--primary))"
              stroke="hsl(var(--muted))"
              strokeWidth={3}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
