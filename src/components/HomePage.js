"use client";
import Image from "next/image";
import Cookies from "js-cookie";
import { captureOwnerStack, use, useEffect, useState } from "react";
import PageWrapper from "@/app/pageWrapper";
import userData from "../../data/userData.json";
import { motion, animate, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import TimerDropdown from "@/components/timerDropdown";
import LoadingScreen from "@/components/loadingScreen";
import ExtraInfo from "@/components/ExtraInfo";
import VisitCounter from "@/components/VisitCounter";

export default function Home() {
  const [id, setId] = useState();
  const [username, setUsername] = useState();
  const [users, setUsers] = useState();
  const [timer, setTimer] = useState(1);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const addUser = async (name) => {
    // console.log("Adding user:", name, "with timer:", timer);
    if (!name || name.trim() === "") {
      alert("Please enter a valid username");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`/api/users/${name}/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          baseUsername: `${name.trim()}`,
          messages: [],
          timer: timer,
          startTime: Date.now(),
          duration: timer * 3600,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // setUsers(data.users);
        if (!data.exist) {
          // console.log("User added successfully:", data);
          setId(`${data.newUser.username}`);
          localStorage.setItem("username", data.newUser.username);
          localStorage.setItem("timer", timer);
          router.push(`/user/${data.newUser.username}`);
        } else {
          alert("Username already taken");
        }
      }
    } catch (error) {
      console.error("Error adding user:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <div className="flex flex-col h-screen">
      <PageWrapper>
        <div className="flex flex-col justify-end items-center gap-4 md:gap-2 w-full h-full">
          <div className="flex flex-col justify-center items-center gap-4 w-full md:w-6/12 lg:w-5/12">
            <h1 className="font-bold text-2xl md:text-4xl text-center">
              Create a Link and
              <br />
              Share 👀
              <span className="text-secondaryColour">(if you dare)</span>
            </h1>
            <p className="text-center text-xs md:text-sm w-[85%] md:w-[95%]">
              Type in a username now to start getting those crazy confessions,
              <br className="hidden lg:block" /> Read confessions. Laugh, Make
              comments, No judging.
            </p>
            <div className="relative w-[80%] md:w-[80%]">
              <motion.input
                // whileHover={{ scale: 1.1 }}
                onChange={(e) => setUsername(e.target.value)}
                transition={{ duration: 0.5 }}
                type="text"
                placeholder="Create username to begin!"
                className="rounded-xl border-2 pl-4 pr-20 py-2 w-full h-12 shadow-xl text-sm"
              ></motion.input>
              <motion.button
                onClick={() => addUser(username)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="submit"
                className="bg-secondaryColour text-white absolute right-1 top-1 bottom-1 rounded-xl border-2 px-4 py-1 shadow-xl"
              >
                Start
              </motion.button>
            </div>
          </div>
          <p className="font-bold">Set your link expiration time</p>
          <TimerDropdown setTimer={setTimer} />
          {/* <VisitCounter /> */}
          <ExtraInfo />
        </div>
      </PageWrapper>
    </div>
  );
}
