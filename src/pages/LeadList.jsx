import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Plus } from "lucide-react";
import axiosInstance from '../api/axiosInstance';

const LeadList = () => {
  const navigate = useNavigate();

  const [leadList, setLeadList] = useState([]);

  // Filters
  const [priorityFilter, setPriorityFilter] = useState("");
  const [agentFilter, setAgentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");

  // Sorting
  const [sortType, setSortType] = useState("");

  const [agents, setAgents] = useState([]);

  // Build Query Params
  const dynamicQuery = () => {
    const params = new URLSearchParams();

    if (priorityFilter) params.append("priority", priorityFilter);
    if (agentFilter) params.append("salesAgent", agentFilter);
    if (statusFilter) params.append("status", statusFilter);
    if (sourceFilter) params.append("source", sourceFilter);
    if (tagFilter) params.append("tags", tagFilter);
    if (sortType) params.append("sort", sortType);

    return params.toString();
  };

  const fetchLeads = async () => {
    try {
      const query = dynamicQuery();
      const res = await axiosInstance.get(`/leads?${query}`);
      setLeadList(res.data.leads || []);
    } catch (error) {
      console.error("Failed to fetch leads", error);
    }
  };

  // Fetch leads whenever filter/sort changes
  useEffect(() => {
    fetchLeads();
  }, [priorityFilter, agentFilter, statusFilter, sourceFilter, tagFilter, sortType]);

  // Fetch agents list
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await axiosInstance.get("/agents");
        setAgents(res.data.allAgents || []);
      } catch (error) {
        console.error("Failed to fetch agents", error);
      }
    };
    fetchAgents();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-100 via-white to-green-100
      py-8 px-4 md:px-6 lg:px-10">

      {/* Header */}
       <div className="max-w-4xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-4 mb-8">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-600">Lead List</h2>

        {/* Add Button */}
        <button
          onClick={() => navigate("/newLead")}
          className="bg-white/20 backdrop-blur-lg border border-white/30
          text-purple-700 p-4 rounded-full shadow-xl hover:bg-purple-400
          hover:scale-110 transition  self-end lg:self-auto"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Lead List */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <h3 className="text-2xl md:text-3xl text-center mb-6 text-gray-600">
          Lead Overview
        </h3>

        <div className="divide-y divide-gray-200">

             {leadList.length === 0 && (
            <div className="py-6 text-center text-gray-500 text-lg">
                No leads found for the selected filters.
               </div>
  )}

          {leadList.map((item, index) => (
            <div key={index}
              onClick={() => navigate(`/lead/${item._id}`)}
            className="py-4 hover:bg-purple-50 transition-all cursor-pointer">

              {/* Responsive Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-2 text-lg">

                {/* Lead Name */}
                <span className="font-semibold">{item.name}</span>

                {/* Status */}
                <span
                  className={`px-4 py-1 rounded-lg text-sm md:mx-auto w-fit ${
                    item.status === "New"
                      ? "bg-green-100 text-green-700"
                      : item.status === "Qualified"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-purple-100 text-purple-700"
                  }`}
                >
                  {item.status}
                </span>

                {/* Source */}
                <span className="text-gray-600 md:text-right">{item.source}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters + Sort */}
      <div className="max-w-4xl mx-auto mt-10 space-y-10">

        {/* Filters */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Filters:</h3>

          <div className="flex flex-wrap gap-3 md:gap-4 overflow-x-auto pb-2">

            {["High", "Medium", "Low"].map((p) => (
              <button
                key={p}
                onClick={() => setPriorityFilter(p)}
                className={`px-5 py-2 rounded-full whitespace-nowrap ${
                  priorityFilter === p
                    ? "bg-green-600 text-white"
                    : "bg-green-200 text-green-700"
                }`}
              >
                {p}
              </button>
            ))}

            {/* Agent Dropdown */}
            <select
              value={agentFilter}
              onChange={(e) => setAgentFilter(e.target.value)}
              className="px-4 py-2 rounded-lg bg-purple-200 text-purple-700"
            >
              <option value="">All Agents</option>
              {agents.map((ag) => (
                <option key={ag._id} value={ag._id}>
                  {ag.name}
                </option>
              ))}
            </select>

             <button
              onClick={() => setPriorityFilter("")}
              className="underline text-red-600 whitespace-nowrap cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Sort */}
        {/* <div>
          <h3 className="text-xl font-semibold mb-4">Sort By:</h3>

          {/* <div className="flex flex-wrap gap-3 md:gap-4 overflow-x-auto pb-2">

            <button
              onClick={() => setSortType("priority")}
              className={`px-6 py-2 rounded-full whitespace-nowrap ${
                sortType === "priority"
                  ? "bg-green-600 text-white"
                  : "bg-green-200 text-green-700"
              }`}
            >
              Priority
            </button> */}

            {/* <button
              onClick={() => setSortType("closeDate")}
              className={`px-6 py-2 rounded-full whitespace-nowrap ${
                sortType === "closeDate"
                  ? "bg-purple-600 text-white"
                  : "bg-purple-200 text-purple-700"
              }`}
            >
              Time to Close
            </button> */}

            {/* <button
              onClick={() => setSortType("")}
              className="underline text-red-600 whitespace-nowrap"
            >
              Clear
            </button>

          </div> */}

      </div>

     </div>
  );
};

export default LeadList;
