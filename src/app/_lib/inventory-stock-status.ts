import { Ban, CircleCheck, TriangleAlert } from "lucide-react";

export const inventoryStatus = [
  {
    value: "ACTIVE",
    label: "Active",
    icon: CircleCheck,
  },
  {
    value: "LOW_STOCK",
    label: "Low stock",
    icon: TriangleAlert,
  },
  {
    value: "OUT_OF_STOCK",
    label: "Out of stock",
    icon: Ban,
  },
];
