import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Body from "./pages/Body";
import LeadManagement from "./pages/LeadManagement";
import LeadList from "./pages/LeadList";
import NewLead from "./pages/NewLead";
import SalesAgent from "./pages/SalesAgent";
import NewAgent from "./pages/NewAgent";
import Reports from "./pages/Reports";
import SalesAgentView from "./pages/SalesAgentView"
import LeadStatusView from "./pages/LeadStatusView"
import "../chartConfig";


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
            <Route path="/leadStatus" element={<LeadStatusView/>}/>
            <Route path="/salesAgentView" element={<SalesAgentView/>}/>
            <Route path="/reports" element={<Reports
      closed={40}
      pipeline={70}
      agentData={[
        { name: "Vicky Kaushal", closed: 10 },
        { name: "Virat Kohli", closed: 20 },
        { name: "M.S.Dhoni", closed: 15 }
      ]}
      statusData={{
        "New": 20,
        "In Progress": 30,
        "Closed": 40,
        "Follow-Up": 15
      }}
    />}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
