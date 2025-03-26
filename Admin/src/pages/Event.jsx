import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { baseUrl } from "../../baseUrl";
import axios from "axios";
import DOMPurify from "dompurify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Event() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedEventName, setUpdatedEventName] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedDate, setUpdatedDate] = useState("");
  const [updatedLocation, setUpdatedLocation] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);


  const quillModules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };
  
  const quillFormats = [
    "header",
    "font",
    "list",
    "bullet",
    "bold",
    "italic",
    "underline",
    "strike",
    "align",
    "link",
    "image",
  ];
  // Fetch event details
  const fetchEventDetails = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getevent/${id}`);
      setEvent(response.data.event);
      setUpdatedEventName(response.data.event.eventName);
      setUpdatedDescription(response.data.event.description);
      setUpdatedDate(response.data.event.date);
      setUpdatedLocation(response.data.event.location);
    } catch (error) {
      console.error("Error fetching event details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  // Handle Delete Event
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${baseUrl}/deletevent/${id}`);
      alert("Event deleted successfully");
      navigate("/"); // Redirect after deletion
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event");
    }
  };

  // Handle Update Event
  const handleUpdate = async () => {
    setUpdateLoading(true);
    try {
      const formData = new FormData();
      formData.append("eventName", updatedEventName);
      formData.append("description", updatedDescription);
      formData.append("date", updatedDate);
      formData.append("location", updatedLocation);

      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      await axios.put(`${baseUrl}/updatevent/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Event updated successfully");
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update event");
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (!event) return <p className="text-center text-red-500">Event not found.</p>;

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      {isEditing ? (
        <div className="w-[80%] bg-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Edit Event</h2>

          <div>
            <p>Event Name</p>
            <input
              type="text"
              value={updatedEventName}
              onChange={(e) => setUpdatedEventName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <p>Description</p>
            <ReactQuill
              value={updatedDescription}
              onChange={ setUpdatedDescription}
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md"
              modules={quillModules}
              formats={quillFormats}
              placeholder="Description"
              theme="snow"
            />
          </div>

          <div>
            <p>Date</p>
            <input
              type="date"
              value={updatedDate}
              onChange={(e) => setUpdatedDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <p>Location</p>
            <input
              type="text"
              value={updatedLocation}
              onChange={(e) => setUpdatedLocation(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <p>Thumbnail (optional)</p>
            <input
              type="file"
              onChange={(e) => setThumbnail(e.target.files[0])}
              className="w-full mt-2"
            />
          </div>

          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md"
          >
            {updateLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z" />
                </svg>
                Updating...
              </div>
            ) : (
              "Save Changes"
            )}
          </button>
          <button onClick={() => setIsEditing(false)} className="ml-2 text-red-500">
            Cancel
          </button>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-gray-800 my-4">{event.eventName}</h1>
          <img src={event.thumbnail} alt={event.eventName} className="w-80 h-80 object-cover rounded-md shadow-md" />
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(event.description) }} className="text-gray-700"></div>
          <p className="text-gray-500 mt-2">Date: {new Date(event.date).toLocaleDateString()}</p>
          <p className="text-gray-500 mt-2">Location: {event.location}</p>

          <div className="mt-6 flex gap-4">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Update
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Event;
