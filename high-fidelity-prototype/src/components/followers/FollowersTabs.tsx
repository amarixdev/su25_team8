import React from 'react';
import Link from 'next/link';

interface FollowersTabsProps {
  activeTab: 'followers' | 'following' | 'find';
  setActiveTab: (tab: 'followers' | 'following' | 'find') => void;
  setSearchTerm: (term: string) => void;
}

const FollowersTabs: React.FC<FollowersTabsProps> = ({ activeTab, setActiveTab, setSearchTerm }) => {
  return (
    <div className="border-b border-gray-200 mb-8">
      <nav className="-mb-px flex space-x-8">
        <Link
          href="/followers?tab=following" // Navigates and sets URL param
          className={`${ // Style based on activeTab state
            activeTab === 'following'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer`}
          onClick={
            () => {
              setActiveTab('following');
              setSearchTerm('');
            }
          } // Updates state, which might be redundant if useEffect handles URL param change
        >
          Following
        </Link>
        <Link
          href="/followers" // Default to followers tab
          className={`${ // Style based on activeTab state
            activeTab === 'followers'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer`}
          onClick={() => {
            setActiveTab('followers');
            setSearchTerm('');  
          }} // Updates state
        >
          Followers
        </Link>
        <Link
          href="/followers?tab=find"
          className={`${
            activeTab === 'find'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer`}
          onClick={() => {
            setActiveTab('find');
            setSearchTerm('');
          }}
        >
          Find Account
        </Link>
      </nav>
    </div>
  );
};

export default FollowersTabs; 