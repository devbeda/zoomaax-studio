import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TeamCard from "./TeamCard"; // Import the TeamCard component

function GetTeam() {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  // Fetch teams from the backend
  const fetchTeams = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getallteam`);
      setTeams(response.data.teams);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <div className="w-full flex flex-col items-center min-h-screen">
      <h2 className="text-lg font-semibold text-gray-300 my-4 border-b-2 border-customOrange pb-2">
        Team Members
      </h2>
      
      <div className="w-4/5  p-4 rounded-md shadow-lg overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        {teams.length === 0 ? (
          <p className="text-gray-500 text-center">No team members found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-2">
            {teams.map((team) => (
              <div
                key={team._id}
                onClick={() => navigate(`/getteam/${team._id}`)}
                className="cursor-pointer"
              >
                <TeamCard content={team} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default GetTeam;
