import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { HomeIcon, RocketLaunchIcon, BuildingLibraryIcon, CalendarDaysIcon, ExclamationTriangleIcon, UsersIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from './context/AuthContext';

const navItems = [
  {
    label: 'Home',
    icon: <HomeIcon className="w-6 h-6" />,
    to: '/',
  },
  {
    label: 'Club',
    icon: <BuildingLibraryIcon className="w-6 h-6" />,
    children: [
      { label: 'My Clubs', to: '/clubs' },
      { label: 'Join a Club', to: '/clubs/join' },
      { label: 'Club Events', to: '/clubs/events' },
    ],
  },
  {
    label: 'Event',
    icon: <CalendarDaysIcon className="w-6 h-6" />,
    children: [
      { label: 'Browse Events', to: '/events' },
      { label: 'My Registrations', to: '/events/registrations' },
    ],
  },
  {
    label: 'Ragging',
    icon: <ExclamationTriangleIcon className="w-6 h-6" />,
    children: [
      { label: 'Report Incident', to: '/ragging' },
      { label: 'Report History', to: '/ragging/history' },
    ],
  },
  {
    label: 'Study Partner',
    icon: <UsersIcon className="w-6 h-6" />,
    children: [
      { label: 'Find Partner', to: '/studypartner' },
      { label: 'My Study Groups', to: '/studypartner/groups' },
      { label: 'Join Group', to: '/studypartner/join' },
    ],
  },
];

function Sidebar({ collapsed, setCollapsed }) {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleDropdown = (label) => {
    if (!collapsed) {
      setOpenDropdown(openDropdown === label ? null : label);
    }
  };

  return (
    <aside className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 flex flex-col shadow-lg z-40 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex items-center justify-center h-20 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
        {!collapsed && <span className="text-2xl font-bold text-gray-800 tracking-wide font-poppins">MyCollegeMate</span>}
        {collapsed && <span className="text-2xl font-bold text-blue-600 font-poppins">M</span>}
      </div>
      <nav className={`flex-1 py-6 ${collapsed ? 'px-1' : 'px-4'} space-y-2`}>
        {navItems.map((item) => (
          <div key={item.label}>
            {item.children ? (
              <div>
                <button
                  className={`flex items-center w-full ${collapsed ? 'justify-center' : ''} px-3 py-3 rounded-xl text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group ${openDropdown === item.label ? 'bg-blue-100 text-blue-700 shadow-sm' : ''}`}
                  onClick={() => handleDropdown(item.label)}
                  disabled={collapsed}
                >
                  <span className="mr-3 ml-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
                  {!collapsed && <span className="flex-1 text-left font-medium">{item.label}</span>}
                  {!collapsed && (
                    <motion.span
                      animate={{ rotate: openDropdown === item.label ? 180 : 0 }}
                      className="ml-2"
                    >
                      <ChevronDownIcon className="w-5 h-5 transition-transform" />
                    </motion.span>
                  )}
                </button>
                <AnimatePresence initial={false}>
                  {!collapsed && openDropdown === item.label && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="pl-10 overflow-hidden"
                    >
                      {item.children.map((child) => (
                        <NavLink
                          key={child.to}
                          to={child.to}
                          className="block py-2 px-4 text-gray-500 rounded-lg transition-all duration-200 font-normal hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1"
                        >
                          {child.label}
                        </NavLink>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center ${collapsed ? 'justify-center' : ''} px-3 py-3 rounded-xl text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 font-medium group ${isActive || location.pathname === item.to
                    ? 'text-blue-700 bg-blue-100 shadow-sm'
                    : ''
                  }`
                }
              >
                <span className="mr-3 ml-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
                {!collapsed && item.label}
              </NavLink>
            )}
          </div>
        ))}
      </nav>
      <div className="flex items-center justify-center h-16 border-t border-gray-100 bg-gray-50">
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white hover:bg-blue-50 text-gray-600 hover:text-blue-700 transition-all duration-200 shadow-sm hover:shadow-md border border-gray-200 hover:border-blue-200"
          onClick={() => setCollapsed((prev) => !prev)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRightIcon className="w-6 h-6" /> : <ChevronLeftIcon className="w-6 h-6" />}
        </button>
      </div>
      {isLoggedIn && (
        <div className="flex items-center justify-center py-4">
          <button
            className="px-4 py-2 rounded-full bg-red-500 text-white font-semibold shadow hover:bg-red-600 transition"
            onClick={() => { logout(); navigate('/start'); }}
          >
            Logout
          </button>
        </div>
      )}
    </aside>
  );
}

export default Sidebar; 