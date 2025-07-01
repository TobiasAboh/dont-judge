'use client';
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export default function Title({ children }) {
  return (
    <header>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-4xl lg:text-5xl font-bold w-[100%] md:w-[30%] mx-auto"
        >
          <Image
            src="/Title3.svg"
            alt="logo"
            width={100}
            height={100}
            className="w-full h-full"
          />
        </motion.div>
      </AnimatePresence>
    </header>
  );
}
