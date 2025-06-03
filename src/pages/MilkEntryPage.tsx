import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import MilkEntryForm from '../components/MilkEntryForm';
import { MilkEntry } from '../types';
import { Droplets } from 'lucide-react';

const MilkEntryPage: React.FC = () => {
  const { addMilkEntry, collectors } = useAppContext();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleSubmit = (entry: Omit<MilkEntry, 'id'>) => {
    addMilkEntry(entry);
    setShowSuccess(true);
    
    // Reset success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };
  
  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Add Milk Entry</h1>
        <p className="text-gray-600">
          Record a new milk collection entry
        </p>
      </div>
      
      {collectors.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="mb-4 flex justify-center">
            <Droplets size={48} className="text-blue-300" />
          </div>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">No Collectors Found</h2>
          <p className="text-gray-600 mb-4">
            You need to add collectors before you can record milk entries.
          </p>
          <a
            href="/collectors"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Collectors
          </a>
        </div>
      ) : (
        <>
          {showSuccess && (
            <div className="mb-6 p-4 bg-green-100 border border-green-200 rounded-md flex items-start">
              <div className="flex-shrink-0 mr-3">
                <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-green-700 font-medium">Milk entry added successfully!</p>
                <button 
                  onClick={() => setShowSuccess(false)}
                  className="text-green-600 text-sm hover:underline mt-1"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}
          
          <MilkEntryForm onSubmit={handleSubmit} onCancel={handleCancel} />
          
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Back to Dashboard
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MilkEntryPage;