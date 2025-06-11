'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Login from '../../components/login/Login';
// import Header from '@/components/Header'; // Assuming Header might be used later

export default function LoginPage() {
  const [showDevMenu, setShowDevMenu] = useState(false);
  const router = useRouter();

  const handleDevLogin = (userType: 'admin' | 'contributor') => {
    // Set developer login state
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userType', userType);
    localStorage.setItem('userData', JSON.stringify({
      id: userType === 'admin' ? 999 : 998,
      username: `dev_${userType}`,
      displayName: `Developer ${userType.charAt(0).toUpperCase() + userType.slice(1)}`,
      email: `dev.${userType}@spartanparadigm.com`,
      role: userType.toUpperCase()
    }));
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('userTypeChanged'));
    
    // Navigate to home page
    router.push('/');
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