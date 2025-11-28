// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Home, BarChart, Users, Clock, Box, Settings } from "lucide-react";

// const Sidebar = () => {
//   const location = useLocation();

//   const menu = [
//     { label: "Home", icon: <Home size={18} />, path: "/" },
//     { label: "Leads", icon: <BarChart size={18} />, path: "/leadList" },
//     { label: "Sales", icon: <Users size={18} />, path: "/sales" },
//     { label: "Agents", icon: <Clock size={18} />, path: "/agents" },
//     { label: "Reports", icon: <Box size={18} />, path: "/reports" },
//     { label: "Settings", icon: <Settings size={18} />, path: "/settings" },
//   ];

//   return (
//     <div className="w-60 h-screen p-6 bg-white shadow-2xl rounded-xl">
//       <ul className="space-y-3 mt-6">
//         {menu.map((item, idx) => {
//           const isActive = location.pathname === item.path;

//           return (
//             <li key={idx}>
//               <Link
//                 to={item.path}
//                 className={`flex items-center gap-4 px-4 py-2 rounded-xl transition
//                   ${isActive
//                     ? "bg-green-600 text-white shadow-lg"
//                     : "text-black hover:bg-green-500 hover:text-white"
//                   }
//                 `}
//               >
//                 {item.icon}
//                 <span className="text-lg font-medium">{item.label}</span>
//               </Link>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;


import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BarChart, Users, Clock, Box, Settings } from "lucide-react";

// The Sidebar component now accepts props:
// 1. isOpen: Boolean state from the parent
// 2. closeSidebar: Function to toggle the state in the parent
const Sidebar = ({ isOpen, closeSidebar }) => {
  const location = useLocation();

  const menu = [
    { label: "Home", icon: <Home size={18} />, path: "/" },
    { label: "Leads", icon: <BarChart size={18} />, path: "/leadList" },
    { label: "Sales", icon: <Users size={18} />, path: "/sales" },
    { label: "Agents", icon: <Clock size={18} />, path: "/agents" },
    { label: "Reports", icon: <Box size={18} />, path: "/reports" },
    { label: "Settings", icon: <Settings size={18} />, path: "/setting" },
  ];

  return (
    <>
        {/* 1. Backdrop Overlay: Shown only on mobile when sidebar is open */}
        {isOpen && (
            <div
                onClick={closeSidebar} // Clicking the backdrop closes the sidebar
                className="fixed inset-0 backdrop-blur-sm bg-white/10 z-40 lg:hidden" // z-40 ensures it covers content but is under the sidebar (z-50)
            ></div>
        )}

        {/* 2. Sidebar Container: Use transform/transition for sliding animation */}
        <div
            className={`
                w-60 h-screen p-6 bg-white shadow-2xl z-50 fixed top-0 left-0
                transition-transform duration-300 ease-in-out
                // Hide by default on mobile (translate-x-full)
                transform lg:translate-x-0
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}

                // Hide on desktop (static)
                lg:static
            `}
        >
            <ul className="space-y-3 mt-6">
                {menu.map((item, idx) => {
                    const isActive = location.pathname === item.path;

                    return (
                        <li key={idx}>
                            <Link
                                to={item.path}
                                onClick={closeSidebar} // Clicking a link closes the sidebar on mobile
                                className={`flex items-center gap-4 px-4 py-2 rounded-xl transition
                                    ${isActive
                                        ? "bg-green-600 text-white shadow-lg"
                                        : "text-black hover:bg-green-500 hover:text-white"
                                    }
                                `}
                            >
                                {item.icon}
                                <span className="text-lg font-medium">{item.label}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    </>
  );
};

export default Sidebar;