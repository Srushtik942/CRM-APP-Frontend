import React, { useEffect, useMemo, useState } from "react";
import { Archive, MailCheck, PhoneCall, Plus, Star, UserPlus } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import Spinner from "../components/Spinner"

const statuses = ["New", "Contacted", "Qualified", "Proposal Sent", "Closed"];

const Body = () => {
  const [leads, setLeads] = useState([]);
  const [agents, setAgents] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [, setSearchParams] = useSearchParams();
  const [leadsLoading, setLeadsLoading] = useState(true);
  const [agentLoading, setAgentLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage]= useState(6);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeads = async () => {
      setLeadsLoading(true);
      try {
        const params = { page: currentPage + 1, limit: itemsPerPage };
        if (selectedFilter) params.status = selectedFilter;
        const response = await axiosInstance.get("/leads",{params});
        setLeads(response.data.leads || []);
        setTotalItems(response.data.count || 0);
      } catch (error) {
        console.error("Error fetching leads.", error);
      }finally{
        setLeadsLoading(false);
      }
    };

    fetchLeads();

    const fetchAgents = async () => {
      setAgentLoading(true);
      try {
        const response = await axiosInstance.get("/agents");
        setAgents(response.data.allAgents || []);
      } catch (error) {
        console.error("Error fetching agents.", error);
      }finally{
        setAgentLoading(false);
      }
    };
    fetchAgents();
  }, [currentPage, itemsPerPage, selectedFilter]);


  // pagination

  const numOfPages = Math.ceil(totalItems/itemsPerPage);
  const pages = [...Array(numOfPages).keys()]


  const statusData = useMemo(() => [
    { title: "New", icon: <UserPlus size={24} />, bg: "bg-lime-100", text: "text-lime-700" },
    { title: "Contacted", icon: <PhoneCall size={24} />, bg: "bg-green-100", text: "text-green-700" },
    { title: "Qualified", icon: <Star size={24} />, bg: "bg-emerald-100", text: "text-emerald-700" },
    { title: "Proposal Sent", icon: <MailCheck size={24} />, bg: "bg-yellow-100", text: "text-yellow-700" },
    { title: "Closed", icon: <Archive size={24} />, bg: "bg-green-200", text: "text-green-800" },
  ].map((item) => ({ ...item, value: leads.filter((lead) => lead.status === item.title).length })), [leads]);

  const handleFilterChange = (event) => {
    const status = event.target.value;
    setSelectedFilter(status);
    setSearchParams(status ? {status}:{});
    setCurrentPage(0);
  };

  const handleItemsPerPage = (e) => {
  const value = parseInt(e.target.value);
  setItemsPerPage(value);
  setCurrentPage(0);
};

const HandlePreviousBtn=()=>{
  if(currentPage > 0){
    setCurrentPage(currentPage - 1)
  }
}


