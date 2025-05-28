import React from 'react';
import { RecentPost } from './types';

interface RecentPostsSectionProps {
  recentPosts: RecentPost[];
  onSeeAllPosts: () => void;
}

const RecentPostsSection: React.FC<RecentPostsSectionProps> = ({ recentPosts, onSeeAllPosts }) => {

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Posts</h3>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {recentPosts.slice(0,3).map((post) => (
            <li key={post.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-indigo-600 truncate">{post.title}</p>
                  <p className="mt-1 text-sm text-gray-500">Published on {post.date}</p>
                </div>
                <div className="ml-4 flex-shrink-0 flex space-x-4">
                  <div className="text-sm text-gray-500">
                    {post.views} views
                  </div>
                  <div className="text-sm text-gray-500">
                    {post.comments} comments
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center py-4">
      <button
      onClick={onSeeAllPosts}
      className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
      See All Posts
      </button>

      </div>
    </div>
  );
};

export default RecentPostsSection; 