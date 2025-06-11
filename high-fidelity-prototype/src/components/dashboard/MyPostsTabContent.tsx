import React, { useState } from 'react';
import { RecentPost } from './types'; // Assuming structure is similar to RecentPost
import CreatePostForm from './CreatePostForm';

interface MyPostsTabContentProps {
  posts: RecentPost[]; // Using RecentPost for now, can be a different type if needed
  onPostUpdated: () => void; // Add callback for post updates
}

const MyPostsTabContent: React.FC<MyPostsTabContentProps> = ({ posts, onPostUpdated }) => {
  // State for managing create/edit forms and operations
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [editingPost, setEditingPost] = useState<RecentPost | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  // Close create form and refresh posts
  const handlePostCreated = () => {
    setShowCreatePost(false);
    onPostUpdated();
  };

  // Open edit form with selected post
  const handleEdit = async (postSummary: RecentPost) => {
    try {
      const response = await fetch(`http://localhost:8080/api/posts/${postSummary.id}`);
      if (!response.ok) throw new Error('Failed to fetch post');
      const fullPost = await response.json();
      setEditingPost(fullPost);
    } catch (error) {
      setError('Could not load post for editing.');
    }
  };

  // Delete post with confirmation
  const handleDelete = async (postId: number) => {
    // Double check before deleting
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    setIsDeleting(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:8080/api/posts/${postId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      onPostUpdated();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete post');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      {/* Header with create button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">My Posts</h2>
        <button 
          onClick={() => setShowCreatePost(true)}
          className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
        >
          Create New Post
        </button>
      </div>

      {/* Error message display */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {/* Posts list */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{post.title}</h3>
                <p className="text-sm text-gray-500">Published on {post.date}</p>
              </div>
              {/* Edit/Delete buttons */}
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleEdit(post)}
                  className="text-indigo-600 hover:text-indigo-900 text-sm font-medium cursor-pointer"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(post.id)}
                  disabled={isDeleting}
                  className="text-red-600 hover:text-red-900 text-sm font-medium cursor-pointer disabled:opacity-50"
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
            {/* Post stats */}
            <div className="mt-2 flex space-x-4 text-sm text-gray-500">
              <span>{post.views} views</span>
              <span>{post.comments} comments</span>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit forms */}
      {showCreatePost && (
        <CreatePostForm
          onClose={() => setShowCreatePost(false)}
          onPostCreated={handlePostCreated}
        />
      )}

      {editingPost && (
        <CreatePostForm
          onClose={() => setEditingPost(null)}
          onPostCreated={handlePostCreated}
          post={editingPost}
        />
      )}
    </div>
  );
};

export default MyPostsTabContent; 