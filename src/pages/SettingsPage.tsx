import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const SettingsPage: React.FC = () => {
  const { settings, updateSettings } = useAppContext();
  const [defaultRatePerLiter, setDefaultRatePerLiter] = useState(settings.defaultRatePerLiter);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateSettings({
      defaultRatePerLiter,
    });
    
    setShowSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Settings</h1>
        <p className="text-gray-600">
          Configure global application settings
        </p>
      </div>
      
      {showSuccess && (
        <div className="mb-6 p-4 bg-green-100 border border-green-200 rounded-md flex items-start">
          <div className="flex-shrink-0 mr-3">
            <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-green-700 font-medium">Settings updated successfully!</p>
            <button 
              onClick={() => setShowSuccess(false)}
              className="text-green-600 text-sm hover:underline mt-1"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Milk Collection Settings</h2>
        
        <div className="mb-6">
          <label htmlFor="defaultRatePerLiter" className="block text-sm font-medium text-gray-700 mb-1">
            Default Rate Per Liter
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">₹</span>
            </div>
            <input
              type="number"
              id="defaultRatePerLiter"
              value={defaultRatePerLiter}
              onChange={(e) => setDefaultRatePerLiter(parseFloat(e.target.value))}
              min="0"
              step="0.1"
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md py-2"
              placeholder="0.00"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">per liter</span>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            This rate will be applied to all new milk entries by default.
          </p>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save Settings
          </button>
        </div>
      </form>
      
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">About</h2>
        <p className="text-gray-600 mb-2">
          Milk Collection Manager - Version 1.0.0
        </p>
        <p className="text-gray-600">
          A simple tool to track milk collection and calculate payouts.
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;