import React from 'react';
import Link from 'next/link';

const ApplicationSubmittedCard = () => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-6 text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-lg font-medium text-gray-900 mb-2">Application Submitted!</h2>
        <p className="text-gray-600 mb-4">
          Your application to become a contributor is being reviewed. We&apos;ll notify you once it&apos;s approved.
        </p>
        <Link href="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default ApplicationSubmittedCard; 