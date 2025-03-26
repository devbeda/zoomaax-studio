import React from "react";

function NewsCard({ news }) {
  const truncateDescription = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <div
      className="w-[90%] border-2 border-amber-800 p-4 flex gap-2 mb-2 hover:-translate-y-1 bg-orange-300 shadow-lg hover:shadow-orange-600 duration-200 scroll-smooth items-center text-amber-900 cursor-pointer"
      
    >
      <div>
        {news.images?.length > 0 ? (
          <img src={news.images[0]} className="h-16" alt="News Thumbnail" />
        ) : (
          <p className="text-xs text-gray-500">No Image Available</p>
        )}{" "}
      </div>
      <div>
        <h2 className="tracking-wide font-semibold">{news.title}</h2>
        <p className="text-sm">{truncateDescription(news.description, 100)}</p>
        <p className="text-xs">
          Published on: {new Date(news.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

export default NewsCard;
