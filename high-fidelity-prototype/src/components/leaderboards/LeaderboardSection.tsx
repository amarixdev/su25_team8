import React from 'react';
import Link from 'next/link';

// Helper function to get initials from display name
const getInitials = (displayName: string): string => {
  return displayName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Assuming Contributor type will be imported from page.tsx or a shared types file
// For now, let's define it here or expect it to be passed if not globally available
export interface Contributor {
  id: number;
  display_name: string;
  username: string;
  profile_picture_path: string;
  totalViews: number;
  totalLikes: number;
  totalPosts: number;
  totalComments?: number | undefined; // This might be calculated or from a different table
  avgLikes: number; // Computed field
}

interface LeaderboardSectionProps {
  title: string;
  data: Contributor[];
  metricKey: keyof Pick<Contributor, 'totalViews' | 'totalLikes' | 'totalComments' | 'totalPosts' | 'avgLikes'>;
  unit?: string;
}

const LeaderboardSection: React.FC<LeaderboardSectionProps> = ({ title, data, metricKey, unit = '' }) => {
  const sortedData = [...data].sort((a, b) => Number(b[metricKey]) - Number(a[metricKey])).slice(0, 5); // Top 5

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      <ul className="space-y-3">
        {sortedData.map((contributor, index) => (
          <li key={contributor.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
            <div className="flex items-center">
              <span className="text-lg font-medium text-gray-600 mr-3">{index + 1}.</span>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                {getInitials(contributor.display_name)}
              </div>
              <div>
                <Link href={`/profile/${contributor.username}`} className="text-indigo-600 hover:text-indigo-800 font-medium">
                  {contributor.display_name}
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

export default LeaderboardSection; 