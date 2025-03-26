import React from "react";

function ContentCards({ content }) {
  return (
    <div
      className="w-[90%] border-2 border-amber-800 p-4 flex gap-2 mb-2 hover:-translate-y-1 bg-orange-300 shadow-lg hover:shadow-orange-600 duration-200 scroll-smooth items-center text-amber-900"
      key={content._id}
    >
      <div>
        <img src={content.thumbnail} className="h-16" alt="" />
      </div>
      <div>
        <h2 className="tracking-wide font-semibold">{content.title}</h2>
        <p className="text-sm">{content.description}</p>
        <p>Genres: {content.genres.join(", ")}</p>
        <p>{content.languages}</p>
        <p className="text-xs">
          Published on: {new Date(content.date).toLocaleDateString()}
        </p>
      </div>
    </div> 
  );
}

export default ContentCards;
