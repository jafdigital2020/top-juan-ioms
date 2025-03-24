interface StockAlert {
  item: string;
  alert: string;
  action: string;
}

const stockAlerts: StockAlert[] = [
  {
    item: "Coffee Beans",
    alert: "Low Stock",
    action: "Restock"
  },
  {
    item: "Milk",
    alert: "Low Stock",
    action: "Restock"
  },
  {
    item: "Sugar",
    alert: "Out of Stock",
    action: "Order Now"
  },
  {
    item: "Tea Bags",
    alert: "Low Stock",
    action: "Restock"
  },
  {
    item: "Flour",
    alert: "Low Stock",
    action: "Restock"
  },
  {
    item: "Butter",
    alert: "Out of Stock",
    action: "Order Now"
  },
  {
    item: "Yeast",
    alert: "Low Stock",
    action: "Restock"
  },
  {
    item: "Salt",
    alert: "Out of Stock",
    action: "Order Now"
  },
  {
    item: "Baking Soda",
    alert: "Low Stock",
    action: "Restock"
  },
  {
    item: "Eggs",
    alert: "Out of Stock",
    action: "Order Now"
  }
];

export default stockAlerts;