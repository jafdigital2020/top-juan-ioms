import { Card } from "@/components/ui/card";
import React from "react";

interface KPICardProps {
  icons: React.ReactNode;
  title: string;
  label: string;
  value?: number;
  amount?: string;
  label2?: string;
  value2?: number;
}

const KPICard: React.FC<KPICardProps> = ({
  icons,
  title,
  label,
  value,
  amount,
  label2,
  value2,
}) => {
  return (
    <Card className="w-full px-3 py-4">
      <div className="flex items-center mb-2 px-4">
        <div className="w-6 h-6 mr-6">{icons}</div>
        <h2 className=" text-sm font-bold text-primary">{title}</h2>
      </div>
      <hr className="my-4 " />
      <div className="flex justify-between">
        <div className="text-center w-1/2">
          <p className="text-md font-bold">{value}</p>
          <p className="text-md font-bold">{amount}</p>
          <p className="text-gray-600">{label}</p>
        </div>
        <div className="text-center w-1/2">
          <p className="text-md font-bold">{value2}</p>
          <p className="text-gray-600">{label2}</p>
        </div>
      </div>
    </Card>
  );
};

export default KPICard;
