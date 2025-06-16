'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface Post {
  id: number;
  title: string;
  author: string;
  date: string;
  content: string;
  imageUrl: string;
  tags: string[];
  likes: number;
  isLiked: boolean;
  contributor?: {
    id: number;
    name?: string;
    username?: string;
  };
}

interface Comment {
  id: number;
  content: string;
  user: {
    id: number;
    name?: string;
    username?: string;
  };
  author: string; // Computed field for display
  avatar: string; // Computed field for initials
  date: string; // Computed field for display
}



export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const postId = parseInt(params.id as string);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState('');
  const hasIncrementedView = useRef(false);

  // Function to increment view count
  const incrementViewCount = async (contributorId: number) => {
    // Only increment if we haven't already for this session
    if (hasIncrementedView.current) {
      console.log('View count already incremented for this session');
      return;
    }

    try {
      console.log('Incrementing view count for contributor:', contributorId);
      const response = await fetch(`http://localhost:8080/api/contributors/${contributorId}/views`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to increment view count');
      }
      console.log('Successfully incremented view count');
      hasIncrementedView.current = true;
    } catch (error) {
      console.error('Failed to increment view count:', error);
    }
  };

  // Fetch post from backend
  const fetchPost = async () => {
    try {
      setIsLoading(true);
      console.log('Fetching post:', postId);
      const response = await fetch(`http://localhost:8080/api/posts/${postId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setError('Post not found');
        } else {
          throw new Error('Failed to fetch post');
        }
        return;
      }

      const backendPost = await response.json();
      console.log('Received post data:', backendPost);
      
      // Get current user for like status checking
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const currentUserId = userData.id;
      
      let isLiked = false;
      // Check if current user has liked this post
      if (currentUserId) {
        try {
          const likeResponse = await fetch(`http://localhost:8080/api/posts/${postId}/liked-by/${currentUserId}`);
          if (likeResponse.ok) {
            isLiked = await likeResponse.json();
          }
        } catch (error) {
          console.error('Error checking like status:', error);
        }
      }
      
      // Transform backend post to match frontend interface
      const transformedPost: Post = {
        id: backendPost.id,
        title: backendPost.title,
        author: backendPost.contributor?.name || backendPost.contributor?.username || 'Anonymous',
        date: new Date(backendPost.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        content: backendPost.content,
        imageUrl: backendPost.imagePath || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
        tags: [],
        likes: backendPost.likes || 0,
        isLiked: isLiked,
        contributor: backendPost.contributor // Preserve contributor info for author comparison
      };

      setPost(transformedPost);

      // Increment view count if we have a contributor ID
      if (backendPost.contributor?.id) {
        await incrementViewCount(backendPost.contributor.id);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch post');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle like functionality
  const handleLike = async () => {
    if (!post) return;
    
    try {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const currentUserId = userData.id;
      
      if (!currentUserId) {
        alert('Please log in to like posts');
        return;
      }

      const response = await fetch(`http://localhost:8080/api/posts/${postId}/toggle-like/${currentUserId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const updatedPost = await response.json();
        // Update the post state
        setPost(prevPost => prevPost ? {
          ...prevPost,
          likes: updatedPost.likes,
          isLiked: !prevPost.isLiked // Toggle the liked state
        } : null);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  // Load post and comments on component mount
  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [postId]);


  // Fetch comments from backend
  const fetchComments = async () => {
    try {
      setCommentsLoading(true);
      const response = await fetch(`http://localhost:8080/api/comments/post/${postId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }

      const backendComments = await response.json();
      
      const transformedComments: Comment[] = backendComments.map((comment: any) => {
        const userName = comment.user?.name || comment.user?.username || 'Anonymous';
        return {
          id: comment.id,
          content: comment.content,
          user: comment.user,
          author: userName,
          avatar: userName.split(' ').map((n: string) => n[0]).join('').toUpperCase(),
          date: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) 
        };
      });

      setComments(transformedComments);
    } catch (error) {
      setCommentsError(error instanceof Error ? error.message : 'Failed to load comments');
    } finally {
      setCommentsLoading(false);
    }
  };

<<<<<<< HEAD
  // Load post on component mount
  useEffect(() => {
    console.log('Component mounted, fetching post');
    fetchPost();
  }, [postId]); // Only re-fetch if postId changes
=======
>>>>>>> origin/main

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    
    try {
      // Get current user data
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const userId = userData.id;
      
      if (!userId) {
        alert('Please log in to post comments');
        return;
      }

      const response = await fetch(`http://localhost:8080/api/comments/${postId}/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newComment.trim()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      // Refresh comments after successful submission
      await fetchComments();
      setNewComment('');
      
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Failed to submit comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error === 'Post not found' ? 'Post Not Found' : 'Error Loading Post'}
          </h1>
          <p className="text-gray-600 mb-8">
            {error === 'Post not found' 
              ? "The blog post you're looking for doesn't exist." 
              : error || 'Something went wrong while loading the post.'
            }
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => router.push('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium"
            >
              Back to Home
            </button>
            {error !== 'Post not found' && (
              <button
                onClick={fetchPost}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-md font-medium"
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="mb-8 flex items-center text-blue-600 hover:text-blue-800 font-medium"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <article className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
        {/* Hero image */}
        {post.imageUrl && (
          <div className="relative z-0 h-64 md:h-96 w-full bg-gray-200">
            <img 
              src={post.imageUrl} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-8">
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>

          {/* Author and date */}
          <div className="flex items-center text-gray-600 mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                <span className="text-gray-600 font-medium">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{post.author}</p>
                <p className="text-sm text-gray-500">{post.date}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-6 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <button
                onClick={() => router.push('/')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-md font-medium"
              >
                More Articles
              </button>
              <div className="flex space-x-4">
                <button 
                  onClick={handleLike}
                  className={`flex items-center space-x-2 transition-colors cursor-pointer ${
                    post.isLiked 
                      ? 'text-red-500 hover:text-red-600' 
                      : 'text-gray-500 hover:text-red-500'
                  }`}
                >
                  <svg 
                    className="w-6 h-6" 
                    fill={post.isLiked ? "currentColor" : "none"} 
                    stroke={post.isLiked ? "none" : "currentColor"} 
                    strokeWidth={post.isLiked ? 0 : 2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="text-sm font-medium">{post.likes}</span>
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Comments ({commentsLoading ? '...' : comments.length})
        </h2>

        {commentsError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600">{commentsError}</p>
            <button
              onClick={fetchComments}
              className="mt-2 text-red-700 hover:text-red-800 font-medium text-sm"
            >
              Try again
            </button>
          </div>
        )}

        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit} className="mb-8 pb-8 border-b border-gray-200">
          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
              Add a comment
            </label>
            <textarea
              id="comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Share your thoughts about this article..."
              disabled={isSubmitting}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting || !newComment.trim()}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                isSubmitting || !newComment.trim()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Post Comment'}
            </button>
          </div>
        </form>

        {/* Comments List */}
        <div className="space-y-6">
          {commentsLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading comments...</p>
            </div>
          ) : comments.length > 0 ? (
            comments.map((comment) => {
              // Check if this comment is by the post author
              const isAuthorComment = post && comment.user.id === post.contributor?.id;
              
              return (
                <div key={comment.id} className={`flex space-x-4 ${isAuthorComment ? 'bg-blue-50 border border-blue-200 rounded-lg p-4' : ''}`}>
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isAuthorComment ? 'bg-blue-200 ring-2 ring-blue-400' : 'bg-blue-100'
                    }`}>
                      <span className={`font-medium text-sm ${
                        isAuthorComment ? 'text-blue-800' : 'text-blue-600'
                      }`}>
                        {comment.avatar}
                      </span>
                    </div>
                  </div>
                  
                  {/* Comment Content */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium text-gray-900">{comment.author}</h4>
                      {isAuthorComment && (
                        <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                          Author
                        </span>
                      )}
                      <span className="text-gray-500 text-sm">•</span>
                      <span className="text-gray-500 text-sm">{comment.date}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                    
                    {/* Comment Actions */}
                    <div className="flex space-x-4 mt-3">
                      <button className="text-gray-500 hover:text-blue-600 text-sm font-medium">
                        Reply
                      </button>
                      <button className="text-gray-500 hover:text-red-600 text-sm font-medium">
                        Like
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8">
              <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p className="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 