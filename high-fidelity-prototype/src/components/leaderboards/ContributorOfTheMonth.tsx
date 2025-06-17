import React, { useEffect } from 'react';
import Link from 'next/link';
import { Contributor } from './LeaderboardSection'; // Assuming Contributor type is exported from LeaderboardSection or a shared types file

// Helper function to get initials from display name



interface ContributorOfTheMonthProps {
  contributor?: Contributor; // Make contributor optional in case there isn't one
}

const ContributorOfTheMonth: React.FC<ContributorOfTheMonthProps> = ({ contributor }) => {


  
  useEffect(() => {
    console.log('contributor', contributor)
  }, [contributor])

  const getInitials = (displayName: string): string => {
    console.log( 'debug', displayName)
    return displayName
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  
  if (!contributor) {
    return (
      <div className="mb-10 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-2">Contributor of the Month</h2>
        <p className="text-blue-200">Not yet announced. Stay tuned!</p>
      </div>
    );
  }

  return (
    <div className="mb-10 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl rounded-lg p-8">
      <h2 className="text-3xl font-bold mb-2 text-center">Contributor of the Month</h2>
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4 border-4 border-white shadow-lg">
          {getInitials(contributor.display_name)}
        </div>
        <Link href={`/profile/${contributor.username}`} className="text-2xl font-semibold hover:underline">
          {contributor.display_name}
        </Link>
        <p className="text-blue-200">@{contributor.username}</p>
        <p className="mt-3 text-center text-blue-100 max-w-md">
          Highlighting exceptional performance and engagement. Keep up the great work!
        </p>
      </div>
    </div>
  );
};

export default ContributorOfTheMonth; 