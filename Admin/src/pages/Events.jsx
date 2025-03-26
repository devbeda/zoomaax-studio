import React, { useEffect, useState } from "react";
import { baseUrl } from "../../baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <div className="w-full min-h-screen flex flex-col items-center">
      <h2 className="text-lg font-semibold text-gray-800 my-4">Event List</h2>
      <div className="w-4/5 bg-white p-4 rounded-md shadow-md">
        {events.length === 0 ? (
          <p className="text-gray-500">No events found.</p>
        ) : (
          <ul>
            {events.map((event) => (
              <li
                key={event._id}
                onClick={() => navigate(`/event/${event._id}`)}
                className="cursor-pointer border-b py-2 text-gray-700 flex justify-between hover:bg-gray-100 transition"
              >
                <span>{event.eventName}</span>
                <span className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Events;
