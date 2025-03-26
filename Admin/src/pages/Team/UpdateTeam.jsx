import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../../baseUrl.js";

function UpdateTeam() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    fetchTeamDetails();
  }, [id]);

  const fetchTeamDetails = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getteam/${id}`);
      setTeam(response.data.team);
      setName(response.data.team.name);
      setRole(response.data.team.role);
    } catch (error) {
      console.error("Error fetching team member details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setUpdateLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("role", role);
    if (image) formData.append("image", image);

    try {
      await axios.put(`${baseUrl}/updateteam/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Team member updated successfully");
      navigate("/getteams");
    } catch (error) {
      console.error("Error updating team member:", error);
      alert("Failed to update team member");
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this team member?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${baseUrl}/deleteteam/${id}`);
      alert("Team member deleted successfully");
      navigate("/team");
    } catch (error) {
      console.error("Error deleting team member:", error);
      alert("Failed to delete team member");
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (!team) return <p className="text-center text-red-500">Team member not found.</p>;

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gray-800 my-4">Update Team Member</h1>
      <div className="w-[300px] space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full"
        />
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
        >
          {updateLoading ? "Updating..." : "Save Changes"}
        </button>
        <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-md w-full">
          Delete
        </button>
      </div>
    </div>
  );
}

export default UpdateTeam;
