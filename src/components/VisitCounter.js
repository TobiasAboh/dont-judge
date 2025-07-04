"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { archivo } from "@/app/fonts";
import Image from "next/image";

const VisitCounter = () => {
  const [visitCount, setVisitCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchVisitCount = async () => {
      try {
        const res = await fetch("/api/visits");
        const data = await res.json();
        setVisitCount(data.count);
      } catch (error) {
        console.error("Error fetching visit count:", error);
      }
    };

    const interval = setInterval(fetchVisitCount, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="flex flex-col border border-2 bg-white text-white p-4 rounded-2xl shadow-lg gap-4"
      // initial={{ borderColor: "red" }}
      animate={{ borderColor: ['#B73D58', '#FFFFFF', '#B73D58'] }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ borderStyle: "solid" }}
    >
      <div className="flex items-center text-black gap-4 h-full">
        <h1 className={`${archivo.variable} font-archivo italic text-5xl text-secondaryColour font-extrabold`}>
          {visitCount}
        </h1>
        <p className="font-bold">
          People clicked the button
          <br />
          <span className="text-gray-400">Don't miss out!</span>
        </p>
      </div>
      <div className="flex items-center gap-5 ">
        <motion.button
          className="bg-secondaryColour w-[80%] text-white rounded-lg px-4 py-2 font-bold hover:bg-[linear-gradient(90deg,_red_30%,_white_100%)] hover:text-black"
          onClick={() => router.push("/")}
          animate={{
            // y: [0, -5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Get in on the fun!
        </motion.button>
        <Image
          src="/swirly.svg"
          alt="exit"
          width={20}
          height={20}
          className="w-[40%] h-auto"
        />
      </div>
    </motion.div>
  );
};

export default VisitCounter;
