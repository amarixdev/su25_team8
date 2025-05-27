'use client';
import React, { useState } from 'react';

// Dummy data for the dashboard
const dummyStats = {
  totalPosts: 12,
  totalViews: 3456,
  totalComments: 89,
  recentPosts: [
    { id: 1, title: "The Future of Web Development", views: 1234, comments: 23, date: "May 15, 2023" },
    { id: 2, title: "Understanding TypeScript", views: 987, comments: 15, date: "May 10, 2023" },
    { id: 3, title: "The Art of UI/UX Design", views: 756, comments: 12, date: "May 5, 2023" },
  ]
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Contributor Dashboard</h1>
        <p className="mt-2 text-gray-600">Manage your content and track your performance</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`${
              activeTab === 'overview'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('posts')}
            className={`${
              activeTab === 'posts'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer`}
          >
            My Posts
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`${
              activeTab === 'analytics'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer`}
          >
            Analytics
          </button>
        </nav>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">Total Posts</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">{dummyStats.totalPosts}</dd>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">Total Views</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">{dummyStats.totalViews}</dd>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">Total Comments</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">{dummyStats.totalComments}</dd>
              </div>
            </div>
          </div>

          {/* Recent posts */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Posts</h3>
            </div>
            <div className="border-t border-gray-200">
              <ul className="divide-y divide-gray-200">
                {dummyStats.recentPosts.map((post) => (
                  <li key={post.id} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-indigo-600 truncate">{post.title}</p>
                        <p className="mt-1 text-sm text-gray-500">Published on {post.date}</p>
                      </div>
                      <div className="ml-4 flex-shrink-0 flex space-x-4">
                        <div className="text-sm text-gray-500">
                          {post.views} views
                        </div>
                        <div className="text-sm text-gray-500">
                          {post.comments} comments
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'posts' && (
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-900">My Posts</h2>
            <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
              Create New Post
            </button>
          </div>
          <div className="space-y-4">
            {dummyStats.recentPosts.map((post) => (
              <div key={post.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{post.title}</h3>
                    <p className="text-sm text-gray-500">Published on {post.date}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium cursor-pointer">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900 text-sm font-medium cursor-pointer">
                      Delete
                    </button>
                  </div>
                </div>
                <div className="mt-2 flex space-x-4 text-sm text-gray-500">
                  <span>{post.views} views</span>
                  <span>{post.comments} comments</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Analytics Overview</h2>
          <div className="space-y-6">
            <div className="border rounded-lg p-4">
              <h3 className="text-md font-medium text-gray-900 mb-2">Post Performance</h3>
              <p className="text-sm text-gray-500">View detailed analytics for your posts</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="text-md font-medium text-gray-900 mb-2">Audience Insights</h3>
              <p className="text-sm text-gray-500">Learn about your readers and their preferences</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="text-md font-medium text-gray-900 mb-2">Engagement Metrics</h3>
              <p className="text-sm text-gray-500">Track comments, shares, and other engagement metrics</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 