import React from 'react';

// This component could take props for current display preferences
// and handlers to update them.
// For now, it mirrors the static structure.

interface DisplayPreferencesProps {
  theme: string;
  onThemeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  fontSize: string;
  onFontSizeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DisplayPreferences: React.FC<DisplayPreferencesProps> = ({
  theme,
  onThemeChange,
  fontSize,
  onFontSizeChange,
}) => {
  return (
    <div className="p-6 border-b border-gray-200">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Display Preferences</h2>
      <div className="space-y-6">
        <div>
          <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
            Theme
          </label>
          <select
            id="theme"
            name="theme"
            value={theme}
            onChange={onThemeChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="fontSize" className="block text-sm font-medium text-gray-700">
            Font Size
          </label>
          <select
            id="fontSize"
            name="fontSize"
            value={fontSize}
            onChange={onFontSizeChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DisplayPreferences; 