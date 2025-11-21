import React from 'react';
import { useNavigate } from 'react-router';

const LeadList = () => {
  const navigate = useNavigate();
  const leads = [
    {
      lead: "Lead 1",
      status: "Qualified",
      person: "John Doe",
      tags: ["High Value"],
      source: "Website",
      priority: 2,
      closeDate: "2025-11-25",
    },
    {
      lead: "Lead 2",
      status: "New",
      person: "Jane Washington",
      tags: ["Urgent"],
      source: "Referral",
      priority: 1,
      closeDate: "2025-11-20",
    },
    {
      lead: "Lead 3",
      status: "Proposal Sent",
      person: "Mark Zuckerberg",
      tags: [],
      source: "LinkedIn",
      priority: 3,
      closeDate: "2025-12-01",
    },
  ];

  // // active filters

  // const activeFilters = {
  //   agent: sera
  // }



  return (
    <div className="min-h-screen bg-linear-to-br from-purple-100 via-white to-green-100 py-12 px-6">

      <div className="max-w-3xl mx-auto flex justify-between items-center mb-10">
        <h2 className="text-4xl font-semibold text-gray-600">Lead List</h2>

           <button
           onClick={()=>navigate("/newLead")}
           className="bg-purple-500 hover:bg-purple-600 cursor-pointer text-white font-medium px-6 py-2 rounded-xl shadow-lg">
          Add New Lead
        </button>
      </div>

      {/* Lead Card */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8">

        <h3 className="text-3xl font-sans text-center mb-6 text-gray-600">
          Lead Overview
        </h3>

        <div className="divide-y divide-gray-200">
          {leads.map((item, index) => (
            <div key={index} className="py-4 hover:bg-purple-50 transition-all">
              <div className="grid grid-cols-3 items-center text-lg">
                <span className="font-semibold text-gray-800">{item.lead}</span>

                <span
                  className={`px-5 py-1 rounded-lg text-sm font-medium mx-auto ${
                    item.status === "New"
                      ? "bg-green-100 text-green-700"
                      : item.status === "Qualified"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-purple-100 text-purple-700"
                  }`}
                >
                  {item.status}
                </span>

                <span className="text-gray-600 text-right font-medium">{item.person}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

{/* Filters , Sorting */}
<div className="max-w-3xl mx-auto mt-14 space-y-10">

  {/* Filters */}
  <div className="flex items-center gap-6">
    <h3 className="text-xl font-semibold text-gray-700 min-w-[90px]">Filters:</h3>

    <div className="flex gap-4">
      <button className="px-6 py-2 bg-green-200 text-green-700 font-medium rounded-full hover:bg-green-300 shadow-md transition-all cursor-pointer">
        Status
      </button>

      <button className="px-6 py-2 bg-purple-200 text-purple-700 font-medium rounded-full hover:bg-purple-300 shadow-md transition-all cursor-pointer">
        Sales Agent
      </button>
    </div>
  </div>

  {/* Sort By */}
  <div className="flex items-center gap-6">
    <h3 className="text-xl font-semibold text-gray-700 min-w-[90px]">Sort By:</h3>

    <div className="flex gap-4">
      <button className="px-6 py-2 bg-green-200 text-green-700 font-medium rounded-full hover:bg-green-300 shadow-md transition-all cursor-pointer">
        Priority
      </button>

      <button className="px-6 py-2 bg-purple-200 text-purple-700 font-medium rounded-full hover:bg-purple-300 shadow-md transition-all cursor-pointer">
        Time to Close
      </button>
    </div>
  </div>

</div>


    </div>
  );
};

export default LeadList;
