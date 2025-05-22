'use client';
import React, { useState } from 'react';

// Dummy data for bookmarks
const dummyBookmarks = [
  {
    id: 1,
    title: "The Future of AI in Web Development",
    author: "Alex Johnson",
    date: "June 10, 2023",
    excerpt: "How artificial intelligence is changing the landscape of web development and what to expect in the coming years.",
    tags: ["AI", "Web Development", "Technology"],
    folder: "Tech Trends"
  },
  {
    id: 2,
    title: "Mastering CSS Grid Layout",
    author: "Emily Parker",
    date: "May 22, 2023",
    excerpt: "A deep dive into CSS Grid and how it can revolutionize your web layouts.",
    tags: ["CSS", "Web Design", "Frontend"],
    folder: "Design Resources"
  },
  {
    id: 3,
    title: "JavaScript Performance Optimization",
    author: "David Lee",
    date: "June 5, 2023",
    excerpt: "Tips and tricks to make your JavaScript code run faster and more efficiently.",
    tags: ["JavaScript", "Performance", "Web Development"],
    folder: "Coding Tips"
  },
  {
    id: 4,
    title: "Building Accessible Web Applications",
    author: "Sarah Miller",
    date: "May 30, 2023",
    excerpt: "Best practices for creating web applications that are accessible to all users.",
    tags: ["Accessibility", "Web Development", "UX"],
    folder: "Design Resources"
  }
];

// Dummy folders
const dummyFolders = [
  { id: 1, name: "All Bookmarks", count: 12 },
  { id: 2, name: "Tech Trends", count: 5 },
  { id: 3, name: "Design Resources", count: 4 },
  { id: 4, name: "Coding Tips", count: 3 }
];

export default function BookmarksPage() {
  const [activeFolder, setActiveFolder] = useState(1);
  const [view, setView] = useState('grid');

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Bookmarks</h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setView('grid')}
              className={`p-2 rounded-md ${
                view === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded-md ${
                view === 'list' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
       
          
          {/* Bookmarks Content */}
          <div className="flex-1">
            {/* Search and Sort */}
            <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search bookmarks..."
                  className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                <label className="text-sm text-gray-700">Sort by:</label>
                <select className="py-2 px-3 border border-gray-300 rounded-md text-sm">
                  <option>Date (newest)</option>
                  <option>Date (oldest)</option>
                  <option>Title (A-Z)</option>
                  <option>Title (Z-A)</option>
                </select>
              </div>
            </div>
            
            {/* Bookmarks Grid/List */}
            {view === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {dummyBookmarks.map((bookmark) => (
                  <div key={bookmark.id} className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-5">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-medium text-indigo-600 mb-1">{bookmark.title}</h3>
                        <button className="text-gray-400 hover:text-gray-500">
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
                      <span className="text-xs text-gray-500">{bookmark.folder}</span>
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                        Read
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {dummyBookmarks.map((bookmark) => (
                  <div key={bookmark.id} className="bg-white rounded-lg shadow p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-indigo-600">{bookmark.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">By {bookmark.author} • {bookmark.date}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {bookmark.folder}
                        </span>
                        <button className="text-gray-400 hover:text-gray-500">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <p className="mt-3 text-gray-700">{bookmark.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {bookmark.tags.map((tag, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                        Read
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 