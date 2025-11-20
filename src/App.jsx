import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Body from "./pages/Body";
import LeadManagement from "./pages/LeadManagement";
import LeadList from "./pages/LeadList";
import NewLead from "./pages/NewLead";
import SalesAgent from "./pages/SalesAgent";
import NewAgent from "./pages/NewAgent";

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen w-full  bg-gradient-to-br from-purple-100 via-white to-green-200">
        <Sidebar />

        <div className="flex-1 p-10">
          <Routes>
            <Route path="/" element={<Body />} />
            <Route path="/lead" element={<LeadManagement />} />
            <Route path="/leadList" element={<LeadList/>}/>
            <Route path="/newLead" element={<NewLead/>} />
            <Route path="/sales" element={<SalesAgent/>}/>
            <Route path="/agents" element={<NewAgent/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
