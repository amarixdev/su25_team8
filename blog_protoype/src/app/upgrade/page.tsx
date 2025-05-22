'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function UpgradePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Mock user stats
  const userStats = {
    accountAge: 16, // days
    commentsCount: 8,
    postsRead: 87,
    bookmarksCount: 8,
    followersCount: 3,
    followingCount: 15,
  };
  
  // Requirements for becoming a contributor
  const requirements = [
    { name: 'Account Age', value: userStats.accountAge, required: 14, unit: 'days', met: userStats.accountAge >= 14 },
    { name: 'Comments', value: userStats.commentsCount, required: 10, unit: '', met: userStats.commentsCount >= 10 },
    { name: 'Posts Read', value: userStats.postsRead, required: 50, unit: '', met: userStats.postsRead >= 50 },
    { name: 'Bookmarks', value: userStats.bookmarksCount, required: 5, unit: '', met: userStats.bookmarksCount >= 5 },
  ];
  
  // Check if all requirements are met
  const allRequirementsMet = requirements.every(req => req.met);
  
  const handleApply = () => {
    if (!allRequirementsMet) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };
  
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Upgrade to Contributor</h1>
        <p className="text-gray-600 mb-8">
          Contributors can publish their own articles, gain followers, and become part of our writing community.
        </p>
        
        {submitted ? (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">Application Submitted!</h2>
              <p className="text-gray-600 mb-4">
                Your application to become a contributor is being reviewed. We&apos;ll notify you once it&apos;s approved.
              </p>
              <Link href="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
                Return to Home
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Requirements Card */}
            <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Contributor Requirements</h2>
                <p className="text-gray-600 mb-6">
                  To become a contributor, your account needs to meet the following requirements:
                </p>
                
                <div className="space-y-4">
                  {requirements.map((req, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 h-5 w-5 rounded-full ${req.met ? 'bg-green-100' : 'bg-gray-100'} flex items-center justify-center mr-3`}>
                          {req.met && (
                            <svg className="h-3 w-3 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) }
                        </div>
                        <span className="text-gray-700">{req.name}</span>
                      </div>
                      <div className="text-right">
                        <span className={`font-medium ${req.met ? 'text-green-600' : 'text-black'}`}>
                          {req.value} / {req.required} {req.unit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Benefits Card */}
            <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Contributor Benefits</h2>
                
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-700">Publish your own articles to our community</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-700">Gain followers and build your audience</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-700">Access to contributor-only features and analytics</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-700">Participate in contributor events and workshops</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-700">Opportunity to earn from your content through our partner program</p>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Application Button */}
            <div className="flex justify-center">
              <button
                onClick={handleApply}
                disabled={!allRequirementsMet || isSubmitting}
                className={`px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white 
                  ${allRequirementsMet 
                    ? 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' 
                    : 'bg-gray-300 cursor-not-allowed'}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Apply to Become a Contributor"
                )}
              </button>
            </div>
            
            {!allRequirementsMet && (
              <p className="text-sm text-center text-gray-500 mt-4">
                You need to meet all requirements before you can apply.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
} 