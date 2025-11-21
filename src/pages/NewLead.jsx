import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const NewLead = () => {
  const [leadName, setLeadName] = useState("");
  const [source, setSource] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [time, setTime] = useState("");
  const [agentsList, setAgentsList] = useState([]);
  const [salesAgents, setSalesAgents] = useState([]);
  const [tags, setTags] = useState([]);

  // fetch agents

  useEffect(()=>{
    const fetchAgents = async() =>{
      try{
        const res = await axiosInstance.get("/agents");
        console.log("Data",res.data);

        setAgentsList(res.data.allAgents);
      }catch(error){
        console.error("Failed to fetch agents",error);
      }
    }
    fetchAgents();
  },[]);

  // Handle Sales Agents (checkbox group)
  const handleSalesAgents = (e) => {
    const id = e.target.value;

    setSalesAgents((prev) =>
      prev.includes(id)
        ? prev.filter((v) => v !== id)
        : [...prev, id]
    );
  };

  // Handle tags (checkbox group)
  const handleTagChange = (e) => {
    const value = e.target.value;

    setTags((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const handleAddLead = async () => {
    const payload = {
      name: leadName,
      source,
      status,
      priority,
      timeToClose: Number(time),
      salesAgent: salesAgents,
      tags,
    };

    console.log("Payload:", payload);

    try {
      const res = await axiosInstance.post("/leads", payload);
      console.log("Lead Created:", res.data);
      alert("Lead added successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to create lead");
    }
  };

  return (
    <div className="bg-white py-10 px-6 shadow-2xl max-w-lg mx-auto rounded-lg">
      <h2 className="text-3xl font-semibold text-center">Add New Lead</h2>

      <div className="mt-10 flex flex-col gap-6">

        {/* Lead Name */}
        <div className="flex flex-col">
          <label className="font-semibold text-lg">Lead Name:</label>
          <input
            type="text"
            value={leadName}
            onChange={(e) => setLeadName(e.target.value)}
            className="border border-gray-400 rounded-md px-3 py-2"
            placeholder="John Doe"
          />
        </div>

        {/* Lead Source */}
        <div className="flex flex-col">
          <label className="font-semibold text-lg">Lead Source:</label>
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="border border-gray-400 rounded-md px-3 py-2"
          >
            <option value="">Select Source</option>
            <option value="Website">Website</option>
            <option value="Referral">Referral</option>
            <option value="Cold Call">Cold Call</option>
            <option value="Advertisement">Advertisement</option>
            <option value="Email">Email</option>
            <option value="Other">Other</option>

          </select>
        </div>

        {/* Sales Agent */}
        <div className="flex flex-col">
          <label className="font-semibold text-lg">Sales Agent:</label>

          <div className="flex flex-col gap-2 mt-2">
            {agentsList.length === 0 ? (
              <p>Loading...</p>
            ):(

            agentsList.map((agent) => (
              <label key={agent._id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                   value={agent._id}
                  onChange={handleSalesAgents}
                />
                {agent.name}
              </label>
            ))
          )}
          </div>
        </div>

        {/* Lead Status */}
        <div className="flex flex-col">
          <label className="font-semibold text-lg">Lead Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-400 rounded-md px-3 py-2"
          >
            <option value="">Select Status</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Closed">Closed</option>


          </select>
        </div>

        {/* Priority */}
        <div className="flex flex-col">
          <label className="font-semibold text-lg">Priority:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border border-gray-400 rounded-md px-3 py-2"
          >
            <option value="">Select Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Time */}
        <div className="flex flex-col">
          <label className="font-semibold text-lg">Time to Close (Days):</label>
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border border-gray-400 rounded-md px-3 py-2"
            placeholder="e.g. 10"
          />
        </div>

        {/* Tags */}
        <div className="flex flex-col">
          <label className="font-semibold text-lg">Tags:</label>

          <div className="flex flex-col gap-2 mt-2">
            {["important", "follow-up", "new"].map((tag) => (
              <label key={tag} className="flex items-center gap-2">
                <input type="checkbox" value={tag} onChange={handleTagChange} />
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleAddLead}
          className="bg-purple-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-purple-700 transition cursor-pointer"
        >
          Create Lead
        </button>
      </div>
    </div>
  );
};

export default NewLead;
