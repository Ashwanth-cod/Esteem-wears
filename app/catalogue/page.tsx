"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Catalogue() {
  return (
    <div
      className="px-4 md:px-10 py-6 min-h-screen"
      style={{
        background:
          "linear-gradient(150deg, #141414 0%, #1e1a16 60%, #241e18 100%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        paddingTop: "88px",
      }}
    >
      {/* TITLE */}
      <h1 className="text-3xl md:text-5xl font-bold mb-10 text-center">
        Catalogue
      </h1>

      {/* CARDS */}
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        {/* ================= KIDS ================= */}
        <Link href="/catalogue/kids" className="flex-1">
          <motion.div
            whileHover={{ scale: 1.04 }}
            className="relative aspect-video border-4 border-black rounded-2xl 
            bg-white flex items-center justify-between px-10 
            overflow-hidden cursor-pointer transition group shadow-md"
          >
            {/* BACKGROUND */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-[0.05]"
              style={{
                backgroundImage:
                  "url('https://res.cloudinary.com/desmywzoz/image/upload/v1776955061/Screenshot_2026-04-23_200646_yb8nos.png')",
              }}
            />

            {/* CONTENT */}
            <div className="relative z-10 flex items-center justify-between w-full">
              {/* TEXT */}
              <div>
                <h2 className="text-black text-3xl md:text-4xl font-bold">
                  Kids Wear
                </h2>
                <p className="text-gray-500 mt-2">Explore collection →</p>
              </div>

              {/* IMAGE */}
              <div className="relative w-40 md:w-56 h-40 md:h-56">
                <Image
                  src="/images/banners/kids.png"
                  alt="Kids wear"
                  fill
                  sizes="(max-width: 768px) 40vw, 25vw"
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>

            {/* HOVER GLOW */}
            <div className="absolute inset-0 bg-yellow-300 opacity-0 group-hover:opacity-10 transition duration-300" />
          </motion.div>
        </Link>

        {/* ================= MEN ================= */}
        <Link href="/catalogue/men" className="flex-1">
          <motion.div
            whileHover={{ scale: 1.04 }}
            className="relative aspect-video border-4 border-black rounded-2xl 
            bg-white flex items-center justify-between px-10 
            overflow-hidden cursor-pointer transition group shadow-md"
          >
            {/* BACKGROUND */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-[0.05]"
              style={{
                backgroundImage:
                  "url('https://res.cloudinary.com/desmywzoz/image/upload/v1776955061/Screenshot_2026-04-23_200646_yb8nos.png')",
              }}
            />

            {/* CONTENT */}
            <div className="relative z-10 flex items-center justify-between w-full">
              {/* TEXT */}
              <div>
                <h2 className="text-black text-3xl md:text-4xl font-bold">
                  Mens Wear
                </h2>
                <p className="text-gray-500 mt-2">Explore collection →</p>
              </div>

              {/* IMAGE */}
              <div className="relative w-40 md:w-56 h-40 md:h-56">
                <Image
                  src="/images/banners/men.png"
                  alt="Mens wear"
                  fill
                  sizes="(max-width: 768px) 40vw, 25vw"
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>

            {/* HOVER GLOW */}
            <div className="absolute inset-0 bg-yellow-300 opacity-0 group-hover:opacity-10 transition duration-300" />
          </motion.div>
        </Link>
      </div>
    </div>
  );
}
