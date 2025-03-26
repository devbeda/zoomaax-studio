import React, { useEffect, useState } from "react";
import { baseUrl } from "../../Url.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
 // Assuming you have a Card component
import EventCard from "./EventCard.jsx";

function Events() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // Fetch events from the backend
  const fetchEvents = async () => {
    try { 
      const response = await axios.get(`${baseUrl}/getallevents`);
      setEvents(response.data.events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="w-full   min-h-[80vh] bg-gradient-to-b from-transparent via-black to-black text-gray-500 py-10">
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeIn" }}
      >
        <div className="w-full flex justify-center items-center">
          <div className="w-2/5 text-white mb-5 flex items-center justify-center gap-6 text-xl font-bold mt-6 ">
            <h1 className="tracking-wide border-b-2 pb-1 font-sideheading-font">
              EVENTS
            </h1>
          </div>
        </div>
        <div className="container mx-auto px-4">
          {events.length === 0 ? (
            <p className="text-center text-gray-400">Loading events...</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 justify-center items-center">
              {events.slice(0, 4).map((event, index) => (
                <div
                  key={index}
                  className="cursor-pointer"
                  onClick={() => navigate(`/event/${event._id}`)}
                >
                  <EventCard content={event} />
                </div>
              ))}
            </div>
          )}
          
        </div>
      </motion.div>
    </div>
  );
}

export default Events;
