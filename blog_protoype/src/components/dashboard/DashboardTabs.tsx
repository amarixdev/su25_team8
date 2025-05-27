import React from 'react';

interface DashboardTabsProps {
  activeTab: string;
  onTabClick: (tab: string) => void;
  tabs: { id: string; label: string }[];
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ activeTab, onTabClick, tabs }) => {
  return (
    <div className="border-b border-gray-200 mb-8">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabClick(tab.id)}
            className={`${activeTab === tab.id
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default DashboardTabs; 