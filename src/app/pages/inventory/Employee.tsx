import FranchisorEmployeeTable from "@/app/_components/employee/employee-table";

const Employee = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-lg font-bold mb-2 mt-4 text-primary-foreground font-poppin dark:text-white">
        Employee
      </h1>
      <div>
        {" "}
        <div>
          <FranchisorEmployeeTable />
        </div>
      </div>
    </div>
  );
};

export default Employee;
