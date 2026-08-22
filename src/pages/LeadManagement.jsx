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
      <h1 className="text-green-800 text-3xl font-bold mb-10 border-b border-green-800 pb-4 w-fit">
        Lead Management: <span className="font-bold text-green-800">{lead.name}</span>
      </h1>

      {/* Lead Details Card */}
      <div className="max-w-3xl bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-8 mx-auto border border-white/40">
        <h2 className="text-2xl font-semibold text-green-800 text-center mb-6">
          Lead Details
        </h2>


    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-3 text-md text-green-800">

  {/* Lead Name */}
  <p className="min-w-0">
    <span className="font-bold text-green-800">Lead Name: </span>
    <input
      type="text"
      placeholder="Enter lead name"
      readOnly={!editDetails}
      className="border border-lime-500 px-2 py-1 rounded w-full gap-2 text-green-800 placeholder:text-green-800/60 focus:outline-none focus:ring-2 focus:ring-lime-500 read-only:bg-lime-100"
      value={lead.name || ""}
      onChange={(e) =>
        setLead({ ...lead, name: e.target.value })
      }
    />
  </p>

  {/* Sales Agent Name */}
  <p className="min-w-0">
    <span className="font-bold text-green-800">Sales Agent: </span>
    <input
      type="text"
      placeholder="Enter sales agent name"
      readOnly={!editDetails}
      className="border border-lime-500 px-2 py-1 rounded w-full gap-2 text-green-800 placeholder:text-green-800/60 focus:outline-none focus:ring-2 focus:ring-lime-500 read-only:bg-lime-100"
      value={lead.salesAgent?.name || ""}
      onChange={(e) =>
        setLead({
          ...lead,
          salesAgent: { ...lead.salesAgent, name: e.target.value },
        })
      }
    />
  </p>

  {/* Lead Source */}
  <p className="min-w-0">
    <span className="font-bold text-green-800">Lead Source: </span>
    <input
      type="text"
      placeholder="Enter lead source"
      readOnly={!editDetails}
      className="border border-lime-500 px-2 py-1 rounded w-full gap-2 text-green-800 placeholder:text-green-800/60 focus:outline-none focus:ring-2 focus:ring-lime-500 read-only:bg-lime-100"
      value={lead.source || ""}
      onChange={(e) =>
        setLead({ ...lead, source: e.target.value })
      }
    />
  </p>

  {/* Status */}
  <p className="min-w-0">
    <span className="font-bold text-green-800">Lead Status: </span>
    <input
      type="text"
      placeholder="Enter lead status"
      readOnly={!editDetails}
      className="border border-lime-500 px-2 py-1 rounded w-full gap-2 text-green-800 placeholder:text-green-800/60 focus:outline-none focus:ring-2 focus:ring-lime-500 read-only:bg-lime-100"
      value={lead.status || ""}
      onChange={(e) =>
        setLead({ ...lead, status: e.target.value })
      }
    />
  </p>

  {/* Priority
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
  </p> */}

  {/* Time to close */}
  <p>
    <span className="font-bold text-green-800">Time to Close: </span>
    <input
      type="number"
      placeholder="Enter days to close"
      readOnly={!editDetails}
      className="border border-lime-500 px-2 py-1 rounded w-full gap-2 text-green-800 placeholder:text-green-800/60 focus:outline-none focus:ring-2 focus:ring-lime-500 read-only:bg-lime-100"
      value={lead.timeToClose || ""}
      onChange={(e) =>
        setLead({ ...lead, timeToClose: e.target.value })
      }
    />
  </p>

</div>
        <div className="text-center mt-8">
          <button
          onClick={handleEditDetails}
          className="bg-green-800 text-lime-50 px-6 py-2 rounded-xl shadow-md hover:bg-green-700 transition-all duration-300 cursor-pointer">
           {editDetails ? "Save Details" : "Edit Details"}
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="max-w-3xl mx-auto mt-16 bg-white/70 p-8 rounded-2xl shadow-xl border border-white/40 backdrop-blur-lg">
        <h2 className="text-2xl font-semibold text-green-800 mb-6">
          Comments Section
        </h2>

        {/* Comment Box */}
       {comments?.length > 0 ? (
  comments.map((comment) => (
    <div
      key={comment._id}
      className="bg-lime-50 p-5 rounded-xl shadow-inner mb-6 text-green-800"
    >
      <p className="font-semibold">{comment.author?.name}</p>

      <p className="text-sm text-green-800/70">
        {new Date(comment.createdAt).toLocaleDateString()} •{" "}
        {new Date(comment.createdAt).toLocaleTimeString()}
      </p>

      <p className="mt-2 text-green-800">{comment.commentText}</p>
    </div>
  ))
) : (
  <p className="text-green-800">No comments available</p>
)}


        {/* Add Comment */}
       <div className="flex gap-4 mt-6">
  <input
    type="text"
    placeholder="Add a new comment..."
    value={commentText}
    onChange={(e) => setCommentText(e.target.value)}
    className="flex-1 px-4 py-2 text-green-800 rounded-xl border border-lime-500 placeholder:text-green-800/60 focus:ring-2 focus:ring-lime-500 outline-none"
  />

  <button
    onClick={handleAddComment}
    className="bg-green-800 text-lime-50 px-6 py-2 rounded-xl shadow-md hover:bg-green-700 transition-all duration-300 cursor-pointer"
  >
    Comment
  </button>
</div>

      </div>
    </div>
  );
};

export default LeadManagement;
