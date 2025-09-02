import { Star } from "lucide-react";
import type React from "react";
import { useState } from "react";

interface StarRatingProps {
    rating: number;
    size?: string;
    interactive?: boolean;
    onRate?: (rating: number) => void;
}

// Star Rating Component
const StarRating: React.FC<StarRatingProps> = ({ rating, size = "w-5 h-5", interactive = false, onRate = null }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(rating);

  const handleClick = (index: number) => {
    if (interactive) {
      const newRating = index + 1;
      setCurrentRating(newRating);
      if (onRate) onRate(newRating);
    }
  };

  const displayRating = interactive ? (hoverRating || currentRating) : rating;
  const fullStars = Math.floor(displayRating);
  const hasHalfStar = displayRating % 1 !== 0;
  
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => {
        const isFilled = index < fullStars;
        const isHalf = index === fullStars && hasHalfStar;
        
        return (
          <Star
            key={index} 
            className={`${size} cursor-${interactive ? 'pointer' : 'default'} transition-colors ${
              isFilled || isHalf ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'
            } ${interactive && hoverRating > index ? 'fill-yellow-300 text-yellow-300' : ''}`}
            onClick={() => handleClick(index)}
            onMouseEnter={() => interactive && setHoverRating(index + 1)}
            onMouseLeave={() => interactive && setHoverRating(0)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;