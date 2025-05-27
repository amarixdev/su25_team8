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
}

const OverviewTabContent: React.FC<OverviewTabContentProps> = ({ stats, recentPosts }) => {
  return (
    <div className="space-y-8">
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Total Posts" value={stats.totalPosts} />
        <StatsCard title="Total Views" value={stats.totalViews} />
        <StatsCard title="Total Comments" value={stats.totalComments} />
      </div>

      {/* Recent posts */}
      <RecentPostsSection recentPosts={recentPosts} />
    </div>
  );
};

export default OverviewTabContent; 