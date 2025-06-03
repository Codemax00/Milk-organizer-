import React, { createContext, useContext, useState, useEffect } from 'react';
import { Collector, MilkEntry, AppSettings, DateRange } from '../types';
import { generateId } from '../utils/helpers';

interface AppContextType {
  collectors: Collector[];
  milkEntries: MilkEntry[];
  settings: AppSettings;
  dateRange: DateRange;
  addCollector: (collector: Omit<Collector, 'id'>) => void;
  updateCollector: (collector: Collector) => void;
  deleteCollector: (id: string) => void;
  addMilkEntry: (entry: Omit<MilkEntry, 'id'>) => void;
  updateMilkEntry: (entry: MilkEntry) => void;
  deleteMilkEntry: (id: string) => void;
  updateSettings: (newSettings: AppSettings) => void;
  setDateRange: (range: DateRange) => void;
}

const defaultSettings: AppSettings = {
  defaultRatePerLiter: 7.5,
};

const today = new Date();
const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
const midMonth = new Date(today.getFullYear(), today.getMonth(), 16);
const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

// Default date range based on current date
const getDefaultDateRange = (): DateRange => {
  if (today.getDate() <= 15) {
    return {
      startDate: startOfMonth.toISOString().split('T')[0],
      endDate: midMonth.toISOString().split('T')[0],
    };
  } else {
    return {
      startDate: midMonth.toISOString().split('T')[0],
      endDate: endOfMonth.toISOString().split('T')[0],
    };
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collectors, setCollectors] = useState<Collector[]>([]);
  const [milkEntries, setMilkEntries] = useState<MilkEntry[]>([]);
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [dateRange, setDateRange] = useState<DateRange>(getDefaultDateRange());

  // Load data from localStorage on initial render
  useEffect(() => {
    const loadedCollectors = localStorage.getItem('collectors');
    const loadedMilkEntries = localStorage.getItem('milkEntries');
    const loadedSettings = localStorage.getItem('settings');

    if (loadedCollectors) setCollectors(JSON.parse(loadedCollectors));
    if (loadedMilkEntries) setMilkEntries(JSON.parse(loadedMilkEntries));
    if (loadedSettings) setSettings(JSON.parse(loadedSettings));
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('collectors', JSON.stringify(collectors));
  }, [collectors]);

  useEffect(() => {
    localStorage.setItem('milkEntries', JSON.stringify(milkEntries));
  }, [milkEntries]);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  const addCollector = (collector: Omit<Collector, 'id'>) => {
    const newCollector: Collector = {
      ...collector,
      id: generateId(),
    };
    setCollectors([...collectors, newCollector]);
  };

  const updateCollector = (updatedCollector: Collector) => {
    setCollectors(
      collectors.map((collector) =>
        collector.id === updatedCollector.id ? updatedCollector : collector
      )
    );
  };

  const deleteCollector = (id: string) => {
    setCollectors(collectors.filter((collector) => collector.id !== id));
    // Also delete all milk entries for this collector
    setMilkEntries(milkEntries.filter((entry) => entry.collectorId !== id));
  };

  const addMilkEntry = (entry: Omit<MilkEntry, 'id'>) => {
    const newEntry: MilkEntry = {
      ...entry,
      id: generateId(),
    };
    setMilkEntries([...milkEntries, newEntry]);
  };

  const updateMilkEntry = (updatedEntry: MilkEntry) => {
    setMilkEntries(
      milkEntries.map((entry) =>
        entry.id === updatedEntry.id ? updatedEntry : entry
      )
    );
  };

  const deleteMilkEntry = (id: string) => {
    setMilkEntries(milkEntries.filter((entry) => entry.id !== id));
  };

  const updateSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
  };

  const value = {
    collectors,
    milkEntries,
    settings,
    dateRange,
    addCollector,
    updateCollector,
    deleteCollector,
    addMilkEntry,
    updateMilkEntry,
    deleteMilkEntry,
    updateSettings,
    setDateRange,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};