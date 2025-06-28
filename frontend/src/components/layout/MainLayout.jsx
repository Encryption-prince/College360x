import React, { useState, createContext } from 'react';
import Sidebar from '../components/Sidebar';

export const SidebarContext = createContext();

function MainLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <div className="min-h-screen flex font-poppins">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <main className={`flex-1 bg-gradient-to-br from-mint-100 via-blue-50 to-violet-50 p-4 overflow-y-auto transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-64'}`}>
          {children}
        </main>
      </div>
    </SidebarContext.Provider>
  );
}

export default MainLayout; 