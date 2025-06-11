'use client';
import React, { useState, useEffect } from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardTabs from './DashboardTabs';
import OverviewTabContent from './OverviewTabContent';
import MyPostsTabContent from './MyPostsTabContent';
import AnalyticsTabContent from './AnalyticsTabContent';
import CreatePostForm from './CreatePostForm';
import { RecentPost } from './types';

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
    totalComments: 0
  });
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch contributor data from backend
  const fetchContributorData = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const contributorId = userData.id;

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
        totalComments: contributor.totalComments || 0
      });

      // Format posts for display
      const posts = contributor.posts?.map((post: any) => ({
        id: post.id,
        title: post.title,
        views: post.views || 0,
        comments: post.comments || 0,
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

  // Handle post creation/update
  const handlePostCreated = async () => {
    setShowCreatePost(false);
    setIsLoading(true);
    await fetchContributorData();
    setActiveTab('posts');
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
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow transition"
          onClick={() => setShowCreatePost(true)}
        >
          + Create New Post
        </button>
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