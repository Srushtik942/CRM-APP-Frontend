import React, { useEffect, useState } from "react";
import { UserPlus, PhoneCall, Star,Send ,MailCheck, Archive ,Plus  } from "lucide-react";
import axiosInstance from "../api/axiosInstance";
import axios from "axios";
import { useNavigate } from "react-router";

const Body = () => {
  const [leads, setleads] = useState([]);
  const [newCount, setNewCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);
  const [closed, setClosed]= useState(0);
  const [qualifiedCount, setQualifiedCount] = useState(0);
  const [proposalCount, setProposalCount] = useState(0);
  const [activeFilter, setActiveFilter] = useState(null);
  const navigate = useNavigate();


  useEffect(()=>{
    const fetchLeads = async()=>{
     try{
      const response = await axiosInstance.get("/leads");
      console.log(response.data.leads);
      setleads(response.data.leads);
       }catch(error){
         console.error("Error fetching leads.",error);
       }
    }
    fetchLeads();
  },[]);


  useEffect(()=>{
    if(leads.length > 0){
    setNewCount(leads.filter(l => l.status === "New").length);
    setContactCount(leads.filter(l => l.status === "Contacted").length);
    setQualifiedCount(leads.filter(l => l.status === "Qualified").length);
    setProposalCount(leads.filter(l => l.status === "Proposal Sent").length);
    setClosed(leads.filter(l => l.status === "Closed").length);
    }
  },[leads]);

 const statusData = [
  {
    title: "New",
    value: newCount,
    icon: <UserPlus size={30} />,
    bg: "bg-green-100",
    text: "text-green-600",
  },
  {
    title: "Contacted",
    value: contactCount,
    icon: <PhoneCall size={30} />,
    bg: "bg-blue-100",
    text: "text-blue-600",
  },
  {
    title: "Qualified",
    value: qualifiedCount,
    icon: <Star size={30} />,
    bg: "bg-purple-100",
    text: "text-purple-600",
  },

  {
    title: "Proposal Sent",
    value: proposalCount,
    icon: <MailCheck size={30} />,
    bg: "bg-yellow-100",
    text: "text-yellow-600",
  },
  {
    title: "Closed",
    value: closed,
    icon: <Archive size={30} />,
    bg: "bg-red-100",
    text: "text-red-600",
  },
];

  return (
    <div className="p-4 md:p-10 lg:p-16 w-full min-h-screen overflow-x-hidden">

      {/* Title */}
      <h2 className="text-center font-bold text-3xl sm:text-4xl mb-8 text-gray-600 tracking-wide drop-shadow-sm md:text-5xl md:mb-12 xl:text-6xl" >
        Anvaya CRM Dashboard
      </h2>


      {/* Lead Buttons - Height Reduced */}
      <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 lg:gap-12 mb-10 px-2">
        {  leads.length > 0 ? (
       leads.slice(0,3).map((lead, index) => (
          <button
    key={index}
    onClick={()=> navigate(`/lead/${lead._id}`)}
    className="
      group relative
  bg-gradient-to-r from-green-500 to-green-700
  text-white px-6 py-1 text-sm sm:px-8 sm:py-2 md:px-12 md:py-2 md:text-base
  rounded-2xl shadow-xl
  hover:shadow-2xl hover:scale-105
  active:scale-95 transition-all duration-300
  overflow-hidden
    "
  >
    {/* Glow effect */}
    <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-xl"></span>

    {/* Shine animation */}
    <span className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent
    translate-x-[-150%] group-hover:translate-x-[150%] transition-all duration-700 ease-in-out"></span>

    {lead.name}
  </button>
        ))
        ):(
          <p className="text-gray-400 text-lg">Loading leads...</p>
        )
      }
      </div>

      {/* Lead Status Section */}
      <div className="mt-14">
        <h2 className="text-center font-semibold text-3xl mb-10 text-gray-600">
          Lead Status
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-10 max-w-7xl mx-auto px-4">

          {statusData.map((item, i) => (
            <div
  key={i}
  className="backdrop-blur-xl bg-white/70 shadow-lg p-6 rounded-2xl border border-white/40
  hover:-translate-y-1 hover:shadow-xl transition-all duration-200 text-center"
>
              <div
                className={`mx-auto ${item.bg} ${item.text}
                w-12 h-12 flex items-center justify-center rounded-full shadow-sm mb-4`}
              >
                {item.icon}
              </div>

              <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
              <p className={`${item.text} text-3xl font-bold mt-1`}>
                {item.value}
              </p>
            </div>
          ))}

        </div>
      </div>

      {/* Quick Filters */}
      <div className="mt-20 text-center">
        <h3 className="text-2xl font-semibold mb-6 text-gray-600">Quick Filters</h3>

        <div className="flex justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 flex-wrap px-2">
          {["New", "Contacted", "Qualified", "Proposal Sent", "Closed"].map((filter, i) => (
            <button
              key={i}
              onClick={() => navigate(`/status?status=${filter}`)}
              className="px-4 py-2 text-sm sm:text-base md:px-8 md:py-3
              lg:px-10 lg:py-4
              rounded-xl bg-white/70
shadow-md hover:bg-green-500 hover:text-white
transition-all duration-300 text-gray-700"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Floating Action Button (FAB) - ENFORCED SQUARE AND CIRCULAR */}
    <button
  onClick={() => navigate("/newLead")}
  className="fixed bottom-6 right-6 md:top-12 md:right-12 z-50
bg-white/20 backdrop-blur-lg border border-white/30
// 👇 Ensured the element is a perfect square (w-12 h-12) and centered
w-12 h-12 flex items-center justify-center
text-purple-700 rounded-full shadow-xl
transition-all duration-300 hover:bg-purple-400 hover:scale-110"
>
  <Plus size={18} />
</button>

    </div>
  );
};

export default Body;