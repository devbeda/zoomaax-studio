import React, { useEffect, useState, useRef } from "react";
import hero_Image from "../assets/hero_image.jpg";
import Header from "../component/Header";
import Contact from "../component/Contact";
import * as motion from "motion/react-client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";
import { BsChevronLeft,BsChevronRight } from "react-icons/bs";

import axios from "axios";
import { baseUrl } from "../../Url";
import Card from "../component/Card";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import NewsCard from "../component/NewsCard";

function Home() {
  const navigate = useNavigate();
  const [contents, setContents] = useState([]);
  const [news, setNews] = useState([]);
  const scrollRef = useRef(null); // Ref to control the scroll container

  // Functions to scroll left and right smoothly
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: "smooth" }); // Adjust 400 to match card width
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: "smooth" }); // Adjust 400 to match card width
    }
  };

  useEffect(() => {
    const contents = async () => {
      try {
        const response = await axios.get(`${baseUrl}/getcontent`);
        // console.log(response.data);
        setContents(response.data.contents);
      } catch (error) {
        console.error(
          "Cannot geting your contents",
          error.response?.data || error.message
        );
      }
    };

    contents();

    const news = async () => {
      try {
        const response = await axios.get(`${baseUrl}/getnews`);
        setNews(response.data.news);
        console.log(response.data.news);
      } catch (error) {
        console.error(
          "Cannot geting your news",
          error.response?.data || error.message
        );
      }
    };

    news();
  }, []);

  console.log(contents);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className=" scroll-smooth "
    >
      {/* Hero section */}
      <div className="">
        <img
          className="w-full object-cover h-[500px] md:h-[800px] sm:blur-[6px] "
          src={hero_Image}
          alt=""
        />
      </div>
      <div className=" hidden sm:flex sm:top-[26vh] md:top-[25vh] left-[5vw] sm:text-[2.5rem] md:text-[3rem] lg:text-[5rem] absolute z-30   text-center font-para-font font-semibold ">
        <p className="">
          <span className="text-border  text-black">OUR GOAL IS</span>{" "}
          <span className=" border-b-4 text-customOrange  border-customHoverOrange p-2">
            QUALITY
          </span>{" "}
          <span className="text-border  text-black">&</span>{" "}
          <span className="text-customOrange border-b-4 border-customHoverOrange p-1">
            PRODUCTIVITY
          </span>
        </p>
      </div>

      {/* Project Section */}
      <div className="w-full absolute top-[17rem] md:top-[35rem] h-auto bg-gradient-to-b from-transparent via-black to-black text-gray-500 py-10">
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeIn" }}
        >
          <div className="w-full flex justify-center items-center">
            <div className="w-2/5 text-white mb-5 flex items-center justify-center gap-6 text-xl font-bold mt-6 ">
              <h1 className="tracking-wide border-b-2 pb-1 font-sideheading-font">
                PROJECTS
              </h1>
            </div>
          </div>
          <div className="container mx-auto px-4">
            {contents.length === 0 ? ( // ✅ Loading State
              <p className="text-center text-gray-400">Loading projects...</p>
            ) : (
              <div className=" grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 justify-center items-center">
                {contents.slice(0, 4).map((content, index) => (
                  <div
                    key={index}
                    className="cursor-pointer"
                    onClick={() => navigate(`/content/${content._id}`)}
                  >
                    <Card content={content} />
                  </div>
                ))}
              </div>
            )}
            {contents.length > 4 && (
              <div className="w-full mt-8 flex justify-center items-center">
                <button
                  onClick={() => navigate("/projects")}
                  className="border-2 font-heading-font tracking-wider border-customOrange px-4 py-2 hover:-translate-y-2 transition-all duration-300 hover:border  hover:text-white active:bg-customOrange active:text-white"
                >
                  See More..
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* NEWS section */}
      <div className="bg-black w-full mt-[24rem] md:mt-[20rem] flex flex-col justify-center items-center py-10">
        {/* Title Section */}
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeIn" }}
          className="w-full"
        >
          <div className="flex justify-center items-center mb-8">
            <h1 className="text-white font-sideheading-font font-bold tracking-wider border-b-2 ">
              NEWS
            </h1>
          </div>

          {/* News Grid */}
          <div className="w-full px-10 backdrop-blur-sm relative">
            {news.length === 0 ? (
              <p className="text-center text-gray-400">Loading news...</p>
            ) : (
              <div className="relative">
                {/* Scroll Container */}
                <div
                  ref={scrollRef}
                  className="w-full h-[400px] flex overflow-x-scroll gap-5 scroll-smooth scrollbar-hide"
                >
                  {news.map((newsItem, index) => (
                    <div
                      key={index} // Moved key here for React
                      className="w-[400px] h-[400px] flex-shrink-0" // Added flex-shrink-0 to prevent squishing
                      onClick={() => navigate(`/news/${newsItem._id}`)}
                    >
                      <NewsCard news={newsItem} />
                    </div>
                  ))}
                </div>

                {/* Optional Scroll Buttons */}
                <button
                  onClick={scrollLeft}
                  className="absolute left-0 top-[40%] -translate-y-1/2  text-3xl active:scale-75 text-white p-2 rounded-full transition-all"
                >
                  <BsChevronLeft />{/* Left arrow */}
                </button>
                <button
                  onClick={scrollRight}
                  className="absolute right-0 top-[40%] -translate-y-1/2 text-3xl active:scale-75   text-white p-2 rounded-full transition-all"
                >
                  <BsChevronRight /> {/* Right arrow */}
                </button>
              </div>
            )}

            {/* "See More" Button */}
            {news.length > 6 && (
              <div className="w-full mt-8 flex justify-center">
                <NavLink
                  to="/blogs"
                  className="border-2 text-white border-customOrange px-4 py-2 transition-all duration-300 hover:-translate-y-2 hover:text-white active:bg-customOrange active:text-white"
                >
                  See More..
                </NavLink>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Contact section */}
      <div className="bg-customBrown h-full ">
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          whileInView={{ y: 50, opacity: 1 }}
          viewport={{ amount: 0.8 }}
          className="w-full h-[400px] "
        >
          <div className="  flex justify-center items-end">
            <div className="border-b-2 border-white">
              <h1 className="text-white tracking-wider font-bold text-sm sm:text-xl font-sideheading-font">
                CONTACT US
              </h1>
            </div>
          </div>
          <div className="w-full h-1/2 flex flex-col justify-center items-center gap-2">
            <div className="flex gap-2">
              <input
                className="h-9 w-[10rem] sm:w-[17rem] px-2 outline-none py-1 font-para2-font "
                type="text"
                placeholder="Name"
              />
              <input
                className="h-9 w-[10rem] sm:w-[17rem] outline-none px-2 py-1 font-para2-font"
                type="text"
                placeholder="E-mail"
              />
            </div>
            <div className="flex gap-2">
              <textarea
                className=" w-[10rem] sm:w-[17rem] px-2 py-1 outline-none font-para2-font"
                name=""
                id=""
                placeholder="Address"
              ></textarea>
              <textarea
                className=" w-[10rem] sm:w-[17rem] px-2 py-1 outline-none font-para2-font"
                name=""
                id=""
                placeholder="Proposal"
              ></textarea>
            </div>
          </div>
          <div className="h-1/6 flex justify-center items-start">
            <button className="border-2 border-customOrange px-4 py-2 font-heading-font tracking-wider hover:-translate-y-2 duration-300 hover:text-white active:bg-customOrange active:text-white active:border-none">
              Submit
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Home;
