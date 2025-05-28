import React from 'react';

export interface SearchResult {
  id: number;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  tags: string[];
  likes: number;
  comments: number;
}

interface SearchResultItemProps {
  result: SearchResult;
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({ result }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
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
  );
};

export default SearchResultItem; 