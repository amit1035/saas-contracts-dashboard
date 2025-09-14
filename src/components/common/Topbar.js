import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../hooks/useAuth';
import Button from './Button';
import Dropdown from './Dropdown';

const Topbar = ({ toggleSidebar }) => {
  const { logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  const handleLogout = () => {
    logout();
  };
  
  const menuItems = [
    { id: 'profile', label: 'Your Profile', icon: '👤' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'divider', label: '', divider: true },
    { id: 'logout', label: 'Sign out', icon: '🚪', onClick: handleLogout },
  ];
  
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Hamburger menu for mobile */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleSidebar}
              className="md:hidden mr-2"
            >
              ☰
            </Button>
            <div className="flex-shrink-0 flex items-center md:hidden">
              <h1 className="text-lg font-bold text-gray-800">ContractLens</h1>
            </div>
          </div>
          <div className="flex items-center">
            <Dropdown
              trigger={
                <Button variant="ghost" size="sm" onClick={toggleDropdown}>
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                      A
                    </div>
                    <span className="ml-2 hidden sm:block text-sm font-medium text-gray-700">
                      Admin
                    </span>
                  </div>
                </Button>
              }
              isOpen={isDropdownOpen}
              onClose={() => setIsDropdownOpen(false)}
              items={menuItems}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

Topbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default Topbar;