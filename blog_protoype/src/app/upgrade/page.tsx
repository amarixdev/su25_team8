'use client';
import React, { useState } from 'react';
import ApplicationSubmittedCard from '../../components/upgrade/ApplicationSubmittedCard';
import RequirementsCard from '../../components/upgrade/RequirementsCard';
import BenefitsCard from '../../components/upgrade/BenefitsCard';
import ApplicationButton from '../../components/upgrade/ApplicationButton';

// Define the Requirement interface, as it's used by RequirementsCard and this page
interface Requirement {
  name: string;
  value: number;
  required: number;
  unit: string;
  met: boolean;
}

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
  const requirements: Requirement[] = [
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
          <ApplicationSubmittedCard />
        ) : (
          <>
            <RequirementsCard requirements={requirements} />
            <BenefitsCard />
            <ApplicationButton 
              onApply={handleApply}
              allRequirementsMet={allRequirementsMet}
              isSubmitting={isSubmitting}
            />
          </>
        )}
      </div>
    </div>
  );
} 