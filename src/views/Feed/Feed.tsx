import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import mockDiscoveryPosts from '@/Db/feeds';
import FilterBar from './FilterBar';
import DiscoveryCard from './DiscoveryCard';



// Main Discovery Feed Component
const Feed = () => {
  const [layout, setLayout] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState(mockDiscoveryPosts);

  // Filter posts based on search term
  const filteredPosts = posts.filter(post => 
    post.description.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.description.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.description.geolocation.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.script.some(script => script.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Responsive layout adjustment
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && layout === 'grid') {
        // Keep grid but adjust to single column on very small screens
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [layout]);

  return (
    <div className="min-h-screen bg-primary-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Discover Archaeological Sites</h1>
          <p className="text-gray-400">Explore ancient inscriptions and historical sites near you</p>
        </div>

        {/* Filter Bar */}
        <FilterBar 
          layout={layout} 
          setLayout={setLayout}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-400 text-sm">
            {filteredPosts.length} sites found {searchTerm && `for "${searchTerm}"`}
          </p>
        </div>

        {/* Posts Grid/List */}
        <div className={
          layout === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }>
          {filteredPosts.map((post) => (
            <DiscoveryCard 
              key={post._id} 
              post={post} 
              layout={layout}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">No sites found</p>
              <p className="text-sm">Try adjusting your search terms or filters</p>
            </div>
          </div>
        )}

        {/* Load More Button */}
        {filteredPosts.length > 0 && (
          <div className="text-center mt-8">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Load More Sites
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;