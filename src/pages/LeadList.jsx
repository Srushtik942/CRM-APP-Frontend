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
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    try {
      const query = dynamicQuery();
      const res = await axiosInstance.get(`/leads?${query}`);
      setLeadList(res.data.leads || []);
    } catch (error) {
      console.error("Failed to fetch leads", error);
    } finally {
      setIsLoading(false);
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

  const clearFilters = () => {
    setPriorityFilter("");
    setAgentFilter("");
    setStatusFilter("");
    setSourceFilter("");
    setTagFilter("");
    setSortType("");
  };

  return (
    <div className="mb-[5px] min-h-screen bg-linear-to-br from-purple-100 via-white to-green-100
      py-8 px-4 md:px-6 lg:px-10">

      {/* Header */}
      <div className="max-w-5xl mx-auto flex justify-end mb-8">
        <button
          onClick={() => navigate("/newLead")}
          aria-label="Add new lead"
          className="fixed bottom-5 right-5 z-10 bg-green-800 border border-green-800 p-3 text-white rounded-full shadow-sm
          hover:bg-green-900 hover:border-green-900 hover:shadow-md transition self-end lg:self-auto"
        >
          <Plus size={20} />
        </button>
      </div>

      <h2 className="max-w-5xl mx-auto mb-4 text-3xl font-bold text-green-900">Lead List</h2>

      <div className="max-w-5xl mx-auto mb-6 rounded-xl border border-lime-200 bg-white p-5 text-green-900 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h4 className="text-lg font-semibold">Filters</h4>

          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            {["High", "Medium", "Low"].map((p) => (
              <button
                key={p}
                onClick={() => setPriorityFilter(p)}
                className={`rounded-xl border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                  priorityFilter === p
                    ? "border-green-800 bg-green-800 text-white"
                    : "border-lime-300 bg-lime-100 text-green-900 hover:bg-lime-200"
                }`}
              >
                {p}
              </button>
            ))}

            {/* Agent Dropdown */}
            <select
              value={agentFilter}
              onChange={(e) => setAgentFilter(e.target.value)}
              className="rounded-xl border border-lime-300 bg-white px-4 py-2 text-sm text-green-900 outline-none focus:border-green-700"
            >
              <option value="">All Agents</option>
              {agents.map((ag) => (
                <option key={ag._id} value={ag._id}>
                  {ag.name}
                </option>
              ))}
            </select>

            {/* Clear filters — beside the filters */}
            <button
              onClick={clearFilters}
              className="rounded-xl border border-lime-300 bg-lime-100 px-4 py-2 text-sm font-medium text-green-900 whitespace-nowrap cursor-pointer hover:bg-lime-200 transition-colors"
            >
              Clear filters
            </button>
          </div>
        </div>
      </div>

      {/* Lead Overview */}
      <div className="max-w-5xl mx-auto overflow-hidden rounded-xl border border-lime-200 bg-lime-50 text-green-900 shadow-sm">
        {/* <div className="border-b border-lime-200 px-6 py-5">
          <h3 className="text-2xl font-bold">Lead Overview</h3>
        </div> */}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-lime-100">
              <tr className="border-b border-lime-200 text-green-900">
                <th className="px-6 py-3 font-semibold uppercase tracking-wide">Name</th>
                <th className="px-6 py-3 font-semibold uppercase tracking-wide">Status</th>
                <th className="px-6 py-3 font-semibold uppercase tracking-wide">Source</th>
                <th className="px-6 py-3 font-semibold uppercase tracking-wide">Agent</th>
                <th className="px-6 py-3 font-semibold uppercase tracking-wide">Priority</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="bg-lime-100 px-6 py-10 text-center">
                    <div className="inline-flex items-center gap-3 font-medium text-green-900" role="status">
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-green-900 border-t-transparent" />
                      Loading lead information...
                    </div>
                  </td>
                </tr>
              ) : leadList.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-green-900">
                    No leads found for the selected filters.
                  </td>
                </tr>
              ) : leadList.map((item) => (
                <tr
                  key={item._id}
                  onClick={() => navigate(`/lead/${item._id}`)}
                  className="border-b border-lime-100 transition-colors hover:bg-lime-100 cursor-pointer last:border-b-0"
                >
                  <td className="px-6 py-4 font-semibold">{item.name}</td>
                  <td className="px-6 py-4">{item.status}</td>
                  <td className="px-6 py-4">{item.source}</td>
                  <td className="px-6 py-4">{item.salesAgent?.name || "Unassigned"}</td>
                  <td className="px-6 py-4">{item.priority || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeadList;
