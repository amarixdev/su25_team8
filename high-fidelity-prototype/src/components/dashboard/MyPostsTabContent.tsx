import React from 'react';
import { RecentPost } from './types'; // Assuming structure is similar to RecentPost

interface MyPostsTabContentProps {
  posts: RecentPost[]; // Using RecentPost for now, can be a different type if needed
}

const MyPostsTabContent: React.FC<MyPostsTabContentProps> = ({ posts }) => {
  return (
    
    <div className="bg-white shadow rounded-lg p-6">
          
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">My Posts</h2>
        <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
          Create New Post
        </button>
      </div>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{post.title}</h3>
                <p className="text-sm text-gray-500">Published on {post.date}</p>
              </div>
              <div className="flex space-x-2">
                <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium cursor-pointer">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-900 text-sm font-medium cursor-pointer">
                  Delete
                </button>
              </div>
            </div>
            <div className="mt-2 flex space-x-4 text-sm text-gray-500">
              <span>{post.views} views</span>
              <span>{post.comments} comments</span>
            </div>
          </div>
        ))}
        
      </div>
    </div>
  );
};

export default MyPostsTabContent; 