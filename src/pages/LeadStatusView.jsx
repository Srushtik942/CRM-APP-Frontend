import React from "react";

const LeadStatusView = () => {
  const leads = [
    { name: "Lead 1", agent: "John" },
    { name: "Lead 2", agent: "Jane" },
  ];

  return (
    <div className="flex min-h-screen bg-linear-to-br from-green-50 to bg-purple-100">

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-600">Leads by Status</h2>

        {/* Status Section */}
        <div className="bg-white shadow-xl rounded-lg p-5 mb-6">
          <h3 className="text-lg font-semibold mb-4">Status: New</h3>

          {/* Leads */}
          <div className="space-y-3">
            {leads.map((lead, index) => (
              <div
                key={index}
                className="p-4 bg-purple-100 border-l-4 border-green-500 rounded shadow-sm hover:shadow-md transition"
              >
                <h4 className="font-medium">
                  {lead.name} - <span className="text-gray-600">[Sales Agent: {lead.agent}]</span>
                </h4>
              </div>
            ))}
          </div>

          {/* Filters , Sorting */}
          <div className="mt-5 flex flex-wrap gap-3 items-center">
            <div className="flex gap-2 items-center">
              <label className="font-medium">Filters:</label>
              <select className="border rounded px-2 py-1">
                <option>Sales Agent</option>
                <option>Priority</option>
              </select>
            </div>

            <div className="flex gap-2 items-center">
              <label className="font-medium">Sort By:</label>
              <select className="border rounded px-2 py-1">
                <option>Time to Close</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadStatusView;
