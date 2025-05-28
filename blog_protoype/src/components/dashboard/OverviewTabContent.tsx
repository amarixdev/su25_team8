import React from 'react';
import StatsCard from './StatsCard';
import RecentPostsSection from './RecentPostsSection';
import { RecentPost } from './types';

interface OverviewTabContentProps {
  stats: {
    totalPosts: number;
    totalViews: number;
    totalComments: number;
  };
  recentPosts: RecentPost[];
  onSeeAllPosts: () => void;
}

const OverviewTabContent: React.FC<OverviewTabContentProps> = ({ stats, recentPosts, onSeeAllPosts }) => {
  return (
    <div className="space-y-8">
        {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Dashboard Overview</h2>
        <p className="text-sm text-gray-500">Here’s a quick summary of your recent activity.</p>
      </div>
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Total Posts" value={stats.totalPosts} />
        <StatsCard title="Total Views" value={stats.totalViews} />
        <StatsCard title="Total Comments" value={stats.totalComments} />
      </div>

      {/* Recent posts */}
      <
        RecentPostsSection recentPosts={recentPosts} 
        onSeeAllPosts={onSeeAllPosts}
      />
    </div>
  );
};

export default OverviewTabContent; 