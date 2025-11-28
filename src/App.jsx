import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Menu, Settings } from "lucide-react";

import Sidebar from "./components/sidebar";
import Body from "./pages/Body";
import LeadManagement from "./pages/LeadManagement";
import LeadList from "./pages/LeadList";
import NewLead from "./pages/NewLead";
import SalesAgent from "./pages/SalesAgent";
import NewAgent from "./pages/NewAgent";
import ReportsPage from "./pages/ReportsPage";
import SalesAgentView from "./pages/SalesAgentView";
import LeadStatusView from "./pages/LeadStatusView";
import StatusPage from "./pages/StatusPage";
import NewSettings from "./pages/Settings"
import "../chartConfig";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <BrowserRouter>
      <div className="flex min-h-screen w-full bg-linear-to-br from-purple-100 via-white to-green-200">

        {/* Sidebar with mobile support */}
        <Sidebar isOpen={isOpen} closeSidebar={closeSidebar} />

        <div className="flex-1 relative">

          <div><Toaster/></div>

          {/* Mobile Top Bar with Hamburger */}
          <div className="lg:hidden p-4 flex items-center gap-4 shadow bg-white">
            <button onClick={toggleSidebar}>
              <Menu size={28} />
            </button>
            <h1 className="text-xl font-semibold">CRM Dashboard</h1>
          </div>

          {/* Main Content */}
          <div className="p-10 mt-4 lg:mt-0">

            <Routes>
              <Route path="/" element={<Body />} />
              <Route path="/lead" element={<LeadManagement />} />
              <Route path="/leadList" element={<LeadList />} />
              <Route path="/newLead" element={<NewLead />} />
              <Route path="/sales" element={<SalesAgent />} />
              <Route path="/agents" element={<NewAgent />} />
              <Route path="/leadStatus" element={<LeadStatusView />} />
              <Route path="/salesAgentView" element={<SalesAgentView />} />
              <Route path="/lead/:id" element={<LeadManagement />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/status" element={<StatusPage />} />
              <Route path="/setting" element={<NewSettings/>}/>
            </Routes>
          </div>
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;
