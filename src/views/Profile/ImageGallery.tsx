import React, { useState } from "react";
import { Heart } from "lucide-react";
import type { Post } from "@/types";

interface ImageGalleryProps {
    posts: Post[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ posts }) => {
  const [viewAll, setViewAll] = useState(false);
  const displayPosts = viewAll ? posts : posts.slice(0, 6);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Uploaded Images</h2>
        <button 
          onClick={() => setViewAll(!viewAll)}
          className="text-orange-500 hover:text-orange-400 text-sm font-medium outline-none focus:outline-none cursor-pointer"
        >
          {viewAll ? 'View Less' : 'View All'}
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {displayPosts.map((post) => (
          <div key={post._id} className="relative group cursor-pointer">
            <div className="aspect-square bg-secondary-background rounded-lg overflow-hidden">
              <img 
                src={post.images.thumbnailImage[0]} 
                alt={post.description.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <Heart className="w-3 h-3 fill-current" />
              {post.description.upvote}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;