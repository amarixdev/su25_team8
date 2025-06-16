import React, { useState, useEffect } from 'react';

const DailyAdviceWidget: React.FC = () => {
  const [advice, setAdvice] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchAdvice = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://api.adviceslip.com/advice');
      const data = await response.json();
      setAdvice(data.slip.advice);
    } catch (error) {
      console.error('Failed to fetch advice:', error);
      // Fallback advice if API fails
      setAdvice('Keep pushing forward - great things are coming!');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice(); // Load advice on component mount
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          💡 Daily Inspiration
        </h3>
        <button 
          onClick={fetchAdvice}
          disabled={isLoading}
          className="text-indigo-600 hover:text-indigo-800 font-medium text-sm px-3 py-1 rounded-md hover:bg-indigo-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? '...' : '🔄 New'}
        </button>
      </div>
      <p className="text-gray-700 italic leading-relaxed text-base">
        "{advice || 'Loading inspiration...'}"
      </p>
    </div>
  );
};

export default DailyAdviceWidget; 