import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { baseUrl } from "../../Url";
import { useNavigate, useLocation } from "react-router-dom";
import * as motion from "motion/react-client";

function Projects() {
  const [contents, setContents] = useState([]);
  const [filter, setFilter] = useState("past"); // Default to "past"
  const [visibleCount, setVisibleCount] = useState(4); // Initially show 4
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const observerRef = useRef(null);

  // Get category from URL
  const queryParams = new URLSearchParams(location.search);
  const categoryFilter = queryParams.get("category");

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await axios.get(`${baseUrl}/getcontent`);

        // Ensure sorting works properly
        const sortedContents = [...response.data.contents].sort((a, b) => {
          return new Date(b.date) - new Date(a.date); // Sort in descending order (latest first)
        });

        setContents(sortedContents);
      } catch (error) {
        console.error(
          "Cannot get your contents",
          error.response?.data || error.message
        );
      }
    };

    fetchContents();
  }, []);

  // Filter contents based on status, name, language, and category
  const filteredContents = contents.filter((content) => {
    return (
      content.status === filter &&
      (searchQuery === "" ||
        content.title.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedLanguage === "" || content.language === selectedLanguage) &&
      (categoryFilter === null || content.type.toLowerCase() === categoryFilter)
    );
  });

  // Infinite Scroll Handler
  const loadMore = useCallback(() => {
    if (visibleCount < filteredContents.length) {
      setVisibleCount((prev) => prev + 4);
    }
  }, [visibleCount, filteredContents.length]);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full bg-black min-h-screen text-gray-300 mt-20 px-4"
    >
      <div className="flex flex-col items-center justify-center">
        
        {/* Filters Section */}
        <div className="flex flex-col md:flex-row gap-4 mt-8">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by title..."
            className="px-4 py-2 border border-gray-400 text-black rounded-md font-sideheading-font"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Language Dropdown */}
          <select
            className="px-4 py-2 border border-gray-400 text-black rounded-md font-sideheading-font"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option value="">All Languages</option>
            <option value="Hindi">Hindi</option>
            <option value="Odia">Odia</option>
            <option value="Bengali">Bengali</option>
            <option value="Telugu">Telugu</option>
          </select>
        </div>

        {/* Status Filter Options */}
        <div className="text-gray-300 font-semibold flex pt-8 gap-3 text-[1.2rem] cursor-pointer font-heading-font">
          {["past", "running", "upcoming"].map((status) => (
            <h1
              key={status}
              className={`tracking-widest border-b-2 ${
                filter === status ? "border-customOrange" : "border-transparent text-gray-400"
              }`}
              onClick={() => setFilter(status)}
            >
              {status.toUpperCase()}
            </h1>
          ))}
        </div>

        {/* Project List */}
        <div className="flex gap-5 mt-5 flex-wrap items-center justify-center min-h-[500px]">
          {filteredContents.length > 0 ? (
            filteredContents.slice(0, visibleCount).map((content) => (
              <motion.div
                key={content._id}
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeIn" }}
                className="hover:-translate-y-2 md:h-[350px] h-[200px] shadow-md hover:shadow-customHoverOrange rounded-md duration-300 border border-customOrange p-4 cursor-pointer"
                onClick={() => navigate(`/content/${content._id}`)}
              >
                <img loading="lazy" className="md:h-64 h-28 w-full object-cover" src={content.thumbnail} alt={content.title} />
                <div className="flex flex-col justify-center items-center h-[30%] md:h-[20%] gap-1">
                  <h2 className="text-white font-sideheading-font tracking-wider">{content.title}</h2>
                  <p className="text-[0.8rem] text-gray-500 font-para-font text-xs">
                    {new Date(content.date).toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-400 font-sideheading-font text-center col-span-3">No matching content found.</p>
          )}
        </div>

        {/* Invisible Observer Element */}
        <div ref={observerRef} className="h-10"></div>
      </div>
    </motion.div>
  );
}

export default Projects;
