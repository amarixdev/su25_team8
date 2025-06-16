import React from 'react';

// This component could take props for current notification settings
// For now, it mirrors the static structure from the original page

const EmailNotifications: React.FC = () => {
  const notifications = [
    { id: 'comments', name: 'Comments', description: 'Get notified when someone comments on your post.', defaultChecked: true },
    { id: 'mentions', name: 'Mentions', description: 'Get notified when someone mentions you in a comment.', defaultChecked: true },
    { id: 'follows', name: 'Follows', description: 'Get notified when someone follows you.', defaultChecked: true },
    { id: 'newsletter', name: 'Newsletter', description: 'Receive our weekly newsletter.', defaultChecked: false },
  ];

  return (
    <div className="p-6 border-b border-gray-200">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h2>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id={notification.id}
                name={notification.id}
                type="checkbox"
                defaultChecked={notification.defaultChecked}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor={notification.id} className="font-medium text-gray-700">
                {notification.name}
              </label>
              <p className="text-gray-500">{notification.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailNotifications; 