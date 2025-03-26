import React, { useEffect, useState } from "react";
import { baseUrl } from "../../baseUrl.js";
import axios from "axios";
import ContentCards from "./ContentCards.jsx";
import { useNavigate } from "react-router-dom";

function YourContents() {
  const [contents, setContents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedContents = async () => {
      try {
        const response = await axios.get(`${baseUrl}/getcontent`);
        setContents(response.data.contents);
      } catch (error) {
        console.error(
          "Cannot fetch your contents",
          error.response?.data || error.message
        );
      }
    };

    fetchedContents();
  }, []);

  // Get unique languages from content
  const languages = [
    ...new Set(contents.flatMap((content) => content.languages)),
  ];

  // Filter contents based on search term and selected language
  const filteredContents = contents.filter((content) => {
    const matchesSearch =
      searchTerm === "" ||
      content.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLanguage =
      selectedLanguage === "" || content.languages.includes(selectedLanguage);

    return matchesSearch && matchesLanguage;
  });

  return (
    <div className="w-full h-[90vh] flex flex-col justify-center items-center">
      <div className="mb-3">
        <h1 className="text-xl text-amber-800 border-b-2 border-amber-800">
          Your Contents
        </h1>
      </div>

      {/* Search and Filter Inputs */}
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md"
        />

        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="">All Languages</option>
          {languages.map((language, index) => (
            <option key={index} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>

      {/* Content List */}
      <div className="h-[80vh] w-[80%] overflow-y-scroll flex flex-col items-center bg-orange-200 py-4">
        {filteredContents.length > 0 ? (
          filteredContents.map((content, index) => (
            <div
              className="flex w-full justify-center"
              key={index}
              onClick={() => navigate(`/content/${content._id}`)}
            >
              <ContentCards key={index} content={content} />
            </div>
          ))
        ) : (
          <p className="text-gray-600">No matching content found.</p>
        )}
      </div>
    </div>
  );
}

export default YourContents;
