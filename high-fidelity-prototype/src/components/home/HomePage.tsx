'use client';
import React, { useEffect } from 'react';
import BlogPost from './BlogPost';
import { useState } from 'react';
import { dummyPosts } from '@/app/dummy_data/dummyPosts';

// Dummy blog post data


const HomePage = () => {
  const [showAll, setShowAll] = useState(false);
  const postsToShow = showAll ? dummyPosts : dummyPosts.slice(0, 6);


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Latest Blog Posts</h1>
        <p className="mt-2 text-gray-600">Stay updated with our latest articles and insights</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {postsToShow.map((post) => (
          <BlogPost
            key={post.id}
            id={post.id}
            title={post.title}
            author={post.author}
            date={post.date}
            content={post.content}
            imageUrl={post.imageUrl}
            tags={post.tags}
          />
        ))}
      </div>
      <div className="flex justify-center mt-8">
      <button
        className="px-6 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300"
        onClick={() => setShowAll((prev) => !prev)}
      >
        {showAll ? "Show Less" : "Show All Posts"}
      </button>
    </div>
    </div>
  );
};

export default HomePage; 