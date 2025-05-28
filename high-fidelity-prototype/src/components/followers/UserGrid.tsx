import React from 'react';
import UserCard from './UserCard'; // Assuming UserCard is in the same directory or adjust path

export interface MockUser {
  id: number;
  name: string;
  username: string;
  avatar: string;
  isFollowing: boolean;
}

interface UserGridProps {
  users: MockUser[];
  activeTab: 'followers' | 'following';
  userType: 'visitor' | 'contributor';
}

const UserGrid: React.FC<UserGridProps> = ({ users, activeTab, userType }) => {
  if (users.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No {activeTab} found.</p>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        {activeTab === 'followers' ? 'People who follow you' : 'People you follow'}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {users.map(user => (
          <UserCard
            key={user.id}
            // id={user.id} // Pass id if UserCard needs it for internal links or keys
            name={user.name}
            username={user.username}
            avatar={user.avatar}
            isFollowing={user.isFollowing}
            // Determine button visibility based on props and logic
            showFollowButton={activeTab === 'followers' && userType === 'contributor' && !user.isFollowing}
            showUnfollowButton={(activeTab === 'following' && user.isFollowing) || (activeTab === 'followers' && userType === 'contributor' && user.isFollowing)}
            // Add any other props UserCard might need
          />
        ))}
      </div>
    </>
  );
};

export default UserGrid; 