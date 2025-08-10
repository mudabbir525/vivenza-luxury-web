import React, { useState, useRef, useEffect } from 'react';
import { User, Settings, Calendar, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../pages/auth-context';
import { Link } from 'react-router-dom';

const UserDropdown: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!user) {
    return (
      <Link 
        to="/login" 
        className="text-amber-400 px-4 py-2 rounded-full font-medium hover:text-amber-500 transition-colors"
      >
        Login / Register
      </Link>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-amber-400 font-medium hover:text-amber-500 transition-colors"
      >
        <span>Hi, {user.name?.split(' ')[0] || 'User'}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-sm text-gray-600">Signed in as</p>
            <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.phone}</p>
          </div>
          
          <div className="py-1">
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-amber-600 transition-colors"
            >
              <Settings className="w-4 h-4 mr-3 text-gray-500" />
              Profile
            </Link>
            
            <Link
              to="/profile"
              onClick={() => {
                setIsOpen(false);
                // You can add logic to switch to bookings tab
              }}
              className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-amber-600 transition-colors"
            >
              <Calendar className="w-4 h-4 mr-3 text-gray-500" />
              My Bookings
            </Link>
            
            <div className="border-t border-gray-200"></div>
            
            <button
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
              className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-amber-600 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;