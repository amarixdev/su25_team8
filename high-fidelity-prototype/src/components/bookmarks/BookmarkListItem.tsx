import React from 'react';
import { Bookmark } from '../../types/bookmark'; // Import the Bookmark type

interface BookmarkListItemProps {
  bookmark: Bookmark;
  // onOpen?: (bookmarkId: number) => void;
  // onMoreOptions?: (bookmarkId: number) => void;
}

const BookmarkListItem: React.FC<BookmarkListItemProps> = ({ bookmark }) => {
  return (
    <div className="bg-white rounded-lg shadow p-5">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-blue-600 line-clamp-1" title={bookmark.title}>{bookmark.title}</h3>
          <p className="text-sm text-gray-500 mt-1">By {bookmark.author} • {bookmark.date}</p>
        </div>
        <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded truncate" title={bookmark.folder}>
            {bookmark.folder}
          </span>
          <button className="text-gray-400 hover:text-gray-500" title="More options">
            {/* Icon for more options */}
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </button>
        </div>
      </div>
      <p className="mt-3 text-gray-700 text-sm line-clamp-2">{bookmark.excerpt}</p>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {bookmark.tags.map((tag, index) => (
            <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
              {tag}
            </span>
          ))}
        </div>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex-shrink-0 ml-2">
          Read
        </button>
      </div>
    </div>
  );
};

export default BookmarkListItem; 