import React, { useState } from 'react';
import { RecentPost } from './types'; // Defines the shape of a post object
import CreatePostForm from './CreatePostForm';

// MyPostsTabContent: Displays the contributor's posts and allows creating, editing, and deleting posts.
// Displays a list of the contributor’s posts 
// Allows users to create, edit, and delete posts.
// When editing, fetches the full post (including content) from the backend before opening the form.
// Shows error messages and disables buttons during delete operations for better UX.

interface MyPostsTabContentProps {
  posts: RecentPost[]; // List of posts to display
  onPostUpdated: () => void; // Callback to refresh posts after changes
}

const MyPostsTabContent: React.FC<MyPostsTabContentProps> = ({ posts, onPostUpdated }) => {
  // State for showing the create post form
  const [showCreatePost, setShowCreatePost] = useState(false);
  // State for tracking which post is being edited
  const [editingPost, setEditingPost] = useState<RecentPost | null>(null);
  // State for showing a loading indicator when deleting
  const [isDeleting, setIsDeleting] = useState(false);
  // State for error messages
  const [error, setError] = useState('');

  // Called after a post is created or edited to refresh the list
  const handlePostCreated = () => {
    setShowCreatePost(false);
    onPostUpdated();
  };

  // Opens the edit form for a selected post
  // fetches the full post before editing
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

  // Deletes a post and refreshes the list
  const handleDelete = async (postId: number) => {
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

  // Render the posts list and forms
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

      {/* Show error message if there is one */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {/* List of posts with edit and delete buttons */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{post.title}</h3>
                <p className="text-sm text-gray-500">Published on {post.date}</p>
              </div>
              {/* Edit and Delete buttons for each post */}
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
            {/* Show post stats */}
            <div className="mt-2 flex space-x-4 text-sm text-gray-500">
              <span>{post.views} views</span>
              <span>{post.likes} likes</span>
              <span>{post.comments} comments</span>
            </div>
          </div>
        ))}
      </div>

      {/* Show the create post form if needed */}
      {showCreatePost && (
        <CreatePostForm
          onClose={() => setShowCreatePost(false)}
          onPostCreated={handlePostCreated}
        />
      )}

      {/* Show the edit post form if needed */}
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