'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface VisitorSignupData {
  displayName: string;
  username: string;
  email: string;
  bio: string;
  location: string;
  website: string;
  profilePicturePath: string;
  following: number;
  // Visitor-specific fields
  accountAge: number;
  postsReads: number;
  canUpgradeAccount: boolean;
}

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<VisitorSignupData>({
    displayName: '',
    username: '',
    email: '',
    bio: '',
    location: '',
    website: '',
    profilePicturePath: '',
    following: 0,
    // Initialize visitor-specific fields
    accountAge: 0,
    postsReads: 0,
    canUpgradeAccount: false
  });

  const [errors, setErrors] = useState<Partial<VisitorSignupData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof VisitorSignupData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<VisitorSignupData> = {};

    // Required fields validation
    if (!formData.displayName.trim()) {
      newErrors.displayName = 'Display name is required';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const email = formData.email.trim();
      const atIndex = email.indexOf('@');
      const lastDotIndex = email.lastIndexOf('.');
      
      if (atIndex === -1 || atIndex === 0 || atIndex === email.length - 1 ||
          lastDotIndex === -1 || lastDotIndex <= atIndex + 1 || lastDotIndex === email.length - 1 ||
          email.includes('..') || email.includes('@.') || email.includes('.@')) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    // Optional website URL validation
    if (formData.website) {
      const website = formData.website.trim();
      if (!website.startsWith('http://') && !website.startsWith('https://')) {
        newErrors.website = 'Please enter a valid URL (starting with http:// or https://)';
      } else if (website === 'http://' || website === 'https://') {
        newErrors.website = 'Please enter a valid URL (starting with http:// or https://)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create the visitor object based on the Visitor entity structure
      const visitorData = {
        displayName: formData.displayName,
        username: formData.username,
        email: formData.email,
        bio: formData.bio || null,
        location: formData.location || null,
        website: formData.website || null,
        profilePicturePath: formData.profilePicturePath || null,
        following: formData.following,
        // Visitor-specific fields
        accountAge: formData.accountAge,
        postsReads: formData.postsReads,
        canUpgradeAccount: formData.canUpgradeAccount
      };

      console.log('Creating visitor:', visitorData);

      const response = await fetch('http://localhost:8080/api/visitors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(visitorData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create visitor: ${response.status} ${errorText}`);
      }

      const createdVisitor = await response.json();
      console.log('Visitor created successfully:', createdVisitor);

      alert('Account created successfully! Welcome to SpartanParadigm.');
      
      // Navigate to login page 
      router.push('/login');

    } catch (error) {
      console.error('Signup error:', error);
      alert(`Failed to create account: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Account Type Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-medium text-blue-800 mb-2">Creating Visitor Account</h3>
        <p className="text-sm text-blue-700">
          Visitors can browse and read content. You can upgrade to Contributor later to create and share your own posts.
        </p>
      </div>

      {/* Required Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
            Display Name *
          </label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            value={formData.displayName}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.displayName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Your full name"
          />
          {errors.displayName && <p className="mt-1 text-sm text-red-600">{errors.displayName}</p>}
        </div>

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username *
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.username ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="@username"
          />
          {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="your.email@example.com"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      {/* Optional Fields */}
      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Tell us about yourself..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="City, Country"
          />
        </div>

        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
            Website
          </label>
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.website ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="https://yourwebsite.com"
          />
          {errors.website && <p className="mt-1 text-sm text-red-600">{errors.website}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="profilePicturePath" className="block text-sm font-medium text-gray-700 mb-1">
          Profile Picture URL
        </label>
        <input
          type="url"
          id="profilePicturePath"
          name="profilePicturePath"
          value={formData.profilePicturePath}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://example.com/your-photo.jpg"
        />
        <p className="mt-1 text-sm text-gray-500">Optional: Link to your profile picture</p>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full px-6 py-3 text-white font-medium rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
          }`}
        >
          {isSubmitting ? 'Creating Account...' : 'Create Visitor Account'}
        </button>
      </div>

      {/* Login Link */}
      <div className="text-center pt-4">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
            Sign in here
          </a>
        </p>
      </div>
    </form>
  );
};

export default Signup; 