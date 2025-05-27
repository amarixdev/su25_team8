import React from 'react';
import Image from 'next/image';

interface ProfileImageSectionProps {
  profileImage: string;
  setProfileImage: (image: string) => void; // In a real app, this would likely trigger a file upload
}

const ProfileImageSection: React.FC<ProfileImageSectionProps> = ({ profileImage, setProfileImage }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6">
      <div className="mb-4 sm:mb-0 sm:mr-6">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
          <Image
            src={profileImage}
            alt="Profile"
            width={96}
            height={96}
            className="object-cover"
            onError={() => setProfileImage('/placeholder-avatar.png')} // Fallback to placeholder
          />
        </div>
      </div>
      <div>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            // onClick={() => {/* Trigger file input */}}
          >
            Change Photo
          </button>
          <button
            type="button"
            className="text-sm text-red-600 hover:text-red-800"
            // onClick={() => setProfileImage('/placeholder-avatar.png')}
          >
            Remove
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          JPG, GIF or PNG. 1MB max.
        </p>
      </div>
    </div>
  );
};

export default ProfileImageSection; 