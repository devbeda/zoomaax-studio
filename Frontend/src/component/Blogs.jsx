import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../Url";
import { useNavigate } from "react-router-dom";
import * as motion from "motion/react-client";

function Blogs() {
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ Search state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${baseUrl}/getnews`);

        // ✅ Sort news by createdAt (recent first)
        const sortedNews = response.data.news.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setNews(sortedNews);
      } catch (error) {
        console.error("Cannot fetch News", error.response?.data || error.message);
      }
    };

    fetchNews();
  }, []);

  // ✅ Filter news based on search input
  const filteredNews = news.filter((newsItem) =>
    newsItem.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeIn" }}
      className="bg-black min-h-screen pt-20 flex flex-col items-center"
    >
      {/* Title */}
      <div className="flex flex-col justify-center items-center mb-4 w-full">
        <h1 className="text-gray-400 tracking-widest font-semibold border-b-2 font-heading-font text-xl border-customOrange">
          BLOGS
        </h1>

        {/* ✅ Search Input */}
        <input
          type="text"
          placeholder="Search by title..."
          className="w-[90%] md:w-[50%] mt-4 px-4 py-2 text-black rounded-md outline-none border-2 border-customOrange focus:ring-2 focus:ring-customHoverOrange"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Scrollable Blog List */}
      <div className="w-full h-[80vh] overflow-y-auto scrollbar-hide px-8">
        <div className="text-white grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredNews.length > 0 ? (
            filteredNews.map((newsItem) => (
              <motion.div
                key={newsItem._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeIn" }}
                onClick={() => navigate(`/news/${newsItem._id}`)}
                className="border shadow-lg group hover:shadow-customHoverOrange hover:-translate-y-2 duration-300 border-customOrange p-4 rounded-md cursor-pointer"
              >
                <img className="h-20 object-cover" src={newsItem.images[0]} alt={newsItem.title} />
                <h2 className="text-gray-400 group-hover:text-white">{newsItem.title}</h2>
                <p className="text-[0.8rem] text-gray-500">
                  {new Date(newsItem.createdAt).toDateString()}
                </p>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-400 text-center col-span-3">No results found...</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Blogs;
