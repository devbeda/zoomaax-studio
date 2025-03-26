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
      className="border-2 rounded-lg border-customOrange h-auto md:w-auto w-[80%] shadow-lg cursor-pointer group hover:shadow-customHoverOrange flex  duration-200 text-gray-400 items-center gap-5 select-none"
    >
      <img
        className=" bg-cover w-full md:h-[400px] rounded-lg "
        loading="lazy"
        src={news.images[0]}
        alt=""
      />
      <div className="absolute bottom-[3.1rem]  ">
        <div className=" bg-gradient-to-tr from-black via-transparent to-transparent flex flex-col rounded-b-lg   w-[60vw] z-40 px-4 ">
          <h1 className="font-bold text-xs md:text-base font-sideheading-font tracking-wider group-hover:text-white">
            {truncateTitle(news.title)}
          </h1>
          <p className="font-para-font text-xs md:text-sm text-gray-500">
            {new Date(news.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
