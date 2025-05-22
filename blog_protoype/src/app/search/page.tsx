'use client';
import React, { useState } from 'react';

// Dummy data for search results
const dummyResults = [
  {
    id: 1,
    title: "Getting Started with React",
    author: "Jane Smith",
    date: "May 15, 2023",
    excerpt: "A comprehensive guide to building your first React application from scratch.",
    tags: ["React", "JavaScript", "Frontend"],
    likes: 245,
    comments: 32
  },
  {
    id: 2,
    title: "Advanced TypeScript Patterns",
    author: "John Doe",
    date: "April 28, 2023",
    excerpt: "Explore complex TypeScript patterns for building scalable applications.",
    tags: ["TypeScript", "Programming", "Advanced"],
    likes: 189,
    comments: 24
  },
  {
    id: 3,
    title: "CSS Grid vs Flexbox",
    author: "Sarah Johnson",
    date: "June 2, 2023",
    excerpt: "Understanding when to use CSS Grid versus Flexbox for modern layouts.",
    tags: ["CSS", "Web Design", "Frontend"],
    likes: 312,
    comments: 41
  },
  {
    id: 4,
    title: "Introduction to Next.js",
    author: "Michael Chen",
    date: "May 20, 2023",
    excerpt: "Learn how to build server-rendered React applications with Next.js.",
    tags: ["Next.js", "React", "SSR"],
    likes: 278,
    comments: 36
  }
];

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Search</h1>
        
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles, topics, or authors..."
              className="w-full py-3 pl-12 pr-4 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-6 h-6 text-gray-500"
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
        </div>
        
        {/* Filters */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Filters</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 text-sm font-medium rounded-full ${
                activeFilter === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter('articles')}
              className={`px-4 py-2 text-sm font-medium rounded-full ${
                activeFilter === 'articles'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Articles
            </button>
            <button
              onClick={() => setActiveFilter('authors')}
              className={`px-4 py-2 text-sm font-medium rounded-full ${
                activeFilter === 'authors'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Authors
            </button>
            <button
              onClick={() => setActiveFilter('tags')}
              className={`px-4 py-2 text-sm font-medium rounded-full ${
                activeFilter === 'tags'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Tags
            </button>
          </div>
        </div>
        
        {/* Advanced Filters */}
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
        
        {/* Results */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Results</h2>
          <div className="space-y-6">
            {dummyResults.map((result) => (
              <div key={result.id} className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-indigo-600">{result.title}</h3>
                  <div className="flex space-x-2">
                    <span className="flex items-center text-gray-500 text-sm">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      {result.likes}
                    </span>
                    <span className="flex items-center text-gray-500 text-sm">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                      </svg>
                      {result.comments}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-1">By {result.author} • {result.date}</p>
                <p className="mt-3 text-gray-700">{result.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {result.tags.map((tag, index) => (
                    <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 rounded-md bg-indigo-600 text-white">1</button>
              <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">2</button>
              <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">3</button>
              <span className="px-2 text-gray-500">...</span>
              <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">8</button>
              <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
} 