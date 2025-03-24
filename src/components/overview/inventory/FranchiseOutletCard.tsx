import OutletCard from "@/components/cards/OutletCard";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

const FranchiseOutletCard: React.FC = () => {
  const [outlets, setOutlets] = useState<any[]>([]);

  useEffect(() => {
    const fetchOutlets = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_PUBLIC_API_URL}/api/report/list/franchise`
        );
        setOutlets(response.data.success.data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching franchise outlets:", error);
      }
    };

    fetchOutlets();
  }, []);

  return (
    <Card
      className="p-4 w-full overflow-y-auto max-
   h-[300px]"
    >
      {outlets.map((outlet) => (
        <OutletCard key={outlet.franchisee_id} outlet={outlet} />
      ))}
    </Card>
  );
};

export default FranchiseOutletCard;
