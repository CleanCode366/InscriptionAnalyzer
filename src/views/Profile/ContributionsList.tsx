import type { Post } from "@/types";
import { Heart } from "lucide-react";
import React, { useEffect, useState } from "react";

interface ContributionsListProps {
  posts: Post[];
}

const ContributionsList: React.FC<ContributionsListProps> = ({ posts }) => {
  const [viewAll, setViewAll] = useState(false);
  const [layout, setLayout] = useState('grid');

  const displayPosts = viewAll ? posts : posts.slice(0, 3);

  useEffect(() => {
    const handleResize = () => {
      setLayout(window.innerWidth < 768 ? 'list' : 'grid');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
    return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
  };

  if (layout === 'list') {
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">My Contributions</h2>
          <button 
            onClick={() => setViewAll(!viewAll)}
            className="text-orange-500 hover:text-orange-400 text-sm font-medium outline-none focus:outline-none cursor-pointer"
          >
            {viewAll ? 'View Less' : 'View All'}
          </button>
        </div>

        <div className="space-y-4">
          {displayPosts.map((post) => (
            <div key={post._id} className="bg-secondary-background rounded-lg p-4">
              <div className="flex gap-4">
                <img 
                  src={post.images.thumbnailImage[0]} 
                  alt={post.description.title}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-white font-medium text-sm leading-tight">{post.description.title}</h3>
                    <div className="flex items-center gap-1 text-yellow-500 text-xs ml-2">
                      <Heart className="w-3 h-3 fill-current" />
                      {post.description.upvote}
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-xs mb-2 line-clamp-2">
                    {post.description.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="text-orange-400">{post.topic}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-500">{post.script.join(', ')}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-500">{formatDate(post.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">My Contributions</h2>
        <button 
          onClick={() => setViewAll(!viewAll)}
          className="text-orange-500 hover:text-orange-400 text-sm font-medium"
        >
          {viewAll ? 'View Less' : 'View All'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {displayPosts.map((post) => (
          <div key={post._id} className="bg-secondary-background rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-white font-medium">{post.description.title}</h3>
              <div className="flex items-center gap-1 text-yellow-500">
                <Heart className="w-4 h-4 fill-current" />
                {post.description.upvote}
              </div>
            </div>
            
            <div className="text-gray-400 text-sm mb-2">
              Added {post.description.subject} • {formatDate(post.createdAt)}
            </div>
            
            <p className="text-gray-300 text-sm mb-3 line-clamp-3">
              {post.description.description}
            </p>
            
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-gray-700 text-orange-400 px-2 py-1 rounded">{post.topic}</span>
              <span className="bg-gray-700 text-blue-400 px-2 py-1 rounded">{post.script.join(', ')}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContributionsList;