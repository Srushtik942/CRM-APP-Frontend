import React from "react";

const NewLead = () => {
  return (
    <div className="bg-white py-10 px-6 shadow-2xl max-w-lg mx-auto rounded-lg">
      <h2 className="text-3xl font-semibold text-center">Add New Lead</h2>

      <div className="mt-10 flex flex-col gap-6">

        {/* Lead Name */}
        <div className="flex flex-col">
          <label htmlFor="name" className="font-semibold text-lg">Lead Name:</label>
          <input
            id="name"
            type="text"
            className="border border-gray-400 rounded-md px-3 py-2"
            placeholder="John Doe"
          />
        </div>

        {/* Lead Source */}
        <div className="flex flex-col">
          <label htmlFor="source" className="font-semibold text-lg">Lead Source:</label>
          <select
            id="source"
            className="border border-gray-400 rounded-md px-3 py-2"
          >
            <option value="">Select Source</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="linkedin">LinkedIn</option>
            <option value="website">Website</option>
            <option value="referral">Referral</option>
          </select>
        </div>

        {/* Sales Agent  */}
       <div className="flex flex-col">
           <label className="font-semibold text-lg">Sales Agent:</label>

              <div className="flex flex-col gap-2 mt-2">
               <label className="flex items-center gap-2">
                <input type="checkbox" value="john" /> John
              </label>
               <label className="flex items-center gap-2">
              <input type="checkbox" value="priya" /> Priya
            </label>
           <label className="flex items-center gap-2">
              <input type="checkbox" value="rohan" /> Rohan
            </label>
         <label className="flex items-center gap-2">
         <input type="checkbox" value="sneha" /> Sneha
       </label>
   </div>
</div>


        {/* Lead Status */}
        <div className="flex flex-col">
          <label htmlFor="status" className="font-semibold text-lg">Lead Status:</label>
          <select
            id="status"
            className="border border-gray-400 rounded-md px-3 py-2"
          >
            <option value="">Select Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="in-progress">In Progress</option>
            <option value="qualified">Qualified</option>
            <option value="lost">Lost</option>
          </select>
        </div>

        {/* Priority */}
        <div className="flex flex-col">
          <label htmlFor="priority" className="font-semibold text-lg">Priority:</label>
          <select
            id="priority"
            className="border border-gray-400 rounded-md px-3 py-2"
          >
            <option value="">Select Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Time  */}
        <div className="flex flex-col">
          <label htmlFor="time" className="font-semibold text-lg">Time to Close (Days):</label>
          <input
            id="time"
            type="number"
            className="border border-gray-400 rounded-md px-3 py-2"
            placeholder="e.g. 10"
          />
        </div>

        {/* Tags  */}
        <div className="flex flex-col">
  <label className="font-semibold text-lg">Tags:</label>

  <div className="flex flex-col gap-2 mt-2">
    <label className="flex items-center gap-2">
      <input type="checkbox" value="important" /> Important
    </label>
    <label className="flex items-center gap-2">
      <input type="checkbox" value="follow-up" /> Follow Up
    </label>
    <label className="flex items-center gap-2">
      <input type="checkbox" value="new" /> New Lead
    </label>
  </div>
</div>

        {/* Button */}
        <button className="bg-purple-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-purple-700 transition cursor-pointer">
          Create Lead
        </button>

      </div>
    </div>
  );
};

export default NewLead;
