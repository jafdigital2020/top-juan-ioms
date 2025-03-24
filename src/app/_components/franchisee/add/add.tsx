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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Updated schema to include franchiseOutlet and franchiseContract
const employeeSchema = z.object({
  user: z.object({
    first_name: z.string(),
    last_name: z.string(),
    address: z.string(),
    phone: z.string(),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
    date_of_birth: z
      .string()
      .refine((dob) => !isNaN(Date.parse(dob)), {
        message: "Invalid date format",
      })
      .optional(),
    email: z.string().email(),
    password: z.string(),
    role_id: z.number(),
  }),
  franchiseOutlet: z.object({
    franchise_name: z.string(),
    address: z.string(),
    city: z.string(),
    province: z.string(),
    zip: z.string(),
  }),
  franchiseContract: z.object({
    agreement_start: z.string(),
    agreement_end: z.string(),
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
        email: "",
        password: "",
        gender: "MALE",
        date_of_birth: "",
        role_id: 1,
      },
      franchiseOutlet: {
        franchise_name: "Top Juan - ",
        address: "",
        city: "",
        province: "",
        zip: "",
      },
      franchiseContract: {
        agreement_start: "",
        agreement_end: "",
      },
    },
  });

  const onSubmit = async (data: EmployeeType) => {
    try {
      // Convert date strings to ISO-8601 DateTime strings
      if (data.user.date_of_birth) {
        data.user.date_of_birth = new Date(
          data.user.date_of_birth
        ).toISOString();
      }
      data.franchiseContract.agreement_start = new Date(
        data.franchiseContract.agreement_start
      ).toISOString();
      data.franchiseContract.agreement_end = new Date(
        data.franchiseContract.agreement_end
      ).toISOString();

      const response = await fetch(
        `${import.meta.env.VITE_PUBLIC_API_URL}/api/user/franchise`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Network response was not ok");
      }

      const result = await response.json();
      console.log("Form Values:", result);
      toast.success("Franchise added successfully");
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(`Failed to add franchise: ${error.message}`);
    }
  };

  return (
    <div>
      <DialogHeader>
        <DialogTitle className="mb-2">Add New Franchise</DialogTitle>
      </DialogHeader>
      <DialogDescription></DialogDescription>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* User Section */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="user.first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    {form.formState.errors.user?.first_name && (
                      <FormMessage>
                        {form.formState.errors.user.first_name.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="user.last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    {form.formState.errors.user?.last_name && (
                      <FormMessage>
                        {form.formState.errors.user.last_name.message}
                      </FormMessage>
                    )}
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
                    {form.formState.errors.user?.phone && (
                      <FormMessage>
                        {form.formState.errors.user.phone.message}
                      </FormMessage>
                    )}
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
                    {form.formState.errors.user?.address && (
                      <FormMessage>
                        {form.formState.errors.user.address.message}
                      </FormMessage>
                    )}
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
                      <Input {...field} />
                    </FormControl>
                    {form.formState.errors.user?.email && (
                      <FormMessage>
                        {form.formState.errors.user.email.message}
                      </FormMessage>
                    )}
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
                      <Input type="password" {...field} />
                    </FormControl>
                    {form.formState.errors.user?.password && (
                      <FormMessage>
                        {form.formState.errors.user.password.message}
                      </FormMessage>
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
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
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
                      <FormMessage>
                        {form.formState.errors.user.gender.message}
                      </FormMessage>
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
          </div>

          {/* Franchise Outlet Section */}
          <div>
            <h3 className="font-semibold text-lg my-3">
              Franchise Outlet Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="franchiseOutlet.franchise_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Franchise Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    {form.formState.errors.franchiseOutlet?.franchise_name && (
                      <FormMessage>
                        {
                          form.formState.errors.franchiseOutlet.franchise_name
                            .message
                        }
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="franchiseOutlet.province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Province</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    {form.formState.errors.franchiseOutlet?.province && (
                      <FormMessage>
                        {form.formState.errors.franchiseOutlet.province.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="franchiseOutlet.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    {form.formState.errors.franchiseOutlet?.city && (
                      <FormMessage>
                        {form.formState.errors.franchiseOutlet.city.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="franchiseOutlet.zip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zip</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    {form.formState.errors.franchiseOutlet?.zip && (
                      <FormMessage>
                        {form.formState.errors.franchiseOutlet.zip.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="franchiseOutlet.address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Franchise Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Street Name, Building, House No."
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.franchiseOutlet?.address && (
                    <FormMessage>
                      {form.formState.errors.franchiseOutlet.address.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
          </div>

          {/* Franchise Contract Section */}
          <div>
            <h3 className="font-semibold text-lg my-3">
              Franchise Contract Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              <FormField
                control={form.control}
                name="franchiseContract.agreement_start"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agreement Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    {form.formState.errors.franchiseContract
                      ?.agreement_start && (
                      <FormMessage>
                        {
                          form.formState.errors.franchiseContract
                            .agreement_start.message
                        }
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="franchiseContract.agreement_end"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agreement End Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    {form.formState.errors.franchiseContract?.agreement_end && (
                      <FormMessage>
                        {
                          form.formState.errors.franchiseContract.agreement_end
                            .message
                        }
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button
              type="submit"
              className="bg-primary hover:bg-primary-foreground text-white"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
