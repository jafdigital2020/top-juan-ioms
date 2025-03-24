import { useEffect, useState } from "react";

import { DataTable } from "@/components/data-table/data-table";

import {  FranchiseTableActionsToolbar } from "./franchise-table-toolbar";

import axios from "axios";

import { columns } from "./column";
import { FranchiseUserType } from "@/app/schema";

export default function FranchiseTable() {
  const [franchiseData, setFranchiseData] = useState<FranchiseUserType[]>([]);

  useEffect(() => {
    async function fetchInventoryData() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_PUBLIC_API_URL}/api/user/franchise`,
          { withCredentials: true }
        );

        if (res.status !== 200) {
          throw new Error("Failed to fetch data");
        }

        // Access the nested data field in the response
        setFranchiseData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchInventoryData();
  }, []);

  return (
    <DataTable
      columns={columns}
      data={franchiseData}
      ToolbarComponent={FranchiseTableActionsToolbar}
    />
  );
}
