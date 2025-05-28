'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
// import UserCard from '@/components/followers/UserCard'; // UserCard is now used by UserGrid
import FollowersTabs from '../../components/followers/FollowersTabs';
import FollowersSearch from '../../components/followers/FollowersSearch';
import UserGrid, { MockUser } from '../../components/followers/UserGrid';
import UpgradeToContributorPrompt from '../../components/followers/UpgradeToContributorPrompt';

// Mock user data - can be moved to a service or API call
const mockUsers: MockUser[] = [
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

function FollowersContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  
  const [activeTab, setActiveTab] = useState<'followers' | 'following'>(tabParam === 'following' ? 'following' : 'followers');
  const [searchTerm, setSearchTerm] = useState('');
  const [userType, setUserType] = useState<'visitor' | 'contributor'>('visitor');

  useEffect(() => {
    setActiveTab(tabParam === 'following' ? 'following' : 'followers');
  }, [tabParam]);
  
  useEffect(() => {
    const currentUserType = localStorage.getItem('userType') as 'visitor' | 'contributor';
    if (currentUserType === 'contributor') {
      setUserType('contributor');
    }
    // In a real app, this might also fetch based on activeTab (followers/following)
  }, []);

  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Further filter based on whether they are following the current user or being followed by the current user
  // This logic is simplified; in a real app, you'd fetch the correct list (followers/following)
  const displayUsers = activeTab === 'following' 
    ? filteredUsers.filter(u => u.isFollowing) // Show who the current user is following
    : filteredUsers; // Show who is following the current user (mock data doesn't distinguish this fully)

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Connections</h1>
        
        <FollowersTabs activeTab={activeTab} setActiveTab={setActiveTab} /> 
        <FollowersSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} activeTab={activeTab} />
        
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            {userType === 'visitor' && activeTab === 'followers' ? (
              <UpgradeToContributorPrompt />
            ) : (
              <UserGrid users={displayUsers} activeTab={activeTab} userType={userType} />
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