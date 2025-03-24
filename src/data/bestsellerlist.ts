// src/data.ts

export interface Bestseller {
    name: string;
    productCode: string;
    pricePerItem: string;
    sold: string;
  }
  
  export const bestsellerList: Bestseller[] = [
    { name: "Chocolate Powder", productCode: "#CHOPO202024", pricePerItem: "200/ITEM", sold: "2.5k" },
    { name: "Dark Chocolate Powder", productCode: "#DACHPO202024", pricePerItem: "250/ITEM", sold: "2.5k" },
    { name: "Okinawa Powder", productCode: "#DACHPO202024", pricePerItem: "250/ITEM", sold: "2.5k" },
  ];
  