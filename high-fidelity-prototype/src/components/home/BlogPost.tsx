'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

interface BlogPostProps {
  id: number;
  title: string;
  author: string;
  date: string;
  content: string;
  imageUrl?: string;
  tags?: string[];
}

const BlogPost = ({ id, title, author, date, content, imageUrl, tags = [] }: BlogPostProps) => {
  const router = useRouter();

  const handleReadMore = () => {
    router.push(`/blog/${id}`);
  };

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden">
      {imageUrl && (
        <div className="relative h-48 w-full">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 hover:text-blue-600 cursor-pointer transition-colors" 
            onClick={handleReadMore}>
          {title}
        </h2>
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <span className="font-medium">{author}</span>
          <span className="mx-2">•</span>
          <span>{date}</span>
        </div>
        <p className="text-gray-700 mb-4 line-clamp-3">{content}</p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <button 
          onClick={handleReadMore}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors cursor-pointer"
        >
          Read more
        </button>
      </div>
    </article>
  );
};

export default BlogPost; 