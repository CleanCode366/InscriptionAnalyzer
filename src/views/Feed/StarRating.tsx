import { Star } from "lucide-react";
import type React from "react";

interface StarRatingProps {
  rating: number;
  size?: string; // Tailwind CSS size classes (e.g., "w-4 h-4", "w-6 h-6")
}

const StarRating: React.FC<StarRatingProps> = ({ rating, size = "w-4 h-4" }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => {
        if (index < fullStars) {
          return <Star key={index} className={`${size} fill-yellow-400 text-yellow-400`} />;
        } else if (index === fullStars && hasHalfStar) {
          return <Star key={index} className={`${size} fill-yellow-400 text-yellow-400`} style={{clipPath: 'inset(0 50% 0 0)'}} />;
        } else {
          return <Star key={index} className={`${size} text-gray-600`} />;
        }
      })}
    </div>
  );
};

export default StarRating;