import React, { useState } from "react";
import logo from "../assets/ZoomaaxStudio.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [isDivisionOpen, setIsDivisionOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-black font-heading-font text-xl">
      <div className="fixed z-50 top-0 h-[90px] w-screen bg-gradient-to-b from-black to-transparent text-gray-400 font-[500px] flex items-center justify-between px-8 py-2">
        <Link to="/">
          <img className="h-20" src={logo} alt="Logo" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-7">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-white border-b-2 border-customOrange tracking-wider"
                  : "text-gray-400 tracking-wider hover:text-customOrange"
              }
            >
              HOME
            </NavLink>
          </li>

          {/* Division Section */}
          <li
            className="cursor-pointer relative"
            onMouseEnter={() => setIsDivisionOpen(true)}
            onMouseLeave={() => setIsDivisionOpen(false)}
          >
            <NavLink className="flex justify-center items-center  hover:text-customHoverOrange">
              DIVISION {isDivisionOpen ? <FaAngleUp /> : <FaAngleDown />}
            </NavLink>

            {isDivisionOpen && (
              <div className="absolute top-full left-0 bg-black text-white z-30 w-64 p-4 shadow-md rounded-md">
                <ul className="grid grid-cols-2 gap-2">
                  {[
                    "Movies",
                    "Serial",
                    "Web Series",
                    "Music Video",
                    "Reality Show",
                    "Short Film",
                    "Sports",
                  ].map((category) => (
                    <li
                      key={category}
                      className="cursor-pointer hover:text-white hover:bg-customOrange rounded-md px-2 py-1"
                      onClick={() =>
                        navigate(`/projects?category=${category.toLowerCase()}`)
                      }
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>

          {/* Our Studio Section */}
          <li
            className="cursor-pointer relative"
            onMouseEnter={() => setIsStudioOpen(true)}
            onMouseLeave={() => setIsStudioOpen(false)}
          >
            <NavLink className="flex justify-center items-center hover:text-customHoverOrange">
              OUR STUDIO {isStudioOpen ? <FaAngleUp /> : <FaAngleDown />}
            </NavLink>

            {isStudioOpen && (
              <div className="absolute top-full -left-5 bg-black text-white w-48 p-4 shadow-md rounded-md">
                <ul className="flex flex-col gap-2">
                  <li>
                    <NavLink
                      to="/casting"
                      className="hover:bg-customOrange px-2 py-1 rounded-md"
                    >
                      CASTING
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/ourteam"
                      className="hover:bg-customOrange px-2 py-1 rounded-md"
                    >
                      OUR TEAM
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
          </li>

          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive
                  ? "text-white border-b-2 border-customOrange tracking-wider"
                  : "text-gray-400 tracking-wider hover:text-customHoverOrange"
              }
            >
              EVENTS
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/blogs"
              className={({ isActive }) =>
                isActive
                  ? "text-white border-b-2 border-customOrange tracking-wider"
                  : "text-gray-400 tracking-wider hover:text-customHoverOrange"
              }
            >
              BLOGS
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-white border-b-2 border-customOrange tracking-wider"
                  : "text-gray-400 tracking-wider hover:text-customHoverOrange"
              }
            >
              ABOUT
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-white border-b-2 border-customOrange tracking-wider"
                  : "text-gray-400 tracking-wider hover:text-customHoverOrange"
              }
            >
              CONTACT
            </NavLink>
          </li>

          
        </ul>

        {/* Hamburger Icon (Mobile) */}
        <div
          className="md:hidden flex flex-col gap-[6px] cursor-pointer z-40"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div
            className={`w-7 h-[3px] bg-white transition-transform duration-300 ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></div>
          <div
            className={`w-7 h-[3px] bg-white transition-opacity duration-300 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          ></div>
          <div
            className={`w-7 h-[3px] bg-white transition-transform duration-300 ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-0 right-0 w-[90vw] min-h-screen bg-black text-white flex flex-col justify-center items-center py-4">
            <NavLink to="/" className="py-2" onClick={() => setIsOpen(false)}>
              HOME
            </NavLink>

            {/* Division Dropdown */}
            <div className="w-full text-center">
              <button
                className="w-full py-2 flex justify-center items-center"
                onClick={() => setIsDivisionOpen(!isDivisionOpen)}
              >
                DIVISION {isDivisionOpen ? <FaAngleUp /> : <FaAngleDown />}
              </button>
              {isDivisionOpen && (
                <ul className="flex flex-col w-full">
                  {[
                    "Movies",
                    "Serial",
                    "Web Series",
                    "Music Video",
                    "Reality Show",
                    "Short Film",
                    "Sports",
                  ].map((category) => (
                    <li
                      key={category}
                      className="py-2 hover:bg-customOrange"
                      onClick={() => {
                        navigate(
                          `/projects?category=${category.toLowerCase()}`
                        );
                        setIsOpen(false);
                        setIsDivisionOpen(false);
                      }}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Our Studio Dropdown (Fixed) */}

            <div className="w-full text-center">
              <button
                className="w-full py-2 flex justify-center items-center"
                onClick={() => setIsStudioOpen(!isStudioOpen)}
              >
                Our Studio {isStudioOpen ? <FaAngleUp /> : <FaAngleDown />}
              </button>
              {isStudioOpen && (
                <ul className="flex flex-col w-full">
                  {["casting", "our team"].map((category) => (
                    <li
                      key={category}
                      className="py-2 hover:bg-customOrange"
                      onClick={() => {
                        navigate(
                          `/projects?category=${category.toLowerCase()}`
                        );
                        setIsOpen(false);
                        setIsDivisionOpen(false);
                      }}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Other Navigation Links */}
            <NavLink
              to="/events"
              className="py-2"
              onClick={() => setIsOpen(false)}
            >
              EVENTS
            </NavLink>
            <NavLink
              to="/blogs"
              className="py-2"
              onClick={() => setIsOpen(false)}
            >
              BLOGS
            </NavLink>
            <NavLink
              to="/about"
              className="py-2"
              onClick={() => setIsOpen(false)}
            >
              ABOUT
            </NavLink>
            <NavLink
              to="/contact"
              className="py-2"
              onClick={() => setIsOpen(false)}
            >
              CONTACT
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
