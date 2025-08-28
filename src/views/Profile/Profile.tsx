import { mockUser, mockPosts } from '@/Db/userProfile';
import ProfileHeader from './ProfileHeader';
import StatsGrid from './StatsGrid';
import ImageGallery from './ImageGallery';
import ContributionsList from './ContributionsList';
// Mock data based on your data structure


// Profile Header Component

// Stats Dashboard Component


// Image Gallery Component


// Contributions Component

// Main Dashboard Component
const Profile = () => {
  return (
    <div className="min-h-screen bg-primary-background  p-4">
      <div className="max-w-6xl mx-auto">
        <ProfileHeader user={mockUser} />
        <StatsGrid stats={mockUser} />
        <ImageGallery posts={mockPosts} />
        <ContributionsList posts={mockPosts} />
      </div>
    </div>
  );
};

export default Profile;