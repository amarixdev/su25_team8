'use client';
import React from 'react';
// Removed Link and Image imports as they are now in child components
import LeaderboardSection, { Contributor } from '../../components/leaderboards/LeaderboardSection';
import ContributorOfTheMonth from '../../components/leaderboards/ContributorOfTheMonth';

// Mock Data (remains in page.tsx for now, or could be moved to a service/API call)
const mockContributors: Contributor[] = [
  { id: 1, name: 'Alice Wonderland', username: 'alicew', avatar: '/placeholder-avatar.png', postsPublished: 150, totalLikes: 3200, totalComments: 800, avgLikes: 21.3 },
  { id: 2, name: 'Bob The Builder', username: 'bobuilds', avatar: '/placeholder-avatar.png', postsPublished: 120, totalLikes: 2800, totalComments: 650, avgLikes: 23.3 },
  { id: 3, name: 'Charlie Brown', username: 'goodgrief', avatar: '/placeholder-avatar.png', postsPublished: 180, totalLikes: 3500, totalComments: 900, avgLikes: 19.4 },
  { id: 4, name: 'Diana Prince', username: 'wonderwoman', avatar: '/placeholder-avatar.png', postsPublished: 90, totalLikes: 4500, totalComments: 1200, avgLikes: 50 },
  { id: 5, name: 'Edward Scissorhands', username: 'edhands', avatar: '/placeholder-avatar.png', postsPublished: 110, totalLikes: 2200, totalComments: 500, avgLikes: 20 },
  { id: 6, name: 'Fiona Gallagher', username: 'fiona', avatar: '/placeholder-avatar.png', postsPublished: 130, totalLikes: 3000, totalComments: 700, avgLikes: 23.1 },
  { id: 7, name: 'George Costanza', username: 'artvandelay', avatar: '/placeholder-avatar.png', postsPublished: 160, totalLikes: 1800, totalComments: 1500, avgLikes: 11.25 }, 
  { id: 8, name: 'Jane Doe', username: 'janed', avatar: '/placeholder-avatar.png', postsPublished: 200, totalLikes: 5000, totalComments: 1000, avgLikes: 25 },
];

// Determining contributor of the month here, can be more complex logic
const contributorOfTheMonth = mockContributors.length > 7 ? mockContributors[7] : undefined; // Example: Pick Jane Doe or undefined if not enough data

export default function LeaderboardsPage() {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900">Leaderboards</h1>
            <p className="mt-2 text-lg text-gray-600">See who&apos;s making the biggest impact in our community.</p>
        </div>

        <ContributorOfTheMonth contributor={contributorOfTheMonth} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <LeaderboardSection title="Most Posts Published" data={mockContributors} metricKey="postsPublished" unit="posts" />
          <LeaderboardSection title="Most Total Likes" data={mockContributors} metricKey="totalLikes" unit="likes" />
          <LeaderboardSection title="Most Total Comments" data={mockContributors} metricKey="totalComments" unit="comments" />
          <LeaderboardSection title="Highest Average Likes per Post" data={mockContributors} metricKey="avgLikes" unit="avg likes" />
        </div>
      </div>
    </div>
  );
}