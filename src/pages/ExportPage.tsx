import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import DateRangeSelector from '../components/DateRangeSelector';
import { 
  filterEntriesByDateRange, 
  getCollectorById, 
  calculatePayout, 
  formatDate,
  formatCurrency,
  generateCSVData
} from '../utils/helpers';
import { FileDown, FileText } from 'lucide-react';

const ExportPage: React.FC = () => {
  const { collectors, milkEntries, dateRange } = useAppContext();
  const [exportFormat, setExportFormat] = useState<'csv' | 'preview'>('preview');
  
  const filteredEntries = filterEntriesByDateRange(milkEntries, dateRange);
  
  // Calculate totals
  const totalLiters = filteredEntries.reduce((sum, entry) => sum + entry.liters, 0);
  const totalPayout = filteredEntries.reduce((sum, entry) => sum + calculatePayout(entry), 0);
  const averageFat = filteredEntries.length > 0 
    ? filteredEntries.reduce((sum, entry) => sum + entry.fatPercentage, 0) / filteredEntries.length 
    : 0;
  
  const handleExport = () => {
    const csvData = generateCSVData(filteredEntries, collectors);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `milk-data-${dateRange.startDate}-to-${dateRange.endDate}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Export Data</h1>
        <p className="text-gray-600">
          Export milk collection data for reporting and analysis
        </p>
      </div>
      
      <DateRangeSelector />
      
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-3 text-gray-800">Export Options</h2>
        
        <div className="flex flex-wrap gap-3 mb-4">
          <button
            onClick={() => setExportFormat('preview')}
            className={`flex items-center px-4 py-2 rounded-md ${
              exportFormat === 'preview'
                ? 'bg-blue-100 text-blue-800 border border-blue-300'
                : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
            }`}
          >
            <FileText size={18} className="mr-2" />
            Preview Data
          </button>
          
          <button
            onClick={() => setExportFormat('csv')}
            className={`flex items-center px-4 py-2 rounded-md ${
              exportFormat === 'csv'
                ? 'bg-blue-100 text-blue-800 border border-blue-300'
                : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
            }`}
          >
            <FileDown size={18} className="mr-2" />
            Export as CSV
          </button>
        </div>
        
        {exportFormat === 'csv' && (
          <div className="mt-4">
            <p className="text-gray-600 mb-3">
              Export milk collection data as a CSV file for the selected date range.
            </p>
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
            >
              <FileDown size={18} className="mr-2" />
              Download CSV
            </button>
          </div>
        )}
      </div>
      
      {exportFormat === 'preview' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <h2 className="text-lg font-semibold p-4 bg-gray-50 border-b">
            Data Preview: {formatDate(dateRange.startDate)} to {formatDate(dateRange.endDate)}
          </h2>
          
          {filteredEntries.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-600">No data available for the selected date range.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Collector
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fat %
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Liters
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rate
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payout
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEntries.map((entry) => {
                    const collector = getCollectorById(collectors, entry.collectorId);
                    const payout = calculatePayout(entry);
                    
                    return (
                      <tr key={entry.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(entry.date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {collector?.name || 'Unknown'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {entry.fatPercentage.toFixed(1)}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {entry.liters.toFixed(1)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatCurrency(entry.ratePerLiter)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {formatCurrency(payout)}
                        </td>
                      </tr>
                    );
                  })}
                  
                  {/* Total row */}
                  <tr className="bg-gray-50 font-semibold">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" colSpan={2}>
                      TOTAL
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {averageFat.toFixed(1)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {totalLiters.toFixed(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      -
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
                      {formatCurrency(totalPayout)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExportPage;