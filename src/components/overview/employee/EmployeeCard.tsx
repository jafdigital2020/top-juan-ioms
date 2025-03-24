const EmployeeCard = () => {
  const employees = [
    {
      name: "Johnny Cruz",
      email: "johnnycruz123@gmail.com",
      status: "Active",
      image: "path/to/johnny-image.jpg",
    },
    {
      name: "Christian Palma",
      email: "christianpal123@gmail.com",
      status: "Active",
      image: "path/to/christian-image.jpg",
    },
    {
      name: "Ryan Atienza",
      email: "atienzarayan123@gmail.com",
      status: "Active",
      image: "path/to/ryan-image.jpg",
    },
    {
      name: "Vincent Atienza",
      email: "vincentz0122@gmail.com",
      status: "Active",
      image: "path/to/vincent-image.jpg",
    },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center border-b pb-2 mb-2">
        <h2 className="text-lg font-semibold">Employee Name</h2>
        <h2 className="text-lg font-semibold">Status</h2>
      </div>
      {employees.map((employee, index) => (
        <div key={index} className="flex justify-between items-center py-2">
          <div className="flex items-center">
            <img
              src={employee.image}
              alt={employee.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="font-medium">{employee.name}</p>
              <p className="text-sm text-gray-500">{employee.email}</p>
            </div>
          </div>
          <span className="text-green-500">{employee.status}</span>
        </div>
      ))}
    </div>
  );
};

export default EmployeeCard;
