'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const Header = () => {
  const [userType, setUserType] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Function to update user type from localStorage
    const updateUserType = () => {
      const storedUserType = localStorage.getItem('userType');
      setUserType(storedUserType);
    };

    // Initial check
    updateUserType();

    // Listen for storage events (when localStorage changes in other tabs)
    window.addEventListener('storage', updateUserType);

    // Create a custom event listener for login/logout within the same tab
    window.addEventListener('userTypeChanged', updateUserType);

    // Check on route change
    updateUserType();

    return () => {
      window.removeEventListener('storage', updateUserType);
      window.removeEventListener('userTypeChanged', updateUserType);
    };
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('userTypeChanged'));
    
    router.push('/login');
  };

  if (pathname === '/login' || pathname === '/signup') {
    return null;
  }

  return (
    <header className={`w-full fixed top-0 left-0 right-0 ${userType == 'admin' ? 'bg-gray-800' : 'bg-white'} shadow-sm h-16 flex items-center justify-end px-4 sm:px-6 lg:px-8`}>
      <nav className={`flex ccc space-x-8 items-center ${userType == 'admin' ? 'text-white' : 'text-gray-700'}`}>
        <Link 
          href="/leaderboards" 
          className={`cursor-pointer hover:text-indigo-600 px-3 py-2 text-sm font-medium`}
        >
          Leaderboards
        </Link>
        {userType === 'contributor' && (
          <Link 
            href="/dashboard" 
            className="cursor-pointer  hover:text-indigo-600 px-3 py-2 text-sm font-medium"
          >
            Dashboard
          </Link>
        )}
        {userType === 'admin' && (
          <Link 
            href="/admin" 
            className="cursor-pointer  hover:text-indigo-600 px-3 py-2 text-sm font-medium"
          >
            Admin Dashboard
          </Link>
        )}
        {!userType && (
          <>
            <Link 
              href="/login" 
              className="cursor-pointer hover:text-indigo-600 px-3 py-2 text-sm font-medium"
            >
              Login
            </Link>
            <Link 
              href="/signup" 
              className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-sm font-medium rounded-lg transition-colors"
            >
              Sign Up
            </Link>
          </>
        )}
        {userType && (
          <button
            onClick={handleLogout}
            className={`cursor-pointer ${userType == 'admin' ? 'text-white' : 'text-gray-700'} hover:text-indigo-600 px-3 py-2 text-sm font-medium`}
          >
            Log Out
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header; 