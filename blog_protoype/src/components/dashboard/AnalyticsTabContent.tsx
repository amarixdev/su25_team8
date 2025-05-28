import React from 'react';

const AnalyticsTabContent: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Analytics Overview</h2>
      <div className="space-y-6">
        <div className="border rounded-lg p-4">
          <h3 className="text-md font-medium text-gray-900 mb-2">Post Performance</h3>
          <p className="text-sm text-gray-500">View detailed analytics for your posts</p>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="text-md font-medium text-gray-900 mb-2">Audience Insights</h3>
          <p className="text-sm text-gray-500">Learn about your readers and their preferences</p>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="text-md font-medium text-gray-900 mb-2">Engagement Metrics</h3>
          <p className="text-sm text-gray-500">Track comments, shares, and other engagement metrics</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTabContent; 