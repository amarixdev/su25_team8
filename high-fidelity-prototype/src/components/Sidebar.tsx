'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface SidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen }: SidebarProps) => {
  const pathname = usePathname();
  const [userType, setUserType] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  
  useEffect(() => {
    // Function to update user type from localStorage
    const updateUserType = () => {
      const storedUserType = localStorage.getItem('userType');
      const storedUserData = localStorage.getItem('userData');
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
        <Link href="/" className="text-xl font-bold hover:text-indigo-600">
          SpartanParadigm
        </Link>
        <button 
          className="md:hidden text-gray-600 hover:text-gray-800"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
  
      <div className={`${userType == 'admin' && 'bg-red-500 p-2 rounded-lg'}`}>
      {userData ? <p className={`${userType =='admin' && 'text-white'} text-sm font-semibold text-black`}> {`${userData.displayName} (${userType})`}</p> :
        userType != 'admin' ? <p className="text-sm text-gray-500"> { userType === "contributor" ? "Contributor" : userType === "visitor" ? "Visitor" : ""}</p> : <p className=" text-white max-w-[80px] rounded-2xl px-2 text-center bg-red-600">Admin</p>
      }
      {userData && <p className={`${userType == 'admin' && 'text-white/70'} text-sm text-gray-500`}> {`@${userData.username}`}</p>}
        </div>

  
      <nav className={`space-y-2 ${userType == 'admin' ? 'text-white' : 'text-gray-700'} mt-6`}>
        <Link
          href="/"
          className={`${userType == 'admin' ? "hover:bg-gray-600" : "hover:bg-gray-100"} flex items-center space-x-3 p-2 rounded-md  cursor-pointer`}
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
          className={`flex items-center space-x-3 p-2 rounded-md ${userType == 'admin' ? "hover:bg-gray-600" : "hover:bg-gray-100"}  cursor-pointer`}
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
          className={`flex items-center space-x-3 p-2 rounded-md ${userType == 'admin' ? "hover:bg-gray-600" : "hover:bg-gray-100"} cursor-pointer`}
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
          className={`flex items-center space-x-3 p-2 rounded-md ${userType == 'admin' ? "hover:bg-gray-600" : "hover:bg-gray-100"} cursor-pointer`}
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
                <span className="text-sm font-bold text-indigo-600">Community</span>
              </div>
            </div>

            <Link
              href="/following"
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" viewBox="0 0 24 24" fill="none">
<path d="M8.5 8.5C8.5 6.56625 10.0662 5 12 5C13.9338 5 15.5 6.56625 15.5 8.5C15.5 10.4338 13.9338 12 12 12C10.0662 12 8.5 10.4338 8.5 8.5Z" fill="#000000"/>
<path d="M12 13.75C9.66375 13.75 5 14.9225 5 17.25V19H19V17.25C19 14.9225 14.3363 13.75 12 13.75Z" fill="#000000"/>
<path d="M21.4025 8.58002L21.99 9.17168L18.6567 12.505L16.99 10.8425L17.5817 10.255L18.6567 11.3259L21.4025 8.58002Z" fill="#000000"/>
</svg>
              <div className="flex justify-between items-center flex-1">
                <span>Following</span>
                <span className="text-sm font-medium text-indigo-600">45</span>
              </div>
            </Link>
            <Link
              href={userType === "contributor" ? "/followers" : "/upgrade"}
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
              onClick={() => setIsMobileMenuOpen(false)}
            >
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" viewBox="0 0 24 24" fill="none">
<path d="M8.5 8.5C8.5 6.56625 10.0662 5 12 5C13.9338 5 15.5 6.56625 15.5 8.5C15.5 10.4338 13.9338 12 12 12C10.0662 12 8.5 10.4338 8.5 8.5Z" fill="#000000"/>
<path d="M12 13.75C9.66375 13.75 5 14.9225 5 17.25V19H19V17.25C19 14.9225 14.3363 13.75 12 13.75Z" fill="#000000"/>
<path d="M21.4025 8.58002L21.99 9.17168L18.6567 12.505L16.99 10.8425L17.5817 10.255L18.6567 11.3259L21.4025 8.58002Z" fill="#000000"/>
</svg>
              <div className="flex justify-between items-center flex-1">
                <span>Followers</span>
                {userType === "contributor" ? <span className="text-sm font-medium text-indigo-600">234</span> : 
                <button className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white text-xs font-medium rounded hover:from-indigo-600 hover:to-indigo-700 transition-colors">
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



          </div>}
     
      </nav>
    </aside>
  );
};

export default Sidebar; 