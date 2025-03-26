import React, { useEffect, useState } from "react";
import { baseUrl } from "../../Url.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CastCard from "./CastCard.jsx";

function Casting() {
  const [casts, setCasts] = useState([]);

  // Fetch cast members from the backend
  const fetchCasts = async () => {
    try { 
      const response = await axios.get(`${baseUrl}/getallcasting`);
      setCasts(response.data.castings);
      
    } catch (error) {
      console.error("Error fetching cast members:", error);
    }
  };

  useEffect(() => {
    fetchCasts();
  }, []);

  return (
    <div className="w-full min-h-[80vh] bg-gradient-to-b from-transparent via-black to-black text-gray-500 py-10">
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeIn" }}
      >
        <div className="w-full flex justify-center items-center">
          <div className="w-2/5 text-gray-400 mb-5 flex items-center justify-center gap-6 text-xl font-bold mt-6">
            <h1 className="tracking-widest text-2xl border-b-2 pb-1 font-heading-font ">
              CASTING
            </h1>
          </div>
        </div>
        <div className="container mx-auto px-4">
          {casts.length === 0 ? (
            <p className="text-center text-gray-400">Loading cast members...</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 justify-center items-center">
              {casts.slice(0, 4).map((cast, index) => (
                <div
                  key={index}
                  
                >
                  <CastCard content={cast} />
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default Casting;

