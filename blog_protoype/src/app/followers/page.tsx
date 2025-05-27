'use client';
import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import UserCard from '@/components/UserCard';

// Mock user data
const mockUsers = [
  { id: 1, name: 'John Smith', username: 'johnsmith', avatar: '/placeholder-avatar.png', isFollowing: true },
  { id: 2, name: 'Sarah Johnson', username: 'sarahj', avatar: '/placeholder-avatar.png', isFollowing: false },
  { id: 3, name: 'Michael Brown', username: 'mikebrown', avatar: '/placeholder-avatar.png', isFollowing: true },
  { id: 4, name: 'Emily Davis', username: 'emilyd', avatar: '/placeholder-avatar.png', isFollowing: false },
  { id: 5, name: 'David Wilson', username: 'davidw', avatar: '/placeholder-avatar.png', isFollowing: true },
  { id: 6, name: 'Lisa Taylor', username: 'lisat', avatar: '/placeholder-avatar.png', isFollowing: false },
  { id: 7, name: 'Robert Martinez', username: 'robertm', avatar: '/placeholder-avatar.png', isFollowing: true },
  { id: 8, name: 'Jennifer Garcia', username: 'jenniferg', avatar: '/placeholder-avatar.png', isFollowing: false },
  { id: 9, name: 'Daniel Anderson', username: 'daniela', avatar: '/placeholder-avatar.png', isFollowing: true },
  { id: 10, name: 'Michelle Thomas', username: 'michellet', avatar: '/placeholder-avatar.png', isFollowing: false },
  { id: 11, name: 'James Rodriguez', username: 'jamesr', avatar: '/placeholder-avatar.png', isFollowing: true },
  { id: 12, name: 'Patricia Martinez', username: 'patriciam', avatar: '/placeholder-avatar.png', isFollowing: false },
];

// New component to contain the logic using useSearchParams
function FollowersContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  
  const [activeTab, setActiveTab] = useState(tabParam === 'following' ? 'following' : 'followers');
  const [searchTerm, setSearchTerm] = useState('');
  // Simulate user type, replace with actual auth state
  const [userType, setUserType] = useState('visitor'); // 'visitor' or 'contributor'

  // Update active tab when URL parameter changes
  useEffect(() => {
    if (tabParam === 'following') {
      setActiveTab('following');
    } else {
      setActiveTab('followers');
    }
  }, [tabParam]);
  
  // Simulate user type detection - in a real app, this would come from auth context
  useEffect(() => {
    const currentUser = localStorage.getItem('userType'); // Or however you store user type
    if (currentUser === 'contributor') {
      setUserType('contributor');
    }
  }, []);

  // Filter users based on search term
  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Connections</h1>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
          <Link
              href="/followers?tab=following"
              className={`${
                activeTab === 'following'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer`}
              onClick={() => setActiveTab('following')}
            >
              Following
            </Link>
            <Link
              href="/followers"
              className={`${
                activeTab === 'followers'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer`}
              onClick={() => setActiveTab('followers')}
            >
              Followers
            </Link>
          
          </nav>
        </div>
        
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              name="search"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder={`Search ${activeTab}`}
            />
          </div>
        </div>
        
        {/* User Grid or Upgrade Link */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            {userType === 'visitor' && activeTab === 'followers' ? (
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Want to see who follows you and gain your own followers?
                </h2>
                <p className="text-gray-600 mb-6">
                  Upgrade to a contributor account to publish articles, connect with readers, and build your presence.
                </p>
                <Link 
                  href="/upgrade"
                  className="px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Upgrade to Contributor
                </Link>
              </div>
            ) : (
              <>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  {activeTab === 'followers' ? 'People who follow you' : 'People you follow'}
                </h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {filteredUsers.map(user => (
                    <UserCard
                      key={user.id}
                      name={user.name}
                      username={user.username}
                      avatar={user.avatar}
                      isFollowing={user.isFollowing}
                      showFollowButton={activeTab === 'followers' && userType === 'contributor'}
                      showUnfollowButton={activeTab === 'following'}
                    />
                  ))}
                </div>
                
                {filteredUsers.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No {activeTab} found.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FollowersPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FollowersContent />
    </Suspense>
  );
} 