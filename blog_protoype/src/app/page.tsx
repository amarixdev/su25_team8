'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import HomePage from "../components/HomePage";

export default function Home() {
  const router = useRouter();

  // For prototype, we'll use localStorage to simulate a login state
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gray-50">
        <HomePage />
      </main>
    </div>
  );
}
