"use client";
import { motion, AnimatePresence, animate } from "framer-motion";
import React, { useState, useEffect } from "react";

import PageWrapper from "@/app/pageWrapper";

export default function UserPage({ params }) {
  const { username } = React.use(params);

  const [selectedCard, setSelectedCard] = useState(null);
  const [copied, setCopied] = useState(false);

  const [confessions, setConfessions] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const copyToCLipboard = async () => {
    try{
      navigator.clipboard.writeText(`${window.location.href}/sendMessage`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    catch(error){
      console.log(`failed to copy to clipboard`, error)
    }
  }

  const fetchMessages = async () => {
    try {
      const response = await fetch(`/api/messages/${username}`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        setConfessions(data);
      }
    } catch (error) {
      console.error("Error fetching messages", error);
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
            ####################
          </motion.h1>
        </AnimatePresence>
      </header>
      <PageWrapper>
        <div className="flex flex-col w-full justify-center items-center gap-4 mt-8">
          <motion.div
          onClick={copyToCLipboard}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
            className="rounded-3xl border-2 px-7 py-2 shadow-xl cursor-pointer"
          >
            {copied ? "Copied to Clipboard" : (`Copy Link: ${username}`)}
          </motion.div>
        </div>
        <div className="flex flex-col mt-16 h-screen">
          <h2 className="text-xl text-center font-bold text-white">
            Confessions
          </h2>
          <div
            className="grid gap-5 justify-center pt-4 px-4 border-t overflow-y-auto h-full"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            }}
          >
            {confessions.map((text, index) => (
              <motion.div
                whileHover={{ scale: 1.1 }}
                onClick={() => {
                  setSelectedCard(text);
                }}
                key={index}
                layoutId={`card ${index}`}
                className="text-gray-500 flex items-center justify-center cursor-pointer text-center h-36 text-sm md:text-base lg:text-lg font-bold bg-white rounded-xl px-2"
              >
                {text.message}
              </motion.div>
            ))}

            <AnimatePresence>
              {selectedCard !== null && (
                <motion.div
                  onClick={() => setSelectedCard(null)}
                  className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                >
                  <motion.div
                    layoutId={`card ${selectedCard.id - 1}`}
                    className="flex items-center justify-center text-center w-96 mx-6 lg:w-96 h-96 text-sm md:text-base lg:text-lg font-bold bg-white rounded-xl px-2 opacity-full"
                  >
                    {selectedCard.message}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </PageWrapper>
    </>
  );
}