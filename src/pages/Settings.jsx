import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Plus } from "lucide-react";
import axiosInstance from '../api/axiosInstance';

const Settings = () => {
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

 const handleDeleteLead = async (id) => {
  try {
    await axiosInstance.delete(`/leads/${id}`);
    alert("Lead deleted successfully!");

    fetchLeads();
  } catch (error) {
    console.error("Error deleting lead", error);
  }
};


  return (
    <div className="min-h-screen bg-linear-to-br from-purple-100 via-white to-green-100
      py-8 px-4 md:px-6 lg:px-10">

      {/* Header */}
       <div className="max-w-4xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-4 mb-8">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-600">Lead List</h2>
      </div>

      {/* Lead List */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <h3 className="text-2xl md:text-3xl text-center mb-6 text-gray-600">
          Lead Overview
        </h3>

        <div className="divide-y divide-gray-200">
          {leadList.map((item, index) => (
            <div key={index}
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
                <span className=" md:text-right">
                    <button
                      onClick={() => handleDeleteLead(item._id)}
                    className='bg-red-600 text-white px-4 py-1 rounded-lg text-md cursor-pointer'>Delete</button>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>



    </div>
  );
};

export default Settings;
