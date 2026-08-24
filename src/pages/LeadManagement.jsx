import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axiosInstance from "../api/axiosInstance";

const TAG_OPTIONS = ["important", "follow-up", "new"];
const inputClassName =
  "mt-1 w-full rounded-lg border border-green-200 bg-white px-3 py-2 text-green-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:bg-green-50";

const LeadManagement = () => {
  const { id } = useParams();
  const [lead, setLead] = useState(null);
  const [editDetails, setEditDetails] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const response = await axiosInstance.get(`/leads/${id}`);
        setLead(response.data.response);
      } catch (error) {
        console.error("Unable to fetch lead:", error);
      }
    };

    fetchLead();
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(`/leads/${id}/comments`);
        console.log(response);
        setComments(response.data.resultData || []);
      } catch (error) {
        console.error("Unable to fetch comments:", error);
      }
    };

    fetchComments();
  }, [id]);

  const updateLead = (field, value) => {
    setLead((currentLead) => ({ ...currentLead, [field]: value }));
  };

  const toggleTag = (tag) => {
    const currentTags = Array.isArray(lead.tags) ? lead.tags : [];
    const tags = currentTags.includes(tag)
      ? currentTags.filter((item) => item !== tag)
      : [...currentTags, tag];

    updateLead("tags", tags);
  };

  const handleAddTag = async () => {
    const tag = newTag.trim().toLowerCase();
    const currentTags = Array.isArray(lead.tags) ? lead.tags : [];

    if (!tag || currentTags.includes(tag)) {
      return;
    }

    const tags = [...currentTags, tag];

    try {
      await axiosInstance.put(`/leads/${id}`, { tags });
      updateLead("tags", tags);
      setNewTag("");
    } catch (error) {
      console.error("Unable to add tag:", error);
    }
  };

  const handleEditDetails = async () => {
    try {
      if (editDetails) {
        await axiosInstance.put(`/leads/${id}`, lead);
      }
      setEditDetails((isEditing) => !isEditing);
    } catch (error) {
      console.error("Unable to save lead:", error);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    try {
      const response = await axiosInstance.post(`/leads/${id}/comments`, {
        commentText: commentText.trim(),
      });
      setComments((currentComments) => [response.data, ...currentComments]);
      setCommentText("");
    } catch (error) {
      console.error("Unable to add comment:", error);
    }
  };

  if (!lead) {
    return <p className="p-6 text-green-900">Loading lead details...</p>;
  }

  const tags = Array.isArray(lead.tags) ? lead.tags : [];

  return (
    <main className="min-h-screen bg-lime-50 px-4 py-6 text-green-900 sm:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 border-b border-green-200 pb-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-green-900">
            Lead management
          </p>
          <h1 className="mt-1 break-words text-3xl font-bold tracking-tight text-green-900 sm:text-4xl">
            {lead.name || "Untitled lead"}
          </h1>
        </header>

        <section className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-bold text-green-900">Lead details</h2>
            <button
              type="button"
              onClick={handleEditDetails}
              className="rounded-lg bg-green-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
            >
              {editDetails ? "Save changes" : "Edit details"}
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <label className="text-sm font-semibold text-green-900">
              Lead name
              <input type="text" value={lead.name || ""} disabled={!editDetails} onChange={(event) => updateLead("name", event.target.value)} className={inputClassName} />
            </label>

            <label className="text-sm font-semibold text-green-900">
              Sales agent
              <input type="text" value={lead.salesAgent?.name || ""} disabled={!editDetails} onChange={(event) => setLead((currentLead) => ({ ...currentLead, salesAgent: { ...currentLead.salesAgent, name: event.target.value } }))} className={inputClassName} />
            </label>

            <label className="text-sm font-semibold text-green-900">
              Lead source
              <input type="text" value={lead.source || ""} disabled={!editDetails} onChange={(event) => updateLead("source", event.target.value)} className={inputClassName} />
            </label>

            <label className="text-sm font-semibold text-green-900">
              Status
              <input type="text" value={lead.status || ""} disabled={!editDetails} onChange={(event) => updateLead("status", event.target.value)} className={inputClassName} />
            </label>

            <label className="text-sm font-semibold text-green-900">
              Priority
              <select value={lead.priority || ""} disabled={!editDetails} onChange={(event) => updateLead("priority", event.target.value)} className={inputClassName}>
                <option value="">Select priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </label>

            <label className="text-sm font-semibold text-green-900">
              Time to close (days)
              <input
                type="number"
                min="0"
                value={lead.timeToClose ?? ""}
                disabled={!editDetails}
                onChange={(event) => updateLead(
                  "timeToClose",
                  event.target.value === "" ? "" : Math.max(0, Number(event.target.value)),
                )}
                className={inputClassName}
              />
            </label>

            <div className="sm:col-span-2">
              <p className="text-sm font-semibold text-green-900">Tags</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {TAG_OPTIONS.map((tag) => (
                  <label key={tag} className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${tags.includes(tag) ? "border-green-700 bg-green-100 text-green-900" : "border-green-200 bg-white text-green-900"} ${editDetails ? "cursor-pointer" : "cursor-default"}`}>
                    <input type="checkbox" checked={tags.includes(tag)} disabled={!editDetails} onChange={() => toggleTag(tag)} className="sr-only" />
                    {tag}
                  </label>
                ))}
                {tags.filter((tag) => !TAG_OPTIONS.includes(tag)).map((tag) => (
                  <span key={tag} className="rounded-full border border-green-700 bg-green-100 px-3 py-1.5 text-sm font-medium text-green-900">
                    {tag}
                  </span>
                ))}
              </div>
              {editDetails && (
                <div className="mt-3 flex items-center gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(event) => setNewTag(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        handleAddTag();
                      }
                    }}
                    placeholder="Add a tag"
                    className="w-full min-w-0 max-w-xs rounded-lg border border-green-200 bg-white px-3 py-2 text-green-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="shrink-0 rounded-lg border border-green-700 px-3 py-1.5 text-sm font-semibold text-green-900 transition hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                  >
                    Add tag
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-green-100 bg-white p-5 shadow-sm sm:p-7">
          <h2 className="text-xl font-bold text-green-900">Comments</h2>

          <div className="mt-5 space-y-3">
            {comments.length > 0 ? comments.map((comment) => (
              <article key={comment._id} className="rounded-xl bg-green-50 p-4">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-semibold text-green-900">{comment.author?.name || "Team member"}</p>
                  <time className="text-xs text-green-900" dateTime={comment.createdAt}>
                    {comment.createdAt ? new Date(comment.createdAt).toLocaleString() : ""}
                  </time>
                </div>
                <p className="mt-2 break-words text-sm text-green-900">{comment.commentText}</p>
              </article>
            )) : <p className="text-sm text-green-900">No comments yet.</p>}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input type="text" value={commentText} onChange={(event) => setCommentText(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") handleAddComment(); }} placeholder="Add a comment" className={inputClassName.replace("mt-1 ", "")} />
            <button type="button" onClick={handleAddComment} className="shrink-0 rounded-lg bg-green-800 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
              Add comment
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default LeadManagement;
