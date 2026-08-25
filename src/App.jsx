import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Menu } from "lucide-react";


import Signup from "./pages/Signup"
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
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
import Profile from "./pages/Profile";
import LandingPage from "./pages/LandingPage";
import "../chartConfig";

function AppContent() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  if (pathname === "/") {
    return (
      <>
        <Toaster />
        <LandingPage />
      </>
    );
  }

  if (isAuthPage) {
    return (
      <>
        <Toaster />
        <Routes>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-white">

        {/* Sidebar with mobile support */}
        <Sidebar isOpen={isOpen} closeSidebar={closeSidebar} />

        <div className="flex-1 relative">

          <div><Toaster/></div>

          {/* Mobile Top Bar with Hamburger */}
          <div className="lg:hidden flex items-center gap-4 border-b border-blue-100 bg-white p-4 shadow-sm">
            <button onClick={toggleSidebar}>
              <Menu size={28} />
            </button>
            <h1 className="text-xl font-semibold text-blue-600">CRM Dashboard</h1>
          </div>

          {/* Main Content */}
          <div className="p-10 mt-4 lg:mt-0">

            <Routes>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/dashboard" element={<Body />} />
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
              <Route path="/profile" element={<Profile/>}/>
            </Routes>
          </div>
        </div>

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
