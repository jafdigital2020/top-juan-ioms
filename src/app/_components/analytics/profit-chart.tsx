import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Bar,
  BarChart,
} from "recharts";

import axios from "axios";

interface RawData {
  productName: string;
  profit: number;
}

interface FormattedData {
  productName: string;
  profit: number;
}

export default function ProfitChart() {
  const [data, setData] = useState<FormattedData[]>([]);

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_PUBLIC_API_URL
        }/api/analytics/product/profit/data`
      )
      .then((response) => {
        const rawData: RawData[] = response.data.success.data.success.data;

        // Format the data to plot only productName and profit
        const formattedData: FormattedData[] = rawData.map((item) => ({
          productName: item.productName,
          profit: item.profit,
        }));

        setData(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching profit data:", error);
      });
  }, []);

  return (
    <ResponsiveContainer width="100%" minHeight={300} className="-mx-5 mt-2">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="productName" />
        <YAxis />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
          }}
        />
        <Legend />
        <Bar
          type="monotone"
          name="Profit"
          dataKey="profit" // Single Bar for profit
          fill="hsl(var(--primary))"
          barSize={80}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
