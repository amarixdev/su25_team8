'use client';
import React, { useState } from 'react';
import ProfileTabs from '../../components/edit-profile/ProfileTabs';
import ProfileImageSection from '../../components/edit-profile/ProfileImageSection';
import ProfileInformationFormFields, { ProfileFormData } from '../../components/edit-profile/ProfileInformationFormFields';
import EmailNotifications from '../../components/edit-profile/EmailNotifications';
import DisplayPreferences from '../../components/edit-profile/DisplayPreferences';
import FormActions from '../../components/edit-profile/FormActions';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileImage, setProfileImage] = useState('/placeholder-avatar.png');

  const [formData, setFormData] = useState<ProfileFormData>({
    displayName: 'John Doe',
    username: 'johndoe',
    email: 'john.doe@example.com',
    bio: 'Frontend developer passionate about creating beautiful user experiences.',
    location: 'San Francisco, CA',
    website: 'https://johndoe.com',
    socialLinks: [
      { id: 1, platform: 'twitter', username: 'johndoe' },
      { id: 2, platform: 'github', username: 'johndoe' },
      { id: 3, platform: 'linkedin', username: 'john-doe' }
    ]
  });

  // State for Display Preferences
  const [theme, setTheme] = useState('system'); // Default to system or any appropriate value
  const [fontSize, setFontSize] = useState('medium'); // Default to medium

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFontSize(e.target.value);
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save the profile data
    alert('Profile updated successfully!');
  };

  const handlePreferencesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Log current preferences or send to an API
    console.log('Preferences to save:', { theme, fontSize /*, other notification states */ });
    alert('Preferences saved successfully!');
  };
  
  const handleCancel = () => {
    // Reset form data or navigate away, for example
    alert('Changes cancelled');
    // Could potentially reset formData to initial state if needed
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Profile</h1>
        
        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {activeTab === 'profile' && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <form onSubmit={handleProfileSubmit}>
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
                <ProfileImageSection profileImage={profileImage} setProfileImage={setProfileImage} />
                <ProfileInformationFormFields formData={formData} handleChange={handleChange} />
              </div>
              <FormActions onCancel={handleCancel} submitText="Save Changes" />
            </form>
          </div>
        )}
        
        {activeTab === 'preferences' && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <form onSubmit={handlePreferencesSubmit}>
              <EmailNotifications />
              <DisplayPreferences 
                theme={theme}
                onThemeChange={handleThemeChange}
                fontSize={fontSize}
                onFontSizeChange={handleFontSizeChange}
              />
              <FormActions submitText="Save Preferences" />
            </form>
          </div>
        )}
      </div>
    </div>
  );
} 