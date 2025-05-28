import React from 'react';
import SearchResultItem, { SearchResult } from './SearchResultItem';

interface SearchResultsProps {
  results: SearchResult[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Results</h2>
      {results.length === 0 ? (
        <p className="text-gray-500">No results found.</p>
      ) : (
        <div className="space-y-6">
          {results.map((result) => (
            <SearchResultItem key={result.id} result={result} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults; 