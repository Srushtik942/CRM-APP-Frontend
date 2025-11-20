import React from 'react'

const SalesAgent = () => {
     const agents = [
    {image:"https://placehold.co/600x400/000000/FFF?text=profile", name: "John Doe", email: "john@example.com" },
    {image:"https://placehold.co/600x400/000000/FFF?text=profile", name: "Jane Smith", email: "jane@example.com" },
    {image:"https://placehold.co/600x400/000000/FFF?text=profile", name: "Rohan Kumar", email: "rohan@yahoo.com" },
    {image:"https://placehold.co/600x400/000000/FFF?text=profile", name: "Sneha Patil", email: "sneha@gmail.com" },
  ];

  return (
      <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center">Sales Agent List</h2>

      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="p-3 text-left">Profile</th>
              <th className="p-3 text-left">Agent Name</th>
              <th className="p-3 text-left">Email</th>

            </tr>
          </thead>

          <tbody>
            {agents.map((agent, index) => (
              <tr
                key={index}
                className="border-b hover:bg-purple-100 transition"
              >
                <td className="p-3"><img src={agent.image} alt={agent.name} className="w-12 h-12 rounded-full object-cover b"
                /></td>
                <td className="p-3">{agent.name}</td>
                <td className="p-3">{agent.email}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <button className='bg-purple-500 text-2xl font-semibold cursor-pointer mt-10 py-2 px-5 rounded-xl text-white hover:bg-purple-600 mx-100'>Add New Agent</button>
      </div>
    </div>
  )
}

export default SalesAgent
