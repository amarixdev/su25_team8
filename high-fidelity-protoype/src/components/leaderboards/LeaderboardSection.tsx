import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Assuming Contributor type will be imported from page.tsx or a shared types file
// For now, let's define it here or expect it to be passed if not globally available
export interface Contributor {
  id: number;
  name: string;
  username: string;
  avatar: string;
  postsPublished: number;
  totalLikes: number;
  totalComments: number;
  avgLikes: number;
}

interface LeaderboardSectionProps {
  title: string;
  data: Contributor[];
  metricKey: keyof Pick<Contributor, 'postsPublished' | 'totalLikes' | 'totalComments' | 'avgLikes'>;
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

export default LeaderboardSection; 