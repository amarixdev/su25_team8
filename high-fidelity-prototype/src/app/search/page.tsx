'use client';
import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/search/SearchBar';
import FilterButtons from '../../components/search/FilterButtons';
import AdvancedFilters from '../../components/search/AdvancedFilters';
import SearchResults from '../../components/search/SearchResults';
import Pagination from '../../components/search/Pagination';
import { SearchResult } from '../../components/search/SearchResultItem'; // Assuming SearchResult is exported from here or a types file

// Dummy data for search results - kept here for now
const allDummyResults: SearchResult[] = [
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
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>(allDummyResults);

  // Effect to filter results when searchTerm or activeFilter changes
  useEffect(() => {
    let results = allDummyResults;

    if (searchTerm) {
      results = results.filter(result => 
        result.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Further filter by activeFilter if not 'all' (example logic)
    if (activeFilter === 'articles') {
      // Assuming all current dummy data are articles
      // In a real app, you might have a type property in SearchResult
    } else if (activeFilter === 'authors') {
      // This would require a different data structure or more complex filtering
      // For now, just showing all if author filter is selected, assuming search term would target author
    } else if (activeFilter === 'tags') {
      // Similar to authors, search term would handle this
    }

    setFilteredResults(results);
  }, [searchTerm, activeFilter]);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Search</h1>
        
        <SearchBar searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />
        <FilterButtons activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        <AdvancedFilters /> {/* Props can be added later for functionality */}
        
        <SearchResults results={filteredResults} />
        <Pagination /> {/* Props can be added later for functionality */}
      </div>
    </div>
  );
} 