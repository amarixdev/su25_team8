import React from 'react';

interface Requirement {
  name: string;
  value: number;
  required: number;
  unit: string;
  met: boolean;
}

interface RequirementsCardProps {
  requirements: Requirement[];
}

const RequirementsCard: React.FC<RequirementsCardProps> = ({ requirements }) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Contributor Requirements</h2>
        <p className="text-gray-600 mb-6">
          To become a contributor, your account needs to meet the following requirements:
        </p>
        
        <div className="space-y-4">
          {requirements.map((req, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`flex-shrink-0 h-5 w-5 rounded-full ${req.met ? 'bg-green-100' : 'bg-gray-100'} flex items-center justify-center mr-3`}>
                  {req.met && (
                    <svg className="h-3 w-3 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-gray-700">{req.name}</span>
              </div>
              <div className="text-right">
                <span className={`font-medium ${req.met ? 'text-green-600' : 'text-black'}`}>
                  {req.value} / {req.required} {req.unit}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RequirementsCard; 