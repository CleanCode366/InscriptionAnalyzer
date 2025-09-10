// Rating Modal Component
import type React from "react";
import StarRating from "./StarRating";
import { useState } from "react";

interface RatingModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentRating: number;
    postId: string;
    onSubmitRating: (rating: number) => void;
    onRatingSubmitted?: (success: boolean, message?: string) => void;
}

// Rating Modal Component
const RatingModal: React.FC<RatingModalProps> = ({ 
  isOpen, 
  onClose, 
  currentRating, 
  postId,
  onSubmitRating,
  onRatingSubmitted 
}) => {
  const [rating, setRating] = useState(currentRating);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmitRating(rating); // Now parent handles API and state
      if (onRatingSubmitted) {
        onRatingSubmitted(true);
      }
      onClose();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit rating';
      setError(errorMessage);
      if (onRatingSubmitted) {
        onRatingSubmitted(false, errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setError(null);
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
            interactive={!isSubmitting} 
            onRate={setRating}
          />
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-600 text-white rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Rating'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;