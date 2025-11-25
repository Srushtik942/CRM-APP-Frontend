import React from 'react';
import { Pie, Bar } from "react-chartjs-2";

const Reports = ({ closed = 0, pipeline = 0, agentData = [], statusData = {} }) => {

  const closedPipelineData = {
    labels: ["Closed", "Pipeline"],
    datasets: [{ data: [closed, pipeline], backgroundColor: ["#4CAF50", "#2196F3"] }],
  };

  const agentChartData = {
    labels: agentData?.map(a => a.name) || [],
    datasets: [{ label: "Leads Closed", data: agentData?.map(a => a.closed) || [], backgroundColor: "#FF9800" }],
  };

  const agentChartOptions = { maintainAspectRatio: false, plugins: { legend: { display: false } } };

  const statusColors = Object.keys(statusData || {}).map(
  (_, i) => `hsl(${(i * 360) / Object.keys(statusData).length}, 70%, 50%)`
);

const statusChartData = {
  labels: Object.keys(statusData || {}),
  datasets: [{ data: Object.values(statusData || {}), backgroundColor: statusColors }],
};



  const pieOptions = { maintainAspectRatio: false, plugins: { legend: { position: "bottom" } } };

  return (
    <div className="p-6">
      <h1 className="font-bold text-center text-4xl mb-8 text-gray-600">Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center hover:shadow-2xl hover:-translate-y-2">
          <h2 className="text-lg font-semibold mb-4">Closed vs Pipeline</h2>
         <div className="w-full min-h-[320px] relative">
              <Pie data={closedPipelineData} options={pieOptions} />
              </div>


        </div>

        {/* <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center hover:shadow-2xl hover:-translate-y-2">
          <h2 className="text-lg font-semibold mb-4">Leads by Agents</h2>
          <div style={{ width: "320px", height: "350px" }}>
            <Bar data={agentChartData} options={agentChartOptions} />
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center hover:shadow-2xl hover:-translate-y-2">
          <h2 className="text-lg font-semibold mb-4">Status Distribution</h2>
          <div style={{ width: "320px", height: "320px" }}>
            <Pie data={statusChartData} options={pieOptions} />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Reports;
