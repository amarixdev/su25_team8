'use client';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { FollowProvider } from '../contexts/FollowContext';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';
  const isSignupPage = pathname === '/signup';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <FollowProvider>
      <div className="relative min-h-screen md:flex">
        {!isLoginPage && !isSignupPage && <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />}

        <div className="flex-1 flex flex-col">
          <Header />
          
          {!isLoginPage && !isSignupPage && (
            <button 
              className="md:hidden fixed top-4 left-4 z-50 p-2 text-gray-600 hover:text-gray-800 bg-white rounded-md shadow-md"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
              )}
            </button>
          )}

          <main className={`pt-16 flex-1 ${!isLoginPage && !isSignupPage ? 'md:ml-64' : ''}`}>
            {children}
          </main>
        </div>

        {isMobileMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black opacity-50 z-30"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        )}
      </div>
    </FollowProvider>
  );
};

export default ClientLayout; 