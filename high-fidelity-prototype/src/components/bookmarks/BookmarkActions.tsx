import React from 'react';

interface BookmarkActionsProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  sortOption: string;
  onSortOptionChange: (option: string) => void;
}

const BookmarkActions: React.FC<BookmarkActionsProps> = ({ 
  searchTerm, 
  onSearchTermChange, 
  sortOption, 
  onSortOptionChange 
}) => {
  return (
    <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
      <div className="relative w-full sm:w-64">
        <input
          type="text"
          placeholder="Search bookmarks..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <label htmlFor="sortBookmarks" className="text-sm text-gray-700">Sort by:</label>
        <select 
          id="sortBookmarks"
          value={sortOption}
          onChange={(e) => onSortOptionChange(e.target.value)}
          className="py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="date_newest">Date (newest)</option>
          <option value="date_oldest">Date (oldest)</option>
          <option value="title_az">Title (A-Z)</option>
          <option value="title_za">Title (Z-A)</option>
          {/* Add other sort options like folder if needed */}
        </select>
      </div>
    </div>
  );
};

export default BookmarkActions; 