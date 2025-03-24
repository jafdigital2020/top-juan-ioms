import { z } from "zod";
import { DialogHeader } from "../../../../components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

export const employeeUserSchema = z.object({
  user_id: z.number(),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  address: z.string().nullable(),
  phone: z.string().nullable(),
  role_id: z.number(),
  is_active: z.boolean(),
  employeeInfo: z.object({
    employee_id: z.number(),
    user_id: z.number(),
    job_title: z.string().min(1, "Job title is required"),
    date_of_joining: z.string(),
    contact_number: z.string().min(1, "Contact number is required"),
    emergency_contact_name: z
      .string()
      .min(1, "Emergency contact name is required"),
    emergency_contact_number: z
      .string()
      .min(1, "Emergency contact number is required"),
  }),
});

export type EmployeeUserType = z.infer<typeof employeeUserSchema>;

type EditProps = {
  employee: EmployeeUserType;
};

export default function EmployeeViewDialog({ employee }: EditProps) {
  return (
    <div className="p-6 rounded-lg">
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold">
          Employee Details
        </DialogTitle>
      </DialogHeader>
      <div className="py-4"></div>
      <h2 className="text-lg font-medium">
        {employee.first_name} {employee.last_name}
      </h2>
      <p className="text-sm text-gray-600">Email: {employee.email}</p>
      {employee.address && (
        <p className="text-sm text-gray-600">Address: {employee.address}</p>
      )}
      {employee.phone && (
        <p className="text-sm text-gray-600">Phone: {employee.phone}</p>
      )}
      <h3 className="text-lg font-medium mt-4">Employee Info</h3>
      <p className="text-sm text-gray-600">
        Job Title: {employee.employeeInfo.job_title}
      </p>
      <p className="text-sm text-gray-600">
        Date of Joining: {employee.employeeInfo.date_of_joining}
      </p>
      <p className="text-sm text-gray-600">
        Contact Number: {employee.employeeInfo.contact_number}
      </p>
      <p className="text-sm text-gray-600">
        Emergency Contact Name: {employee.employeeInfo.emergency_contact_name}
      </p>
      <p className="text-sm text-gray-600">
        Emergency Contact Number:{" "}
        {employee.employeeInfo.emergency_contact_number}
      </p>
    </div>
  );
}
