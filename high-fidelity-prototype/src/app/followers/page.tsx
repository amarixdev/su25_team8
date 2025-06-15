'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
// import UserCard from '@/components/followers/UserCard'; // UserCard is now used by UserGrid
import FollowersTabs from '../../components/followers/FollowersTabs';
import FollowersSearch from '../../components/followers/FollowersSearch';
import UserGrid, { MockUser } from '../../components/followers/UserGrid';
import UpgradeToContributorPrompt from '../../components/followers/UpgradeToContributorPrompt';
import SearchGrid, { SearchUser } from '../../components/followers/SearchGrid';

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
  
  const [activeTab, setActiveTab] = useState<'followers' | 'following' | 'find'>(
    tabParam === 'following' ? 'following' : tabParam === 'find' ? 'find' : 'followers'
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [userType, setUserType] = useState<'visitor' | 'contributor'>('visitor');
  const [searchResults, setSearchResults] = useState<SearchUser[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setActiveTab(tabParam === 'following' ? 'following' : tabParam === 'find' ? 'find' : 'followers');
  }, [tabParam]);
  
  useEffect(() => {
    const currentUserType = localStorage.getItem('userType') as 'visitor' | 'contributor';
    if (currentUserType === 'contributor') {
      setUserType('contributor');
    }
    // In a real app, this might also fetch based on activeTab (followers/following)
  }, []);

  // Search function for Find Account tab
  const searchAllAccounts = async (query: string) => {
    if (!query.trim() || activeTab !== 'find') {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      // Fetch all contributors and visitors
      const [contributorsResponse, visitorsResponse] = await Promise.all([
        fetch('http://localhost:8080/api/contributors'),
        fetch('http://localhost:8080/api/visitors')
      ]);

      const allUsers: SearchUser[] = [];

      if (contributorsResponse.ok) {
        const contributors = await contributorsResponse.json();
        const filteredContributors = contributors
          .filter((user: any) => 
            user.displayName?.toLowerCase().includes(query.toLowerCase()) ||
            user.username?.toLowerCase().includes(query.toLowerCase()) ||
            user.email?.toLowerCase().includes(query.toLowerCase())
          )
          .map((user: any) => ({
            id: user.id,
            displayName: user.displayName,
            username: user.username,
            email: user.email,
            profilePicturePath: user.profilePicturePath,
            bio: user.bio,
            location: user.location,
            role: 'CONTRIBUTOR' as const,
            totalPosts: user.totalPosts,
            followers: user.followers
          }));
        allUsers.push(...filteredContributors);
      }

      if (visitorsResponse.ok) {
        const visitors = await visitorsResponse.json();
        const filteredVisitors = visitors
          .filter((user: any) => 
            user.displayName?.toLowerCase().includes(query.toLowerCase()) ||
            user.username?.toLowerCase().includes(query.toLowerCase()) ||
            user.email?.toLowerCase().includes(query.toLowerCase())
          )
          .map((user: any) => ({
            id: user.id,
            displayName: user.displayName,
            username: user.username,
            email: user.email,
            profilePicturePath: user.profilePicturePath,
            bio: user.bio,
            location: user.location,
            role: 'VISITOR' as const,
            accountAge: user.accountAge,
            postsReads: user.postsReads
          }));
        allUsers.push(...filteredVisitors);
      }

      // Sort results: contributors first, then visitors, then by name
      allUsers.sort((a, b) => {
        if (a.role !== b.role) {
          return a.role === 'CONTRIBUTOR' ? -1 : 1;
        }
        return a.displayName.localeCompare(b.displayName);
      });

      setSearchResults(allUsers);
    } catch (error) {
      console.error('Error searching accounts:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Trigger search when search term changes and we're on the find tab
  useEffect(() => {
    if (activeTab === 'find') {
      const timeoutId = setTimeout(() => {
        searchAllAccounts(searchTerm);
      }, 300); // Debounce search

      return () => clearTimeout(timeoutId);
    }
  }, [searchTerm, activeTab]);

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
            {activeTab === 'find' ? (
              <SearchGrid users={searchResults} searchTerm={searchTerm} isLoading={isSearching} />
            ) : userType === 'visitor' && activeTab === 'followers' ? (
              <UpgradeToContributorPrompt />
            ) : (
              <UserGrid users={displayUsers} activeTab={activeTab as 'followers' | 'following'} userType={userType} />
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