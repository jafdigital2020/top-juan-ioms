"use client";

import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const location = useLocation();
  const pathname = location.pathname;

  // Split the pathname into segments, ignoring the leading slash
  const pathSegments = pathname
    .split("/")
    .filter((segment) => segment.length > 0);

  const breadcrumbLabels: { [key: string]: string } = {
    admin: "Dashboard",
    shop: "Shop",
    orders: "Orders",
    product: "Products",
    inventory: "Inventory",
    categories: "Categories",
    employee: "Employee",
    reports: "Reports",
    analytics: "Analytics",
    pending: "Pending",
    portal: "Portal",
  };

  return (
    <AdminPanelLayout>
      <ContentLayout title="Dashboard">
        {pathname !== "/orders" && (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <a href="/">Home</a>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              {/* Dynamic Breadcrumbs */}
              {pathSegments.map((segment, index) => {
                const isLastSegment = index === pathSegments.length - 1;
                const breadcrumbLabel = breadcrumbLabels[segment] || segment;
                const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
                return (
                  <React.Fragment key={segment}>
                    {index !== 0 && <BreadcrumbSeparator />}
                    <BreadcrumbItem>
                      {isLastSegment ? (
                        <BreadcrumbPage>{breadcrumbLabel}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={href}>{breadcrumbLabel}</BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        )}
        <Outlet />
      </ContentLayout>
    </AdminPanelLayout>
  );
}
