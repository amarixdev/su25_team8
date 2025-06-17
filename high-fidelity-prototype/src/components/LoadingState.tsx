import React from 'react';

interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  showBrand?: boolean;
  className?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = "Loading...", 
  size = 'md',
  showBrand = true,
  className = ""
}) => {
  const sizeConfig = {
    sm: {
      container: 'min-h-[30vh]',
      logo: 'w-12 h-12',
      logoImage: 'w-6 h-6',
      brandText: 'text-base',
      messageText: 'text-xs',
      progressBar: 'w-48 h-0.5'
    },
    md: {
      container: 'min-h-[60vh]',
      logo: 'w-20 h-20',
      logoImage: 'w-12 h-12',
      brandText: 'text-lg',
      messageText: 'text-sm',
      progressBar: 'w-64 h-1'
    },
    lg: {
      container: 'min-h-[80vh]',
      logo: 'w-28 h-28',
      logoImage: 'w-16 h-16',
      brandText: 'text-xl',
      messageText: 'text-base',
      progressBar: 'w-80 h-1.5'
    }
  };

  const config = sizeConfig[size];

  return (
    <div className={`flex flex-col items-center justify-center ${config.container} ${className}`}>
      {/* Brand Logo with Animation */}
      <div className="relative mb-8">
        <div className="absolute inset-0 animate-ping rounded-full bg-blue-100 opacity-30"></div>
        <div className={`relative ${config.logo} bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center shadow-lg border-2 border-blue-200`}>
          <img 
            src="/placeholder-avatar.png" 
            alt="SpartanParadigm" 
            className={`${config.logoImage} object-contain`}
          />
        </div>
      </div>
      
      {/* Loading Animation */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
      
      {/* Loading Text */}
      <div className="text-center">
        {showBrand && (
          <h3 className={`font-semibold text-gray-800 mb-2 ${config.brandText}`}>
            <span className="text-blue">Spartan</span><span className="text-gold">Paradigm</span>
          </h3>
        )}
        <p className={`text-gray-600 ${config.messageText}`}>{message}</p>
      </div>
      
      {/* Progress Bar */}
      <div className={`bg-gray-200 rounded-full mt-6 overflow-hidden ${config.progressBar}`}>
        <div className="bg-gradient-to-r from-blue-500 to-gold-500 h-full rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoadingState; 