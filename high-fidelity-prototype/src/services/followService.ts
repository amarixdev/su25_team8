const API_BASE_URL = 'http://localhost:8080/api';

export interface FollowResponse {
  success: boolean;
  message?: string;
}

export interface User {
  id: number;
  displayName: string;
  username: string;
  email: string;
  profilePicturePath?: string;
  bio?: string;
  location?: string;
  website?: string;
  role: string;
}

export interface Contributor extends User {
  totalPosts: number;
  totalViews: number;
  totalLikes: number;
  posts?: any[];
}

// Simple cache for followers/following lists only
const followersCache = new Map<number, User[]>();
const followingCache = new Map<number, Contributor[]>();

export class FollowService {
  /**
   * Follow a contributor
   */
  static async followContributor(userId: number, contributorId: number): Promise<FollowResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}/follow/${contributorId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Clear cache for affected lists
        followingCache.delete(userId);
        followersCache.delete(contributorId);
        return { success: true, message: 'Successfully followed contributor' };
      } else {
        const errorText = await response.text();
        return { success: false, message: errorText || 'Failed to follow contributor' };
      }
    } catch (error) {
      console.error('Error following contributor:', error);
      return { success: false, message: 'Network error occurred' };
    }
  }

  /**
   * Unfollow a contributor
   */
  static async unfollowContributor(userId: number, contributorId: number): Promise<FollowResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}/follow/${contributorId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Clear cache for affected lists
        followingCache.delete(userId);
        followersCache.delete(contributorId);
        return { success: true, message: 'Successfully unfollowed contributor' };
      } else {
        const errorText = await response.text();
        return { success: false, message: errorText || 'Failed to unfollow contributor' };
      }
    } catch (error) {
      console.error('Error unfollowing contributor:', error);
      return { success: false, message: 'Network error occurred' };
    }
  }

  /**
   * Check if user is following a contributor
   */
  static async isFollowing(userId: number, contributorId: number): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}/following/${contributorId}`);
      if (response.ok) {
        const result = await response.json();
        return result === true;
      }
      return false;
    } catch (error) {
      console.error('Error checking follow status:', error);
      return false;
    }
  }

  /**
   * Get user's following list (cached)
   */
  static async getFollowing(userId: number): Promise<Contributor[]> {
    // Check cache first
    if (followingCache.has(userId)) {
      return followingCache.get(userId)!;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}/following`);
      if (response.ok) {
        const data = await response.json();
        // Cache the result
        followingCache.set(userId, data);
        return data;
      }
      return [];
    } catch (error) {
      console.error('Error fetching following list:', error);
      return [];
    }
  }

  /**
   * Get contributor's followers (cached)
   */
  static async getFollowers(contributorId: number): Promise<User[]> {
    // Check cache first
    if (followersCache.has(contributorId)) {
      return followersCache.get(contributorId)!;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/contributors/${contributorId}/followers`);
      if (response.ok) {
        const data = await response.json();
        // Cache the result
        followersCache.set(contributorId, data);
        return data;
      }
      return [];
    } catch (error) {
      console.error('Error fetching followers list:', error);
      return [];
    }
  }

  /**
   * Clear all caches (useful for logout or data refresh)
   */
  static clearCache(): void {
    followersCache.clear();
    followingCache.clear();
  }

  /**
   * Get current user data from localStorage
   */
  static getCurrentUser(): { id: number; userType: string } | null {
    try {
      const userData = localStorage.getItem('userData');
      const userType = localStorage.getItem('userType');

      if (userData && userType) {
        const user = JSON.parse(userData);
        return { id: user.id, userType };
      }
      return null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }
}