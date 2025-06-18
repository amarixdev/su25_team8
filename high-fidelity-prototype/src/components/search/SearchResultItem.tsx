import React from 'react';
import Link from 'next/link';

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
    <Link href={`/blog/${result.id}`} className="block">
      <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer border border-gray-200 hover:border-gray-300">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-blue-600 hover:text-blue-800 transition-colors">{result.title}</h3>
          <div className="flex space-x-2">
            <span className="flex items-center text-gray-500 text-sm">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
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
        {result.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {result.tags.map((tag, index) => (
              <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default SearchResultItem; 