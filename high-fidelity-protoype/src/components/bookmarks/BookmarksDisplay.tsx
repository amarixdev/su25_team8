import React from 'react';
import BookmarkGridItem from './BookmarkGridItem';
import { Bookmark } from '../../types/bookmark';
import BookmarkListItem from './BookmarkListItem';

interface BookmarksDisplayProps {
  view: 'grid' | 'list';
  bookmarks: Bookmark[];
}

const BookmarksDisplay: React.FC<BookmarksDisplayProps> = ({ view, bookmarks }) => {
  if (bookmarks.length === 0) {
    return <p className="text-gray-500 text-center py-8">No bookmarks found.</p>;
  }

  if (view === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookmarks.map((bookmark) => (
          <BookmarkGridItem key={bookmark.id} bookmark={bookmark} />
        ))}
      </div>
    );
  }

  // else, view is 'list'
  return (
    <div className="space-y-4">
      {bookmarks.map((bookmark) => (
        <BookmarkListItem key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  );
};

export default BookmarksDisplay; 