import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import * as motion from "motion/react-client";

function Footer() {
  return (
    <footer className="bg-black text-white py-6 text-center  ">
      <motion.div
        initial={{ y: 30 }}
        transition={{ duration: 0.2 }}
        whileInView={{ y: 0 }}
        viewport={{ amount: 0.8 }}
        className="flex justify-center items-center text-gray-400 gap-5 text-3xl mb-3 "
      >
        <FaYoutube className="text-[1.5rem] sm:text-[2.5rem]" />
        <FaInstagram className="text-[1.2rem] sm:text-[2rem]" />
        <FaFacebookF className="text-[1.1rem] sm:text-[2rem] " />
      </motion.div>
      <div className="my-4  flex justify-center">
        <div className=" border-b-2 border-customOrange w-1/3"></div>
      </div>

      <div initial={{ y: -30 }}
        transition={{ duration: 0.5 }}
        whileInView={{ y: 0 }}>
        <p className="text-gray-500 text-xs sm:text-sm text-center">
          Copyright © Zoomaax Pvt. Ltd. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
