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
    { id: 4, title: "Mastering React Router", views: 812, comments: 10, date: "May 6, 2023" },
    { id: 5, title: "Intro to RESTful APIs", views: 934, comments: 9, date: "May 7, 2023" },
    { id: 6, title: "Diving into GraphQL", views: 720, comments: 11, date: "May 8, 2023" },
    { id: 7, title: "Building Forms with Formik", views: 688, comments: 7, date: "May 9, 2023" },
    { id: 8, title: "Understanding Async/Await", views: 1012, comments: 14, date: "May 10, 2023" },
    { id: 9, title: "Intro to Web Accessibility (a11y)", views: 577, comments: 5, date: "May 11, 2023" },
    { id: 10, title: "Deploying with Vercel and Netlify", views: 889, comments: 13, date: "May 12, 2023" },
    { id: 11, title: "Intro to Unit Testing in JavaScript", views: 765, comments: 8, date: "May 13, 2023" },
    { id: 12, title: "Debugging Like a Pro", views: 954, comments: 16, date: "May 14, 2023" },
    { id: 13, title: "Exploring Node.js Internals", views: 842, comments: 14, date: "May 15, 2023" },
    { id: 14, title: "CSS Grid vs Flexbox", views: 920, comments: 18, date: "May 16, 2023" },
    { id: 15, title: "React Hooks: Beyond useState", views: 1103, comments: 20, date: "May 17, 2023" },
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
          onSeeAllPosts={() => setActiveTab('posts')}
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