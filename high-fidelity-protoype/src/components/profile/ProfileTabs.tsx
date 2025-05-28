import React from 'react';

interface ProfileTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'profile', name: 'Profile Information' },
    // Add other tabs here if needed, e.g.:
    // { id: 'account', name: 'Account Settings' },
    { id: 'preferences', name: 'Preferences' }, 
  ];

  return (
    <div className="border-b border-gray-200 mb-8">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${ // Note: id 'preferences' was not in original page.tsx, added for future use or to match a potential tab
              activeTab === tab.id
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer`}
          >
            {tab.name}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ProfileTabs; 