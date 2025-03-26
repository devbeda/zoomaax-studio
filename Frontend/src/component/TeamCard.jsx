import React from "react";

function TeamCard({ content }) {
  return (
    <div className="bg-black mt-4 group w-[150px] h-auto md:w-[250px] md:h-auto border-2 hover:-translate-y-2 border-customOrange p-4 shadow-lg hover:shadow-customHoverOrange transition-all duration-300 select-none">
      {/* Team Member Image */}
      <div className="w-full flex justify-center">
        <img
          className="h-28 w-28 md:h-36 md:w-36 object-cover rounded-full border-2 border-gray-500 group-hover:border-customOrange transition-all"
          src={content.image}
          alt={content.name}
        />
      </div>

      {/* Team Member Details */}
      <div className="h-[70px] flex flex-col justify-center items-center mt-3">
        <h1 className="font-sideheading-font text-sm md:text-base tracking-wide text-gray-400 group-hover:text-white text-center">
          {content.name}
        </h1>
        <h2 className="font-para-font text-gray-400 text-center md:text-xs text-[0.5rem] uppercase">
          {content.role}
        </h2>
      </div>
    </div>
  );
}

export default TeamCard;
