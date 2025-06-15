import React from 'react';

interface UpgradeButtonProps {
  onUpgrade: () => void;
  allRequirementsMet: boolean;
  isSubmitting: boolean;
}

const UpgradeButton: React.FC<UpgradeButtonProps> = ({ onUpgrade, allRequirementsMet, isSubmitting }) => {
  return (
    <>
      <div className="flex justify-center">
        <button
          onClick={onUpgrade}
          disabled={!allRequirementsMet || isSubmitting}
          className={`px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white 
            ${allRequirementsMet 
              ? 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' 
              : 'bg-gray-300 cursor-not-allowed'}`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Upgrading...
            </>
          ) : (
            "Upgrade to Contributor"
          )}
        </button>
      </div>
      
      {!allRequirementsMet && (
        <p className="text-sm text-center text-gray-500 mt-4">
          You need to meet all requirements before you can upgrade.
        </p>
      )}
    </>
  );
};

export default UpgradeButton; 