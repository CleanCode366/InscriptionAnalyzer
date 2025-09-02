import React, { useState, useEffect } from 'react';
import { ThumbsUp, MapPin, Calendar, Languages, BookOpen, Share2, Heart, Plus } from 'lucide-react';
import StarRating from './StarRating';
import CommentCard from './CommentCard';
import RatingModal from './RatingModal';
import { mockPostData, mockComments } from '@/Db/DetailedPost';



interface InscriptionDetailsPageProp {
    postId: string;
}
export interface Comment {
    _id: string;
    user_id: string;
    user_name: string;
    description: {
        description: string;
        upvote: number;
        createdAt: Date;
    }
}

interface Post {
    _id: string;
    user_id: string;
    user_name: string;
    createdAt: Date;
    images: {
        thumbnailImage: string[];
        image: string[];
    };
    description: {
        title: string;
        description: string;
        scriptLanguage: string[];
        language: string[];
        englishTranslation: string;
        upvote: number;
        geolocation: {
            lon: number;
            lat: number;
            state: string;
            city: string;
            region: string;
        };
        createdAt: Date;
        updatedAt: Date;
    };
    topic: string;
    script: string[];
    type: string;
    rating: number;
}
// Main Inscription Details Component
const InscriptionDetailsPage: React.FC<InscriptionDetailsPageProp> = ({ postId }) => {
    // Mock data based on your structure


  const [post, setPost] = useState(null as Post | null);
  const [comments, setComments] = useState([] as Comment[]);
  const [loading, setLoading] = useState(true);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Simulate API call
  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        setLoading(true);
        // Simulate API call: localhost:8000/feed/${postId}
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setPost(mockPostData);
        setComments(mockComments);
      } catch (error) {
        console.error('Error fetching post details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [postId]);

  const handleRating = (newRating: number) => {
    setUserRating(newRating);
    // Here you would typically send the rating to your API
    console.log('Rating submitted:', newRating);
  };

  const handleAddDescription = () => {
    // Navigate to add description page or open modal
    console.log('Add description clicked');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-background flex items-center justify-center">
        <div className="text-white text-lg">Loading inscription details...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-secondary-background flex items-center justify-center">
        <div className="text-white text-lg">Inscription not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-background">
      <div className="max-w-4xl mx-auto p-4">
        {/* Main Image */}
        <div className="mb-6">
          <img 
            src={post.images.image[0]} 
            alt={post.description.title}
            className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg"
          />
        </div>

        {/* Title and Location */}
        <div className="mb-6">
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-2">
            {post.description.title}
          </h2>
          <div className="flex items-center gap-2 text-gray-300 mb-4">
            <MapPin className="w-5 h-5" />
            <span>Archaeological Museum of {post.description.geolocation.city}, {post.description.geolocation.state}</span>
          </div>
        </div>

        {/* Rating and Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <StarRating rating={post.rating} />
            <span className="text-gray-300">({post.rating})</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowRatingModal(true)}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
            >
              Rate
            </button>
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                isBookmarked ? 'bg-red-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Heart className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
            <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Description Section */}
        <div className="mb-8">
          <h3 className="text-white text-xl font-bold mb-4">User Descriptions</h3>
          
          {/* Main Description */}
          <div className="bg-secondary-background rounded-lg p-6 mb-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="text-yellow-400 font-semibold text-lg mb-2">{post.user_name}</h4>
                <p className="text-gray-300 text-base leading-relaxed mb-4">
                  {post.description.description}
                </p>
                
                {/* Metadata */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Languages className="w-4 h-4" />
                    <span>Script: {post.script.join(', ')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <BookOpen className="w-4 h-4" />
                    <span>Language: {post.description.language.join(', ')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>Type: {post.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <span>Topic: {post.topic}</span>
                  </div>
                </div>

                {/* Translation */}
                {post.description.englishTranslation && (
                  <div className="mt-4 p-3 bg-gray-700 rounded-lg">
                    <h5 className="text-orange-400 font-medium mb-2">English Translation:</h5>
                    <p className="text-gray-300 italic">"{post.description.englishTranslation}"</p>
                  </div>
                )}
              </div>
              <div className="ml-4 flex items-center gap-1 text-blue-400">
                <ThumbsUp className="w-4 h-4 fill-current" />
                <span className="font-medium">{post.description.upvote}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mb-8">
          <h3 className="text-white text-xl font-bold mb-6">Top Comments</h3>
          <div className="space-y-6">
            {comments.map((comment: Comment) => (
              <CommentCard comments={comment} />
            ))}
          </div>
        </div>

        {/* Add Description Button */}
        <div className="text-center">
          <button
            onClick={handleAddDescription}
            className="w-full sm:w-auto px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Your Description
          </button>
        </div>
      </div>

      {/* Rating Modal */}
      <RatingModal
        isOpen={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        currentRating={userRating}
        onSubmitRating={handleRating}
      />
    </div>
  );
};

// Demo wrapper component to show how to use it
export default InscriptionDetailsPage;