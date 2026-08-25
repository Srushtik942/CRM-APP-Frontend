import React from "react";
import { BarChart, Box, Clock, Home, Settings, UserCircle, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menu = [
  { label: "Home", icon: <Home size={18} />, path: "/dashboard" },
  { label: "Leads", icon: <BarChart size={18} />, path: "/leadList" },
  { label: "Sales", icon: <Users size={18} />, path: "/sales" },
  { label: "Agents", icon: <Clock size={18} />, path: "/agents" },
  { label: "Reports", icon: <Box size={18} />, path: "/reports" },
  { label: "Settings", icon: <Settings size={18} />, path: "/setting" },
  { label: "Profile", icon: <UserCircle size={18} />, path: "/profile" },
];

const Sidebar = ({ isOpen, closeSidebar }) => {
  const location = useLocation();

  return (
    <>
      {isOpen && <div onClick={closeSidebar} className=" z-40 bg-green-950/20 backdrop-blur-sm lg:hidden" />}
      <aside className={`fixed left-0 top-0 z-50 h-auto w-60 transform rounded-r-sm bg-green-950 p-6 shadow-xl transition-transform duration-300 lg:static lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="mb-10 border-b border-green-800 pb-5"><Link to="/" onClick={closeSidebar} className="text-2xl font-bold text-yellow-300 transition hover:text-yellow-200">Clientix</Link><p className="mt-3 text-xs uppercase tracking-widest text-green-300">CRM workspace</p></div>
        <ul className="space-y-3">
          {menu.map((item) => {
            const isActive = location.pathname === item.path;
            return <li key={item.path}><Link to={item.path} onClick={closeSidebar} className={`flex items-center gap-4 rounded-xl px-4 py-3 transition ${isActive ? "bg-yellow-300 font-semibold text-green-950 shadow-md" : "text-green-100 hover:bg-green-800 hover:text-yellow-200"}`}>{item.icon}<span className="text-base">{item.label}</span></Link></li>;
          })}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
