'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Define proper type for contributor data
interface Contributor {
  id: number;
  name: string;
  username: string;
  avatar: string;
  postsPublished: number;
  totalLikes: number;
  totalComments: number;
  avgLikes: number;
}

// Mock Data (replace with actual data fetching)
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

const contributorOfTheMonth = mockContributors[7]; // Hannah Montana

const LeaderboardSection = ({ title, data, metricKey, unit = '' }: { 
  title: string, 
  data: Contributor[], 
  metricKey: keyof Pick<Contributor, 'postsPublished' | 'totalLikes' | 'totalComments' | 'avgLikes'>, 
  unit?: string 
}) => {
  const sortedData = [...data].sort((a, b) => Number(b[metricKey]) - Number(a[metricKey])).slice(0, 5); // Top 5

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      <ul className="space-y-3">
        {sortedData.map((contributor, index) => (
          <li key={contributor.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
            <div className="flex items-center">
              <span className="text-lg font-medium text-gray-600 mr-3">{index + 1}.</span>
              <Image 
                src={contributor.avatar} 
                alt={contributor.name} 
                width={40}
                height={40}
                className="rounded-full mr-3" 
              />
              <div>
                <Link href={`/profile/${contributor.username}`} className="text-indigo-600 hover:text-indigo-800 font-medium">
                  {contributor.name}
                </Link>
                <p className="text-sm text-gray-500">@{contributor.username}</p>
              </div>
            </div>
            <span className="text-lg font-semibold text-gray-700">
              {contributor[metricKey]} {unit}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function LeaderboardsPage() {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900">Leaderboards</h1>
            <p className="mt-2 text-lg text-gray-600">See who&apos;s making the biggest impact in our community.</p>
        </div>

        {/* Contributor of the Month */}
        <div className="mb-10 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-xl rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-2 text-center">Contributor of the Month</h2>
          {contributorOfTheMonth && (
            <div className="flex flex-col items-center">
              <Image 
                src={contributorOfTheMonth.avatar} 
                alt={contributorOfTheMonth.name} 
                width={96}
                height={96}
                className="rounded-full mb-4 border-4 border-white shadow-lg"
              />
              <Link href={`/profile/${contributorOfTheMonth.username}`} className="text-2xl font-semibold hover:underline">
                {contributorOfTheMonth.name}
              </Link>
              <p className="text-indigo-200">@{contributorOfTheMonth.username}</p>
              <p className="mt-3 text-center text-indigo-100 max-w-md">
                Highlighting exceptional performance and engagement. Keep up the great work!
              </p>
            </div>
          )}
        </div>

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