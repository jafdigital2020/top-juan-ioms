import { useEffect, useState } from "react";

import { DataTable } from "@/components/data-table/data-table";

import { EmployeeTableActions } from "./employee-table-toolbar";

import axios from "axios";
import { columns } from "./column";
import { EmployeeUserType } from "@/app/schema";

export default function FranchisorEmployeeTable() {
  const [employeeData, setEmployeeData] = useState<EmployeeUserType[]>([]);

  useEffect(() => {
    async function fetchInventoryData() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_PUBLIC_API_URL}/api/user/employee`,
          { withCredentials: true }
        );

        if (res.status !== 200) {
          throw new Error("Failed to fetch data");
        }

        // Access the nested data field in the response
        setEmployeeData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchInventoryData();
  }, []);

  return (
    <DataTable
      columns={columns}
      data={employeeData}
      ToolbarComponent={EmployeeTableActions}
    />
  );
}
