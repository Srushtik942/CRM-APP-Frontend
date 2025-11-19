import React from "react";

const LeadManagement = () => {
  return (
    <div className="min-h-screen p-10 bg-linear-to-br from-purple-100 via-white to-green-200">

      {/* Title */}
      <h1 className="text-black text-3xl font-bold mb-10 border-b pb-4 w-fit">
        Lead Management: John Doe
      </h1>

      {/* Lead Details Card */}
      <div className="max-w-3xl bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-8 mx-auto border border-white/40">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Lead Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 text-lg text-gray-700">
          <p><span className="font-semibold">Lead Name:</span> John Doe</p>
          <p><span className="font-semibold">Sales Agent:</span> Vicky Kaushal</p>
          <p><span className="font-semibold">Lead Source:</span> Referral</p>
          <p><span className="font-semibold">Lead Status:</span> New</p>
          <p><span className="font-semibold">Priority:</span> High</p>
          <p><span className="font-semibold">Time to Close:</span> 30 Days</p>
        </div>

        <div className="text-center mt-8">
          <button className="bg-green-500 text-white px-6 py-2 rounded-xl shadow-md hover:bg-green-600 transition-all duration-300 cursor-pointer">
            Edit Details
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="max-w-3xl mx-auto mt-16 bg-white/70 p-8 rounded-2xl shadow-xl border border-white/40 backdrop-blur-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Comments Section
        </h2>

        {/* Comment Box */}
        <div className="bg-gray-100 p-5 rounded-xl shadow-inner mb-6">
          <p className="font-semibold">Mahendra Singh</p>
          <p className="text-sm text-gray-500">12-01-2021 • 8:01 AM</p>
          <p className="mt-2 text-gray-700">Reached out, waiting...</p>
        </div>

        {/* Add Comment */}
        <div className="flex gap-4 mt-6">
          <input
            type="text"
            placeholder="Add a new comment..."
            className="flex-1 px-4 py-2 text-black rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-300 outline-none"
          />
          <button className="bg-purple-600 text-white px-6 py-2 rounded-xl shadow-md hover:bg-purple-700 transition-all duration-300 cursor-">
            Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadManagement;
