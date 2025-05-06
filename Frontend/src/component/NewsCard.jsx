import React from "react";
import { useNavigate } from "react-router-dom";

function NewsCard({ news }) {
  const navigate = useNavigate();
  // Function to truncate title to 20 words
  const truncateTitle = (title) => {
    const words = title.split(" ");
    return words.length > 20 ? words.slice(0, 20).join(" ") + "..." : title;
  };

  return (
    <div
      onClick={() => navigate(`/news/${news._id}`)}
      className="w-[400px] h-[400px] hover:scale-105 duration-200"
    >
      <img
        className=" h-[320px] w-[400px]"
        
        src={news.images[0]}
        alt=""
        loading="lazy"
      />
      <div className="h-[80px]  text-white text-center ">
        <div className=" ">
          <h1 className="text-lg font-bold">
            {truncateTitle(news.title)}
          </h1>
          <p className="text-gray-400 text-sm">
            {new Date(news.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
