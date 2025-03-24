import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import axios from "axios";
import { TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

const ProductRevenueChart = () => {
  interface ChartData {
    day: string;
    revenue: number;
    previous: number;
  }

  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  const [dateRange, setDateRange] = useState("weekly");

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_PUBLIC_API_URL
          }/api/analytics/revenue/data?dateRange=${dateRange}`
        );
        const { current, previous } = response.data.success.data;
        interface RevenueData {
          date: string;
          revenue: number;
        }

        interface ChartData {
          day: string;
          revenue: number;
          previous: number;
        }

        const formattedData: ChartData[] = current.map(
          (item: RevenueData, index: number) => ({
            day: new Date(item.date).toLocaleDateString("en-US", {
              weekday: "short",
            }),
            revenue: item.revenue,
            previous: previous[index]?.revenue || 0,
          })
        );
        setChartData(formattedData);
      } catch (error) {
        console.error("Failed to fetch chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [dateRange]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "hsl(var(--chart-1))",
    },
    previous: {
      label: "Previous",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  const handleDateRangeChange = (range: string) => {
    setDateRange(range);
    setLoading(true);
  };

  return (
    <Card className="h-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Sales Revenue</CardTitle>
            <CardDescription>
              {dateRange.charAt(0).toUpperCase() + dateRange.slice(1)} data
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant={"outline"}
              onClick={() => {
                handleDateRangeChange("weekly");
              }}
            >
              Weekly
            </Button>
            <Button
              variant={"outline"}
              onClick={() => {
                handleDateRangeChange("monthly");
              }}
            >
              Monthly
            </Button>
            <Button
              variant={"outline"}
              onClick={() => {
                handleDateRangeChange("quarterly");
              }}
            >
              Quarterly
            </Button>
            <Button
              variant={"outline"}
              onClick={() => {
                handleDateRangeChange("yearly");
              }}
            >
              Yearly
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-2">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[340px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
            width={300}
            height={40}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="revenue"
              type="monotone"
              stroke="var(--color-revenue)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="previous"
              type="monotone"
              stroke="var(--color-previous)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Revenue increased by 5.2% this {dateRange}{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing revenue {dateRange}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductRevenueChart;
