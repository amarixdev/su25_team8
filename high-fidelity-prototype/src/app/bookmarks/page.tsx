'use client';
import React, { useState, useEffect } from 'react';
import { Bookmark } from '../../types/bookmark'; // Import Bookmark type
import ViewToggleButtons from '../../components/bookmarks/ViewToggleButtons';
import BookmarkActions from '../../components/bookmarks/BookmarkActions';
import BookmarksDisplay from '../../components/bookmarks/BookmarksDisplay';

// Dummy data for bookmarks - could be fetched from an API
const initialDummyBookmarks: Bookmark[] = [
  {
    id: 1,
    title: "The Future of AI in Web Development",
    author: "Alex Johnson",
    date: "2023-06-10", // Consistent date format for sorting
    excerpt: "How artificial intelligence is changing the landscape of web development and what to expect in the coming years.",
    tags: ["AI", "Web Development", "Technology"],
    folder: "Tech Trends"
  },
  {
    id: 2,
    title: "Mastering CSS Grid Layout",
    author: "Emily Parker",
    date: "2023-05-22",
    excerpt: "A deep dive into CSS Grid and how it can revolutionize your web layouts.",
    tags: ["CSS", "Web Design", "Frontend"],
    folder: "Design Resources"
  },
  {
    id: 3,
    title: "JavaScript Performance Optimization",
    author: "David Lee",
    date: "2023-06-05",
    excerpt: "Tips and tricks to make your JavaScript code run faster and more efficiently.",
    tags: ["JavaScript", "Performance", "Web Development"],
    folder: "Coding Tips"
  },
  {
    id: 4,
    title: "Building Accessible Web Applications",
    author: "Sarah Miller",
    date: "2023-05-30",
    excerpt: "Best practices for creating web applications that are accessible to all users.",
    tags: ["Accessibility", "Web Development", "UX"],
    folder: "Design Resources"
  }
];

export default function BookmarksPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('date_newest');
  const [displayedBookmarks, setDisplayedBookmarks] = useState<Bookmark[]>(initialDummyBookmarks);

  useEffect(() => {
    const filtered = initialDummyBookmarks.filter(bookmark => 
      bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bookmark.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bookmark.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      bookmark.folder.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortOption) {
      case 'date_newest':
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'date_oldest':
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'title_az':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title_za':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      // Add other sort cases if needed
    }

    setDisplayedBookmarks(filtered);
  }, [searchTerm, sortOption]);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Bookmarks</h1>
          <ViewToggleButtons view={view} setView={setView} />
        </div>
        
        {/* Removed outer flex-col md:flex-row structure as sidebar is not implemented yet */}
        <div className="flex-1">
          <BookmarkActions 
            searchTerm={searchTerm} 
            onSearchTermChange={setSearchTerm} 
            sortOption={sortOption} 
            onSortOptionChange={setSortOption} 
          />
          <BookmarksDisplay view={view} bookmarks={displayedBookmarks} />
        </div>
      </div>
    </div>
  );
} 