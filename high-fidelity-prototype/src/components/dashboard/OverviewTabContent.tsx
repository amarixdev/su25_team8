import React from 'react';
import StatsCard from './StatsCard';
import RecentPostsSection from './RecentPostsSection';
import DailyAdviceWidget from './DailyAdviceWidget';
import { RecentPost } from './types';

// OverviewTabContent: Main dashboard component that displays statistics and recent posts
// Receives aggregated stats from parent component (total posts, views, likes)
// Shows recent posts and provides navigation to see all posts
// Stats are automatically updated when posts are created, edited, or deleted

interface OverviewTabContentProps {
  stats: {
    totalPosts: number;  // Total number of posts created by the user
    totalViews: number;  // Total views across all posts
    totalLikes: number;  // Total likes received on all posts
  };
  recentPosts: RecentPost[];  // Array of most recent posts to display
  onSeeAllPosts: () => void;  // Callback function to navigate to all posts view
}

const OverviewTabContent: React.FC<OverviewTabContentProps> = ({ stats, recentPosts, onSeeAllPosts }) => {
  return (
    <div className="space-y-8">
      {/* Header section with title and description */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Dashboard Overview</h2>
        <p className="text-sm text-gray-500">Here's a quick summary of your recent activity.</p>
      </div>

      {/* Stats cards section: Displays key metrics in a responsive grid */}
      {/* Grid layout: 1 column on mobile, 3 columns on medium screens and up */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Total Posts" value={stats.totalPosts} />
        <StatsCard title="Total Views" value={stats.totalViews} />
        <StatsCard title="Total Likes" value={stats.totalLikes} />
      </div>

      {/* Daily Inspiration Widget */}
      <DailyAdviceWidget />

      {/* Recent posts section: Shows latest posts with option to view all */}
      <RecentPostsSection 
        recentPosts={recentPosts} 
        onSeeAllPosts={onSeeAllPosts}
      />
    </div>
  );
};

export default OverviewTabContent; 