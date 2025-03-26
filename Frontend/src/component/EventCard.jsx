import React from 'react'
import { IoLocationOutline } from "react-icons/io5";

function EventCard({content}) {
  return (
    <div className="bg-black group w-[150px] h-auto md:w-[250px] md:h-auto border-2 hover:-translate-y-2 border-customOrange p-4  shadow-lg hover:shadow-customHoverOrange transition-all duration-300 select-none">
      <div>
        <img
          className="h-auto w-full object-cover rounded-lg bg-cover"
          src={content.thumbnail}
          alt=""
        />
      </div>
      <div className="h-[70px] flex flex-col justify-center items-center">
        <h1 className=" font-sideheading-font text-sm md:text-base tracking-wide text-gray-400 group-hover:text-white text-center">
          {content.eventName}
        </h1>
        <h1 className=" font-para-font text-gray-400 text-center md:text-xs text-[0.5rem]">
          {new Date(content.date).toLocaleDateString()}
        </h1>
        <p className='text-xs flex items-center justify-center gap-1'><IoLocationOutline />{content.location}</p>
      </div>
    </div>
  )
}

export default EventCard