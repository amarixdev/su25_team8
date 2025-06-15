'use client';
import React, { useState } from 'react';
// Import components that need to be created
// These components will need to be created in the respective directories
import RequirementsCard from '../../components/upgrade/RequirementsCard';
import BenefitsCard from '../../components/upgrade/BenefitsCard';
import UpgradeButton from '../../components/upgrade/UpgradeButton';
import UpgradeCompleteCard from '../../components/upgrade/UpgradeCompleteCard';

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
  const [upgraded, setUpgraded] = useState(false);
  
  // Mock user stats
  const userStats = {
    accountAge: 16, // days
    commentsCount: 10,
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
  
  const handleUpgrade = async () => {
    if (!allRequirementsMet) return;
    
    setIsSubmitting(true);
    
    try {
      // Get current user data from localStorage
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const userId = userData.id;
      
      if (!userId) {
        alert('Please log in to upgrade to contributor status');
        setIsSubmitting(false);
        return;
      }

      // Make API call to upgrade to contributor
      const response = await fetch(`http://localhost:8080/api/visitors/${userId}/upgrade`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('User not found');
        } else if (response.status === 400) {
          throw new Error('You are not eligible for account upgrade');
        } else {
          throw new Error('Failed to upgrade account');
        }
      }

      const contributorData = await response.json();
      
      // Update localStorage with new contributor data
      localStorage.setItem('userData', JSON.stringify(contributorData));
      
      // Update user type to indicate they're now a contributor
      localStorage.setItem('userType', 'contributor');
      
      setUpgraded(true);
      
    } catch (error) {
      console.error('Error upgrading account:', error);
      alert(error instanceof Error ? error.message : 'Failed to upgrade account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Upgrade to Contributor</h1>
        <p className="text-gray-600 mb-8">
          Contributors can publish their own articles, gain followers, and become part of our writing community.
        </p>
        
        {upgraded ? (
          <UpgradeCompleteCard />
        ) : (
          <>
            <RequirementsCard requirements={requirements} />
            <BenefitsCard />
            <UpgradeButton 
              onUpgrade={handleUpgrade}
              allRequirementsMet={allRequirementsMet}
              isSubmitting={isSubmitting}
            />
          </>
        )}
      </div>
    </div>
  );
} 