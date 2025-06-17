'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { FollowService } from '../../../services/followService';
import { useFollow } from '../../../contexts/FollowContext';

interface BaseUser {
  id: number;
  displayName: string;
  username: string;
  email: string;
  profilePicturePath?: string;
  bio?: string;
  location?: string;
  website?: string;
  followingCount?: number;
  role: string;
}

interface Visitor extends BaseUser {
  accountAge: number;
  postsReads: number;
  canUpgradeAccount: boolean;
}

interface Contributor extends BaseUser {
  totalPosts: number;
  totalViews: number;
  totalLikes: number;
  followersCount?: number;
  posts?: any[];
}

type User = Visitor | Contributor;

export default function UserProfilePage() {
  const params = useParams();
  const router = useRouter();
  const username = params.username as string;
  const { updateFollowCounts } = useFollow();
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollowLoading, setIsFollowLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<{ id: number; userType: string } | null>(null);

  // Get current user info
  useEffect(() => {
    const user = FollowService.getCurrentUser();
    setCurrentUser(user);
  }, []);

  // Fetch user data from backend
  const fetchUserByUsername = async () => {
   console.log("fetching user by username", username);
    try {
      setIsLoading(true);
      setIsFollowLoading(true);
      console.log("isFollowLoading", isFollowLoading);
      
      // Try to find the user as a contributor first
      try {
        const contributorResponse = await fetch(`http://localhost:8080/api/contributors/username/${username}`);
        if (contributorResponse.ok) {
          const contributor = await contributorResponse.json();
          const userData = { 
            ...contributor, 
            role: 'CONTRIBUTOR',
            followersCount: await getFollowersCount(contributor.id),
            followingCount: await getFollowingCount(contributor.id)
          };
          setUser(userData);
          
          // Check if current user is following this contributor
          if (currentUser && currentUser.id !== contributor.id) {
            const followStatus = await FollowService.isFollowing(currentUser.id, contributor.id);
            setIsFollowing(followStatus);
            setIsFollowLoading(false);
          }
          return;
        }
      } catch (error) {
        console.log('Not found as contributor, trying visitor...');
      }

      // If not found as contributor, try as visitor
      try {
        const visitorResponse = await fetch(`http://localhost:8080/api/visitors/username/${username}`);
        if (visitorResponse.ok) {
          const visitor = await visitorResponse.json();
          const userData = { 
            ...visitor, 
            role: 'VISITOR',
            followingCount: await getFollowingCount(visitor.id)
          };
          setUser(userData);
          return;
        }
      } catch (error) {
        console.log('Not found as visitor either');
      }

      // User not found in either collection
      setError('User not found');
      
    } catch (error) {
      setError('Failed to load user profile');
      console.error('Error fetching user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get followers count for a contributor
  const getFollowersCount = async (contributorId: number): Promise<number> => {
    try {
      const followers = await FollowService.getFollowers(contributorId);
      return followers.length;
    } catch (error) {
      console.error('Error getting followers count:', error);
      return 0;
    }
  };

  // Get following count for any user
  const getFollowingCount = async (userId: number): Promise<number> => {
    try {
      const following = await FollowService.getFollowing(userId);
      return following.length;
    } catch (error) {
      console.error('Error getting following count:', error);
      return 0;
    }
  };

  // Handle follow/unfollow action
  const handleFollowToggle = async () => {
    if (!currentUser || !user || !isContributor(user)) return;

    setIsFollowLoading(true);
    try {
      let result;
      if (isFollowing) {
        result = await FollowService.unfollowContributor(currentUser.id, user.id);
      } else {
        result = await FollowService.followContributor(currentUser.id, user.id);
      }

      if (result.success) {
        setIsFollowing(!isFollowing);
        
        // Update the followers count for the profile being viewed
        const newFollowersCount = await getFollowersCount(user.id);
        setUser(prev => prev ? { ...prev, followersCount: newFollowersCount } : null);

        // Update the FollowContext counts which will sync with Sidebar
        await updateFollowCounts();
      } else {
        console.error('Follow action failed:', result.message);
      }
    } catch (error) {
      console.error('Error toggling follow status:', error);
    } finally {
      setIsFollowLoading(false);
    }
  };

  // Check if this is the current user's own profile
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (userData.username === username) {
      setIsOwnProfile(true);
    }
  }, [username]);

  // Load user data on component mount and when currentUser changes
  useEffect(() => {
    if (username === userData?.username) {
      setIsOwnProfile(true);
      setUser(userData);
      setIsLoading(false);
      return;
    }
    if (currentUser !== undefined) { // Only fetch when currentUser is determined
      fetchUserByUsername();
    }
  }, [username, currentUser]);

  const isContributor = (user: User): user is Contributor => {
    return user.role === 'CONTRIBUTOR';
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatJoinDate = (accountAge?: number) => {
    if (!accountAge) return 'Recently joined';
    if (accountAge === 1) return '1 day ago';
    return `${accountAge} days ago`;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Profile Not Found</h1>
          <p className="text-gray-600 mb-8">
            {error || "The user profile you're looking for doesn't exist."}
          </p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Debug logging
  console.log('Render - isFollowLoading:', isFollowLoading);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="mb-8 flex items-center text-blue-600 hover:text-blue-800 font-medium"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              {user.profilePicturePath ? (
                <Image
                  src={user.profilePicturePath}
                  alt={user.displayName}
                  width={120}
                  height={120}
                  className="rounded-full object-cover border-4 border-gray-200"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-30 h-30 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {getInitials(user.displayName)}
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.displayName}</h1>
                  <p className="text-gray-600 text-lg">@{user.username}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      isContributor(user) 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {isContributor(user) ? 'Contributor' : 'Visitor'}
                    </span>

                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-4 sm:mt-0">
                  {isOwnProfile ? (
                    <button
                      onClick={() => router.push('/profile')}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md font-medium"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    isContributor(user) && currentUser && (
                      <button 
                        onClick={handleFollowToggle}
                        disabled={isFollowLoading}
                        className={`px-4 py-2 rounded-md font-medium transition-colors ${
                          isFollowLoading ? 'bg-gray-400 cursor-not-allowed opacity-50' : 'cursor-pointer'
                        } ${
                          isFollowing 
                            ? 'bg-gray-100 hover:bg-gray-200 text-gray-800' 
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        } ${isFollowLoading && isFollowing ? 'hover:bg-gray-100' : ''} ${isFollowLoading && !isFollowing ? 'hover:bg-blue-600' : ''}`}
                      >
                        {isFollowLoading ? 'Loading...' : isFollowing ? 'Unfollow' : 'Follow'}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Bio */}
              {user.bio && (
                <p className="text-gray-700 mb-4 leading-relaxed">{user.bio}</p>
              )}

              {/* Contact Info */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                {user.location && (
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {user.location}
                  </div>
                )}
                {user.website && (
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                      {user.website}
                    </a>
                  </div>
                )}
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {user.email}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="border-t border-gray-200 px-8 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {isContributor(user) ? (
              <>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{user.totalPosts}</div>
                  <div className="text-sm text-gray-600">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{user.totalViews}</div>
                  <div className="text-sm text-gray-600">Views</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{user.followersCount || 0}</div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{user.followingCount || 0}</div>
                  <div className="text-sm text-gray-600">Following</div>
                </div>
              </>
            ) : (
              <>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{(user as Visitor).postsReads}</div>
                  <div className="text-sm text-gray-600">Posts Read</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{user.followingCount || 0}</div>
                  <div className="text-sm text-gray-600">Following</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{(user as Visitor).accountAge}</div>
                  <div className="text-sm text-gray-600">Days Active</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${(user as Visitor).canUpgradeAccount ? 'text-green-600' : 'text-gray-400'}`}>
                    {(user as Visitor).canUpgradeAccount ? '✓' : '✗'}
                  </div>
                  <div className="text-sm text-gray-600">Upgrade Ready</div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Additional Content for Contributors */}
        {isContributor(user) && (
          <div className="border-t border-gray-200 px-8 py-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Recent Posts ({user.posts?.length || 0})
            </h2>
            {user.posts && user.posts.length > 0 ? (
              <div className="space-y-4">
                {user.posts.slice(0, 3).map((post: any) => (
                  <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                    <h3 className="font-medium text-gray-900 mb-2">{post.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{post.content}</p>
                    <div className="mt-2 text-xs text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
                {user.posts.length > 3 && (
                  <div className="text-center">
                    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                      View all posts →
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500">No posts yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 