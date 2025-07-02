"use client";
import React, { useEffect, useState } from "react";
import PageWrapper from "@/app/pageWrapper";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend} from "react-icons/fi";
import ExtraInfo from "@/components/ExtraInfo";
import VisitCounter from "@/components/VisitCounter";

export default function MessagePage({ params }) {
  const [messageCount, setMessageCount] = useState(0);
  const [confession, setConfession] = useState("");
  const { username } = React.use(params);

  useEffect(() => {
    const incrementVisitCount = async () => {
      try {
        await fetch('/api/updateVisits', { method: 'GET' });
      } catch (error) {
        console.error('Error incrementing visit count:', error);
      }
    };

    incrementVisitCount();
  }, []);

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
      try {
        await fetch('/api/confessions', { method: 'POST' });
      } catch (error) {
        console.error('Error incrementing confession count:', error);
      }
      setMessageCount(messageCount + 1);
      setConfession("");
    } else if (response.status === 404) {
      alert("This user has already ended their confession session.");
    }
  };
  return (
    <>
      <PageWrapper>
        <div className="flex flex-col justify-start items-center gap-4 w-3/4 sm:5/6 lg:w-6/12 mx-auto mt-6 md:mt-6">
          <form onSubmit={sendMessage} className="w-full">
            <h1 className="font-bold text-black text-xl md:text-5xl text-center">
              Write Your Confession👀
            </h1>
            <div className="relative w-full h-64 md:h-36 mt-4">
              <motion.textarea
                value={confession}
                maxLength={250}
                onChange={(e) => setConfession(e.target.value)}
                whileFocus={{ scale: 1.06 }}
                transition={{ duration: 0.2 }}
                type="text"
                placeholder={`Tell ${username} your craziest confessions anonymously. Don't worry we don't judge`}
                className="rounded-2xl border-2 p-6 w-full h-full lg:w-full shadow-xl"
              />
              <p className="absolute bottom-6 right-8 font-bold text-sm text-secondaryColour text-right">
                {confession.length} / 250
              </p>
            </div>

            <div className="flex justify-end w-full gap-2 mt-4">
              <motion.button
                type="submit"
                whileHover={{
                  scale: 1.06,
                }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-1 text-white border rounded-xl px-5 py-2 bg-secondaryColour hover:bg-gray-400 hover:text-black"
              >
                <p>Send</p><FiSend />
              </motion.button>
            </div>
          </form>
        </div>
        <div className="p-4 flex flex-col items-center justify-center">
          {/* <VisitCounter /> */}
          <ExtraInfo />
        </div>
      </PageWrapper>
    </>
  );
}
