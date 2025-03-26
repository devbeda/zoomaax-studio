import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../Url.js";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`${baseUrl}/getevent/${id}`);

        setEvent(response.data.event);
      } catch (error) {
        console.error("Error fetching event details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);
  console.log(event);

  if (loading)
    return (
      <p className="text-center text-gray-400">Loading event details...</p>
    );
  if (!event)
    return <p className="text-center text-red-500">Event not found!</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="min-h-[80vh] flex flex-col justify-center items-center pt-16 px-6 md:px-16 text-gray-300 bg-black"
    >
      <img className="h-[300px]" src={event.thumbnail} alt="" />
      <h1 className="text-3xl md:text-5xl font-bold text-orange-400 mb-1 text-center">
        {event.eventName}
      </h1>
      <div className="flex items-center gap-3 mt-1 mb-5 text-sm">
        <p className=" text-gray-300 text-center">
          Date:
          <span className="text-customOrange font-bold">
            {new Date(event.date).toLocaleDateString()}
          </span>{" "}
        </p>

        {/* Event Location */}
        {event.location && (
          <p className=" text-gray-300 text-center">
            Location:
            <span className="text-customOrange font-bold">{event.location}</span>{" "}
            
          </p>
        )}
      </div>

      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(event.description),
        }}
        className="text-white text-lg md:text-xl"
      ></div>

      {/* Event Image */}
      {event.image && (
        <div className="flex justify-center my-6">
          <img
            src={event.image}
            alt={event.title}
            className="w-full md:w-3/5 h-72 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Event Date */}

      {/* Back Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 text-lg bg-orange-500 hover:bg-orange-600 text-white rounded-md transition"
        >
          Go Back
        </button>
      </div>
    </motion.div>
  );
}

export default EventDetails;
