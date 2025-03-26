import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../baseUrl.js";

function AddTeam() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("role", role);
    if (image) formData.append("image", image);

    try {
      await axios.post(`${baseUrl}/addteam`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Team member added successfully!");
      setName("");
      setRole("");
      setImage(null);
    } catch (error) {
      console.error("Error adding team member:", error);
      alert("Failed to add team member.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Add Team Member</h1>
      <form onSubmit={handleSubmit} className="w-[300px] space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          required
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
        >
          {loading ? "Adding..." : "Add Team Member"}
        </button>
      </form>
    </div>
  );
}

export default AddTeam;
