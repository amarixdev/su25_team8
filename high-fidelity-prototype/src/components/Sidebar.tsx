'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useFollow } from '../contexts/FollowContext';

interface SidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen }: SidebarProps) => {
  const pathname = usePathname();
  const [userType, setUserType] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const { followingCount, followersCount } = useFollow();
  
  // Debug logging
  console.log('Sidebar - followingCount from context:', followingCount);
  console.log('Sidebar - followersCount from context:', followersCount);

  // Helper function to check if a link is active
  const isActiveLink = (linkPath: string) => {
    if (linkPath === '/') {
      return pathname === '/';
    }
    if (linkPath === '/followers') {
      return pathname.startsWith('/followers');
    }
    if (linkPath === '/find') {
      return pathname.startsWith('/followers') && window.location.search.includes('tab=find');
    }
    return pathname.startsWith(linkPath);
  };

  useEffect(() => {
    console.log('userData changed:', userData); 
  }, [userData]);
  
  useEffect(() => {
    // Function to update user type from localStorage
    const updateUserType = () => {
      const storedUserType = localStorage.getItem('userType');
      const storedUserData = localStorage.getItem('userData');
      console.log('storedUserType', storedUserType);
      console.log('storedUserData', storedUserData);
      setUserType(storedUserType);
      setUserData(storedUserData ? JSON.parse(storedUserData) : null);
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


  
  // Don't render sidebar on login page
  if (pathname === '/login' || pathname === '/signup') {
    return null;
  }

  return (
    <aside 
      className={`z-[100] w-64 ${userType == 'admin' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}  p-4 space-y-6 shadow-lg fixed top-0 left-0 h-screen z-40 transform transition-transform duration-300 ease-in-out 
                 md:translate-x-0 md:fixed 
                 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="flex justify-between items-center mb-4">
        <Link href="/" className="text-xl font-bold hover:opacity-80 transition-opacity cursor-pointer">
          <span className="text-blue">Spartan</span><span className="text-gold">Paradigm</span>
        </Link>
        <button 
          className="md:hidden text-gray-600 hover:text-gray-800"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
  
      <div className={`${userType == 'admin' && 'bg-red-500 p-2 rounded-lg'}`}>
        {userData ? (
          <Link 
            href={`/profile/${userData.username}`}
            className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {/* Profile Image */}
            <div className="flex-shrink-0">
              {userData.profilePicturePath ? (
                <img
                  src={userData.profilePicturePath}
                  alt={userData.displayName}
                  className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              {!userData.profilePicturePath && (
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {userData.displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                </div>
              )}
            </div>
            
            {/* User Info */}
            <div className="flex-1 min-w-0">
              <p className={`${userType =='admin' && 'text-white'} text-sm font-semibold text-black truncate`}>
                {userData.displayName}
              </p>
              <p className={`${userType == 'admin' && 'text-white/70'} text-xs text-gray-500 truncate`}>
                @{userData.username}
              </p>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                userType === 'admin' ? 'bg-red-600 text-white' :
                userType === 'contributor' ? 'bg-blue-100 text-blue-800' : 
                'bg-blue-100 text-blue-800'
              }`}>
                {userType === 'admin' ? 'Admin' : userType === 'contributor' ? 'Contributor' : 'Visitor'}
              </span>
            </div>
          </Link>
        ) : (
          userType != 'admin' ? (
            <p className="text-sm text-gray-500">
              {userType === "contributor" ? "Contributor" : userType === "visitor" ? "Visitor" : ""}
            </p>
          ) : (
            <p className="text-white max-w-[80px] rounded-2xl px-2 text-center bg-red-600">Admin</p>
          )
        )}
      </div>

  
      <nav className={`space-y-2 ${userType == 'admin' ? 'text-white' : 'text-gray-700'} mt-6`}>
        <Link
          href="/"
          className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer transition-colors ${
            isActiveLink('/') 
              ? userType == 'admin' 
                ? 'bg-gray-600 text-white' 
                : 'bg-blue-100 text-blue-700 border-r-2 border-blue-500'
              : userType == 'admin' 
                ? 'hover:bg-gray-600' 
                : 'hover:bg-gray-100'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <svg
            className="h-5 w-5 "
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M3 9.5l9-7 9 7V20a1 1 0 01-1 1h-5a1 1 0 01-1-1v-6H9v6a1 1 0 01-1 1H3a1 1 0 01-1-1V9.5z"></path>
          </svg>
          <span>Home</span>
        </Link>
        <Link
          href="/search"
          className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer transition-colors ${
            isActiveLink('/search') 
              ? userType == 'admin' 
                ? 'bg-gray-600 text-white' 
                : 'bg-blue-100 text-blue-700 border-r-2 border-blue-500'
              : userType == 'admin' 
                ? 'hover:bg-gray-600' 
                : 'hover:bg-gray-100'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <span>Search & Filter</span>
        </Link>

        <Link
          href="/bookmarks"
          className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer transition-colors ${
            isActiveLink('/bookmarks') 
              ? userType == 'admin' 
                ? 'bg-gray-600 text-white' 
                : 'bg-blue-100 text-blue-700 border-r-2 border-blue-500'
              : userType == 'admin' 
                ? 'hover:bg-gray-600' 
                : 'hover:bg-gray-100'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
          </svg>
          <span>Bookmarks</span>
        </Link>

      { userType != 'admin'  &&  <Link
          href="/profile"
          className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer transition-colors ${
            isActiveLink('/profile') 
              ? userType == 'admin' 
                ? 'bg-gray-600 text-white' 
                : 'bg-blue-100 text-blue-700 border-r-2 border-blue-500'
              : userType == 'admin' 
                ? 'hover:bg-gray-600' 
                : 'hover:bg-gray-100'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <svg
            className="h-5 w-5 text-gray-600"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <span>Edit Profile</span>
        </Link>}

       
          {userType != 'admin' && <div className="mt-6 pt-6 border-t">
            <div className="px-2 mb-3">
              <div className="flex items-center">
                <span className="text-sm font-bold text-blue-600">Community</span>
              </div>
            </div>

            <Link
              href="/following"
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="none">
<path d="M8.5 8.5C8.5 6.56625 10.0662 5 12 5C13.9338 5 15.5 6.56625 15.5 8.5C15.5 10.4338 13.9338 12 12 12C10.0662 12 8.5 10.4338 8.5 8.5Z" fill="#000000"/>
<path d="M12 13.75C9.66375 13.75 5 14.9225 5 17.25V19H19V17.25C19 14.9225 14.3363 13.75 12 13.75Z" fill="#000000"/>
<path d="M21.4025 8.58002L21.99 9.17168L18.6567 12.505L16.99 10.8425L17.5817 10.255L18.6567 11.3259L21.4025 8.58002Z" fill="#000000"/>
</svg>
              <div className="flex justify-between items-center flex-1">
                <span>Following</span>
                <span className={`${(followingCount === null && !userData?.followingCount) && 'animate-pulse'} text-sm font-medium text-blue-600`}>{
                  followingCount ?? userData?.followingCount ?? '...'
                }</span>
              </div>
            </Link>
            <Link
              href={userType === "contributor" ? "/followers" : "/upgrade"}
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
              onClick={() => setIsMobileMenuOpen(false)}
            >
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="none">
<path d="M8.5 8.5C8.5 6.56625 10.0662 5 12 5C13.9338 5 15.5 6.56625 15.5 8.5C15.5 10.4338 13.9338 12 12 12C10.0662 12 8.5 10.4338 8.5 8.5Z" fill="#000000"/>
<path d="M12 13.75C9.66375 13.75 5 14.9225 5 17.25V19H19V17.25C19 14.9225 14.3363 13.75 12 13.75Z" fill="#000000"/>
<path d="M21.4025 8.58002L21.99 9.17168L18.6567 12.505L16.99 10.8425L17.5817 10.255L18.6567 11.3259L21.4025 8.58002Z" fill="#000000"/>
</svg>
              <div className="flex justify-between items-center flex-1">
                <span>Followers</span>
                {userType === "contributor" ? <span className={`${(followersCount === null && !userData?.followersCount) && 'animate-pulse'} text-sm font-medium text-blue-600`}>{
                  followersCount ?? userData?.followersCount ?? '...'
                }</span> : 
                <button className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-xs font-medium rounded hover:from-blue-600 hover:to-blue-700 transition-colors">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-3 w-3" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span>Upgrade</span>
                </button>}
              </div>
          </Link>
          <Link
              href={"/find"}
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
              onClick={() => setIsMobileMenuOpen(false)}
            >
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960"><path d="M440-480q-66 0-113-47t-47-113 47-113 113-47 113 47 47 113-47 113-113 47m0-80q33 0 56.5-23.5T520-640t-23.5-56.5T440-720t-56.5 23.5T360-640t23.5 56.5T440-560M884-20 756-148q-21 12-45 20t-51 8q-75 0-127.5-52.5T480-300t52.5-127.5T660-480t127.5 52.5T840-300q0 27-8 51t-20 45L940-76zM660-200q42 0 71-29t29-71-29-71-71-29-71 29-29 71 29 71 71 29m-540 40v-111q0-34 17-63t47-44q51-26 115-44t142-18q-12 18-20.5 38.5T407-359q-60 5-107 20.5T221-306q-10 5-15.5 14.5T200-271v31h207q5 22 13.5 42t20.5 38zm287-80"/></svg>              <div className="flex justify-between items-center flex-1">
                <span>Find Account</span>
              </div>
            </Link>



          </div>}
     
      </nav>
    </aside>
  );
};

export default Sidebar; 