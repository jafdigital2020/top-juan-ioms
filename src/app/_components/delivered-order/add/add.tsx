import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";

interface OrderForm {
  customer_name: string;
  phone: string;
  email: string;
  address: string;
  total_amount: number;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
}

const OrderFormComponent: React.FC = () => {
  const { control, register, handleSubmit } = useForm<OrderForm>({
    defaultValues: {
      customer_name: "",
      phone: "",
      email: "",
      address: "",
      total_amount: 0,
      items: [{ name: "", quantity: 1, price: 0 }], // Default empty item
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items", // This must match the field name in your schema
  });

  const onSubmit = (data: OrderForm) => {
    console.log("Order Submitted:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ maxWidth: "600px", margin: "auto" }}
    >
      <h2>Order Form</h2>

      {/* Customer Fields */}
      <label>Customer Name:</label>
      <input {...register("customer_name")} placeholder="Enter customer name" />

      <label>Phone:</label>
      <input {...register("phone")} placeholder="Enter phone number" />

      <label>Email:</label>
      <input {...register("email")} type="email" placeholder="Enter email" />

      <label>Address:</label>
      <input {...register("address")} placeholder="Enter address" />

      {/* Items Section */}
      <h3>Items</h3>
      {fields.map((item, index) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <label>Item Name:</label>
          <input {...register(`items.${index}.name`)} placeholder="Item name" />

          <label>Quantity:</label>
          <Controller
            control={control}
            name={`items.${index}.quantity`}
            render={({ field }) => <input {...field} type="number" />}
          />

          <label>Price:</label>
          <Controller
            control={control}
            name={`items.${index}.price`}
            render={({ field }) => <input {...field} type="number" />}
          />

          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ name: "", quantity: 1, price: 0 })}
      >
        Add Item
      </button>

      <button type="submit">Submit Order</button>
    </form>
  );
};

export default OrderFormComponent;
