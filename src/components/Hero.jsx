import React from "react";
import { motion } from "motion/react";
import coverImage from "./../images/photo-1526234362653-3b75a0c07438.avif";

export default function Hero() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen w-full bg-cover bg-center bg-no-repeat text-center"
      style={{
        backgroundImage: `url(${coverImage})`,
      }}
    >
      <motion.div
        className="bg-black/60 p-10 rounded-2xl shadow-2xl"
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 1.2,
          ease: [0.25, 0.1, 0.25, 1], 
        }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-amber-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Authentic Sri Lankan Cuisine
        </motion.h1>

        <motion.p
          className="text-6xl md:text-9xl font-extrabold text-amber-100"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
        >
          Taste Aura
        </motion.p>

        <motion.p
          className="mt-4 text-xl md:text-2xl text-amber-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Bringing the authentic Sri Lankan culinary experience to the heart of Colombo 🌴
        </motion.p>
      </motion.div>
    </div>
  );
}
