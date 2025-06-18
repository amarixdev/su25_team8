'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProfileTabs from '../../components/edit-profile/ProfileTabs';
import ProfileImageSection from '../../components/edit-profile/ProfileImageSection';
import ProfileInformationFormFields, { ProfileFormData } from '../../components/edit-profile/ProfileInformationFormFields';
import EmailNotifications from '../../components/edit-profile/EmailNotifications';
import DisplayPreferences from '../../components/edit-profile/DisplayPreferences';
import FormActions from '../../components/edit-profile/FormActions';

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [profileImage, setProfileImage] = useState('/placeholder-avatar.png');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState<ProfileFormData>({
    displayName: '',
    username: '',
    email: '',
    bio: '',
    location: '',
    website: '',
    socialLinks: []
  });

  // State for Display Preferences
  const [theme, setTheme] = useState('system');
  const [fontSize, setFontSize] = useState('medium');

  // Load user data on component mount
  useEffect(() => {
    const loadUserData = () => {
      try {
        const userData = localStorage.getItem('userData');
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        
        if (!isLoggedIn || !userData) {
          router.push('/login');
          return;
        }

        const user = JSON.parse(userData);
        
        // Populate form with real user data
        setFormData({
          displayName: user.displayName || '',
          username: user.username || '',
          email: user.email || '',
          bio: user.bio || '',
          location: user.location || '',
          website: user.website || '',
          socialLinks: [] // We'll keep social links as empty for now since it's not in the backend model
        });

        // Set profile image if available
        if (user.profilePicturePath) {
          setProfileImage(user.profilePicturePath);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error loading user data:', error);
        setError('Failed to load user data');
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear any previous error or success messages when user starts typing
    if (error) setError('');
    if (successMessage) setSuccessMessage('');
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFontSize(e.target.value);
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');
    setSuccessMessage('');

    try {
      const userData = localStorage.getItem('userData');
      if (!userData) {
        throw new Error('User not logged in');
      }

      const user = JSON.parse(userData);
      const userId = user.id;
      const userRole = user.role; // Get the user's role (VISITOR or CONTRIBUTOR)

      // Prepare data for API call based on user type
      const updateData: any = {
        displayName: formData.displayName,
        username: formData.username,
        email: formData.email,
        bio: formData.bio,
        location: formData.location,
        website: formData.website,
        profilePicturePath: profileImage === '/placeholder-avatar.png' ? null : profileImage
      };

      // Add role-specific fields
      if (userRole === 'VISITOR') {
        // Add visitor-specific fields from the original user data
        updateData.accountAge = user.accountAge || 0;
        updateData.postsReads = user.postsReads || 0;
        updateData.canUpgradeAccount = user.canUpgradeAccount || false;
      }
      // For contributors, we don't need to add specific fields as they're managed by the system

      console.log('Updating user data:', updateData);
      console.log('User role:', userRole);

      // Use the appropriate endpoint based on user role
      const endpoint = userRole === 'VISITOR' 
        ? `http://localhost:8080/api/visitors/${userId}`
        : `http://localhost:8080/api/contributors/${userId}`;

      console.log('Using endpoint:', endpoint);

      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update profile: ${response.status} ${errorText}`);
      }

      const updatedUser = await response.json();
      console.log('Profile updated successfully:', updatedUser);

      // Update localStorage with new user data
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      
      // Dispatch event to notify other components
      window.dispatchEvent(new Event('userTypeChanged'));

      setSuccessMessage('Profile updated successfully!');
      
      // Auto-clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);

    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error instanceof Error ? error.message : 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreferencesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Preferences to save:', { theme, fontSize });
    
    // For now, just show a success message since preferences aren't stored in backend
    setSuccessMessage('Preferences saved successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };
  
  const handleCancel = () => {
    // Reset form data to original values from localStorage
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      setFormData({
        displayName: user.displayName || '',
        username: user.username || '',
        email: user.email || '',
        bio: user.bio || '',
        location: user.location || '',
        website: user.website || '',
        socialLinks: []
      });
      
      if (user.profilePicturePath) {
        setProfileImage(user.profilePicturePath);
      } else {
        setProfileImage('/placeholder-avatar.png');
      }
    }
    
    setError('');
    setSuccessMessage('');
  };

  if (isLoading) {
    return (
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-gray-600">Loading profile data...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Profile</h1>
        
        {/* Show error or success messages */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">{error}</div>
              </div>
            </div>
          </div>
        )}
        
        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">Success</h3>
                <div className="mt-2 text-sm text-green-700">{successMessage}</div>
              </div>
            </div>
          </div>
        )}
        
        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {activeTab === 'profile' && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <form onSubmit={handleProfileSubmit}>
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
                <ProfileImageSection profileImage={profileImage} setProfileImage={setProfileImage} />
                <ProfileInformationFormFields formData={formData} handleChange={handleChange} />
              </div>
              <FormActions 
                onCancel={handleCancel} 
                submitText={isSaving ? "Saving..." : "Save Changes"}
                disabled={isSaving}
              />
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
              <FormActions 
                submitText="Save Preferences" 
                onCancel={() => {
                  setTheme('system');
                  setFontSize('medium');
                }}
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
} 