import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axiosInstance from "../api/axiosInstance";


const LeadManagement = () => {
  const {id} = useParams();
  const [lead,setLead] = useState(null);
  const [editDetails, setEditDetails] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(()=>{
    const fetchLead = async()=>{
      try{
      const response = await axiosInstance.get(`/leads/${id}`);
      setLead(response.data.response);
    }
  catch(error){
    console.error("Error fetch error",error);
  }
  }
    fetchLead();
  },[id]);

// fetch comments
  useEffect(()=>{
    const fetchComments = async() =>{
      try{
        const response = await axiosInstance.get(`/leads/${id}/comments`);
      console.log(response);
      setComments(response.data.resultData);

      }catch(error){
       console.error("Error fetch error",error);
      }

    }
    fetchComments();
  },[id]);

  if(!lead) return <p>Loading...</p>

  const handleEditDetails = async() =>{
    try{
    if(editDetails){
      await axiosInstance.put(`/leads/${id}`,lead);
    }
    setEditDetails(prev => !prev);
  }
  catch(error){
    console.log("Error",error);
  }
  }

  // handle add comment

  const handleAddComment = async () => {
  if (!commentText.trim()) return;

  try {
    const response = await axiosInstance.post(`/leads/${id}/comments`, {
      commentText,
    });

    // Add new comment at top
    setComments((prev) => [response.data , ...prev]);

    // Clear input
    setCommentText("");
  } catch (error) {
    console.log("Error", error);
  }
};


  return (
    <div className="min-h-screen p-10 bg-linear-to-br from-purple-100 via-white to-green-200">

      {/* Title */}
      <h1 className="text-black text-3xl font-bold mb-10 border-b pb-4 w-fit">
        Lead Management: {lead.name}
      </h1>

      {/* Lead Details Card */}
      <div className="max-w-3xl bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-8 mx-auto border border-white/40">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Lead Details
        </h2>


    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-3 text-md text-gray-700">

  {/* Lead Name */}
  <p className="min-w-0">
    <span className="font-semibold">Lead Name: </span>
    {editDetails ? (
      <input
        className="border px-2 py-1 rounded  w-full gap-2"
        value={lead.name}
        onChange={(e) =>
          setLead({ ...lead, name: e.target.value })
        }
      />
    ) : (
      lead.name
    )}
  </p>

  {/* Sales Agent Name */}
  <p className="min-w-0">
    <span className="font-semibold">Sales Agent: </span>
    {editDetails ? (
      <input
        className="border px-2 py-1 rounded  w-full gap-2"
        value={lead.salesAgent?.name || ""}
        onChange={(e) =>
          setLead({
            ...lead,
            salesAgent: { ...lead.salesAgent, name: e.target.value },
          })
        }
      />
    ) : (
      lead.salesAgent?.name
    )}
  </p>

  {/* Lead Source */}
  <p className="min-w-0">
    <span className="font-semibold">Lead Source: </span>
    {editDetails ? (
      <input
        className="border px-2 py-1 rounded  w-full gap-2"
        value={lead.source}
        onChange={(e) =>
          setLead({ ...lead, source: e.target.value })
        }
      />
    ) : (
      lead.source
    )}
  </p>

  {/* Status */}
  <p className="min-w-0">
    <span className="font-semibold">Lead Status: </span>
    {editDetails ? (
      <input
        className="border px-2 py-1 rounded  w-full gap-2"
        value={lead.status}
        onChange={(e) =>
          setLead({ ...lead, status: e.target.value })
        }
      />
    ) : (
      lead.status
    )}
  </p>

  {/* Priority */}
  <p className="min-w-0">
    <span className="font-semibold">Priority: </span>
    {editDetails ? (
      <input
        className="border px-2 py-1 rounded  w-full gap-2"
        value={lead.priority}
        onChange={(e) =>
          setLead({ ...lead, priority: e.target.value })
        }
      />
    ) : (
      lead.priority
    )}
  </p>

  {/* Time to close */}
  <p>
    <span className="font-semibold">Time to Close: </span>
    {editDetails ? (
      <input
        type="number"
        className="border px-2 py-1 rounded  w-full gap-2"
        value={lead.timeToClose}
        onChange={(e) =>
          setLead({ ...lead, timeToClose: e.target.value })
        }
      />
    ) : (
      `${lead.timeToClose} days`
    )}
  </p>

</div>
        <div className="text-center mt-8">
          <button
          onClick={handleEditDetails}
          className="bg-green-500 text-white px-6 py-2 rounded-xl shadow-md hover:bg-green-600 transition-all duration-300 cursor-pointer">
           {editDetails ? "Save Details" : "Edit Details"}
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="max-w-3xl mx-auto mt-16 bg-white/70 p-8 rounded-2xl shadow-xl border border-white/40 backdrop-blur-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Comments Section
        </h2>

        {/* Comment Box */}
       {comments?.length > 0 ? (
  comments.map((comment) => (
    <div
      key={comment._id}
      className="bg-gray-100 p-5 rounded-xl shadow-inner mb-6"
    >
      <p className="font-semibold">{comment.author?.name}</p>

      <p className="text-sm text-gray-500">
        {new Date(comment.createdAt).toLocaleDateString()} •{" "}
        {new Date(comment.createdAt).toLocaleTimeString()}
      </p>

      <p className="mt-2 text-gray-700">{comment.commentText}</p>
    </div>
  ))
) : (
  <p>No comments available</p>
)}


        {/* Add Comment */}
       <div className="flex gap-4 mt-6">
  <input
    type="text"
    placeholder="Add a new comment..."
    value={commentText}
    onChange={(e) => setCommentText(e.target.value)}
    className="flex-1 px-4 py-2 text-black rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-300 outline-none"
  />

  <button
    onClick={handleAddComment}
    className="bg-purple-600 text-white px-6 py-2 rounded-xl shadow-md hover:bg-purple-700 transition-all duration-300 cursor-pointer"
  >
    Comment
  </button>
</div>

      </div>
    </div>
  );
};

export default LeadManagement;
