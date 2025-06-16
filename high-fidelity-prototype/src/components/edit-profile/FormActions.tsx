import React from 'react';

interface FormActionsProps {
  onCancel?: () => void; // Make cancel optional
  cancelText?: string;
  submitText?: string;
  // onSubmit is implicitly handled by the form's onSubmit in the parent
}

const FormActions: React.FC<FormActionsProps> = ({ 
  onCancel, 
  cancelText = 'Cancel', 
  submitText = 'Save Changes' 
}) => {
  return (
    <div className="px-6 py-4 bg-gray-50 flex justify-end">
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 mr-3"
        >
          {cancelText}
        </button>
      )}
      <button
        type="submit" // This button will trigger the form submission
        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {submitText}
      </button>
    </div>
  );
};

export default FormActions; 