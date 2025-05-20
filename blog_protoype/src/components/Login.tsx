'use client';

import { useState } from 'react';
import LoginForm from './LoginForm';

const Login = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loginType, setLoginType] = useState<'visitor' | 'contributor' | null>(null);

  const handleLoginClick = (type: 'visitor' | 'contributor') => {
    setLoginType(type);
    setShowLoginForm(true);
  };

  const handleBackClick = () => {
    setShowLoginForm(false);
    setLoginType(null);
  };

  return (
    <div className="flex-grow flex items-center justify-center p-8">
      {!showLoginForm ? (
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-3xl font-bold">Welcome to _____</h1>
          
          <div className="flex gap-4">
            <button 
              onClick={() => handleLoginClick('visitor')}
              className="cursor-pointer w-44 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-sm hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="flex flex-col items-center">
                <span>Log in as</span>
                <span className="font-bold">Visitor</span>
              </span>
            </button>
            <button 
              onClick={() => handleLoginClick('contributor')}
              className="cursor-pointer w-44 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-sm hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="flex flex-col items-center">
                <span>Log in as</span>
                <span className="font-bold">Contributor</span>
              </span>
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md">
          <button 
            onClick={handleBackClick}
            className="cursor-pointer mb-4 text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </button>
          <LoginForm loginType={loginType} />
        </div>
      )}
    </div>
  );
};

export default Login;

