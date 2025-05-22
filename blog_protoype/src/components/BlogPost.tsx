'use client';
import React from 'react';
import Image from 'next/image';

interface BlogPostProps {
  title: string;
  author: string;
  date: string;
  content: string;
  imageUrl?: string;
  tags?: string[];
}

const BlogPost = ({ title, author, date, content, imageUrl, tags = [] }: BlogPostProps) => {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden">
      {imageUrl && (
        <div className="relative h-48 w-full">
          {/* <Image 
            src={imageUrl} 
            alt={title}
            fill
            className="object-cover"
          /> */}
        </div>
      )}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <span className="font-medium">{author}</span>
          <span className="mx-2">•</span>
          <span>{date}</span>
        </div>
        <p className="text-gray-700 mb-4 line-clamp-3">{content}</p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
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
        <button className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer">
          Read more
        </button>
      </div>
    </article>
  );
};

export default BlogPost; 