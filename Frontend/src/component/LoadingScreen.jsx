import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaFilm } from "react-icons/fa";

function LoadingScreen({ setLoading }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // 2.5-second loading time

    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Spinning Film Icon */}
      <motion.div
        className="text-orange-500 text-6xl mb-4"
        animate={{ rotate: [0, 360] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
      >
        <FaFilm />
      </motion.div>

      {/* Zoomaax Studio Text */}
      <motion.h1
        className="text-2xl md:text-4xl font-bold tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
      >
        Zoomaax Studio Presents...
      </motion.h1>
    </motion.div>
  );
}

export default LoadingScreen;
