import { Sheet, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { Bell } from "lucide-react";

import NotificationSheet from "./notification-sheet";
import { useEffect, useState } from "react";

const Notification = () => {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_PUBLIC_API_URL}/api/notification/item/status`
        );
        const data = await response.json();
        if (data.success && data.success.data) {
          const notifications = data.success.data.data.map((item: any) => ({
            id: item.inventory_id,
            details: data.success.data.message,
            timestamp: item.updated_at,
            product_name: item.product_name,
          }));
          setNotifications(notifications);
        } else {
          console.error("Failed to fetch notifications");
        }
      } catch (error) {
        console.error("An error occurred while fetching notifications");
      }
    };

    fetchNotifications();
  }, []);

  const totalItems = notifications.length;

  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <SheetDescription></SheetDescription>
          <div className="relative inline-block mr-2">
            <Bell className="mr-1 text-gray-600" />
            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white w-4 h-4 text-xs flex justify-center items-center rounded-full">
              {totalItems > 0 ? totalItems : 0}
            </span>
          </div>
        </SheetTrigger>
        <NotificationSheet />
      </Sheet>
    </div>
  );
};

export default Notification;
