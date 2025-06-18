'use client';
import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/search/SearchBar';
import FilterButtons from '../../components/search/FilterButtons';
import AdvancedFilters from '../../components/search/AdvancedFilters';
import SearchResults from '../../components/search/SearchResults';
import Pagination from '../../components/search/Pagination';
import { SearchResult } from '../../components/search/SearchResultItem';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [allPosts, setAllPosts] = useState<SearchResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Fetch all posts from backend
  const fetchAllPosts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:8080/api/posts');
      
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      const backendPosts = await response.json();
      
      // Transform backend posts to match SearchResult interface
      const transformedPosts: SearchResult[] = backendPosts.map((post: any) => ({
        id: post.id,
        title: post.title,
        author: post.contributor?.displayName || post.contributor?.username || 'Anonymous',
        date: new Date(post.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        excerpt: post.content ? post.content.substring(0, 200) + '...' : 'No content available',
        tags: [], // Ignoring tags as requested
        likes: post.likes || 0,
        comments: post.comments?.length || 0
      }));

      setAllPosts(transformedPosts);
      setError('');
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch posts');
    } finally {
      setIsLoading(false);
    }
  };

  // Search posts by title using backend API
  const searchPosts = async (query: string) => {
    if (!query.trim()) {
      return allPosts;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/posts/search?title=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error('Failed to search posts');
      }

      const backendPosts = await response.json();
      
      // Transform search results to match SearchResult interface
      const transformedPosts: SearchResult[] = backendPosts.map((post: any) => ({
        id: post.id,
        title: post.title,
        author: post.contributor?.displayName || post.contributor?.username || 'Anonymous',
        date: new Date(post.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        excerpt: post.content ? post.content.substring(0, 200) + '...' : 'No content available',
        tags: [], // Ignoring tags as requested
        likes: post.likes || 0,
        comments: post.comments?.length || 0
      }));

      return transformedPosts;
    } catch (error) {
      console.error('Error searching posts:', error);
      return [];
    }
  };

  // Filter results based on search term and active filter
  const filterResults = async () => {
    setIsLoading(true);
    
    try {
      let results: SearchResult[] = [];

      // Get posts based on search term
      if (searchTerm.trim()) {
        results = await searchPosts(searchTerm);
      } else {
        results = allPosts;
      }

      // Apply additional filtering based on activeFilter
      if (activeFilter === 'articles') {
        // All results are articles, so no additional filtering needed
        // In a real app, you might have different content types
      } else if (activeFilter === 'authors') {
        // Filter by author name if search term matches author
        if (searchTerm.trim()) {
          results = results.filter(result => 
            result.author.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
      }
      // Note: Ignoring 'tags' filter as requested

      setFilteredResults(results);
      setCurrentPage(1); // Reset to first page when filtering
    } catch (error) {
      console.error('Error filtering results:', error);
      setFilteredResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Load all posts on component mount
  useEffect(() => {
    fetchAllPosts();
  }, []);

  // Filter results when searchTerm or activeFilter changes
  useEffect(() => {
    filterResults();
  }, [searchTerm, activeFilter, allPosts]);

  // Pagination logic
  const totalPages = Math.ceil(filteredResults.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentResults = filteredResults.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading && allPosts.length === 0) {
    return (
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Search</h1>
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-gray-600">Loading posts...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Search</h1>
        
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">{error}</div>
                <button
                  onClick={fetchAllPosts}
                  className="mt-2 px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors text-sm"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}
        
        <SearchBar searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />
        <FilterButtons activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        <AdvancedFilters />
        
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <div className="text-gray-600">Searching...</div>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-gray-600">
                {searchTerm 
                  ? `Found ${filteredResults.length} results for "${searchTerm}"`
                  : `Showing ${filteredResults.length} articles`
                }
              </p>
            </div>
            
            <SearchResults results={currentResults} />
            
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`cursor-pointer px-3 py-1 rounded-md border border-gray-300 text-sm ${
                      currentPage === 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`cursor-pointer px-3 py-1 rounded-md text-sm ${
                        currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`cursor-pointer px-3 py-1 rounded-md border border-gray-300 text-sm ${
                      currentPage === totalPages
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 