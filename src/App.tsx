import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import MilkEntryPage from './pages/MilkEntryPage';
import CollectorsPage from './pages/CollectorsPage';
import SettingsPage from './pages/SettingsPage';
import ExportPage from './pages/ExportPage';

function App() {
  return (
    <Router>
      <AppProvider>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <main className="pb-12">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/entry" element={<MilkEntryPage />} />
              <Route path="/collectors" element={<CollectorsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/export" element={<ExportPage />} />
            </Routes>
          </main>
          <footer className="bg-white border-t py-4 text-center text-sm text-gray-600">
            Milk Collection Manager &copy; {new Date().getFullYear()}
          </footer>
        </div>
      </AppProvider>
    </Router>
  );
}

export default App;