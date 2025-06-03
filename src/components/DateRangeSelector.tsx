import React from 'react';
import { DateRange } from '../types';
import { useAppContext } from '../context/AppContext';

const DateRangeSelector: React.FC = () => {
  const { dateRange, setDateRange } = useAppContext();
  
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateRange({
      ...dateRange,
      startDate: e.target.value,
    });
  };
  
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateRange({
      ...dateRange,
      endDate: e.target.value,
    });
  };
  
  // Quick selection options
  const setFirstHalf = () => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const midMonth = new Date(today.getFullYear(), today.getMonth(), 15);
    
    setDateRange({
      startDate: startOfMonth.toISOString().split('T')[0],
      endDate: midMonth.toISOString().split('T')[0],
    });
  };
  
  const setSecondHalf = () => {
    const today = new Date();
    const midMonth = new Date(today.getFullYear(), today.getMonth(), 16);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    setDateRange({
      startDate: midMonth.toISOString().split('T')[0],
      endDate: endOfMonth.toISOString().split('T')[0],
    });
  };
  
  const setCurrentMonth = () => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    setDateRange({
      startDate: startOfMonth.toISOString().split('T')[0],
      endDate: endOfMonth.toISOString().split('T')[0],
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">Date Range</h2>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-1">
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            value={dateRange.startDate}
            onChange={handleStartDateChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex-1">
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            value={dateRange.endDate}
            onChange={handleEndDateChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <button
          onClick={setFirstHalf}
          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors text-sm"
        >
          1st-15th
        </button>
        <button
          onClick={setSecondHalf}
          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors text-sm"
        >
          16th-End
        </button>
        <button
          onClick={setCurrentMonth}
          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors text-sm"
        >
          Full Month
        </button>
      </div>
    </div>
  );
};

export default DateRangeSelector;