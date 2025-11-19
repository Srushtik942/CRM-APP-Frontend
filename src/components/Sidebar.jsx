import React from 'react'
import { Link } from "react-router-dom";
import { Home, BarChart, Users, Clock, Box, Settings } from "lucide-react";

const Sidebar = () => {
  const menu = [
    { label: "Home", icon: <Home size={18} />, path: "/" },
    { label: "Leads", icon: <BarChart size={18} />, path: "/leadList" },
    { label: "Sales", icon: <Users size={18} />, path: "/sales" },
    { label: "Agents", icon: <Clock size={18} />, path: "/agents" },
    { label: "Reports", icon: <Box size={18} />, path: "/reports" },
    { label: "Settings", icon: <Settings size={18} />, path: "/settings" },
  ];

  return (
    <div className="w-60 h-screen p-6 bg-white shadow-2xl">
      <ul className="space-y-3 mt-6">
        {menu.map((item, idx) => (
          <li key={idx}>
            <Link
              to={item.path}
              className="flex items-center text-black gap-4 px-4 py-2 rounded-xl cursor-pointer
                         hover:bg-purple-500 hover:text-white transition"
            >
              {item.icon}
              <span className="text-lg font-medium">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
