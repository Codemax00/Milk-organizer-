import { MilkEntry, Collector, DateRange } from '../types';

// Generate a unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

// Calculate payout for a milk entry
export const calculatePayout = (entry: MilkEntry): number => {
  return entry.fatPercentage * entry.liters * entry.ratePerLiter;
};

// Filter milk entries by date range
export const filterEntriesByDateRange = (
  entries: MilkEntry[],
  dateRange: DateRange
): MilkEntry[] => {
  return entries.filter((entry) => {
    const entryDate = new Date(entry.date);
    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);
    
    // Set time to midnight for accurate comparison
    entryDate.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);
    
    return entryDate >= startDate && entryDate <= endDate;
  });
};

// Get collector by ID
export const getCollectorById = (
  collectors: Collector[],
  id: string
): Collector | undefined => {
  return collectors.find((collector) => collector.id === id);
};

// Format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Calculate total payout for a collector within a date range
export const calculateTotalPayout = (
  entries: MilkEntry[],
  collectorId: string,
  dateRange: DateRange
): number => {
  const filteredEntries = filterEntriesByDateRange(
    entries.filter((entry) => entry.collectorId === collectorId),
    dateRange
  );
  
  return filteredEntries.reduce(
    (total, entry) => total + calculatePayout(entry),
    0
  );
};

// Calculate total liters for a collector within a date range
export const calculateTotalLiters = (
  entries: MilkEntry[],
  collectorId: string,
  dateRange: DateRange
): number => {
  const filteredEntries = filterEntriesByDateRange(
    entries.filter((entry) => entry.collectorId === collectorId),
    dateRange
  );
  
  return filteredEntries.reduce(
    (total, entry) => total + entry.liters,
    0
  );
};

// Calculate average fat percentage for a collector within a date range
export const calculateAverageFat = (
  entries: MilkEntry[],
  collectorId: string,
  dateRange: DateRange
): number => {
  const filteredEntries = filterEntriesByDateRange(
    entries.filter((entry) => entry.collectorId === collectorId),
    dateRange
  );
  
  if (filteredEntries.length === 0) return 0;
  
  const totalFat = filteredEntries.reduce(
    (sum, entry) => sum + entry.fatPercentage,
    0
  );
  
  return totalFat / filteredEntries.length;
};

// Generate CSV data for export
export const generateCSVData = (
  entries: MilkEntry[],
  collectors: Collector[]
): string => {
  const header = "Date,Collector,Fat%,Liters,Rate,Payout\n";
  
  const rows = entries.map((entry) => {
    const collector = getCollectorById(collectors, entry.collectorId);
    const payout = calculatePayout(entry);
    
    return `${formatDate(entry.date)},${collector?.name || 'Unknown'},${
      entry.fatPercentage
    },${entry.liters},${entry.ratePerLiter},${payout.toFixed(2)}`;
  });
  
  return header + rows.join("\n");
};