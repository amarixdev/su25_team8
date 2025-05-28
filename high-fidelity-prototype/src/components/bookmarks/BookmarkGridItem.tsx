import React from 'react';
import { Bookmark } from '../../types/bookmark';

interface BookmarkGridItemProps {
  bookmark: Bookmark;
  // onOpen?: (bookmarkId: number) => void;
  // onMoreOptions?: (bookmarkId: number) => void;
}

const BookmarkGridItem: React.FC<BookmarkGridItemProps> = ({ bookmark }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-indigo-600 mb-1 line-clamp-2" title={bookmark.title}>{bookmark.title}</h3>
          <button className="text-gray-400 hover:text-gray-500" title="More options">
            {/* Icon for more options */}
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </button>
        </div>
        <p className="text-sm text-gray-500">By {bookmark.author} • {bookmark.date}</p>
        <p className="mt-3 text-gray-700 text-sm line-clamp-3">{bookmark.excerpt}</p>
        <div className="mt-4 flex flex-wrap gap-1">
          {bookmark.tags.map((tag, index) => (
            <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="px-5 py-3 bg-gray-50 flex justify-between items-center">
        <span className="text-xs text-gray-500 truncate" title={bookmark.folder}>{bookmark.folder}</span>
        <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
          Read
        </button>
      </div>
    </div>
  );
};

export default BookmarkGridItem; 