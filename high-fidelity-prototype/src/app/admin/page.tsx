'use client';

import { useState } from 'react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('stats');

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        {/* Admin Navigation Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('stats')}
              className={`${
                activeTab === 'stats'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Server Stats
            </button>
            <button
              onClick={() => setActiveTab('posts')}
              className={`${
                activeTab === 'posts'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Manage Posts
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`${
                activeTab === 'users'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Manage Users
            </button>
          </nav>
        </div>

        {/* Content Sections */}
        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === 'stats' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Server Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">1,234</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">Total Posts</h3>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">5,678</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">Active Users</h3>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">789</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'posts' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Manage Posts</h2>
              <div className="space-y-4">
                {/* Sample posts - in a real app, this would be mapped from data */}
                {[1, 2, 3].map((post) => (
                  <div key={post} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium">Sample Post {post}</h3>
                      <p className="text-sm text-gray-500">Posted by User {post}</p>
                    </div>
                    <button className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800">
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Manage Users</h2>
              <div className="space-y-4">
                {/* Sample users - in a real app, this would be mapped from data */}
                {[1, 2, 3].map((user) => (
                  <div key={user} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium">User {user}</h3>
                      <p className="text-sm text-gray-500">user{user}@example.com</p>
                    </div>
                    <button className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800">
                      Ban User
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 