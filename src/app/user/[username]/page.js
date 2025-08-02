"use client";
import { motion, AnimatePresence, animate } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import CountdownTimer from "@/components/countdownTimer";
import LoadingScreen from "@/components/loadingScreen";
import { FaExpandAlt } from "react-icons/fa";
import ShareCard from "@/components/ShareCard";

// app/confession/[id]/page.jsx



const variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function UserPage({ params }) {
  const { username } = React.use(params);
  const [timer, setTimer] = useState(localStorage.getItem("timer"));
  const [timeUp, setTimeUp] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const [confessions, setConfessions] = useState([]);
  const router = useRouter();

  // const username = cookies().get("username")?.value;

  // if (!username) {
  //   redirect("/");
  // }

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/users/${username}/messages`);

        if (response.ok) {
          const data = await response.json();
          setConfessions(data.messages);
        } else if (response.status === 404) {
          // alert("Confession session for this user has ended.");
          setTimeUp(true);
          router.push("/");
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

  const handleTimeUp = async () => {
    setLoading(true);
    try {
      // console.log("Time is up, deleting user:", username);
      const response = await fetch(`/api/delete-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username }),
      });

      const data = await response.json();
      if (data.success) {
        // Optionally redirect or show a message
        router.push("/");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <LoadingScreen text="Closing confession session" />;
  }
  return (
    <>
      {/* <PageWrapper> */}
      <div className="flex flex-col w-full justify-center items-center gap-4">
        <h1 className="font-bold text-lg md:text-3xl">Confessions</h1>
        <p className="text-center text-xs md:text-sm w-[80%] md:w-[50%]">
          Here's your link{" "}
          <span className="text-secondaryColour">{username}</span>. Share it
          with your friends!
        </p>
        <div className="flex justify-center items-center w-[80%] md:w-[50%] lg:w-[30%] bg-white rounded-xl px-4 py-2 shadow-xl">
          <div className="w-full font-bold overflow-hidden text-ellipsis text-xs">
            https://dontjudge.vercel.app/user/{username}/sendMessage
          </div>
          <motion.button
            onTap={copyToCLipboard}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
            className="rounded-xl border-2 px-4 py-2 shadow-xl cursor-pointer bg-secondaryColour text-white text-xs md:text-base w-[60%] font-bold"
          >
            {copied ? "Copied to Clipboard" : `Copy Link`}
          </motion.button>
        </div>
      </div>
      <div className="flex flex-col h-screen">
        {/* <div className="relative flex flex-row justify-center gap-4 border-b"> */}
        <div className="flex flex-row justify-between gap-3 md:gap-0 md:justify-between w-full sm:w-[90%] md:w-[60%] mx-auto mt-4 border-b-2 border-black/10 p-2">
          <button
            onClick={handleTimeUp}
            className="flex items-center flex-nowrap justify-content gap-2 font-bold text-secondaryColour hover:bg-white text-xs md:text-sm px-2 rounded-3xl"
          >
            <Image
              src="/exit.svg"
              alt="endSession"
              width={20}
              height={20}
              className="w-[12%] sm:w-[18%] md:w-[12%] h-auto"
            />
            <p>End Session</p>
          </button>
          <div className="flex items-center gap-2 text-xs sm:text-sm md:text-xl text-center font-bold text-black">
            Confessions
            <div className="min-w-6 min-h-6 md:min-w-6 md:min-h-6 lg:min-w-8 lg:min-h-8 bg-secondaryColour rounded-full px-1 py-1 text-xs md:text-base text-white text-center">
              {confessions.length}
            </div>
          </div>
          <CountdownTimer
            hours={timer}
            minutes={0}
            seconds={0}
            timeUp={timeUp}
            onComplete={handleTimeUp}
          />
        </div>
        {/* </div> */}

        {confessions.length > 0 ? (
          <motion.div
            variants={variants}
            className="grid gap-4 justify-start pt-4 px-6 pb-5 border-t overflow-y-auto max-h-[96vh]"
            initial="hidden"
            animate="show"
            style={{
              // display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              // gridAutoRows: "1fr",
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
                className="relative text-gray-500 h-52 md:h-72 flex flex-col justify-center md:justify-center cursor-pointer text-center text-sm md:text-base lg:text-lg font-bold bg-white rounded-xl px-5 break-words whitespace-normal overflow-hidden"
              >
                {text}
                <FaExpandAlt className="absolute right-2 bottom-2 text-gray-500" />
              </motion.div>
            ))}

            <AnimatePresence>
              {selectedCardId !== null && (
                <motion.div
                  onClick={() => setSelectedCardId(null)}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
                >
                  <ShareCard layout={`card-${selectedCardId}`} confession={confessions[selectedCardId]} username={username} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="flex flex-col justify-center h-full">
            <p className="text-center font-bold text-black">
              No confessions yet.
              <br />
              Share the link to get confessions.
            </p>
          </div>
        )}
      </div>
      {/* </PageWrapper> */}
    </>
  );
}
