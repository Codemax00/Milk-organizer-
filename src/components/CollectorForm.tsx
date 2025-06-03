import React, { useState, useEffect } from 'react';
import { Collector } from '../types';

interface CollectorFormProps {
  collector?: Collector;
  onSubmit: (collector: Omit<Collector, 'id'> | Collector) => void;
  onCancel: () => void;
}

const CollectorForm: React.FC<CollectorFormProps> = ({ 
  collector, 
  onSubmit, 
  onCancel 
}) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({
    name: '',
  });

  useEffect(() => {
    if (collector) {
      setName(collector.name);
      setPhoneNumber(collector.phoneNumber || '');
    }
  }, [collector]);

  const validateForm = (): boolean => {
    const newErrors = {
      name: '',
    };
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    setErrors(newErrors);
    return !newErrors.name;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (collector) {
        onSubmit({
          ...collector,
          name,
          phoneNumber: phoneNumber || undefined,
        });
      } else {
        onSubmit({
          name,
          phoneNumber: phoneNumber || undefined,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        {collector ? 'Edit Collector' : 'Add New Collector'}
      </h2>
      
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Name *
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full px-3 py-2 border ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>
      
      <div className="mb-6">
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number (Optional)
        </label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., 9876543210"
        />
      </div>
      
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {collector ? 'Update' : 'Add'} Collector
        </button>
      </div>
    </form>
  );
};

export default CollectorForm;