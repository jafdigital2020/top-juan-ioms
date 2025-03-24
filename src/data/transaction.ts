interface TransactionActivity {
  date: string;
  orderId: string;
  amount: string;
  status: string;
}

const transactionsActivity: TransactionActivity[] = [
  {
    date: "11/18/2024",
    orderId: "#121999",
    amount: "PHP 1,500.00",
    status: "Completed"
  },
  {
    date: "11/17/2024",
    orderId: "#121998",
    amount: "PHP 2,000.00",
    status: "Completed"
  },
  {
    date: "11/16/2024",
    orderId: "#121997",
    amount: "PHP 2,500.00",
    status: "Completed"
  },
  {
    date: "11/15/2024",
    orderId: "#121996",
    amount: "PHP 3,000.00",
    status: "Completed"
  },
  {
    date: "11/14/2024",
    orderId: "#121995",
    amount: "PHP 1,800.00",
    status: "Completed"
  },
  {
    date: "11/13/2024",
    orderId: "#121994",
    amount: "PHP 2,200.00",
    status: "Completed"
  },
  {
    date: "11/12/2024",
    orderId: "#121993",
    amount: "PHP 2,700.00",
    status: "Completed"
  },
  {
    date: "11/11/2024",
    orderId: "#121992",
    amount: "PHP 3,500.00",
    status: "Completed"
  },
  {
    date: "11/10/2024",
    orderId: "#121991",
    amount: "PHP 1,600.00",
    status: "Completed"
  },
  {
    date: "11/09/2024",
    orderId: "#121990",
    amount: "PHP 2,800.00",
    status: "Completed"
  }
];

export default transactionsActivity;