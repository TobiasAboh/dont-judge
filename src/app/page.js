"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import PageWrapper from "./pageWrapper";
import { motion, animate } from "framer-motion";

export default function Home() {
  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <>
      <header>
        <h1 className="text-5xl font-bold text-center mb-36">
          We Listen We Don't Judge
        </h1>
      </header>
      <PageWrapper>
        <div className="flex flex-col w-full justify-center items-center gap-10">
          <motion.input
          whileFocus={{ scale: 1.1 }}
            type="text"
            placeholder="Don't worry I won't judge"
            className="rounded-3xl border-2 p-6 w-5/12 h-36 shadow-xl"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
            className="rounded-3xl border-2 px-10 py-3 shadow-xl"
          >
            Send
          </motion.button>
        </div>
      </PageWrapper>
    </>
  );
}
