import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const API_URL = `${
  import.meta.env.VITE_PUBLIC_API_URL
}/api/analytics/profit-margin/data`;

export default function GrossProfitMargin() {
  interface RawData {
    month: string;
    profitMargin: number;
  }

  interface FormattedData {
    month: string;
    profitMargin: number;
  }

  const [data, setData] = useState<FormattedData[]>([]);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((result) => {
        if (
          result.success &&
          result.success.data &&
          result.success.data.success
        ) {
          const rawData = result.success.data.success.data; // Access deeply nested data
          // Map the data into a usable format for the chart
          const formattedData: FormattedData[] = rawData.map(
            (item: RawData) => ({
              month: item.month,
              profitMargin: item.profitMargin,
            })
          );
          setData(formattedData);
        }
        console.log("Profit Margin data:", result);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <ResponsiveContainer width="100%" minHeight={300} className="-mx-5 mt-2">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis dataKey="profitMargin" />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
          }}
        />
        <Legend />
        <Line
          name="Profit Margin"
          type="monotone"
          dataKey="profitMargin"
          stroke="hsl(var(--primary))"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
