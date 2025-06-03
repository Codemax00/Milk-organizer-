import React, { useState, useEffect } from 'react';
import { MilkEntry, Collector } from '../types';
import { useAppContext } from '../context/AppContext';
import { calculatePayout, formatCurrency } from '../utils/helpers';

interface MilkEntryFormProps {
  entry?: MilkEntry;
  onSubmit: (entry: Omit<MilkEntry, 'id'> | MilkEntry) => void;
  onCancel: () => void;
}

const MilkEntryForm: React.FC<MilkEntryFormProps> = ({ 
  entry, 
  onSubmit, 
  onCancel 
}) => {
  const { collectors, settings } = useAppContext();
  
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [fatPercentage, setFatPercentage] = useState(6.5);
  const [liters, setLiters] = useState(1);
  const [collectorId, setCollectorId] = useState('');
  const [ratePerLiter, setRatePerLiter] = useState(settings.defaultRatePerLiter);
  const [errors, setErrors] = useState({
    collectorId: '',
    fatPercentage: '',
    liters: '',
    ratePerLiter: '',
  });

  // Calculate payout based on current values
  const payout = calculatePayout({
    id: entry?.id || '',
    date,
    fatPercentage,
    liters,
    collectorId,
    ratePerLiter,
  });

  useEffect(() => {
    if (entry) {
      setDate(entry.date);
      setFatPercentage(entry.fatPercentage);
      setLiters(entry.liters);
      setCollectorId(entry.collectorId);
      setRatePerLiter(entry.ratePerLiter);
    } else if (collectors.length > 0 && !collectorId) {
      setCollectorId(collectors[0].id);
    }
  }, [entry, collectors, collectorId]);

  const validateForm = (): boolean => {
    const newErrors = {
      collectorId: '',
      fatPercentage: '',
      liters: '',
      ratePerLiter: '',
    };
    
    if (!collectorId) {
      newErrors.collectorId = 'Please select a collector';
    }
    
    if (fatPercentage <= 0) {
      newErrors.fatPercentage = 'Fat percentage must be greater than 0';
    }
    
    if (liters <= 0) {
      newErrors.liters = 'Liters must be greater than 0';
    }
    
    if (ratePerLiter <= 0) {
      newErrors.ratePerLiter = 'Rate must be greater than 0';
    }
    
    setErrors(newErrors);
    
    return !Object.values(newErrors).some((error) => error !== '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (entry) {
        onSubmit({
          ...entry,
          date,
          fatPercentage,
          liters,
          collectorId,
          ratePerLiter,
        });
      } else {
        onSubmit({
          date,
          fatPercentage,
          liters,
          collectorId,
          ratePerLiter,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        {entry ? 'Edit Milk Entry' : 'Add New Milk Entry'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date *
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="collector" className="block text-sm font-medium text-gray-700 mb-1">
            Collector *
          </label>
          <select
            id="collector"
            value={collectorId}
            onChange={(e) => setCollectorId(e.target.value)}
            className={`w-full px-3 py-2 border ${
              errors.collectorId ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="">Select a collector</option>
            {collectors.map((collector: Collector) => (
              <option key={collector.id} value={collector.id}>
                {collector.name}
              </option>
            ))}
          </select>
          {errors.collectorId && (
            <p className="mt-1 text-sm text-red-600">{errors.collectorId}</p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label htmlFor="fatPercentage" className="block text-sm font-medium text-gray-700 mb-1">
            Fat Percentage *
          </label>
          <input
            type="number"
            id="fatPercentage"
            value={fatPercentage}
            onChange={(e) => setFatPercentage(parseFloat(e.target.value))}
            step="0.1"
            min="0"
            className={`w-full px-3 py-2 border ${
              errors.fatPercentage ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.fatPercentage && (
            <p className="mt-1 text-sm text-red-600">{errors.fatPercentage}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="liters" className="block text-sm font-medium text-gray-700 mb-1">
            Liters *
          </label>
          <input
            type="number"
            id="liters"
            value={liters}
            onChange={(e) => setLiters(parseFloat(e.target.value))}
            step="0.1"
            min="0"
            className={`w-full px-3 py-2 border ${
              errors.liters ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.liters && (
            <p className="mt-1 text-sm text-red-600">{errors.liters}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="ratePerLiter" className="block text-sm font-medium text-gray-700 mb-1">
            Rate Per Liter *
          </label>
          <input
            type="number"
            id="ratePerLiter"
            value={ratePerLiter}
            onChange={(e) => setRatePerLiter(parseFloat(e.target.value))}
            step="0.1"
            min="0"
            className={`w-full px-3 py-2 border ${
              errors.ratePerLiter ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.ratePerLiter && (
            <p className="mt-1 text-sm text-red-600">{errors.ratePerLiter}</p>
          )}
        </div>
      </div>
      
      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h3 className="text-lg font-medium text-blue-800 mb-2">Payment Summary</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="text-sm text-blue-600">Fat %:</div>
          <div className="text-sm font-medium">{fatPercentage.toFixed(1)}</div>
          
          <div className="text-sm text-blue-600">Liters:</div>
          <div className="text-sm font-medium">{liters.toFixed(1)}</div>
          
          <div className="text-sm text-blue-600">Rate:</div>
          <div className="text-sm font-medium">{formatCurrency(ratePerLiter)}</div>
          
          <div className="text-sm text-blue-600 font-medium">Total Payout:</div>
          <div className="text-lg font-bold text-blue-800">{formatCurrency(payout)}</div>
        </div>
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
          {entry ? 'Update' : 'Add'} Entry
        </button>
      </div>
    </form>
  );
};

export default MilkEntryForm;