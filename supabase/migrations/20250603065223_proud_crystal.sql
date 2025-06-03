/*
  # Initial schema for Milk Collection Manager

  1. New Tables
    - `collectors`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `phone_number` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `milk_entries`
      - `id` (uuid, primary key)
      - `collector_id` (uuid, foreign key)
      - `date` (date, required)
      - `fat_percentage` (decimal, required)
      - `liters` (decimal, required)
      - `rate_per_liter` (decimal, required)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `settings`
      - `id` (uuid, primary key)
      - `default_rate_per_liter` (decimal, required)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their data
*/

-- Create collectors table
CREATE TABLE IF NOT EXISTS collectors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone_number text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create milk_entries table
CREATE TABLE IF NOT EXISTS milk_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  collector_id uuid NOT NULL REFERENCES collectors(id) ON DELETE CASCADE,
  date date NOT NULL,
  fat_percentage decimal(5,2) NOT NULL,
  liters decimal(10,2) NOT NULL,
  rate_per_liter decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  default_rate_per_liter decimal(10,2) NOT NULL DEFAULT 7.50,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE collectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE milk_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable all access for authenticated users" ON collectors
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable all access for authenticated users" ON milk_entries
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable all access for authenticated users" ON settings
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default settings
INSERT INTO settings (default_rate_per_liter) VALUES (7.50);