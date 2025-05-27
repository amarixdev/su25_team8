import React from 'react';

const AdvancedFilters: React.FC = () => {
  return (
    <div className="mb-8 bg-gray-50 p-4 rounded-lg">
      <div className="flex flex-wrap gap-4">
        <div className="w-full md:w-auto">
          <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
          <select className="w-full md:w-48 py-2 px-3 border border-gray-300 rounded-md">
            <option>Any time</option>
            <option>Past 24 hours</option>
            <option>Past week</option>
            <option>Past month</option>
            <option>Past year</option>
          </select>
        </div>
        <div className="w-full md:w-auto">
          <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
          <select className="w-full md:w-48 py-2 px-3 border border-gray-300 rounded-md">
            <option>Relevance</option>
            <option>Date (newest)</option>
            <option>Date (oldest)</option>
            <option>Most liked</option>
            <option>Most commented</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilters; 