interface OngoingOrder {
  date: string;
  orderId: string;
  amount: string;
  trackingCode: string;
}

const ongoingOrders: OngoingOrder[] = [
  { date: "11/23/2024", orderId: "#122001", amount: "PHP 1,200.00", trackingCode: "9209330303" },
  { date: "11/20/2024", orderId: "#122002", amount: "PHP 2,500.00", trackingCode: "9209330323" },
  { date: "11/19/2024", orderId: "#122003", amount: "PHP 3,000.00", trackingCode: "9209330343" },
  { date: "11/18/2024", orderId: "#122004", amount: "PHP 1,800.00", trackingCode: "9209330353" },
  { date: "11/17/2024", orderId: "#122005", amount: "PHP 2,200.00", trackingCode: "9209330363" },
  { date: "11/16/2024", orderId: "#122006", amount: "PHP 2,700.00", trackingCode: "9209330373" },
  { date: "11/15/2024", orderId: "#122007", amount: "PHP 3,500.00", trackingCode: "9209330383" },

];

export default ongoingOrders;
