import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Contributor } from './LeaderboardSection'; // Assuming Contributor type is exported from LeaderboardSection or a shared types file

interface ContributorOfTheMonthProps {
  contributor?: Contributor; // Make contributor optional in case there isn't one
}

const ContributorOfTheMonth: React.FC<ContributorOfTheMonthProps> = ({ contributor }) => {
  if (!contributor) {
    return (
      <div className="mb-10 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-xl rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-2">Contributor of the Month</h2>
        <p className="text-indigo-200">Not yet announced. Stay tuned!</p>
      </div>
    );
  }

  return (
    <div className="mb-10 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-xl rounded-lg p-8">
      <h2 className="text-3xl font-bold mb-2 text-center">Contributor of the Month</h2>
      <div className="flex flex-col items-center">
        <Image 
          src={contributor.avatar} 
          alt={contributor.name} 
          width={96}
          height={96}
          className="rounded-full mb-4 border-4 border-white shadow-lg"
        />
        <Link href={`/profile/${contributor.username}`} className="text-2xl font-semibold hover:underline">
          {contributor.name}
        </Link>
        <p className="text-indigo-200">@{contributor.username}</p>
        <p className="mt-3 text-center text-indigo-100 max-w-md">
          Highlighting exceptional performance and engagement. Keep up the great work!
        </p>
      </div>
    </div>
  );
};

export default ContributorOfTheMonth; 