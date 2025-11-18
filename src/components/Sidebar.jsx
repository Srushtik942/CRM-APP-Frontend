import React from 'react'
import { Home, BarChart, Users, Clock, Box, Settings } from "lucide-react";

const Sidebar = () => {
    const menu = [
    { label: "Home", icon: <Home size={18} /> },
    { label: "Leads", icon: <BarChart size={18} /> },
    { label: "Sales", icon: <Users size={18} /> },
    { label: "Agents", icon: <Clock size={18} /> },
    { label: "Reports", icon: <Box size={18} /> },
    { label: "Settings", icon: <Settings size={18} /> },
  ];
  return (
    <div className="w-60 h-screen p-6 bg-white shadow-2xl  ">
       <ul className="space-y-3 mt-6">
        {menu.map((item,idx)=>(
            <li key={idx}
            className='flex items-center gap-4
              px-4 py-2 rounded-xl cursor-pointer
              hover:bg-black hover:text-white transition'
            >
              {item.icon}
            <span className="text-lg font-medium">{item.label}</span>
            </li>
        ))}
       </ul>
    </div>
  )
}

export default Sidebar
