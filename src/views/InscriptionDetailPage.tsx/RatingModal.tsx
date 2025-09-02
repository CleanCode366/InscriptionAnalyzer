import type React from "react";
import StarRating from "../Feed/StarRating";
import { useState } from "react";

interface RatingModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentRating: number;
    onSubmitRating: (rating: number) => void;
}

// Rating Modal Component
const RatingModal: React.FC<RatingModalProps> = ({ isOpen, onClose, currentRating, onSubmitRating }) => {
  const [rating, setRating] = useState(currentRating);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmitRating(rating);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-sm w-full">
        <h3 className="text-white text-xl font-semibold mb-4">Rate this inscription</h3>
        <div className="flex justify-center mb-6">
          <StarRating
            rating={rating} 
            size="w-8 h-8" 
          />
        </div>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Submit Rating
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;