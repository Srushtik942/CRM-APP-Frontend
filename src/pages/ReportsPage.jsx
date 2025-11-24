import React, { useState, useEffect } from "react";
import axios from "axios";
import Reports from "./Reports";

const ReportsPage = () => {
  const [closed, setClosed] = useState(0);
  const [pipeline, setPipeline] = useState(0);
  const [agentData, setAgentData] = useState([]);
  const [statusData, setStatusData] = useState({});

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const closedRes = await axios.get("/report/pipeline/closed");
        console.log(closedRes);
        setClosed(closedRes.data.closedResponse || 0);

        const pipelineRes = await axios.get("/report/pipeline");
        console.log(pipelineRes);
        setPipeline(pipelineRes.data.totalLeadsInPipeline || 0);

        const agentsRes = await axios.get("/agents");
        setAgentData(
          agentsRes.data.allAgents.map(a => ({
            name: a.name,
            closed: a.closedLeads || 0,
          }))
        );

        const leadsRes = await axios.get("/leads");
        const statusCount = {};
        leadsRes.data.leads.forEach(lead => {
          statusCount[lead.status] = (statusCount[lead.status] || 0) + 1;
        });
        setStatusData(statusCount);

      } catch (err) {
        console.error(err);
      }
    };

    fetchReports();
  }, []);

  return <Reports closed={closed} pipeline={pipeline} agentData={agentData} statusData={statusData} />;
};

export default ReportsPage;