const HandleNextBtn = ()=>{
  if(currentPage< pages.length-1){
    setCurrentPage(currentPage + 1)
    console.log(currentPage)
  }
}


  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white p-4 text-green-950 sm:p-6 lg:p-10">
      <style>{`@keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <section className="mx-auto mb-10 max-w-7xl">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-bold text-green-900">Lead Status</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {leadsLoading ?
          Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-xl border border-green-100 bg-lime-100 p-5 shadow-sm">
          <div className="mb-4 h-11 w-11 rounded-full bg-green-300" />
          <div className="h-4 w-20 rounded bg-green-300" />
          <div className="mt-2 h-6 w-10 rounded bg-green-300" />
        </div>
      )):
          statusData.map((item, index) => <div key={item.title} style={{ animationDelay: `${index * 70}ms` }} className="animate-[fadeInUp_0.5s_ease-out_both] rounded-xl border border-green-100 bg-lime-50 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"><div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-full ${item.bg} ${item.text}`}>{item.icon}</div><h3 className="text-base font-semibold text-green-900">{item.title}</h3><p className={`mt-1 text-3xl font-bold ${item.text}`}>{item.value}</p></div>)}
        </div>
      </section>
      <section className="mx-auto mb-10 grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-green-100 bg-lime-50 p-5 shadow-sm">
           <div className="mb-4 flex items-center justify-between">
            <h2 className=" text-2xl font-bold text-green-900 ">Top Leads</h2>
            <button onClick={() => navigate("/leadList")} className="text-sm font-semibold text-green-700 hover:text-green-900 cursor-pointer">View all leads →</button>
            </div>
          <div className="space-y-3">{
            leadsLoading
            ? Array.from({length:3}).map((_,i)=>(
            <div key={i} className="flex w-full animate-pulse items-center justify-between rounded-lg bg-white p-4 shadow-sm">
              <div className="h-4 w-32 rounded bg-green-100" />
              <div className="h-4 w-16 rounded bg-green-100"/>
            </div>
            )):
          leads.slice(0, 3).map((lead) =>( <button key={lead._id} onClick={() => navigate(`/lead/${lead._id}`)} className="flex w-full items-center justify-between rounded-lg bg-white p-4 text-left shadow-sm transition hover:translate-x-1 hover:shadow-md"><span className="font-semibold text-green-900">{lead.name}</span><span className="text-sm text-green-700">{lead.status}</span></button>)

          )}</div>
        </div>
        <div className="rounded-xl border border-green-100 bg-lime-50 p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between"><h2 className="text-2xl font-bold text-green-900">Top Agents</h2><button onClick={() => navigate("/sales")} className="text-sm font-semibold text-green-700 hover:text-green-900">View all agents →</button></div>
          <div className="space-y-3">
          {agentLoading
            ? Array.from({length: 3}).map((_,i)=>(
           <div key={i} className="flex w-full animate-plus items-center justify-between rounded-lg bg-white p-4 shadow-sm ">
            <div className="h-4 w-32 rounded bg-green-100" />
            <div className="h-4 w-16 rounded bg-green-100"/>
           </div>
            )):
          agents.slice(0, 3).map((agent, index) => <div key={agent._id || index} className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm transition hover:translate-x-1 hover:shadow-md"><span className="font-semibold text-green-900">{agent.name}</span><span className="text-sm text-green-700">{agent.email}</span></div>)}</div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl"><div className="mb-5 flex flex-wrap items-center justify-between gap-3"><h2 className="text-2xl font-bold text-green-900">All Leads</h2><label className="flex items-center gap-3 text-sm font-semibold text-green-800">Quick Filter<select value={selectedFilter} onChange={handleFilterChange} className="rounded-lg border border-green-200 bg-lime-50 px-3 py-2 text-green-900 outline-none focus:ring-2 focus:ring-green-600"><option value="">Select status</option>{statuses.map((status) => <option key={status} value={status}>{status}</option>)}</select></label></div>
        { leadsLoading ? (
          <div className="flex justify-center py-16">
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-green-200 border-t-green-700"
        role="status"
        aria-label="Loading leads"
      />
    </div>

         ): leads.length === 0 ?(
        <p className="rounded-xl border border-dashed border-green-200 p-8 text-center text-green-700">No leads available.</p> ):
        (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {leads.map((lead) => <button key={lead._id} onClick={() => navigate(`/lead/${lead._id}`)} className="rounded-xl border border-green-100 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-green-300 hover:shadow-md"><div className="flex items-start justify-between gap-3"><h3 className="text-lg font-bold text-green-900">{lead.name}</h3><span className="rounded-full bg-lime-100 px-3 py-1 text-xs font-semibold text-green-800">{lead.status}</span></div><p className="mt-3 text-sm text-green-700">{lead.salesAgent.name || "No email provided"}</p><p className="mt-1 text-sm text-green-700">{lead.source || "No phone provided"}</p></button>)}</div>)}
      </section>
      <button onClick={() => navigate("/newLead")} aria-label="Add new lead" className=" cursor-pointer fixed bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-green-800 text-white shadow-lg transition hover:scale-105 hover:bg-green-900"><Plus size={20} /></button>
      {numOfPages > 0 && (
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2 rounded-xl border border-lime-200 bg-lime-100 p-3">
        <button
          type="button"
          onClick={HandlePreviousBtn}
          disabled={currentPage === 0}
          className="rounded-lg bg-lime-200 px-3 py-2 text-sm font-semibold text-green-800 transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => setCurrentPage(page)}
            aria-current={currentPage === page ? "page" : undefined}
            className={`h-9 min-w-9 rounded-lg px-3 text-sm font-bold transition ${currentPage === page ? "bg-green-800 text-lime-100" : "bg-lime-200 text-green-800 hover:bg-lime-300"}`}
          >
            {page + 1}
          </button>
        ))}
        <button
          type="button"
          onClick={HandleNextBtn}
          disabled={currentPage === pages.length - 1}
          className="rounded-lg bg-lime-200 px-3 py-2 text-sm font-semibold text-green-800 transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
        <label className="ml-2 flex items-center gap-2 text-sm font-semibold text-green-800">
          Per page
          <select onChange={handleItemsPerPage} value={itemsPerPage} className="rounded-lg border border-lime-300 bg-lime-50 px-3 py-2 text-green-800 outline-none focus:ring-2 focus:ring-green-600">
  <option value="5">5</option>
  <option value="10">10</option>
  <option value="20">20</option>
  <option value="30">30</option>
  <option value="50">50</option>
</select>
        </label>
      </div>
      )}
    </main>
  );
};

export default Body;
