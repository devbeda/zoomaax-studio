import React, { useEffect, useState } from "react";
import { baseUrl } from "../../Url.js";
import axios from "axios";
import { motion } from "framer-motion";
import TeamCard from "./TeamCard.jsx"; // Assuming TeamCard is used to display team members

function OurTeam() {
  const [teams, setTeams] = useState([]);

  // Fetch team members from the backend
  const fetchTeams = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getallteam`);
      setTeams(response.data.teams);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-transparent via-black to-black text-gray-500 py-10">
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeIn" }}
      >
        <div className="w-full flex justify-center items-center">
          <div className="w-2/5 text mb-5 flex items-center justify-center gap-6 text-2xl font-bold mt-6">
            <h1 className="tracking-wide border-b-2 pb-1 text-gray-400  font-heading-font">
              OUR TEAM
            </h1>
          </div>
        </div>
        
        {/* Scrollable Team Container */}
        <div className="container mx-auto px-4 overflow-y-auto max-h-[80vh] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          {teams.length === 0 ? (
            <p className="text-center text-gray-400">Loading team members...</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 justify-center items-center">
              {teams.map((team, index) => (
                <div key={index}>
                  <TeamCard content={team} />
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default OurTeam;
