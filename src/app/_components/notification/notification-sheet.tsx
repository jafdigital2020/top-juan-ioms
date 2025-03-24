import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface Notification {
  id: number;
  user: string;
  action: string;
  details: string;
  timestamp: string;
  product_name: string;
}

const NotificationSheet = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

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
          toast.error("Failed to fetch notifications");
        }
      } catch (error) {
        toast.error("An error occurred while fetching notifications");
      }
    };

    fetchNotifications();
  }, []);

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="text-2xl mb-4 font-bold p-2">
          Notification
        </SheetTitle>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="inline-flex h-9 items-center text-muted-foreground w-full justify-start rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              className="inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              value="general"
            >
              General
            </TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <div className="flex flex-col items-center">
              <div className="w-full max-w-md">
                <div className="grid grid-cols-2 gap-6 mb-4"></div>
                {notifications.length === 0 ? (
                  <div className="bg-gray-200 p-4 rounded">
                    There's nothing here
                  </div>
                ) : (
                  <>
                    {notifications.map((notification) => (
                      <div key={notification.id} className="p-2 rounded mb-4">
                        <div className="font-bold">
                          {notification.product_name}
                        </div>
                        <div>
                          {notification.action} {notification.details}
                        </div>
                        <div className="text-gray-500 text-sm">
                          {notification.timestamp}
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </SheetHeader>
    </SheetContent>
  );
};

export default NotificationSheet;
