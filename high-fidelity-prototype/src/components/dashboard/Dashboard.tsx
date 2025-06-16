'use client';
import React, { useState, useEffect } from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardTabs from './DashboardTabs';
import OverviewTabContent from './OverviewTabContent';
import MyPostsTabContent from './MyPostsTabContent';
import AnalyticsTabContent from './AnalyticsTabContent';
import CreatePostForm from './CreatePostForm';
import { RecentPost } from './types';
import { dummyPosts } from '../../app/dummy_data/dummyPosts';

const dashboardTabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'posts', label: 'My Posts' },
  { id: 'analytics', label: 'Analytics' },
];

const Dashboard = () => {
  // Tab and form visibility state
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreatePost, setShowCreatePost] = useState(false);
  
  // User and data state
  const [userName, setUserName] = useState("Contributor");
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalViews: 0,
    totalComments: 0,
    totalLikes: 0
  });
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCreatingManyPosts, setIsCreatingManyPosts] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch contributor data from backend
  const fetchContributorData = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const contributorId = userData.id;
      console.log('Contributor ID:', contributorId);
      console.log('User Data:', userData);
      if (!contributorId) {
        throw new Error('User not logged in');
      }

      const response = await fetch(`http://localhost:8080/api/contributors/${contributorId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch contributor data');
      }

      const contributor = await response.json();
      setUserName(contributor.name || contributor.username);
      
      // Update dashboard stats
      setStats({
        totalPosts: contributor.totalPosts || 0,
        totalViews: contributor.totalViews || 0,
        totalComments: contributor.totalComments || 0,
        totalLikes: contributor.totalLikes || 0
      });

      // Format posts for display
      const posts = contributor.posts?.map((post: any) => ({
        id: post.id,
        title: post.title,
        views: post.views || 0,
        comments: Array.isArray(post.comments) ? post.comments.length : (post.comments || 0),
        likes: post.likes || 0,
        date: new Date(post.createdAt).toLocaleDateString()
      })) || [];

      setRecentPosts(posts);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  // Load data on mount
  useEffect(() => {
    fetchContributorData();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showDropdown && !target.closest('.relative')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showDropdown]);

  // Handle post creation/update
  const handlePostCreated = async () => {
    setShowCreatePost(false);
    setIsLoading(true);
    await fetchContributorData();
    setActiveTab('posts');
  };

  // Handle creating many posts from dummy data
  const handleCreateManyPosts = async () => {
    try {
      setIsCreatingManyPosts(true);
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const contributorId = userData.id;
      
      if (!contributorId) {
        throw new Error('User not logged in');
      }

      // Create posts one by one
      for (const dummyPost of dummyPosts) {
        const postData = {
          title: dummyPost.title,
          content: dummyPost.content,
          imagePath: dummyPost.imageUrl,
          status: 'PUBLISHED' // Default status
        };

        const response = await fetch(`http://localhost:8080/api/posts/contributor/${contributorId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData)
        });

        if (!response.ok) {
          console.error(`Failed to create post: ${dummyPost.title}`);
        }
      }

      // Refresh data after creating all posts
      await fetchContributorData();
      setActiveTab('posts');
      alert(`Successfully created ${dummyPosts.length} posts!`);
    } catch (error) {
      console.error('Error creating posts:', error);
      alert('Failed to create posts. Please try again.');
    } finally {
      setIsCreatingManyPosts(false);
    }
  };

  // Show loading state
  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  // Show error state
  if (error) {
    return <div className="text-center py-12 text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Welcome header */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-2xl font-bold">
          Welcome, {userName}!
        </div>
        <div className="flex gap-2 items-center">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow transition"
            onClick={() => setShowCreatePost(true)}
          >
            + Create New Post
          </button>
          
          {/* Dropdown menu */}
          <div className="relative">
            <button
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-3 rounded shadow transition cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={() => setShowDropdown(!showDropdown)}
              disabled={isCreatingManyPosts}
            >
              {isCreatingManyPosts ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-sm">Creating...</span>
                </div>
              ) : (
                '⋯'
              )}
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="py-1">
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    onClick={() => {
                      handleCreateManyPosts();
                      setShowDropdown(false);
                    }}
                    disabled={isCreatingManyPosts}
                  >
                    {isCreatingManyPosts ? (
                      <div className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Creating Posts...</span>
                      </div>
                    ) : (
                      '+ Create Many Posts (Developer mode)'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <DashboardHeader 
        title="Contributor Dashboard" 
        subtitle="Manage your content and track your performance" 
      />

      {/* Navigation tabs */}
      <DashboardTabs 
        tabs={dashboardTabs} 
        activeTab={activeTab} 
        onTabClick={setActiveTab} 
      />

      {/* Tab content */}
      {activeTab === 'overview' && (
        <OverviewTabContent 
          stats={stats} 
          recentPosts={recentPosts} 
          onSeeAllPosts={() => setActiveTab('posts')}
        />
      )}

      {activeTab === 'posts' && (
        <MyPostsTabContent 
          posts={recentPosts} 
          onPostUpdated={fetchContributorData}
        />
      )}

      {activeTab === 'analytics' && (
        <AnalyticsTabContent />
      )}

      {/* Create post modal */}
      {showCreatePost && (
        <CreatePostForm
          onClose={() => setShowCreatePost(false)}
          onPostCreated={handlePostCreated}
        />
      )}
    </div>
  );
};

export default Dashboard; 