import React from "react";
import { UserPlus, PhoneCall, Star } from "lucide-react";

const Body = () => {
  const statusData = [
    {
      title: "New",
      value: 10,
      icon: <UserPlus size={30} />,
      bg: "bg-green-100",
      text: "text-green-600",
    },
    {
      title: "Contacted",
      value: 10,
      icon: <PhoneCall size={30} />,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      title: "Qualified",
      value: 10,
      icon: <Star size={30} />,
      bg: "bg-purple-100",
      text: "text-purple-600",
    },
  ];

  return (
    <div className="p-10 w-full min-h-screen bg-linear-to-br from-gray-50 via-white to-purple-100">

      {/* Title */}
      <h2 className="text-center font-bold text-5xl mb-12 text-gray-900 tracking-wide drop-shadow-sm">
        Anvaya CRM Dashboard
      </h2>

      {/* Lead Buttons */}
      <div className="flex justify-center gap-8 mb-10">
        {["Lead 1", "Lead 2", "Lead 3"].map((lead, index) => (
          <button
            key={index}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-12 py-3 text-lg rounded-2xl
            shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            {lead}
          </button>
        ))}
      </div>

      {/* Lead Status Section */}
      <div className="mt-14">
        <h2 className="text-center font-semibold text-3xl mb-10 text-gray-800">
          Lead Status
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          {statusData.map((item, i) => (
            <div
              key={i}
              className="backdrop-blur-xl bg-white/60 shadow-xl p-10 rounded-3xl border border-white/50
              hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 text-center"
            >
              <div
                className={`mx-auto ${item.bg} ${item.text}
                w-16 h-16 flex items-center justify-center rounded-full shadow-sm mb-4`}
              >
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
              <p className={`${item.text} text-4xl font-bold mt-2`}>
                {item.value}
              </p>
            </div>
          ))}

        </div>
      </div>

      {/* Quick Filters */}
      <div className="mt-20 text-center">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Quick Filters</h3>

        <div className="flex justify-center gap-6 flex-wrap">
          {["New", "Contacted", "Qualified", "Closed"].map((filter, i) => (
            <button
              key={i}
              className="px-8 py-3 rounded-xl bg-white/70 backdrop-blur-md border border-gray-200
              shadow-md hover:bg-green-500 hover:text-white hover:scale-105 transition-all duration-300
              text-gray-700 font-medium"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Body;
