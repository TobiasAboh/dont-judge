"use client";
import { motion, AnimatePresence, animate } from "framer-motion";
import React, { useState, useEffect } from "react";

import PageWrapper from "@/app/pageWrapper";

const variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.9 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function UserPage({ params }) {
  const { username } = React.use(params);

  const [selectedCardId, setSelectedCardId] = useState(null);
  const [copied, setCopied] = useState(false);

  const [confessions, setConfessions] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/users/${username}/messages`);

        if (response.ok) {
          const data = await response.json();
          setConfessions(data.messages);
          console.log(data.messages, confessions);
        }
      } catch (error) {
        console.error("Error fetching messages", error);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);

    return () => clearInterval(interval);
  }, [username]);

  const copyToCLipboard = async () => {
    const link = `${window.location.href}/sendMessage`;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(link);
      } else {
        // fallback for mobile (iOS etc.)
        const textArea = document.createElement("textarea");
        textArea.value = link;
        textArea.style.position = "fixed"; // avoid scroll jump
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };

  
  return (
    <>
      <header>
        <AnimatePresence>
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-center"
          >
            We Listen We Don't Judge
          </motion.h1>
        </AnimatePresence>
      </header>
      {/* <PageWrapper> */}
      <div className="flex flex-col w-full justify-center items-center gap-4 mt-8">
        <motion.button
          onTap={copyToCLipboard}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="submit"
          className="rounded-3xl border-2 px-7 py-2 shadow-xl cursor-pointer"
        >
          {copied ? "Copied to Clipboard" : `Copy Link: ${username}`}
        </motion.button>
      </div>
      <div className="flex flex-col mt-16 h-screen">
        <h2 className="text-xl text-center font-bold text-white">
          Confessions
        </h2>
        <motion.div
          variants={variants}
          className="grid gap-5 justify-center pt-4 px-6 border-t overflow-y-auto h-full"
          initial="hidden"
          animate="show"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gridTemplateRows: "repeat(auto-fill, minmax(200px, 1fr))",
          }}
        >
          {confessions.map((text, index) => (
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              onClick={() => {
                setSelectedCardId(index);
              }}
              key={index}
              layoutId={`card-${index}`}
              className="text-gray-500 max-w-86 flex items-center justify-center cursor-pointer text-center h-52 text-sm md:text-base lg:text-lg font-bold bg-white rounded-xl px-1"
            >
              {text}
            </motion.div>
          ))}

          <AnimatePresence>
            {selectedCardId !== null && (
              <motion.div
                onClick={() => setSelectedCardId(null)}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
              >
                <motion.div
                  layoutId={`card-${selectedCardId}`}
                  className="flex items-center justify-center text-center w-96 mx-6 lg:w-96 h-96 text-sm md:text-base lg:text-lg font-bold bg-white rounded-xl px-2 opacity-full"
                >
                  {confessions[selectedCardId]}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      {/* </PageWrapper> */}
    </>
  );
}
