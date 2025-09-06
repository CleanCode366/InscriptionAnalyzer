import { ThumbsUp } from "lucide-react";
import { useState } from "react";
import type { Comment } from "./InscriptionDetailPage";

interface CommentCardProps{
    comments: Comment;
}

// Comment Component
const CommentCard: React.FC<CommentCardProps> = ({ comments }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(comments.upvote);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  

  return (
    <div className="border-b border-gray-700 pb-6 mb-6 last:border-b-0">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="text-yellow-400 font-semibold text-lg mb-1">{comments.username}</h4>
          <p className="text-gray-300 text-base leading-relaxed">
            {comments.description}
          </p>
        </div>
        <div className="ml-4 flex items-center gap-2">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 px-3 py-1 rounded-full transition-colors ${
              isLiked ? 'text-blue-400 bg-blue-900/30' : 'text-gray-400 hover:text-blue-400 hover:bg-blue-900/20'
            }`}
          >
            <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            <span className="font-medium">{likes}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;