import BestSellerChart from "@/app/_components/analytics/best-seller-chart";
import GrossProfitMargin from "@/app/_components/analytics/gross-profit-margin";
import ProfitChart from "@/app/_components/analytics/profit-chart";

import { ChartCard } from "@/components/ui/charts-card";

const Analytics = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-lg font-bold mb-2 mt-4 text-primary-foreground font-poppin dark:text-white">
        Analytics
      </h1>
      <div>
        <div>
          <div className="grid lg:grid-cols-1 gap-4 my-5">
            <ChartCard
              title="Gross Profit Margin"
              description="A line chart showing the gross profit margin over time."
            >
              <GrossProfitMargin />
            </ChartCard>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
            <ChartCard
              title="Profit"
              description="A bar chart showing the profit values."
            >
              <ProfitChart />
            </ChartCard>

            <BestSellerChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
