'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
// import UserCard from '@/components/followers/UserCard'; // UserCard is now used by UserGrid
import FollowersTabs from '../../components/followers/FollowersTabs';
import FollowersSearch from '../../components/followers/FollowersSearch';
import UpgradeToContributorPrompt from '../../components/followers/UpgradeToContributorPrompt';
import SearchGrid, { SearchUser } from '../../components/followers/SearchGrid';
import { FollowService } from '../../services/followService';
import { useFollow } from '../../contexts/FollowContext';
import Link from 'next/link';

// Create a real user display component for followers/following
interface RealUser {
  id: number;
  displayName: string;
  username: string;
  email: string;
  profilePicturePath?: string;
  bio?: string;
  location?: string;
  role: string;
  // Contributor specific fields
  totalPosts?: number;
  totalViews?: number;
  totalLikes?: number;
}

interface RealUserCardProps {
  user: RealUser;
}

const RealUserCard: React.FC<RealUserCardProps> = ({ user }) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
      <Link href={`/profile/${user.username}`} className="flex items-center space-x-4">
        {/* Profile Picture */}
        <div className="flex-shrink-0">
          {user.profilePicturePath ? (
            <img
              src={user.profilePicturePath}
              alt={user.displayName}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          ) : (
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-lg font-bold">
              {getInitials(user.displayName)}
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  <div className="hover:text-blue-600 transition-colors">
                    {user.displayName}
                  </div>
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  user.role === 'CONTRIBUTOR' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {user.role === 'CONTRIBUTOR' ? 'Contributor' : 'Visitor'}
                </span>
              </div>
              <p className="text-gray-600 text-sm">@{user.username}</p>
              {user.bio && (
                <p className="text-gray-700 text-sm mt-1 line-clamp-2">{user.bio}</p>
              )}
            </div>
          </div>

          {/* Stats for contributors */}
          {user.role === 'CONTRIBUTOR' && (
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
              <span>{user.totalPosts || 0} posts</span>
              <span>{user.totalViews || 0} views</span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

function FollowersContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const { followingCount, followersCount, currentUser } = useFollow();
  
  const [activeTab, setActiveTab] = useState<'followers' | 'following' | 'find'>(
    tabParam === 'following' ? 'following' : tabParam === 'find' ? 'find' : 'followers'
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [userType, setUserType] = useState<'visitor' | 'contributor'>('visitor');
  const [searchResults, setSearchResults] = useState<SearchUser[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [followers, setFollowers] = useState<RealUser[]>([]);
  const [following, setFollowing] = useState<RealUser[]>([]);
  const [isLoadingConnections, setIsLoadingConnections] = useState(true);

  useEffect(() => {
    setActiveTab(tabParam === 'following' ? 'following' : tabParam === 'find' ? 'find' : 'followers');
  }, [tabParam]);
  
  useEffect(() => {
    if (currentUser) {
      const currentUserType = currentUser.userType as 'visitor' | 'contributor';
      setUserType(currentUserType);
    }
  }, [currentUser]);

  // Load followers and following data
  useEffect(() => {
    // This effect runs when the user changes or when follow counts change,
    // indicating that we might need to refresh our data.
    if (currentUser) {
      loadConnections();
      console.log('loading connections');
    } else {
      console.log('clearing data');
      // Clear data on logout
      setFollowers([]);
      setFollowing([]);
      setIsLoadingConnections(false);
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, followingCount, followersCount]);

  const loadConnections = async () => {
    if (!currentUser) return;
  
    try {
      // These calls will be instant if data is in the cache.
      const followingData = await FollowService.getFollowing(currentUser.id);
      setFollowing(followingData.map(contributor => ({ ...contributor, role: 'CONTRIBUTOR' })));

      if (currentUser.userType === 'contributor') {
        const followersData = await FollowService.getFollowers(currentUser.id);
        setFollowers(followersData);
      }
    } catch (error) {
      console.error('Error loading connections:', error);
    } finally {
      // We always turn off the loading spinner after the first fetch.
      // On subsequent re-fetches (after a follow/unfollow), the UI will just
      // update seamlessly without a loading spinner.
      setIsLoadingConnections(false);
    }
  };

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
            followersCount: 0 // Will be calculated dynamically in SearchGrid
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

  // Filter followers/following based on search term
  const filteredFollowers = followers.filter(user => 
    user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFollowing = following.filter(user => 
    user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  


  const renderConnectionsList = () => {
    if (isLoadingConnections) {
      return (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading connections...</p>
        </div>
      );
    }

    const users = activeTab === 'following' ? filteredFollowing : filteredFollowers;
    const title = activeTab === 'following' ? 'Following' : 'Followers';

    if (users.length === 0) {
      return (
        <div className="text-center py-8 space-y-4">
          <p className="text-gray-500">
            {searchTerm ? `No ${title.toLowerCase()} found matching "${searchTerm}"` : `No ${title.toLowerCase()} yet`}
          </p>
          <Link href="/find" className="text-white px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700">Find accounts to follow</Link>
        </div>
      );
    }

    return (
      <>
        <h2 className="text-lg font-medium text-gray-900 mb-6">
          {title} ({activeTab === 'following' ? followingCount : followersCount})
        </h2>
        <div className="space-y-4">
          {users.map(user => (
            <RealUserCard 
              key={user.id} 
              user={user}
            />
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Connections</h1>
        
        <FollowersTabs activeTab={activeTab} setActiveTab={setActiveTab} setSearchTerm={setSearchTerm} /> 
{        <FollowersSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} activeTab={activeTab} />
}        
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            {activeTab === 'find' ? (
              <SearchGrid users={searchResults} searchTerm={searchTerm} isLoading={isSearching} />
            ) : userType === 'visitor' && activeTab === 'followers' ? (
              <UpgradeToContributorPrompt />
            ) : (
              renderConnectionsList()
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