import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const employeeSchema = z.object({
  user: z.object({
    first_name: z.string(),
    last_name: z.string(),
    address: z.string(),
    phone: z.string(),
    email: z.string().email(),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
    date_of_birth: z
      .string()
      .refine((dob) => !isNaN(Date.parse(dob)), {
        message: "Invalid date format",
      })
      .optional(),
    password: z.string(),
    role_id: z.number(),
  }),
  employeeInfo: z.object({
    job_title: z.string(),
    date_of_joining: z.string(),
    contact_number: z.string(),
    emergency_contact_name: z.string(),
    emergency_contact_number: z.string(),
  }),
});

type EmployeeType = z.infer<typeof employeeSchema>;

export default function AddNewEmployeeForm() {
  const form = useForm<EmployeeType>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      user: {
        first_name: "",
        last_name: "",
        address: "",
        phone: "",
        gender: "MALE",
        date_of_birth: "",
        email: "",
        password: "",
        role_id: 3,
      },
      employeeInfo: {
        job_title: "",
        date_of_joining: "",
        contact_number: "",
        emergency_contact_name: "",
        emergency_contact_number: "",
      },
    },
  });

  const onSubmit = async (data: EmployeeType) => {
    data.employeeInfo.date_of_joining = new Date(
      data.employeeInfo.date_of_joining
    ).toISOString();
    if (data.user.date_of_birth) {
      data.user.date_of_birth = new Date(data.user.date_of_birth).toISOString();
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PUBLIC_API_URL}/api/user/employee`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const result = await response.json();
      console.log("Form submitted successfully:", result);
      toast.success("Employee added successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to add employee");
    }
  };

  return (
    <div>
      <DialogHeader>
        <DialogTitle className="mb-2">Add New Employee</DialogTitle>
      </DialogHeader>
      <DialogDescription></DialogDescription>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2">
              <FormField
                control={form.control}
                name="user.first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    {form.formState.errors.user?.first_name && <FormMessage />}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="user.address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    {form.formState.errors.user?.address && <FormMessage />}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="user.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
                    </FormControl>
                    {form.formState.errors.user?.email && <FormMessage />}
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
                      <Input {...field} />
                    </FormControl>
                    {form.formState.errors.employeeInfo?.contact_number && (
                      <FormMessage />
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="user.gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MALE">Male</SelectItem>
                          <SelectItem value="FEMALE">Female</SelectItem>
                          <SelectItem value="OTHER">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    {form.formState.errors.user?.gender && (
                      <FormMessage>{form.formState.errors.user.gender.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="user.date_of_birth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} placeholder="YYYY-MM-DD" />
                    </FormControl>
                    {form.formState.errors.user?.date_of_birth && (
                      <FormMessage>
                        {form.formState.errors.user.date_of_birth.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full md:w-1/2 px-2">
              <FormField
                control={form.control}
                name="user.last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    {form.formState.errors.user?.last_name && <FormMessage />}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="user.phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    {form.formState.errors.user?.phone && <FormMessage />}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="user.password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    {form.formState.errors.user?.password && <FormMessage />}
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
                      <Input {...field} />
                    </FormControl>
                    {form.formState.errors.employeeInfo?.job_title && (
                      <FormMessage />
                    )}
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
                      <Input {...field} type="date" />
                    </FormControl>
                    {form.formState.errors.employeeInfo?.date_of_joining && (
                      <FormMessage />
                    )}
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
                      <Input {...field} />
                    </FormControl>
                    {form.formState.errors.employeeInfo
                      ?.emergency_contact_name && <FormMessage />}
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
                      <Input {...field} />
                    </FormControl>
                    {form.formState.errors.employeeInfo
                      ?.emergency_contact_number && <FormMessage />}
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              className="mt-4 bg-primary hover:bg-primary-foreground text-white"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
