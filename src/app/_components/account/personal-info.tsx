import { Card } from "@/components/ui/card";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import DatePicker from "@/components/ui/datepicker";
import axios from "axios";
import { useEffect } from "react";

const personalDataSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  gender: z.string(),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." }),
  birthDate: z.date({ required_error: "Birth date is required." }),
  companyId: z.any(),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters." }),
  zipCode: z
    .string()
    .min(4, { message: "Zip code must be at least 4 characters." }),
});

type PersonalDataFormValues = z.infer<typeof personalDataSchema>;

const PersonalDataForm: React.FC = () => {
  const form = useForm<PersonalDataFormValues>({
    resolver: zodResolver(personalDataSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "",
      email: "",
      phone: "",
      birthDate: new Date(),
      companyId: "",
      address: "",
      zipCode: "",
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_PUBLIC_API_URL}/api/user/info`,
          { withCredentials: true }
        );
        const userData = response.data.success.data;
        form.reset({
          firstName: userData.first_name,
          lastName: userData.last_name,
          gender: userData.gender.toLowerCase(),
          email: userData.email,
          phone: userData.phone,
          birthDate: new Date(userData.date_of_birth),
          companyId: userData.outlet_id,
          address: userData.address,
          zipCode: userData.zip,
        });
      } catch (error) {
        toast.error("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, [form]);

  const onSubmit = async (data: PersonalDataFormValues) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_PUBLIC_API_URL}/api/user/update`,
        data,
        { withCredentials: true }
      );
      toast.success("Personal data updated successfully");
    } catch (error) {
      toast.error("Failed to update personal data");
    }
  };

  return (
    <Card className=" p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        Personal Data
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Enter your first name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Enter your last name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="block w-full mb-4 p-2 border rounded"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </FormControl>
                <FormDescription>Select your gender.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormDescription>Enter your email address.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone No.</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
                <FormDescription>Enter your phone number.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Birth Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    value={
                      field.value ? field.value.toISOString().split("T")[0] : ""
                    }
                  />
                </FormControl>
                <FormDescription>Select your birth date.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Complete Address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Enter your complete address.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zip Code</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Enter your zip code.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="text-white " type="submit">
            Update Personal Data
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default PersonalDataForm;
