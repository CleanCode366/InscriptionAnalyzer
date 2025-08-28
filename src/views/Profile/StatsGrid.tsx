import type React from "react";
import type { User } from "@/types";
import { Heart, Star, Upload, Users } from "lucide-react";

interface StatsGridProps {
  stats: User;
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  const statItems = [
    { icon: Upload, value: stats.imagesUploaded, label: "Images Uploaded", color: "text-orange-500" },
    { icon: Heart, value: stats.upvotesReceived, label: "Upvotes Received", color: "text-red-500" },
    { icon: Users, value: stats.followers, label: "Followers", color: "text-blue-500" },
    { icon: Star, value: stats.points, label: "Points", color: "text-yellow-500" }
  ];

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-white mb-4">Dashboard Stats</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statItems.map((item, index) => (
          <div key={index} className="bg-secondary-background  rounded-lg p-4 text-center">
            <item.icon className={`w-8 h-8 mx-auto mb-2 ${item.color}`} />
            <div className="text-2xl font-bold text-white mb-1">{item.value}</div>
            <div className="text-gray-400 text-sm">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsGrid;