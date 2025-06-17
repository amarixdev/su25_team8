'use client';
import React, { useState, useEffect } from 'react';
//import { useRouter } from 'next/navigation';
import { RecentPost } from './types';

// CreatePostForm: Form component for creating or editing a blog post.
// Now supports both creating and editing posts.
// Pre-fills the form with post data when editing.
// Uses a loading state (isSubmitting) to prevent double submissions and show feedback.
// Calls parent callbacks (onPostCreated, onClose) to refresh the dashboard and close the form after submission.

interface CreatePostFormProps {
  onClose: () => void;
  onPostCreated: () => void;
  post?: RecentPost; // Optional post for editing mode
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onClose, onPostCreated, post }) => {
 //const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imagePath: '',
    status: 'DRAFT'
  });

  // Pre-fill form data if we're editing an existing post
  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content || '',
        imagePath: post.imagePath || '',
        status: post.status || 'DRAFT'
      });
    }
  }, [post]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Get contributor ID from localStorage
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const contributorId = userData.id;

      if (!contributorId) {
        throw new Error('User not logged in');
      }

      // Use different endpoints for create vs update
      const url = post 
        ? `http://localhost:8080/api/posts/${post.id}`
        : `http://localhost:8080/api/posts/contributor/${contributorId}`;

      const response = await fetch(url, {
        method: post ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        onPostCreated();
        onClose();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to ${post ? 'update' : 'create'} post`);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : `Failed to ${post ? 'update' : 'create'} post`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        {/* Modal header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            {post ? 'Edit Post' : 'Create New Post'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="imagePath" className="block text-sm font-medium text-gray-700">
              Image URL (optional)
            </label>
            <input
              type="text"
              id="imagePath"
              value={formData.imagePath}
              onChange={(e) => setFormData({ ...formData, imagePath: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
            </select>
          </div>

          {/* Error display */}
          {error && (
            <div className="text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Form actions */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                isSubmitting
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? (post ? 'Updating...' : 'Creating...') : (post ? 'Update Post' : 'Create Post')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostForm; 