import React, { useState } from 'react'
import axiosInstance from '../api/axiosInstance';
import { toast } from "react-hot-toast";

const NewAgent = () => {

  const [addAgent, setAddAgent] = useState("");
  const[name,setName] = useState("");
  const [email, setEmail] = useState("");

  const handleAddAgent = async()=>{
    try{
      const response = await axiosInstance.post('/agents',{
        name,
        email
      });
     console.log("Data",response.data);
      setName("");
      setEmail("");
      toast.success("New Agent Created Successfully!");
    }catch(error){
      console.error("Error to add new agent",error);
    }
  }


  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-2xl rounded-2xl p-8">

      <h2 className="text-3xl font-semibold text-center text-gray-600 ">
        Add New Sales Agent
      </h2>

      {/* Form Section */}
      <div className="flex flex-col gap-6 mt-10">

        {/* Agent Name */}
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-1">Agent Name</label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-1">Email ID</label>
          <input
            type="email"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

      </div>

      {/* Button */}
      <div className="mt-8 text-center">
        <button
        onClick={handleAddAgent}
        className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-xl shadow-md transition cursor-pointer">
          Create Agent
        </button>
      </div>
    </div>
  )
}

export default NewAgent
