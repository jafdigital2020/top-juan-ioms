import KPICard from "@/app/_components/kpi/KpiCards";
import axios from "axios";
import { PackageCheck, PhilippinePeso, Store, Warehouse } from "lucide-react";
import { useEffect, useState } from "react";

interface KPIData {
  processing: number;
  processed: number;
  totalInventory: number;
  unitSold: number;
  totalRevenue: number;
  franchiseOutletCount: number;
}

const OrderProvided = () => {
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
    <div className="flex flex-wrap gap-2">
      <div className="w-full sm:w-auto">
        <KPICard
          icons={<PackageCheck size={20} color="#7f6262" />}
          title="Order Provided"
          label="Processing"
          value={kpiData.processing}
          label2="Processed"
          value2={kpiData.processed}
        />
      </div>
      <div className="w-full sm:w-auto">
        <KPICard
          icons={<Warehouse size={20} color="#7f6262" />}
          title="Inventory Overview"
          label="Total"
          value={kpiData.totalInventory}
          label2="Sold Out"
          value2={kpiData.unitSold}
        />
      </div>
      <div className="w-full sm:w-auto">
        <KPICard
          icons={<PhilippinePeso size={20} color="#7f6262" />}
          title="Store Revenue"
          label="Revenue"
          amount={`₱${kpiData.totalRevenue.toLocaleString()}`}
        />
      </div>
      <div className="w-full sm:w-auto">
        <KPICard
          icons={<Store size={20} color="#7f6262" />}
          title="Franchise Outlet"
          label="Branches"
          value={kpiData.franchiseOutletCount}
        />
      </div>
    </div>
  );
};
export default OrderProvided;
