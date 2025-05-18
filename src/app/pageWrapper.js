"use client";

import { motion, AnimatePresence, animate } from "framer-motion";

export default function PageWrapper({ children }) {
  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          // exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.6, staggerChildren: 0.3 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
