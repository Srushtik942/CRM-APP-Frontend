
import React, { useState, useEffect } from "react";
import Reports from "./Reports";
import axiosInstance from "../api/axiosInstance";

const ReportsPage = () => {
  const [closed, setClosed] = useState(0);
  const [pipeline, setPipeline] = useState(0);
  const [agentData, setAgentData] = useState([]);
  const [statusData, setStatusData] = useState({});

  useEffect(() => {
    const fetchReports = async () => {
      try {
        // 1️ CLOSED LEADS TOTAL
        const closedRes = await axiosInstance.get("/report/pipeline/closed");
        console.log("Closed Response:", closedRes.data);
        setClosed(closedRes.data.closedResponse ?? 0);

        // 2️ PIPELINE TOTAL
        const pipelineRes = await axiosInstance.get("/report/pipeline");
        console.log("Pipeline Response:", pipelineRes.data);
        setPipeline(pipelineRes.data.totalLeadsInPipeline ?? 0);

        // 3️ ALL AGENTS
        const agentsRes = await axiosInstance.get("/agents");
        console.log("Agents Response:", agentsRes.data);
        const agents = agentsRes.data.allAgents ?? [];

        //  CLOSED-BY-AGENT DATA (NEW API)
        const closedByAgentRes = await axiosInstance.get("/report/closed-by-agent");
        console.log("Closed By Agent Response:", closedByAgentRes.data);

        const closedByAgent = closedByAgentRes.data.closedByAgent ?? {};

        //  MERGE DATA → for chart
        const agentChartData = agents.map(a => ({
          name: a.name,
          closed: closedByAgent[a.name] || 0,
        }));

        setAgentData(agentChartData);

        // STATUS WISE LEADS
        const leadsRes = await axiosInstance.get("/leads");
        console.log("Leads Response:", leadsRes.data);

        const statusCount = {};
        leadsRes.data.leads?.forEach(lead => {
          const key = lead.status ?? "Unknown";
          statusCount[key] = (statusCount[key] || 0) + 1;
        });

        setStatusData(statusCount);

      } catch (err) {
        console.error("Error Fetching Reports:", err);
      }
    };

    fetchReports();
  }, []);

  return (
    <Reports
      closed={closed}
      pipeline={pipeline}
      agentData={agentData}
      statusData={statusData}
    />
  );
};

export default ReportsPage;

