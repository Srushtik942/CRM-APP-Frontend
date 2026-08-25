import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { toast } from "react-hot-toast";


const Settings = () => {
  const [leadList, setLeadList] = useState([]);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await axiosInstance.get("/leads");
        setLeadList(res.data.leads || []);
      } catch (error) {
        console.error("Failed to fetch leads", error);
      }
    };

    fetchLeads();
  }, []);

  const handleDeleteLead = async (id) => {
    try {
      await axiosInstance.delete(`/leads/${id}`);
      setLeadList((currentLeads) => currentLeads.filter((lead) => lead._id !== id));
      toast.success("Lead deleted successfully!");
    } catch (error) {
      console.error("Error deleting lead", error);
    }
  };


  return (
    <main className="min-h-screen bg-lime-50 px-4 py-8 text-green-900 md:px-6 lg:px-10">

      <section className="mx-auto max-w-4xl rounded-2xl border border-lime-100 bg-white p-6 shadow-sm md:p-8">
        <h2 className="mb-6 text-center text-2xl font-semibold text-green-900 md:text-3xl">
          Lead Overview
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-lime-100 text-left">
            <thead className="bg-lime-50 text-sm uppercase tracking-wide text-green-900">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Lead</th>
                <th scope="col" className="px-4 py-3 font-semibold">Source</th>
                <th scope="col" className="px-4 py-3 font-semibold">Agent</th>
                <th scope="col" className="px-4 py-3 font-semibold">Status</th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-lime-100">
              {leadList.length > 0 ? leadList.map((item) => (
                <tr key={item._id} className="transition-colors hover:bg-lime-100">
                  <td className="whitespace-nowrap px-4 py-4 font-semibold text-green-900">
                    {item.name || "Untitled lead"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-green-900">
                    {item.source || "—"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-green-900">
                    {item.salesAgent?.name || "Unassigned"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4">
                    <span className="rounded-lg bg-lime-100 px-3 py-1 text-sm text-green-900">
                      {item.status || "—"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleDeleteLead(item._id)}
                      className="rounded-lg border border-green-700 px-3 py-1.5 text-sm font-semibold text-green-900 transition hover:bg-lime-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-sm text-green-900">
                    No leads available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default Settings;
