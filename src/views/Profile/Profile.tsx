import { mockUser, mockPosts } from '@/Db/userProfile';
import ProfileHeader from './ProfileHeader';
import StatsGrid from './StatsGrid';
import ImageGallery from './ImageGallery';
import ContributionsList from './ContributionsList';
import { Suspense, use, useEffect, useState } from 'react';
// Mock data based on your data structure


// Profile Header Component

// Stats Dashboard Component


// Image Gallery Component


// Contributions Component

// Main Dashboard Component
const Profile = () => {

  const [UserDetails, SetUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [posts, setPosts] = useState(null);

  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [Comments, setComments] = useState(null);


  function getCookie(name: String) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  
   useEffect(() => {
      const fetchPosts = async () => {
        try {
          const token = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoidXNlciIsImV4cCI6MTc1NzAwNDc0NiwidXNlciI6Im5heWFuY29kaW5nQGdtYWlsLmNvbSIsImlhdCI6MTc1NjkxODM0Nn0.aBhbcTsImprO_qsI-B8eLZu35ETml6GYZ4pdLLCQpSo'
          const response = await fetch('http://localhost:8080/post/userProfile', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({}),
          });
          const data = await response.json();
          // SetUserDetails(Array.isArray(data.data) ? data.data : []);
          // data = { data : {}}
          // object to json converstion of data
          SetUserDetails(await (data).data);
        } catch (error) {
          console.error('Failed to fetch posts:', error);
        } finally {
          setIsLoading(false);
        }
      };
      const fetchAllPosts = async () => {
        try {
          const token = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoidXNlciIsImV4cCI6MTc1NzAwNDc0NiwidXNlciI6Im5heWFuY29kaW5nQGdtYWlsLmNvbSIsImlhdCI6MTc1NjkxODM0Nn0.aBhbcTsImprO_qsI-B8eLZu35ETml6GYZ4pdLLCQpSo'
          const response = await fetch('http://localhost:8080/post/getAllUserPost', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({}),
          });
          const data = await response.json();
          // SetUserDetails(Array.isArray(data.data) ? data.data : []);
          // data = { data : {}}
          // object to json converstion of data
          setPosts(Array.isArray(data.data) ? data.data : []);
        } catch (error) {
          console.error('Failed to fetch posts:', error);
        } finally {
          setIsLoadingPosts(false);
        }
      };
      const fetchAllComments = async () => {
        try {
          const token = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoidXNlciIsImV4cCI6MTc1NzAwNDc0NiwidXNlciI6Im5heWFuY29kaW5nQGdtYWlsLmNvbSIsImlhdCI6MTc1NjkxODM0Nn0.aBhbcTsImprO_qsI-B8eLZu35ETml6GYZ4pdLLCQpSo'
          const response = await fetch('http://localhost:8080/post/getCommentByUser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({}),
          });
          const data = await response.json();
          // SetUserDetails(Array.isArray(data.data) ? data.data : []);
          // data = { data : {}}
          // object to json converstion of data
          setComments(Array.isArray(data.data) ? data.data : []);
        } catch (error) {
          console.error('Failed to fetch posts:', error);
        } finally {
          setIsLoadingComments(false);
        }
      };
      // write the function for get post
      // get descriptions and comments
      fetchAllComments();
      fetchAllPosts();
      fetchPosts();
  }, []);

    if (isLoading || isLoadingPosts || isLoadingComments) {
    return (
      <div className="min-h-screen bg-primary-background flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-background  p-4">
      <div className="max-w-6xl mx-auto">
        {UserDetails && <ProfileHeader user={UserDetails} />}
        {UserDetails && <StatsGrid stats={UserDetails} />}
        {posts && <ImageGallery posts={posts} />}
        {Comments &&
        <ContributionsList posts={Comments} />}
      </div>
    </div>
  );
};

export default Profile;