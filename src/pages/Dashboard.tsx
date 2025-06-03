import React from 'react';
import { useAppContext } from '../context/AppContext';
import DateRangeSelector from '../components/DateRangeSelector';
import CollectorSummary from '../components/CollectorSummary';
import { formatDate, calculateTotalPayout, formatCurrency } from '../utils/helpers';

const Dashboard: React.FC = () => {
  const { collectors, milkEntries, dateRange } = useAppContext();
  
  // Calculate total payout for all collectors in the selected date range
  const totalPayout = collectors.reduce(
    (total, collector) => total + calculateTotalPayout(milkEntries, collector.id, dateRange),
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Showing milk collection data from {formatDate(dateRange.startDate)} to {formatDate(dateRange.endDate)}
        </p>
      </div>
      
      <DateRangeSelector />
      
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-3 text-gray-800">Summary</h2>
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 flex flex-col sm:flex-row justify-between items-center">
          <div>
            <p className="text-blue-800 font-medium">Total Collectors: {collectors.length}</p>
            <p className="text-blue-600">For the selected period</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <p className="text-lg font-bold text-green-800">{formatCurrency(totalPayout)}</p>
            <p className="text-green-600 text-sm">Total Payout</p>
          </div>
        </div>
      </div>
      
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Collector Summaries</h2>
      
      {collectors.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-600 mb-4">No collectors found. Add collectors to get started.</p>
          <a
            href="/collectors"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Collectors
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collectors.map((collector) => (
            <CollectorSummary key={collector.id} collector={collector} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;