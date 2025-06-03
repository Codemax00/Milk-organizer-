import React from 'react';
import { Collector } from '../types';
import { useAppContext } from '../context/AppContext';
import { 
  calculateTotalLiters, 
  calculateTotalPayout, 
  calculateAverageFat,
  formatCurrency 
} from '../utils/helpers';

interface CollectorSummaryProps {
  collector: Collector;
}

const CollectorSummary: React.FC<CollectorSummaryProps> = ({ collector }) => {
  const { milkEntries, dateRange } = useAppContext();
  
  const totalLiters = calculateTotalLiters(milkEntries, collector.id, dateRange);
  const totalPayout = calculateTotalPayout(milkEntries, collector.id, dateRange);
  const averageFat = calculateAverageFat(milkEntries, collector.id, dateRange);
  
  // Animation classes for the summary card
  const hasData = totalLiters > 0;

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
      hasData ? 'border-l-4 border-blue-500 hover:shadow-lg transform hover:-translate-y-1' : 'opacity-70'
    }`}>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{collector.name}</h3>
        {collector.phoneNumber && (
          <p className="text-sm text-gray-500 mb-3">{collector.phoneNumber}</p>
        )}
        
        <div className="grid grid-cols-3 gap-2 mb-2">
          <div className="text-center p-2 bg-blue-50 rounded">
            <p className="text-xs text-blue-600 font-medium">Liters</p>
            <p className="text-lg font-bold text-blue-800">{totalLiters.toFixed(1)}</p>
          </div>
          
          <div className="text-center p-2 bg-blue-50 rounded">
            <p className="text-xs text-blue-600 font-medium">Avg. Fat</p>
            <p className="text-lg font-bold text-blue-800">{averageFat.toFixed(1)}%</p>
          </div>
          
          <div className="text-center p-2 bg-green-50 rounded">
            <p className="text-xs text-green-600 font-medium">Payout</p>
            <p className="text-lg font-bold text-green-800">{formatCurrency(totalPayout)}</p>
          </div>
        </div>
        
        {!hasData && (
          <p className="text-sm text-gray-500 italic text-center mt-2">
            No data for selected period
          </p>
        )}
      </div>
    </div>
  );
};

export default CollectorSummary;