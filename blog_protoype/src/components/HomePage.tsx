'use client';
import React from 'react';
import BlogPost from './BlogPost';

// Dummy blog post data
const dummyPosts = [
  {
    id: 1,
    title: "The Future of Web Development",
    author: "Jane Smith",
    date: "May 15, 2023",
    content: "Web development continues to evolve at a rapid pace. With the rise of frameworks like Next.js and React, developers can now build more complex applications with less code. This article explores the latest trends and what to expect in the coming years.",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    tags: ["Web Development", "JavaScript", "React"]
  },
  {
    id: 2,
    title: "Understanding TypeScript",
    author: "John Doe",
    date: "May 10, 2023",
    content: "TypeScript has become an essential tool for modern web development. It adds static typing to JavaScript, making your code more robust and easier to maintain. Learn how to leverage TypeScript in your projects and why it's worth the investment.",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    tags: ["TypeScript", "JavaScript", "Programming"]
  },
  {
    id: 3,
    title: "The Art of UI/UX Design",
    author: "Emily Johnson",
    date: "May 5, 2023",
    content: "Good design is more than just aesthetics. It's about creating intuitive user experiences that solve real problems. This article delves into the principles of effective UI/UX design and how to apply them to your projects.",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
    tags: ["Design", "UI/UX", "User Experience"]
  },
  {
    id: 4,
    title: "Building Scalable Applications",
    author: "Michael Brown",
    date: "April 28, 2023",
    content: "Scalability is a critical consideration for any application. Learn about the best practices for building applications that can grow with your user base, from database design to server architecture.",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    tags: ["Architecture", "Scalability", "Backend"]
  }
];

const HomePage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Latest Blog Posts</h1>
        <p className="mt-2 text-gray-600">Stay updated with our latest articles and insights</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dummyPosts.map((post) => (
          <BlogPost
            key={post.id}
            title={post.title}
            author={post.author}
            date={post.date}
            content={post.content}
            imageUrl={post.imageUrl}
            tags={post.tags}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage; 