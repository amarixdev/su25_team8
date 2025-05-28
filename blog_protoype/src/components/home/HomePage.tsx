'use client';
import React from 'react';
import BlogPost from './BlogPost';
import { useState } from 'react';


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
    title: "Optimizing Frontend Performance",
    author: "Sarah Lee",
    date: "April 27, 2023",
    content: "Discover techniques to boost your website's speed and responsiveness, including code splitting, lazy loading, and image optimization.",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    tags: ["Frontend", "Performance", "Optimization"]
  },
  {
    id: 5,
    title: "Mastering RESTful APIs",
    author: "David Kim",
    date: "April 26, 2023",
    content: "A practical guide to designing, building, and documenting RESTful APIs that scale and are easy to maintain.",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    tags: ["API", "Backend", "REST"]
  },
  {
    id: 6,
    title: "Introduction to TypeScript",
    author: "Priya Patel",
    date: "April 25, 2023",
    content: "Learn how TypeScript enhances JavaScript development by adding static typing, interfaces, and advanced tooling.",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    tags: ["TypeScript", "JavaScript", "Frontend"]
  },
  {
    id: 7,
    title: "Deploying with Docker",
    author: "Carlos Alvarez",
    date: "April 24, 2023",
    content: "Get started with Docker containers for consistent, repeatable deployments and simplified DevOps workflows.",
    imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
    tags: ["DevOps", "Docker", "Deployment"]
  },
  {
    id: 8,
    title: "Testing React Applications",
    author: "Emily Chen",
    date: "April 23, 2023",
    content: "Explore strategies and tools for writing effective unit and integration tests for your React components.",
    imageUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    tags: ["React", "Testing", "Frontend"]
  },
  {
    id: 9,
    title: "Continuous Integration Best Practices",
    author: "Liam Smith",
    date: "April 22, 2023",
    content: "Implement CI pipelines to automate testing and deployment, improving code quality and team productivity.",
    imageUrl: "https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?auto=format&fit=crop&w=800&q=80",
    tags: ["CI/CD", "Automation", "DevOps"]
  },
  {
    id: 10,
    title: "Responsive Web Design Essentials",
    author: "Ava Martinez",
    date: "April 21, 2023",
    content: "Learn how to build websites that look great on any device using modern CSS techniques and frameworks.",
    imageUrl: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80",
    tags: ["CSS", "Responsive", "Web Design"]
  },
  {
    id: 11,
    title: "State Management in React",
    author: "Noah Wilson",
    date: "April 20, 2023",
    content: "Compare popular state management solutions for React, including Context API, Redux, and Zustand.",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    tags: ["React", "State Management", "Frontend"]
  },
  {
    id: 12,
    title: "Securing Web Applications",
    author: "Olivia Davis",
    date: "April 19, 2023",
    content: "Protect your web apps from common vulnerabilities with best practices for authentication, authorization, and data validation.",
    imageUrl: "https://images.unsplash.com/photo-1465101178521-c1a9136a3fd9?auto=format&fit=crop&w=800&q=80",
    tags: ["Security", "Web Development", "Best Practices"]
  },
];

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