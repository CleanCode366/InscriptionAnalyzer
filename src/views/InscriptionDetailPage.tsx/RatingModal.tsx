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

  function getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }
    return null;
  }
  
  const submitRatingToAPI = async (postId: string, rating: number): Promise<string> => {
    const myHeaders = new Headers();
    const token = getCookie('token');
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", `Bearer ${token}`);
    const urlencoded = new URLSearchParams();
    urlencoded.append("postId", postId);
    urlencoded.append("rating", rating.toString());
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    const response = await fetch("http://localhost:8080/post/addRating", requestOptions);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const result = await response.text();
    return result;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await submitRatingToAPI(postId, rating);
      alert(`Rating submitted successfully: ${result}`);
      
      // Update local state
      onSubmitRating(rating);
      
      // Notify parent of success
      if (onRatingSubmitted) {
        onRatingSubmitted(true, result);
      }
      
      onClose();
    } catch (error) {
      console.error('Failed to submit rating:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit rating';
      setError(errorMessage);
      
      // Notify parent of failure
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