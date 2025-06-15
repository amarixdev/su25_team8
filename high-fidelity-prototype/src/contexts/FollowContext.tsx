'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { FollowService } from '../services/followService';

interface FollowContextType {
  followingCount: number | null;
  followersCount: number | null;
  followingStatus: { [key: number]: boolean };
  followLoading: { [key: number]: boolean };
  currentUser: { id: number; userType: string } | null;
  updateFollowCounts: () => Promise<void>;
  toggleFollow: (contributorId: number) => Promise<boolean>;
  checkFollowStatus: (contributorIds: number[]) => Promise<void>;
  setFollowStatus: (contributorId: number, isFollowing: boolean) => void;
}

const FollowContext = createContext<FollowContextType | undefined>(undefined);

export const useFollow = () => {
  const context = useContext(FollowContext);
  if (!context) {
    throw new Error('useFollow must be used within a FollowProvider');
  }
  return context;
};

interface FollowProviderProps {
  children: ReactNode;
}

export const FollowProvider: React.FC<FollowProviderProps> = ({ children }) => {
  const [followingCount, setFollowingCount] = useState<number | null>(null);
  const [followersCount, setFollowersCount] = useState<number | null>(null);
  const [followingStatus, setFollowingStatus] = useState<{ [key: number]: boolean }>({});
  const [followLoading, setFollowLoading] = useState<{ [key: number]: boolean }>({});
  const [currentUser, setCurrentUser] = useState<{ id: number; userType: string } | null>(null);

  // Initialize current user
  useEffect(() => {
    const user = FollowService.getCurrentUser();
    setCurrentUser(user);
  }, []);

  // Update follow counts
  const updateFollowCounts = useCallback(async () => {
    if (!currentUser?.id) return;

    try {
      // Get following count (works for both visitors and contributors)
      const following = await FollowService.getFollowing(currentUser.id);
      console.log('FollowContext - Following count:', following.length);
      setFollowingCount(following.length);

      // Get followers count (only for contributors)
      let followersLength = 0;
      if (currentUser.userType === 'contributor') {
        const followers = await FollowService.getFollowers(currentUser.id);
        console.log('FollowContext - Followers count:', followers.length);
        followersLength = followers.length;
        setFollowersCount(followersLength);
      }

      // Update localStorage to keep it in sync
      const storedUserData = JSON.parse(localStorage.getItem('userData') || '{}');
      storedUserData.followingCount = following.length;
      if (currentUser.userType === 'contributor') {
        storedUserData.followersCount = followersLength;
      }
      localStorage.setItem('userData', JSON.stringify(storedUserData));

      // Dispatch event to update sidebar
      window.dispatchEvent(new CustomEvent('userTypeChanged'));
    } catch (error) {
      console.error('Error fetching follow counts:', error);
    }
  }, [currentUser]);

  // Check follow status for multiple contributors
  const checkFollowStatus = useCallback(async (contributorIds: number[]) => {
    if (!currentUser || contributorIds.length === 0) return;

    // Set loading state for all contributors
    const loadingMap = contributorIds.reduce((acc, id) => {
      acc[id] = true;
      return acc;
    }, {} as { [key: number]: boolean });
    setFollowLoading(prev => ({ ...prev, ...loadingMap }));

    try {
      // Fetch follow status for each contributor
      const statusPromises = contributorIds.map(async (contributorId) => {
        if (contributorId === currentUser.id) return { [contributorId]: false };
        const isFollowing = await FollowService.isFollowing(currentUser.id, contributorId);
        return { [contributorId]: isFollowing };
      });

      const statuses = await Promise.all(statusPromises);
      const statusMap = statuses.reduce((acc, status) => ({ ...acc, ...status }), {});

      // Update follow status
      setFollowingStatus(prev => ({ ...prev, ...statusMap }));

      // Turn off loading
      const loadedMap = contributorIds.reduce((acc, id) => {
        acc[id] = false;
        return acc;
      }, {} as { [key: number]: boolean });
      setFollowLoading(prev => ({ ...prev, ...loadedMap }));
    } catch (error) {
      console.error('Error checking follow status:', error);
      // Turn off loading even on error
      const loadedMap = contributorIds.reduce((acc, id) => {
        acc[id] = false;
        return acc;
      }, {} as { [key: number]: boolean });
      setFollowLoading(prev => ({ ...prev, ...loadedMap }));
    }
  }, [currentUser]);

  // Toggle follow status
  const toggleFollow = useCallback(async (contributorId: number): Promise<boolean> => {
    if (!currentUser || contributorId === currentUser.id) return false;

    setFollowLoading(prev => ({ ...prev, [contributorId]: true }));

    try {
      const isCurrentlyFollowing = followingStatus[contributorId];
      let result;

      if (isCurrentlyFollowing) {
        result = await FollowService.unfollowContributor(currentUser.id, contributorId);
      } else {
        result = await FollowService.followContributor(currentUser.id, contributorId);
      }

      if (result.success) {
        // Update follow status
        setFollowingStatus(prev => ({
          ...prev,
          [contributorId]: !isCurrentlyFollowing
        }));

        // Update counts
        await updateFollowCounts();

        return true;
      } else {
        console.error('Follow action failed:', result.message);
        return false;
      }
    } catch (error) {
      console.error('Error toggling follow status:', error);
      return false;
    } finally {
      setFollowLoading(prev => ({ ...prev, [contributorId]: false }));
    }
  }, [currentUser, followingStatus, updateFollowCounts]);

  // Set follow status manually (for initial loads)
  const setFollowStatus = (contributorId: number, isFollowing: boolean) => {
    setFollowingStatus(prev => ({ ...prev, [contributorId]: isFollowing }));
  };

  // Update counts when current user changes
  useEffect(() => {
    if (currentUser) {
      updateFollowCounts();
    }
  }, [currentUser]);

  const value: FollowContextType = {
    followingCount ,
    followersCount,
    followingStatus,
    followLoading,
    currentUser,
    updateFollowCounts,
    toggleFollow,
    checkFollowStatus,
    setFollowStatus,
  };

  return (
    <FollowContext.Provider value={value}>
      {children}
    </FollowContext.Provider>
  );
}; 