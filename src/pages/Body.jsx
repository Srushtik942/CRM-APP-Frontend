import React, { useEffect, useState } from "react";
import { UserPlus, PhoneCall, Star,Send ,MailCheck, Archive  } from "lucide-react";
import axiosInstance from "../api/axiosInstance";
import axios from "axios";

const Body = () => {
  const [leads, setleads] = useState([]);
  const [newCount, setNewCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);
  const [closed, setClosed]= useState(0);
  const [qualifiedCount, setQualifiedCount] = useState(0);
  const [proposalCount, setProposalCount] = useState(0);
  const [activeFilter, setActiveFilter] = useState(null);


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
    <div className="p-10 w-full min-h-screen bg-linear-to-br from-green-50 via-pink to-purple-100">

      {/* Title */}
      <h2 className="text-center font-bold text-5xl mb-12 text-gray-600 tracking-wide drop-shadow-sm">
        Anvaya CRM Dashboard
      </h2>

      {/* Lead Buttons */}
      <div className="flex justify-center gap-8 mb-10">
        {  leads.length > 0 ? (
       leads.slice(0,3).map((lead, index) => (
          <button
            key={index}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-12 py-3 text-lg rounded-2xl
            shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            {lead.name }
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

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

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

        <div className="flex justify-center gap-6 flex-wrap">
          {["New", "Contacted", "Qualified", "Proposal Sent", "Closed"].map((filter, i) => (
            <button
              key={i}
              className="px-8 py-3 rounded-xl bg-white/70 backdrop-blur-md border border-gray-200
              shadow-md hover:bg-green-500 hover:text-white hover:scale-105 transition-all duration-300
              text-gray-700 font-medium cursor-pointer"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* buttons */}
       <button
           onClick={()=>navigate("/newLead")}
           className="bg-purple-500 hover:bg-purple-600 cursor-pointer text-white font-medium px-6 py-2 rounded-xl shadow-lg">
          Add New Lead
        </button>
    </div>
  );
};

export default Body;
