import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function SideHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({
    content: false,
    news: false,
    event: false,
    casting: false,
    team: false,
  });

  const toggleDropdown = (key) => {
    setDropdownOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const menuItems = {
    content: [
      { label: "Add Content", path: "/" },
      { label: "Your Content", path: "/yourcontents" },
    ],
    news: [
      { label: "Add News", path: "/addnews" },
      { label: "Your News", path: "/yournews" },
    ],
    event: [
      { label: "Add Event", path: "/addevent" },
      { label: "Your Events", path: "/events" },
    ],
    casting: [
      { label: "Add Casting", path: "/addcasting" },
      { label: "Your Castings", path: "/getcastings" },
    ],
    team: [
      { label: "Add Team", path: "/addteam" },
      { label: "Your Team", path: "/getteams" },
    ],
  };

  return (
    <div>
      {/* 🟢 Desktop Sidebar */}
      <div className="hidden md:flex h-[40px] w-full bg-black text-white items-center justify-center gap-6">
        {Object.keys(menuItems).map((category) => (
          <div
            key={category}
            className="relative cursor-pointer group"
            onMouseEnter={() => toggleDropdown(category)}
            onMouseLeave={() => toggleDropdown(category)}
          >
            <span className="hover:text-orange-500">{category.toUpperCase()}</span>
            {dropdownOpen[category] && (
              <div className="absolute  top-full left-0 bg-black text-white w-48 p-2 shadow-md rounded-md">
                {menuItems[category].map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.path}
                    className={({ isActive }) =>
                      isActive
                        ? "block px-3 py-2 text-orange-500"
                        : "block px-3 py-2 hover:bg-orange-400 rounded-md"
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 🔵 Mobile Menu (Hamburger) */}
      <div className="md:hidden absolute z-20 top-0 w-screen text-gray-400 flex items-center justify-end px-4 py-2">
        <div
          className="flex flex-col gap-[6px] cursor-pointer z-30 right-3 top-[1.5rem] fixed"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div
            className={`w-7 h-[3px] bg-orange-500 transition-transform duration-300 ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></div>
          <div
            className={`w-7 h-[3px] bg-orange-500 transition-opacity duration-300 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          ></div>
          <div
            className={`w-7 h-[3px] bg-orange-500 transition-transform duration-300 ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></div>
        </div>
      </div>

      {/* 📱 Mobile Sliding Menu */}
      <div
        className={`fixed top-0 right-0 w-3/4 h-screen bg-orange-300 text-white flex flex-col items-center justify-start pt-20 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden z-20`}
      >
        {Object.keys(menuItems).map((category) => (
          <div key={category} className="w-full">
            <button
              className="w-full text-left px-6 py-3 font-bold bg-orange-400"
              onClick={() => toggleDropdown(category)}
            >
              {category.toUpperCase()}
            </button>
            {dropdownOpen[category] && (
              <div className="bg-orange-500">
                {menuItems[category].map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.path}
                    className="block px-8 py-2 text-white hover:bg-orange-600"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 🏴 Overlay for Mobile Menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-lg z-10 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default SideHeader;
