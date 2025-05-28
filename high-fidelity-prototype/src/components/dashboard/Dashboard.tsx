'use client';
import React, { useState } from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardTabs from './DashboardTabs';
import OverviewTabContent from './OverviewTabContent';
import MyPostsTabContent from './MyPostsTabContent';
import AnalyticsTabContent from './AnalyticsTabContent';
import { RecentPost } from './types';

// Dummy data for the dashboard
const sampleDashData = {
  totalPosts: 12,
  totalViews: 3456,
  totalComments: 89,
  recentPosts: [
    { id: 1, title: "The Future of Web Development", views: 1234, comments: 23, date: "May 15, 2023" },
    { id: 2, title: "Understanding TypeScript", views: 987, comments: 15, date: "May 10, 2023" },
    { id: 3, title: "The Art of UI/UX Design", views: 756, comments: 12, date: "May 5, 2023" },
  ] as RecentPost[] // Added type assertion here
};

const dashboardTabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'posts', label: 'My Posts' },
  { id: 'analytics', label: 'Analytics' },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const userName = "Contributor";

  return (
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Flex container for welcome and button */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-2xl font-bold">
          Welcome, {userName}!
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow transition"
          onClick={() => alert('Create New Post clicked!')}
        >
          + Create New Post
        </button>
      </div>
      
      <DashboardHeader 
        title="Contributor Dashboard" 
        subtitle="Manage your content and track your performance" 
      />

      <DashboardTabs 
        tabs={dashboardTabs} 
        activeTab={activeTab} 
        onTabClick={setActiveTab} 
      />

      {/* Content based on active tab */}
      {activeTab === 'overview' && (
        <OverviewTabContent 
          stats={sampleDashData} 
          recentPosts={sampleDashData.recentPosts} 
        />
      )}

      {activeTab === 'posts' && (
        <MyPostsTabContent posts={sampleDashData.recentPosts} /> // Using recentPosts for now
      )}

      {activeTab === 'analytics' && (
        <AnalyticsTabContent />
      )}
    </div>
  );
};

export default Dashboard; 