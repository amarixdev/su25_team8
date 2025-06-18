import React from 'react';

interface FormActionsProps {
  onCancel?: () => void; // Make cancel optional
  cancelText?: string;
  submitText?: string;
  disabled?: boolean; // Add disabled prop
  // onSubmit is implicitly handled by the form's onSubmit in the parent
}

const FormActions: React.FC<FormActionsProps> = ({ 
  onCancel, 
  cancelText = 'Cancel', 
  submitText = 'Save Changes',
  disabled = false
}) => {
  return (
    <div className="px-6 py-4 bg-gray-50 flex justify-end">
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          disabled={disabled}
          className={`cursor-pointer px-4 py-2 border border-gray-300 rounded-md text-sm font-medium mr-3 ${
            disabled 
              ? 'text-gray-400 bg-gray-100 cursor-not-allowed' 
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          {cancelText}
        </button>
      )}
      <button
        type="submit" // This button will trigger the form submission
        disabled={disabled}
        className={`cursor-pointer px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          disabled
            ? 'text-white bg-gray-400 cursor-not-allowed'
            : 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
        }`}
      >
        {submitText}
      </button>
    </div>
  );
};

export default FormActions; 