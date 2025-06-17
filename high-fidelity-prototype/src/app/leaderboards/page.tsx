'use client';
import React, { useEffect, useState } from 'react';
// Removed Link and Image imports as they are now in child components
import LeaderboardSection, { Contributor } from '../../components/leaderboards/LeaderboardSection';
import ContributorOfTheMonth from '../../components/leaderboards/ContributorOfTheMonth';

// Type for API response (actual structure from your API)
interface ApiContributor {
  id: number;
  displayName: string;
  username: string;
  email: string;
  profilePicturePath: string | null;
  bio: string;
  location: string;
  website: string;
  role: string;
  followersCount: number;
  followingCount: number;
  totalViews: number;
  totalLikes: number;
  totalPosts: number;
  posts: any[];
}

export default function LeaderboardsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [topContributor, setTopContributor] = useState<Contributor | undefined>(undefined);
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [leaderboardData, setLeaderboardData] = useState<{
    total_views: Contributor[],
    total_posts: Contributor[],
    avgLikes: Contributor[],
    total_likes: Contributor[],
  }>({
    total_views: [],
    total_posts: [],
    avgLikes: [],
    total_likes: [],
  });

  // Helper function to calculate average likes per post
  const getAverageLikes = (contributor: Contributor) => {
    // Use total_posts if available, otherwise fall back to a reasonable default
    const posts = contributor.totalPosts || 1;
    const averageLikes = contributor.totalLikes / posts;
    return Math.round(averageLikes * 100) / 100;
  };

  // Helper that takes an array of contributors and returns the one
  // with the best (lowest) average rank across four metrics
  const computeTopContributor = (data: Contributor[]): Contributor | undefined => {
    if (data.length === 0) return undefined;

    // 1) for each metric, get a sorted array
    const byViews = [...data].sort((a, b) => b.totalViews - a.totalViews); 
    const byComments = [...data].sort((a, b) => (b.totalComments || 0) - (a.totalComments || 0));
    const byAvgLikes = [...data].sort((a, b) => getAverageLikes(b) - getAverageLikes(a));
    const byTotalLikes = [...data].sort((a, b) => b.totalLikes - a.totalLikes);

    // 2) build a map of id → [rankInViews, rankInComments, rankInAvgLikes, rankInTotalLikes]
    const rankMap: Record<string, number[]> = {};
    const assignRanks = (arr: Contributor[], idx: number) => {
      arr.forEach((c, i) => {
        if (!rankMap[c.id]) rankMap[c.id] = [];
        rankMap[c.id][idx] = i + 1;
      });
    };
    assignRanks(byViews, 0);
    assignRanks(byComments, 1);
    assignRanks(byAvgLikes, 2);
    assignRanks(byTotalLikes, 3);

    // 3) compute average rank for each contributor
    const withAvg = data.map(c => {
      const ranks = rankMap[c.id];
      const sum = ranks.reduce((s, r) => s + r, 0);
      return { contributor: c, avgRank: sum / ranks.length };
    });

    // 4) pick the one with the lowest avgRank
    return withAvg.reduce((best, cur) => 
      cur.avgRank < best.avgRank ? cur : best
    ).contributor;
  };

  useEffect(() => {
    const fetchContributors = async () => { 
      try {
        setIsLoading(true);
        const res = await fetch('http://localhost:8080/api/contributors');
     
        if (!res.ok) {
          throw new Error('Failed to fetch contributors');
        }
        
        const data: ApiContributor[] = await res.json();

        console.log('Fetched contributors:', data);
        
        // Transform data to match our Contributor interface
        const transformedData: Contributor[] = data.map(contributor => {
          const transformedContributor: Contributor = {
            id: contributor.id,
            display_name: contributor.displayName, // API returns camelCase displayName
            username: contributor.username,
            profile_picture_path: contributor.profilePicturePath || '', // API returns camelCase profilePicturePath
            totalViews: contributor.totalViews, // Already camelCase
            totalLikes: contributor.totalLikes, // Already camelCase  
            totalPosts: contributor.totalPosts, // Already camelCase
            totalComments: contributor.posts?.length || 0, // Use posts array length as comment count fallback
            avgLikes: 0 // Will be calculated below
          };
          
          // Calculate avgLikes using the transformed data
          transformedContributor.avgLikes = getAverageLikes(transformedContributor);
          
          return transformedContributor;
        });
        
        setContributors(transformedData);
        console.log('transformedData', transformedData)

        setLeaderboardData({
          total_views: [...transformedData].sort((a, b) => b.totalViews - a.totalViews).slice(0, 5),
          total_posts: [...transformedData].sort((a, b) => b.totalPosts - a.totalPosts).slice(0, 5),
          avgLikes: [...transformedData].sort((a, b) => b.avgLikes - a.avgLikes).slice(0, 5),
          total_likes: [...transformedData].sort((a, b) => b.totalLikes - a.totalLikes).slice(0, 5),
        });

        // compute and set the top contributor immediately
        console.log('computeTopContributor', computeTopContributor(transformedData))
        setTopContributor(computeTopContributor(transformedData));
      } catch (error) {
        console.error('Error fetching contributors:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContributors();
  }, []);

  if (isLoading) {
    return (
      <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900">Leaderboards</h1>
            <p className="mt-2 text-lg text-gray-600">See who&apos;s making the biggest impact in our community.</p>
          </div>
          
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-4 text-lg text-gray-600">Loading leaderboards...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900">Leaderboards</h1>
            <p className="mt-2 text-lg text-gray-600">See who&apos;s making the biggest impact in our community.</p>
        </div>

        <ContributorOfTheMonth contributor={topContributor} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <LeaderboardSection 
            title="Highest View Count" 
            data={leaderboardData.total_views} 
            metricKey="totalViews" 
            unit="views" 
          />
          <LeaderboardSection 
            title="Total Approved Posts" 
            data={leaderboardData.total_posts} 
            metricKey="totalPosts" 
            unit="posts" 
          />
          <LeaderboardSection 
            title="Average Likes per Post" 
            data={leaderboardData.avgLikes} 
            metricKey="avgLikes" 
            unit="avg likes" 
          />
          <LeaderboardSection 
            title="Total Likes" 
            data={leaderboardData.total_likes} 
            metricKey="totalLikes" 
            unit="likes" 
          />
        </div>
      </div>
    </div>
  );
}