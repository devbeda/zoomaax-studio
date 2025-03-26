import React from "react";
import { IoPersonCircleSharp } from "react-icons/io5";
function TeamCard({ content }) {
  return (
    <div className="bg-orange-300 text-white group w-[150px] h-auto md:w-[250px] md:h-auto border-2 hover:-translate-y-2 border-customOrange p-4 shadow-lg hover:shadow-amber-700 transition-all duration-300 rounded-lg select-none">
      <div className="flex w-full h-auto justify-center items-center">
        {content.image ? (
          <img
            className="h-32 w-32  object-cover rounded-full"
            src={content.image}
            alt={content.name}
          />
        ) : (
          <div className="h-32 w-full flex items-center justify-center bg-gray-800 rounded-lg">
            <IoPersonCircleSharp />
          </div>
        )}
      </div>

      <div className="h-[70px] flex flex-col justify-center items-center mt-2">
        <h1 className="font-sideheading-font text-sm md:text-base tracking-wide text-white group-hover:text-amber-700 text-center">
          {content.name}
        </h1>
        <p className="font-para-font text-white text-center md:text-xs text-[0.75rem]">
          {content.role}
        </p>
      </div>
    </div>
  );
}

export default TeamCard;
