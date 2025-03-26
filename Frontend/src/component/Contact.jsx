import React from "react";
import * as motion from "motion/react-client";


function Contact() {
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, ease: "easeIn" }}
    className="bg-black w-full min-h-screen sm:h-[120vh] flex justify-center items-center">
      <motion.div
       initial={{ y: 80, opacity: 0 }}
       transition={{ duration: 0.8, ease: "easeInOut" }}
       animate={{ y: 0, opacity: 1 }}
       
      className=" w-10/12 sm:w-1/2 h-[400px]  md:h-[300px] bg-customBrown ">
        <div className="h-1/6 bg-gradient-to-b  flex justify-center items-end">
          <div className="border-b-2 border-white">
            <h1 className="text-white tracking-wider font-heading-font text-xl">CONTACT US</h1>
          </div>
        </div>
        <div className="w-full h-3/5 flex flex-col justify-center items-center gap-2">
          <div className="md:flex grid items-center justify-center gap-2">
            <input
              className="h-9 w-[17rem] px-2 outline-none py-1 font-sideheading-font"
              type="text"
              placeholder="Name"
            />
            <input
              className="h-9 w-[17rem] outline-none font-sideheading-font px-2 py-1"
              type="text"
              placeholder="E-mail"
            />
          </div>
          <div className="md:flex grid gap-2">
            <textarea
              className=" w-[17rem] px-2 font-sideheading-font py-1 outline-none"
              name=""
              id=""
              placeholder="Address"
            ></textarea>
            <textarea
              className=" w-[17rem] font-sideheading-font px-2 py-1 outline-none"
              name=""
              id=""
              placeholder="Proposal"
            ></textarea>
          </div>
        </div>
        <div className="h-1/6 flex justify-center items-start ">
          <button className="border-2 font-heading-font border-customOrange px-4 py-2 hover:-translate-y-2 hover:text-white active:bg-customOrange active:text-white transition-all duration-400">Submit</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Contact;
