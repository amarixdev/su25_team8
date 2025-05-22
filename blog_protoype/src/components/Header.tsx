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

  return (
    <header className="w-full fixed top-0 left-0 right-0 bg-white shadow-sm h-16 flex items-center justify-end px-4 sm:px-6 lg:px-8">
      <nav className="flex space-x-8 items-center">
        <Link 
          href="/leaderboards" 
          className="cursor-pointer text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
        >
          Leaderboards
        </Link>
        {userType === 'contributor' && (
          <Link 
            href="/dashboard" 
            className="cursor-pointer text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
          >
            Dashboard
          </Link>
        )}
        {userType && (
          <button
            onClick={handleLogout}
            className="cursor-pointer text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
          >
            Log Out
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header; 