'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();


  // Code to conditionally render dashboard based on login status - AD
  useEffect(() => {
    // Check if user is logged in and is a contributor 
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userType = localStorage.getItem('userType');
    
    if (!isLoggedIn || userType !== 'contributor') {
      router.push('/login');
    }
  }, [router]);


  //TODO - CG
  return (
    <div className="py-8">
      {/* <Dashboard /> */}
    </div>
  );
} 