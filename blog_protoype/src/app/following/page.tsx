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
    null
  );
} 