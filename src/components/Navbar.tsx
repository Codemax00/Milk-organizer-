import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Droplets, Users, Settings, FileText, Home } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const closeMenu = () => {
    setIsOpen(false);
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-blue-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Droplets size={24} className="text-blue-200" />
              <span className="font-bold text-xl">Milk Manager</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/') 
                  ? 'bg-blue-900 text-white' 
                  : 'text-blue-200 hover:bg-blue-700 hover:text-white'
              }`}
            >
              <Home size={18} />
              <span>Dashboard</span>
            </Link>
            
            <Link
              to="/entry"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/entry') 
                  ? 'bg-blue-900 text-white' 
                  : 'text-blue-200 hover:bg-blue-700 hover:text-white'
              }`}
            >
              <Droplets size={18} />
              <span>Add Entry</span>
            </Link>
            
            <Link
              to="/collectors"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/collectors') 
                  ? 'bg-blue-900 text-white' 
                  : 'text-blue-200 hover:bg-blue-700 hover:text-white'
              }`}
            >
              <Users size={18} />
              <span>Collectors</span>
            </Link>
            
            <Link
              to="/export"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/export') 
                  ? 'bg-blue-900 text-white' 
                  : 'text-blue-200 hover:bg-blue-700 hover:text-white'
              }`}
            >
              <FileText size={18} />
              <span>Export</span>
            </Link>
            
            <Link
              to="/settings"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/settings') 
                  ? 'bg-blue-900 text-white' 
                  : 'text-blue-200 hover:bg-blue-700 hover:text-white'
              }`}
            >
              <Settings size={18} />
              <span>Settings</span>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-200 hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-900">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              onClick={closeMenu}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                isActive('/') 
                  ? 'bg-blue-800 text-white' 
                  : 'text-blue-200 hover:bg-blue-700 hover:text-white'
              }`}
            >
              <Home size={20} />
              <span>Dashboard</span>
            </Link>
            
            <Link
              to="/entry"
              onClick={closeMenu}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                isActive('/entry') 
                  ? 'bg-blue-800 text-white' 
                  : 'text-blue-200 hover:bg-blue-700 hover:text-white'
              }`}
            >
              <Droplets size={20} />
              <span>Add Entry</span>
            </Link>
            
            <Link
              to="/collectors"
              onClick={closeMenu}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                isActive('/collectors') 
                  ? 'bg-blue-800 text-white' 
                  : 'text-blue-200 hover:bg-blue-700 hover:text-white'
              }`}
            >
              <Users size={20} />
              <span>Collectors</span>
            </Link>
            
            <Link
              to="/export"
              onClick={closeMenu}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                isActive('/export') 
                  ? 'bg-blue-800 text-white' 
                  : 'text-blue-200 hover:bg-blue-700 hover:text-white'
              }`}
            >
              <FileText size={20} />
              <span>Export</span>
            </Link>
            
            <Link
              to="/settings"
              onClick={closeMenu}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                isActive('/settings') 
                  ? 'bg-blue-800 text-white' 
                  : 'text-blue-200 hover:bg-blue-700 hover:text-white'
              }`}
            >
              <Settings size={20} />
              <span>Settings</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;