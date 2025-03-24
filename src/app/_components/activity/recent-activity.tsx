import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

interface Activity {
  activity_type: string;
  inventory_id: number;
  quantity: number;
  activity_date: string;
  message: string;
  product_name: string;
}

const RecentActivity = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_PUBLIC_API_URL}/api/inventory/activity`
        );
        const data = await response.json();
        if (data.success && data.success.data) {
          setActivities(data.success.data.slice(0, 5)); // Limit to 5 activities
        }
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  return (
    <Card className="p-5">
      <h2 className="text-lg font-semibold mb-2 text-primary-foreground dark:text-white">
        Recent Activity
      </h2>
      <hr />
      <ul className="space-y-4 pt-2">
        {activities.map((activity) => (
            <li key={activity.inventory_id} className="text-xs font-poppin">
            <span>
              {activity.activity_type === "restock" ? "Restocked" : "Added"} {activity.quantity} units of <span className="font-semibold text-primary">{activity.product_name}</span>
            </span>
            <div className="text-gray-500 text-xs">
              {new Date(activity.activity_date).toLocaleString()}
            </div>
            </li>
        ))}
      </ul>
    </Card>
  );
};

export default RecentActivity;
