import React, { useEffect, useState } from 'react'
import axiosInstance from '../api/axiosInstance';
import Profile from "../assets/profile.jpg"
import { useNavigate } from 'react-router';

const SalesAgent = () => {

  const [agents, setAgents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axiosInstance.get("/agents");
        setAgents(response.data.allAgents || []);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchAgents();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">

      {/* Page Title */}
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-700">
        Sales Agent List
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white shadow-xl rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="p-3 text-left">Profile</th>
              <th className="p-3 text-left">Agent Name</th>
              <th className="p-3 text-left">Email</th>
            </tr>
          </thead>

          <tbody>
            {agents.map((agent, index) => (
              <tr
                key={index}
                className="border-b hover:bg-purple-100 transition"
              >
                <td className="p-3">
                  <img
                    src={Profile}
                    alt={agent.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>

                <td className="p-3 font-medium">{agent.name}</td>
                <td className="p-3">{agent.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4 mt-4">
        {agents.map((agent, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-4 flex items-center gap-4"
          >
            <img
              src={Profile}
              alt={agent.name}
              className="w-14 h-14 rounded-full object-cover"
            />

            <div>
              <p className="text-lg font-semibold">{agent.name}</p>
              <p className="text-gray-600 text-sm">{agent.email}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Agent Button */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => navigate("/agents")}
          className="bg-purple-600 text-xl font-semibold py-2 px-6 rounded-xl
          text-white hover:bg-purple-700 transition"
        >
          Add New Agent
        </button>
      </div>

    </div>
  );
};

export default SalesAgent;
