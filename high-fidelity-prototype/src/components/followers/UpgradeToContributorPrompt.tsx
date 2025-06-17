import React from 'react';
import Link from 'next/link';

const UpgradeToContributorPrompt: React.FC = () => {
  return (
    <div className="text-center py-12">
      <h2 className="text-xl font-semibold text-gray-900 mb-3">
        Want to see who follows you and gain your own followers?
      </h2>
      <p className="text-gray-600 mb-6">
        Upgrade to a contributor account to publish articles, connect with readers, and build your presence.
      </p>
      <Link 
        href="/upgrade"
        className="px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Upgrade to Contributor
      </Link>
    </div>
  );
};

export default UpgradeToContributorPrompt; 