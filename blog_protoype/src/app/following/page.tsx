'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FollowingPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to followers page with following tab active
    router.push('/followers?tab=following');
  }, [router]);
  
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-gray-500">Redirecting to following...</p>
      </div>
    </div>
  );
} 