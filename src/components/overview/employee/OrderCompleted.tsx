import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartNoAxesCombined,
  PackageCheck,
  Store,
  Warehouse,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

interface KPIData {
  totalRevenue: number;
  totalOrders: number;
  totalInventory: number;
  unitSold: number;
  processing: number;
  processed: number;
  franchiseOutletCount: number;
}

const OrderCompleted = () => {
  const [kpiData, setKpiData] = useState<KPIData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKPIData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_PUBLIC_API_URL}/api/analytics/admin/kpi`
        );
        setKpiData(response.data.success.data);
      } catch (error) {
        console.error("Error fetching KPI data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKPIData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!kpiData) {
    return <p>No data available</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Completed Orders
          </CardTitle>
          <PackageCheck size={20} color="#7f6262" />
        </CardHeader>
        <div className="text-2xl px-6 pb-5 font-bold">
          {kpiData.totalOrders}
        </div>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Processing</CardTitle>
          <ChartNoAxesCombined size={20} color="#7f6262" />
        </CardHeader>
        <div className="text-2xl px-6 pb-5 font-bold">{kpiData.processing}</div>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Inventory</CardTitle>
          <Warehouse size={20} color="#7f6262" />
        </CardHeader>
        <div className="text-2xl px-6 pb-5 font-bold">
          {kpiData.totalInventory}
        </div>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Franchise Outlet
          </CardTitle>
          <Store size={20} color="#7f6262" />
        </CardHeader>
        <div className="text-2xl px-6 pb-5 font-bold">
          {kpiData.franchiseOutletCount}
        </div>
      </Card>
    </div>
  );
};

export default OrderCompleted;
