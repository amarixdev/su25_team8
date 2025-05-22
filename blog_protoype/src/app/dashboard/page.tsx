'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Dashboard from '../../components/Dashboard';
import Header from '@/components/Header';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in and is a contributor
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userType = localStorage.getItem('userType');
    
    if (!isLoggedIn || userType !== 'contributor') {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="py-8">
      <Dashboard />
    </div>
  );
} 