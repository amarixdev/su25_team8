'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Login from '../../components/login/Login';
// import Header from '@/components/Header'; // Assuming Header might be used later

export default function LoginPage() {
  const [showDevMenu, setShowDevMenu] = useState(false);
  const router = useRouter();

  const handleDevLogin = async (userType: 'admin' | 'contributor') => {
    // Set developer login state
    try {
const response = await fetch('http://localhost:8080/api/contributors', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: `dev_${userType}`,
    displayName: `Developer ${userType.charAt(0).toUpperCase() + userType.slice(1)}`,
    email: `dev.${userType}@spartanparadigm.com`,
    bio: 'This is a developer account',
    location: 'Greensboro, NC',
    website: 'https://spartanparadigm.com',
    profilePicturePath: null,
    accountAge: 0,
    postsReads: 0,
    canUpgradeAccount: false
  })
});
      
      if (response.status === 409) {
      const data = await response.json();
    console.log('Response:', data);
    console.log("Duplicate key error");
    localStorage.setItem('userData', JSON.stringify(data));
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userType', userType);
    window.dispatchEvent(new Event('userTypeChanged'));
    // Navigate to home page
    router.push('/');
    // Show user-friendly message here
  } else if (!response.ok) {
  throw new Error('Failed to create developer account');
  } else {
    console.log("Developer account created!");
    const data = await response.json();
    localStorage.setItem('userData', JSON.stringify(data));
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userType', userType);
    window.dispatchEvent(new Event('userTypeChanged'));
    // Navigate to home page
    router.push('/');
  }
    } catch (error) {
      console.error('Error creating developer account:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4 relative">
      {/* Developer Menu - Top Left */}
      <div className="absolute top-4 left-4">
        <div className="relative">
          <button
            onClick={() => setShowDevMenu(!showDevMenu)}
            className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-xs font-medium shadow-md transition-colors"
            title="Developer Quick Login"
          >
            DEV
          </button>
          
          {showDevMenu && (
            <div className="absolute top-10 left-0 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[180px] z-50">
              <div className="px-3 py-1 text-xs font-medium text-gray-500 border-b border-gray-100">
                🚀 Developer Quick Login
              </div>
              <button
                onClick={() => handleDevLogin('admin')}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-red-50 transition-colors"
              >
                🔧 Log in as Admin
              </button>
              <button
                onClick={() => handleDevLogin('contributor')}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
              >
                ✏️ Log in as Contributor
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome to <span className="text-blue-600">SpartanParadigm</span>
          </h1>
          <p className="mt-3 text-gray-600 text-lg">
            Sign in to access your account.
          </p>
        </div>
        <Login />
      </div>
      <footer className="mt-12 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} SpartanParadigm. All rights reserved.</p>
        <p className="mt-1">
          <a href="/terms" className="hover:text-blue-600">Terms of Service</a> | <a href="/privacy" className="hover:text-blue-600">Privacy Policy</a>
        </p>
      </footer>
    </div>
  );
} 