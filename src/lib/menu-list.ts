import {
  Warehouse,
  LayoutDashboard,
  NotebookText,
  Store,
  Users,
  Layers,
  ShoppingCart,
  Wallet,
  FileChartColumnIncreasing,
  ChartLine,
  Package,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string, userRole: string): Group[] {
  const isAdmin = userRole === "Admin";
  const isManager = userRole === "Manager";
  const isEmployee = userRole === "Employee";

  return [
    {
      groupLabel: "Management",
      menus: [
        // Admin, Manager Role
        (isAdmin || isManager) && {
          href: "/",
          label: "Dashboard",
          active: pathname === "/",
          icon: LayoutDashboard,
          submenus: [],
        },
        // Employee Role
        isEmployee && {
          href: "/overview",
          label: "Overview",
          active: pathname === "/overview",
          icon: LayoutDashboard,
          submenus: [],
        },
        // Admin, Manager, Employee Role
        (isAdmin || isManager || isEmployee) && {
          href: "/product",
          label: "Product",
          active: pathname.includes("/product"),
          icon: Package,
          submenus: [],
        },
        // Admin, Manager, Employee Role
        (isAdmin || isManager || isEmployee) && {
          href: "/inventory",
          label: "Inventory",
          active: pathname.includes("/inventory"),
          icon: Warehouse,
          submenus: [],
        },
        // Admin, Manager Role
        (isAdmin || isManager) && {
          href: "/categories",
          label: "Categories",
          active: pathname.includes("/categories"),
          icon: Layers,
          submenus: [],
        },
        // Admin Role
        isAdmin && {
          href: "/franchise",
          label: "Franchise",
          active: pathname.includes("/franchise"),
          icon: Store,
          submenus: [],
        },
        // Admin Role
        isAdmin && {
          href: "/employee",
          label: "Employee",
          active: pathname.includes("/employee"),
          icon: Users,
          submenus: [],
        },
        // Employee Role
        isEmployee && {
          href: "/reports",
          label: "Reports",
          active: pathname === "/reports",
          icon: NotebookText,
          submenus: [],
        },
      ].filter(Boolean) as Menu[], // Remove falsy values (like undefined) and cast to Menu[] type
    },

    {
      groupLabel: "Commerce Center",
      menus: [
        // Admin, Manager, Employee Role
        {
          href: "/orders",
          label: "Orders",
          active: pathname.includes("/orders"),
          icon: ShoppingCart,
          submenus: [],
        },
        // Admin, Manager, Employee Role
        // (isAdmin || isManager || isEmployee) && {
        //   href: "/portal/settings/shipping",
        //   label: "Shipping Setting",
        //   active: pathname === "/portal/settings/shipping",
        //   icon: Truck,
        //   submenus: [

        //   ],
        // },
        // // Admin, Manager, Employee Role
        // (isAdmin || isManager || isEmployee) && {
        //   href: "/portal/handover",
        //   label: "Pickup and Drop-off",
        //   active: pathname === "/portal/handover",
        //   icon: PackageCheck,
        //   submenus: [

        //   ],
        // },
        // // Admin, Manager, Employee Role
        // (isAdmin || isManager || isEmployee) && {
        //   href: "/portal/discount",
        //   label: "Discount",
        //   active: pathname.includes("/portal/discount"),
        //   icon: TicketPercent,
        //   submenus: [],
        // },
      ].filter(Boolean) as Menu[],
    },

    // Admin Role
    isAdmin && {
      groupLabel: "Finance",
      menus: [
        {
          href: "/finances",
          label: "Finance",
          active: pathname.includes("/finances"),
          icon: Wallet,
          submenus: [
            // {
            //   href: "/portal/income",
            //   label: "Income",
            //   active: pathname === "/portal/income",
            // },
            // {
            //   href: "/portal/finance/balance",
            //   label: "Balance",
            //   active: pathname === "/portal/orders/balance",
            // },
            // {
            //   href: "/portal/orders/payment",
            //   label: "Payment Method",
            //   active: pathname === "/portal/orders/account",
            // },
          ],
        },
      ],
    },

    // Admin, Manager Role
    (isAdmin || isManager) && {
      groupLabel: "Data",
      menus: [
        {
          href: "/reports",
          label: "Reports",
          active: pathname.includes("/reports"),
          icon: FileChartColumnIncreasing,
          submenus: [],
        },
        {
          href: "/portal/analytics",
          label: "Analytics",
          active: pathname.includes("/analytics"),
          icon: ChartLine,
          submenus: [],
        },
      ],
    },
  ].filter(Boolean) as Group[]; // Remove falsy groups (like undefined) and cast to Group[] type
}

// export function getCommerceMenuList(pathname: string): Group[] {
//   return [
//     {
//       groupLabel: "Commerce Center",
//       menus: [
//         // {
//         //   href: "/portal",
//         //   label: "Sales Overview",
//         //   active: pathname.includes("/portal"),
//         //   icon: ShoppingCart,
//         //   submenus: [],
//         // },
//         {
//           href: "/portal/orders",
//           label: "Orders",
//           active: pathname.includes("/portal/orders"),
//           icon: ShoppingCart,
//           submenus: [
//             {
//               href: "/portal/orders",
//               label: "All Orders",
//               active: pathname === "/portal/orders",
//             },
//             {
//               href: "/portal/orders/pending",
//               label: "Pending Orders",
//               active: pathname === "/portal/orders/pending",
//             },
//             {
//               href: "/portal/orders/completed",
//               label: "Completed Orders",
//               active: pathname === "/portal/orders/completed",
//             },
//           ],
//         },
//         {
//           href: "/portal/shipping",
//           label: "Shipping",
//           active: pathname.includes("/portal/shipping"),
//           icon: Truck,
//           submenus: [
//             {
//               href: "/portal/shipping",
//               label: "All Shipments",
//               active: pathname === "/portal/shipping",
//             },
//             {
//               href: "/portal/shipping/pending",
//               label: "Pending Shipments",
//               active: pathname === "/portal/shipping/pending",
//             },
//             {
//               href: "/portal/shipping/delivered",
//               label: "Delivered",
//               active: pathname === "/portal/shipping/delivered",
//             },
//           ],
//         },

//         {
//           href: "/portal/discount",
//           label: "Discount",
//           active: pathname.includes("/discount"),
//           icon: TicketPercent,
//           submenus: [],
//         },
//       ],
//     },
//     {
//       groupLabel: "Finance",
//       menus: [
//         {
//           href: "/portal/finance",
//           label: "Finance",
//           active: pathname.includes("/portal/finance"),
//           icon: Wallet,
//           submenus: [
//             {
//               href: "/portal/income",
//               label: "Income",
//               active: pathname === "/portal/income",
//             },
//             {
//               href: "/portal/finance/balance",
//               label: "Balance",
//               active: pathname === "/portal/orders/balance",
//             },
//             {
//               href: "/portal/orders/payment",
//               label: "Payment Method",
//               active: pathname === "/portal/orders/account",
//             },
//           ],
//         },
//       ],
//     },
//     {
//       groupLabel: "Data",
//       menus: [
//         {
//           href: "/portal/reports",
//           label: "Reports",
//           active: pathname.includes("/reports"),
//           icon: FileChartColumnIncreasing,
//           submenus: [],
//         },
//         {
//           href: "/portal/analytics",
//           label: "Analytics",
//           active: pathname.includes("/analytics"),
//           icon: ChartLine,
//           submenus: [],
//         },
//       ],
//     },
//   ];
// }
