"use client";
import React, { useEffect, useState } from "react";
import PageWrapper from "@/app/pageWrapper";
import { motion, AnimatePresence } from "framer-motion";

export default function MessagePage({ params }) {
  const [messageCount, setMessageCount] = useState(0);
  const [confession, setConfession] = useState();
  const { username } = React.use(params);


    

  const sendMessage = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/messages/${username}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ message: confession }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.message, data.error);
      setMessageCount(messageCount + 1);
      setConfession("");
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
          <form onSubmit={sendMessage} className="flex flex-col justify-start items-center gap-4 w-3/4 lg:w-6/12 mx-auto mt-20">
            <motion.textarea
            value={confession}
              onChange={(e) => setConfession(e.target.value)}
              whileFocus={{ scale: 1.06 }}
              transition={{ duration: 0.2 }}
              type="text"
              placeholder="Don't worry we won't judge"
              className="wrap rounded-2xl border-2 p-6 w-full h-36 lg:w-full lg:h-48 shadow-xl"
            ></motion.textarea>
            <div className="flex justify-between w-full gap-2">
              <motion.div className="bg-orange-400 rounded-2xl px-3 py-2">
                Messages Sent: {messageCount}
              </motion.div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.06, backgroundColor: "rgba(100, 0, 100, 0)"}}
                transition={{ duration: 0.2 }}
                className="border rounded-xl px-5 py-2"
              >
                Send
              </motion.button>
            </div>
          </form>
      </PageWrapper>
    </>
  );
}
