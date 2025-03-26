import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Castings() {
  const [castings, setCastings] = useState([]);
  const navigate = useNavigate();

  // Fetch castings from the backend
  const fetchCastings = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getallcasting`);
      setCastings(response.data.castings);
    } catch (error) {
      console.error("Error fetching castings:", error);
    }
  };

  useEffect(() => {
    fetchCastings();
  }, []);
  console.log(castings);
  

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-lg font-semibold text-gray-800 my-4">Casting List</h2>
      <div className="w-4/5 bg-white p-4 rounded-md shadow-md">
        {castings.length === 0 ? (
          <p className="text-gray-500">No castings found.</p>
        ) : (
          <ul>
            {castings.map((casting) => (
              <li
                key={casting._id}
                onClick={() => navigate(`/getcast/${casting._id}`)}
                className="cursor-pointer border-b py-2 text-gray-700 flex justify-between hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-3">
                  {casting.image && (
                    <img
                      src={casting.image}
                      alt={casting.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                  <span>{casting.name}</span>
                </div>
                <span className="text-sm text-gray-500">{casting.role}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Castings;
