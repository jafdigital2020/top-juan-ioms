import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const employeeUserSchema = z.object({
  user_id: z.number(),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  address: z.string().nullable(),
  phone: z.string().nullable(),
  password: z.string().min(6, "Password must be at least 6 characters"),
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

export default function EmployeeEditDialog({ employee }: EditProps) {
  const form = useForm<EmployeeUserType>({
    resolver: zodResolver(employeeUserSchema),
    defaultValues: employee,
  });

  async function onSubmit(data: EmployeeUserType) {
    const formattedData = {
      user: {
        user_id: data.user_id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        password: data.password,
        role_id: data.role_id,
        is_active: data.is_active,
      },
      employeeInfo: {
        employee_id: data.employeeInfo.employee_id,
        user_id: data.employeeInfo.user_id,
        job_title: data.employeeInfo.job_title,
        date_of_joining: data.employeeInfo.date_of_joining,
        contact_number: data.employeeInfo.contact_number,
        emergency_contact_name: data.employeeInfo.emergency_contact_name,
        emergency_contact_number: data.employeeInfo.emergency_contact_number,
      },
    };

    try {
      const response = await axios.put(
        `http://localhost:8080/api/user/employee/${data.user_id}`,
        formattedData
      );
      if (response.status === 200) {
        toast.success("Employee details updated successfully");
      } else {
        toast.error("Failed to update employee details");
      }
    } catch (error) {
      toast.error("An error occurred while updating employee details");
      console.error(error);
    }
  }

  return (
    <div>
      <DialogHeader>
        <DialogTitle>Edit Employee Details</DialogTitle>
      </DialogHeader>
      <div className="py-4"></div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="employeeInfo.job_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="employeeInfo.date_of_joining"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Joining</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="employeeInfo.contact_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="employeeInfo.emergency_contact_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emergency Contact Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="employeeInfo.emergency_contact_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emergency Contact Number</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="mt-2 w-full bg-primary text-white hover:bg-primary-foreground"
          >
            Update Details
          </Button>
        </form>
      </Form>
    </div>
  );
}
