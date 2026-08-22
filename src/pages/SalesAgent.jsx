import React, { useEffect, useState } from 'react'
import axiosInstance from '../api/axiosInstance';
import Profile from "../assets/profile.jpg"
import Spinner from "../components/Spinner";
import { useNavigate } from 'react-router';

const SalesAgent = () => {

  const [agents, setAgents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgents = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get("/agents");
        setAgents(response.data.allAgents || []);
      } catch (error) {
        console.log("Error", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAgents();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">

      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="text-3xl font-bold text-green-900">
          Sales Agent List
        </h2>

        <button
          onClick={() => navigate("/agents")}
          className="bg-lime-50 text-green-900 text-base font-semibold py-2 px-5 rounded-lg
          hover:bg-lime-100 transition cursor-pointer"
        >
          Add New Agent
        </button>
      </div>

      {isLoading ? (
        <div className="flex min-h-40 items-center justify-center" role="status" aria-label="Loading agents">
          <Spinner size={40} />
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-hidden rounded-lg bg-lime-100 text-green-900 shadow-xl">
            <table className="w-full border-collapse">
              <thead className="border-b border-green-900/20 bg-lime-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide">Agent Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide">Email</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-green-900/15">
                {agents.map((agent, index) => (
                  <tr
                    key={index}
                    className="transition-colors hover:bg-lime-200"
                  >
                    <td className="px-6 py-4 font-medium">{agent.name}</td>
                    <td className="px-6 py-4">{agent.email}</td>
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
        </>
      )}

    </div>
  );
};

export default SalesAgent;
