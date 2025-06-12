'use client';
import React, { useEffect } from 'react';
import BlogPost from './BlogPost';
import { useState } from 'react';

interface Post {
  id: number;
  title: string;
  author: string;
  date: string;
  content: string;
  imageUrl: string;
  tags: string[];
}

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAll, setShowAll] = useState(false);
  
  const postsToShow = showAll ? posts : posts.slice(0, 6);

  // Fetch posts from backend
  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:8080/api/posts');
      
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      const backendPosts = await response.json();
      
      // Transform backend posts to match frontend interface
      const transformedPosts: Post[] = backendPosts.map((post: any) => ({
        id: post.id,
        title: post.title,
        author: post.contributor?.name || post.contributor?.username || 'Anonymous',
        date: new Date(post.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        content: post.content,
        imageUrl: post.imagePath || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
        tags: [] // Backend doesn't have tags yet, so we'll use empty array
      }));

      setPosts(transformedPosts);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load posts');
    } finally {
      setIsLoading(false);
    }
  };

  // Load posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Show loading state
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading posts...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchPosts}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
      
      {posts.length === 0 ? (
        <div className="text-center mt-8">
          <p className="text-gray-600">No posts available yet.</p>
        </div>
      ) : (
        <div className="flex justify-center mt-8">
          <button
            className="px-6 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Show Less" : `Show All Posts (${posts.length})`}
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage; 