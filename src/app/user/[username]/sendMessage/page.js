"use client";
import React, { useEffect, useState } from "react";
import PageWrapper from "@/app/pageWrapper";
import { motion, AnimatePresence } from "framer-motion";


export default function MessagePage({ params }) {
  const [messageCount, setMessageCount] = useState(0);
  const [confession, setConfession] = useState("");
  const { username } = React.use(params);

  const sendMessage = async (e) => {
    if (!confession || confession.trim() === "") {
      alert("Please enter a message before sending.");
      return;
    }
    e.preventDefault();
    const response = await fetch(`/api/users/${username}/user`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ message: confession.trim() }),
    });

    if (response.ok) {
      setMessageCount(messageCount + 1);
      setConfession("");
    }
    else if(response.status === 404){
      alert("This user has already ended their confession session.")
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
      <PageWrapper>
        <form
          onSubmit={sendMessage}
          className="flex flex-col justify-start items-center gap-4 w-3/4 sm:5/6 lg:w-6/12 mx-auto mt-20"
        >
          <motion.textarea
            value={confession}
            maxLength={250}
            onChange={(e) => setConfession(e.target.value)}
            whileFocus={{ scale: 1.06 }}
            transition={{ duration: 0.2 }}
            type="text"
            placeholder={`Tell ${username} your craziest confessions anonymously. Don't worry we don't judge👀`}
            className="rounded-2xl border-2 p-6 w-full h-36 lg:w-full lg:h-48 shadow-xl"
          />
          <p className="text-sm text-gray-500 text-right">
            {confession.length} / 250
          </p>
          <div className="flex justify-between w-full gap-2">
            <motion.div className="bg-orange-400 rounded-2xl px-3 py-2">
              Messages Sent: {messageCount}
            </motion.div>
            <motion.button
              type="submit"
              whileHover={{
                scale: 1.06,
                // backgroundColor: "rgba(100, 0, 100, 0)",
              }}
              transition={{ duration: 0.2 }}
              className="border rounded-xl px-5 py-2 bg-orange-400 hover:bg-white"
            >
              Send ✔
            </motion.button>
          </div>
        </form>
      </PageWrapper>
    </>
  );
}
