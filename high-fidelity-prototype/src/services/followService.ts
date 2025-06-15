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
        // increment followingCount in localStorage
        try {
          const stored = JSON.parse(localStorage.getItem('userData') || '{}');
          stored.followingCount = (stored.followingCount || 0) + 1;
          localStorage.setItem('userData', JSON.stringify(stored));
          window.dispatchEvent(new Event('userTypeChanged'));
        } catch (e) { /* ignore */ }
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
        // decrement followingCount in localStorage
        try {
          const stored = JSON.parse(localStorage.getItem('userData') || '{}');
          const current = stored.followingCount || 0;
          stored.followingCount = current > 0 ? current - 1 : 0;
          localStorage.setItem('userData', JSON.stringify(stored));
          window.dispatchEvent(new Event('userTypeChanged'));
        } catch (e) { /* ignore */ }
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
   * Get user's following list
   */
  static async getFollowing(userId: number): Promise<Contributor[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}/following`);
      
      if (response.ok) {
        return await response.json();
      }
      return [];
    } catch (error) {
      console.error('Error fetching following list:', error);
      return [];
    }
  }

  /**
   * Get contributor's followers
   */
  static async getFollowers(contributorId: number): Promise<User[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/contributors/${contributorId}/followers`);
      
      if (response.ok) {
        return await response.json();
      }
      return [];
    } catch (error) {
      console.error('Error fetching followers list:', error);
      return [];
    }
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