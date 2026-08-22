import React, { useState } from 'react'
import axiosInstance from '../api/axiosInstance';
import { toast } from "react-hot-toast";

const NewAgent = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleAddAgent = async (event) => {
    event.preventDefault();

    if (!name.trim() || !email.trim()) {
      toast.error("Name and email are required.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.com$/i.test(email.trim())) {
      toast.error("Please enter a valid .com email address.");
      return;
    }

    try{
      const response = await axiosInstance.post('/agents',{
        name: name.trim(),
        email: email.trim()
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
    <div className="max-w-md mx-auto mt-10 bg-lime-50 text-green-900 shadow-2xl rounded-2xl p-8">

      <h2 className="text-3xl font-semibold text-center text-green-900 ">
        Add Sales Agent
      </h2>

      {/* Form Section */}
      <form id="new-agent-form" onSubmit={handleAddAgent} className="flex flex-col gap-6 mt-10">

        {/* Agent Name */}
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-1">Agent Name</label>
          <input
            type="text"
            className="border border-green-900/30 rounded-lg px-3 py-2 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-900 transition"
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
            className="border border-green-900/30 rounded-lg px-3 py-2 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-900 transition"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

      </form>

      {/* Button */}
      <div className="mt-8 text-center">
        <button
        type="submit"
        form="new-agent-form"
        className=" cursor-pointer bg-green-900 hover:bg-green-800 text-lime-50 font-medium px-6 py-2 rounded-xl shadow-md transition cursor-pointer">
          Create Agent
        </button>
      </div>
    </div>
  )
}

export default NewAgent
