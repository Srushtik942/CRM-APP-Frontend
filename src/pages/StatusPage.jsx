import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axiosInstance from "../api/axiosInstance";

const StatusPage = () => {
  const [leads, setLeads] = useState([]);
  const location = useLocation();

  // Get status from query params
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await axiosInstance.get(`/leads?status=${status}`);
        setLeads(response.data.leads);
      } catch (error) {
        console.error("Error fetching leads by status:", error);
      }
    };
    if (status) fetchLeads();
  }, [status]);

  return (
    <div className="p-4 md:p-10 lg:p-16">
      <h2 className="text-3xl font-bold mb-6 text-gray-600">
        Leads with Status: {status}
      </h2>

      {leads.length === 0 ? (
        <p className="text-gray-400">No leads found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {leads.map((lead) => (
            <div key={lead._id} className="p-4 bg-linear-to-br from-purple-100 via-white to-green-100 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold"> {lead.name}</h3>
              <p className="text-gray-500"> {lead.status}</p>
              <p className="text-gray-500 font-semibold">Agent: {lead.salesAgent?.name || "No Agent"}</p>
              <p className="text-gray-500 text-md">Tags: {lead.tags.join(", ") || "No Tags"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusPage;
