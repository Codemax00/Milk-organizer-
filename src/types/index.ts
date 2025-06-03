export interface Collector {
  id: string;
  name: string;
  phoneNumber?: string;
}

export interface MilkEntry {
  id: string;
  date: string;
  fatPercentage: number;
  liters: number;
  collectorId: string;
  ratePerLiter: number;
}

export interface AppSettings {
  defaultRatePerLiter: number;
}

export interface DateRange {
  startDate: string;
  endDate: string;
}