import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface SearchUser {
  id: number;
  displayName: string;
  username: string;
  email: string;
  profilePicturePath?: string;
  bio?: string;
  location?: string;
  role: 'CONTRIBUTOR' | 'VISITOR';
  // Contributor specific
  totalPosts?: number;
  followersCount?: number; // Changed from followers to followersCount
  // Visitor specific
  accountAge?: number;
  postsReads?: number;
}

interface SearchGridProps {
  users: SearchUser[];
  searchTerm: string;
  isLoading?: boolean;
}

const SearchGrid: React.FC<SearchGridProps> = ({ users, searchTerm, isLoading }) => {

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-gray-500">Searching accounts...</p>
      </div>
    );
  }

  if (!searchTerm.trim()) {
    return (
      <div className="text-center py-12">
        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Find Accounts</h3>
        <p className="text-gray-500">Search for contributors and visitors by name, username, or email</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-8">
        <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.866-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <p className="text-gray-500">No accounts found matching "{searchTerm}"</p>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-lg font-medium text-gray-900 mb-6">
        Search Results ({users.length} {users.length === 1 ? 'account' : 'accounts'} found)
      </h2>
      <div className="space-y-4">
        {users.map(user => (
          <div key={user.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
            <div className="flex items-start space-x-4">
              {/* Profile Picture */}
              <div className="flex-shrink-0">
                {user.profilePicturePath ? (
                  <Image
                    src={user.profilePicturePath}
                    alt={user.displayName}
                    width={64}
                    height={64}
                    className="rounded-full object-cover border-2 border-gray-200"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-lg font-bold">
                    {getInitials(user.displayName)}
                  </div>
                )}
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Link 
                      href={`/profile/${user.username}`}
                      className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      {user.displayName}
                    </Link>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === 'CONTRIBUTOR' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role === 'CONTRIBUTOR' ? 'Contributor' : 'Visitor'}
                    </span>
                  </div>


                </div>
                
                <p className="text-gray-600 text-sm mt-1">@{user.username}</p>
                
                {user.bio && (
                  <p className="text-gray-700 text-sm mt-2 line-clamp-2">{user.bio}</p>
                )}

                {/* Stats Row */}
                <div className="flex items-center space-x-6 mt-3 text-sm text-gray-600">
                  {user.role === 'CONTRIBUTOR' ? (
                    <>
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>{user.totalPosts || 0} posts</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span>{user.followersCount || 0} followers</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <span>{user.postsReads || 0} posts read</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{user.accountAge || 0} days active</span>
                      </div>
                    </>
                  )}
                  {user.location && (
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{user.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchGrid; 