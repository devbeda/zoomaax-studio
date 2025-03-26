import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { baseUrl } from "../../../baseUrl.js";
import axios from "axios";

function Cast() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cast, setCast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedRole, setUpdatedRole] = useState("");
  const [updatedBio, setUpdatedBio] = useState("");
  const [image, setImage] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  // Fetch cast details
  const fetchCastDetails = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getcast/${id}`);
      console.log(response);
      
      setCast(response.data.casting);
      setUpdatedName(response.data.casting.name);
      setUpdatedRole(response.data.casting.role);
      setUpdatedBio(response.data.casting.bio);
    } catch (error) {
      console.error("Error fetching cast details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCastDetails();
  }, [id]);

  console.log(cast);
  

  // Handle Delete Cast
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this cast?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${baseUrl}/deletecast/${id}`);
      alert("Cast deleted successfully");
      navigate("/"); // Redirect after deletion
    } catch (error) {
      console.error("Error deleting cast:", error);
      alert("Failed to delete cast");
    }
  };

  // Handle Update Cast
  const handleUpdate = async () => {
    setUpdateLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", updatedName);
      formData.append("role", updatedRole);
      formData.append("bio", updatedBio);

      if (image) {
        formData.append("image", image);
      }

      await axios.put(`${baseUrl}/updatecast/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Cast updated successfully");
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating cast:", error);
      alert("Failed to update cast");
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (!cast) return <p className="text-center text-red-500">Cast not found.</p>;

  return (
    <div className="w-full flex flex-col items-center">
      {isEditing ? (
        <div className="w-[80%] bg-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Edit Cast</h2>

          <div>
            <p>Name</p>
            <input
              type="text"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <p>Role</p>
            <input
              type="text"
              value={updatedRole}
              onChange={(e) => setUpdatedRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <p>Bio</p>
            <textarea
              value={updatedBio}
              onChange={(e) => setUpdatedBio(e.target.value)}
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <p>Image (optional)</p>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
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
          <h1 className="text-2xl font-bold text-gray-800 my-4">{cast.name}</h1>
          <img src={cast.image} alt={cast.name} className="w-80 h-80 object-cover rounded-md shadow-md" />
          <p className="text-gray-600 mt-4">{cast.bio}</p>
          <p className="text-gray-500 mt-2">Role: {cast.role}</p>

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

export default Cast;
