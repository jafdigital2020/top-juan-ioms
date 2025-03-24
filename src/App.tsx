import { BrowserRouter, Route, Routes } from "react-router-dom";

import Inventory from "./app/pages/inventory/Inventory";

import Layout from "./app/pages/inventory/layout";
import Analytics from "./app/pages/inventory/Analytics";
import Reports from "./app/pages/inventory/Reports";
import Employee from "./app/pages/inventory/Employee";
import Franchise from "./app/pages/inventory/Franchise";

import NotFoundPage from "./app/pages/404";
import Categories from "./app/pages/inventory/Categories";
import UserProfilePage from "./app/pages/inventory/UserProfile";
import Login from "./app/auth/Login";
import Shipping from "./app/pages/sales/Shipping";
import Discount from "./app/pages/sales/Discount";
import Payment from "./app/pages/sales/Payment";
import { Toaster } from "./components/ui/sonner";
import {
  LoggedInPageProtection,
  NonLoggedInPage,
  RoleBasedRouteProtection,
} from "./components/routes-protection/routes-protection";
import Product from "./app/pages/inventory/Product";
import OverviewDashboard from "./app/pages/inventory/Overview";
import Dashboard from "./app/pages/inventory/Dashboard";
import Auth from "./app/auth/auth";


import Finance from "./app/pages/finance/Finance";
import InventoryReport from "./app/pages/inventory/InventoryReport";
import Orders from "./app/pages/sales/Orders";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LoggedInPageProtection>
              <RoleBasedRouteProtection>
                <Layout />
              </RoleBasedRouteProtection>
            </LoggedInPageProtection>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="overview" element={<OverviewDashboard />} />
          <Route path="franchise" element={<Franchise />} />
          <Route path="reports" element={<Reports />} />
          <Route path="categories" element={<Categories />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="inventory/report" element={<InventoryReport />} />
          <Route path="employee" element={<Employee />} />
          <Route path="profile" element={<UserProfilePage />} />
          <Route path="orders" element={<Orders />} />
          <Route path="product" element={<Product />} />
          <Route path="portal/discount" element={<Discount />} />
          <Route path="portal/analytics" element={<Analytics />} />
          <Route path="portal/shipping" element={<Shipping />} />
          <Route path="finances" element={<Finance />} />
          <Route path="portal/payments" element={<Payment />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="/auth" element={<Auth />}></Route>
        <Route
          path="login"
          element={
            <NonLoggedInPage>
              <Login />
            </NonLoggedInPage>
          }
        />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
