import React from "react";

const SalesAgentView = () => {
  const leads = [
    { name: "Lead 1", status: "New" },
    { name: "Lead 2", status: "Qualified" },
  ];

  return (
    <div className="flex min-h-screen bg-linear-to-br from-green-50 to bg-purple-100">

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4 text-gray-600">Leads by Sales Agent</h1>

        {/* Agent Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Sales Agent: John Doe</h2>

          {/* Lead Cards */}
          <div className="space-y-3">
            {leads.map((lead, index) => (
              <div
                key={index}
                className="p-4 bg-purple-100 border-l-4 border-green-500 rounded shadow-sm hover:shadow-md transition"
              >
                <h4 className="font-medium">
                  {lead.name} -{" "}
                  <span className="text-gray-600">[Status: {lead.status}]</span>
                </h4>
              </div>
            ))}
          </div>

          {/* Filters & Sort */}
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex gap-2 items-center">
              <label className="font-medium">Filters:</label>
              <select className="border rounded px-2 py-1">
                <option>Status</option>
                <option>Priority</option>
              </select>
            </div>

            <div className="flex gap-2 items-center">
              <label className="font-medium">Time to Close:</label>
              <select className="border rounded px-2 py-1">
                <option>Time to Close</option>
                <option>30</option>
                <option>15</option>
                <option>45</option>

              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesAgentView;
