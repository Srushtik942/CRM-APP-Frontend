import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { Check, ChevronDown, X } from "lucide-react";
import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";

const NewLead = () => {
  const [leadName, setLeadName] = useState("");
  const [source, setSource] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [time, setTime] = useState("");
  const [agentsList, setAgentsList] = useState([]);
  const [salesAgent, setSalesAgent] = useState("");
  const [tags, setTags] = useState([]);
  const [agentQuery, setAgentQuery] = useState("");

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

  // Handle tags (checkbox group)
  const handleTagChange = (e) => {
    const value = e.target.value;

    setTags((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const handleAddLead = async (event) => {
    event.preventDefault();

    const payload = {
      name: leadName,
      source,
      status,
      priority,
      timeToClose: Number(time),
      salesAgent,
      tags,
    };

    console.log("Payload:", payload);

    try {
      const res = await axiosInstance.post("/leads", payload);
      console.log("Lead Created:", res.data);
      toast.success("Lead Created Successfully!")
    } catch (err) {
      console.error(err);
      alert("Failed to create lead");
    }
  };

  return (
    <form
      onSubmit={handleAddLead}
      className="max-w-3xl mx-auto rounded-2xl  p-4 sm:p-6"
    >
      <div className="rounded-xl bg-lime-100 p-5 shadow-xl sm:p-7">
      <h2 className="text-2xl font-bold text-center text-green-800">Add New Lead</h2>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

        {/* Lead Name */}
        <div className="flex flex-col">
          <label className="font-semibold text-sm text-green-800">Lead Name</label>
          <input
            type="text"
            value={leadName}
            onChange={(e) => setLeadName(e.target.value)}
            className="mt-1 rounded-md border border-green-300 bg-green-50 px-3 py-2 text-green-900 outline-none transition placeholder:text-green-600/60 focus:border-green-500 focus:ring-2 focus:ring-green-100"
            placeholder="John Doe"
          />
        </div>

        {/* Lead Source */}
        <div className="flex flex-col">
          <label className="font-semibold text-sm text-green-800">Lead Source</label>
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="mt-1 rounded-md border border-green-300 bg-green-50 px-3 py-2 text-green-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
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
  <label className="font-semibold text-sm text-green-800">Sales Agent</label>
  <select
    value={salesAgent}
    onChange={(e) => setSalesAgent(e.target.value)}
    className="mt-1 rounded-md border border-green-300 bg-green-50 px-3 py-2 text-green-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
  >
    <option value="">Select Agent</option>
    {agentsList.length === 0 ? (
      <option disabled>Loading agents...</option>
    ) : (
      agentsList.map((agent) => (
        <option key={agent._id} value={agent._id}>
          {agent.name}
        </option>
      ))
    )}
  </select>
</div>

        {/* Lead Status */}
        <div className="flex flex-col">
          <label className="font-semibold text-sm text-green-800">Lead Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 rounded-md border border-green-300 bg-green-50 px-3 py-2 text-green-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
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
          <label className="font-semibold text-sm text-green-800">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="mt-1 rounded-md border border-green-300 bg-green-50 px-3 py-2 text-green-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
          >
            <option value="">Select Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Time */}
        <div className="flex flex-col">
          <label className="font-semibold text-sm text-green-800">Time to Close (Days)</label>
          <input
            type="number"
            min="0"
            value={time}
            onChange={(e) => setTime(e.target.value === "" ? "" : Math.max(0, Number(e.target.value)))}
            className="mt-1 rounded-md border border-green-300 bg-green-50 px-3 py-2 text-green-900 outline-none transition placeholder:text-green-600/60 focus:border-green-500 focus:ring-2 focus:ring-green-100"
            placeholder="e.g. 10"
          />
        </div>

        {/* Tags */}
        <div className="flex flex-col sm:col-span-2">
          <label className="font-semibold text-sm text-green-800">Tags</label>

          <div className="mt-2 flex flex-wrap gap-4">
            {["important", "follow-up", "new"].map((tag) => (
              <label key={tag} className="flex items-center gap-2 text-sm text-green-800">
                <input type="checkbox" value={tag} onChange={handleTagChange} />
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="sm:col-span-2 mt-2 rounded-md bg-green-700 py-2.5 text-base font-semibold text-white transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer"
        >
          Create Lead
        </button>
      </div>
      </div>
    </form>
  );
};

export default NewLead;
