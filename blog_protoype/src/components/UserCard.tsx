import React from 'react';
import Link from 'next/link';

interface UserCardProps {
  id: number;
  name: string;
  username: string;
  avatar: string;
  isFollowing: boolean;
  showFollowButton?: boolean;
  showUnfollowButton?: boolean;
}

export default function UserCard({
  id,
  name,
  username,
  avatar,
  isFollowing,
  showFollowButton = false,
  showUnfollowButton = false
}: UserCardProps) {
  return (
    <div className="flex flex-col items-center">
      <Link href={`/profile/${username}`} className="group">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 mb-2 group-hover:ring-2 group-hover:ring-indigo-500">
          <img
            src={avatar}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-avatar.png';
            }}
          />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-gray-900 truncate max-w-[100px] mx-auto">{name}</p>
          <p className="text-xs text-gray-500 truncate max-w-[100px] mx-auto">@{username}</p>
        </div>
      </Link>
      
      {showFollowButton && (
        <button
          className={`mt-2 px-3 py-1 text-xs font-medium rounded-full ${
            isFollowing
              ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </button>
      )}
      
      {showUnfollowButton && (
        <button
          className="mt-2 px-3 py-1 text-xs font-medium rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Unfollow
        </button>
      )}
    </div>
  );
} 