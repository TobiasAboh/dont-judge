"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import PageWrapper from "./pageWrapper";
import userData from "../../data/userData.json";
import { motion, animate, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import TimerDropdown from "@/components/timerDropdown";

export default function Home() {
  const [id, setId] = useState();
  const [username, setUsername] = useState();
  const [users, setUsers] = useState();
  const [timer, setTimer] = useState(1);

  const router = useRouter();

  // useEffect(() => {
  //   fetch("../../data/userData.json")
  //     .then((res) => res.json())
  //     .then((data) => setUsers(data));
  // }, []);

  const addUser = async (name) => {
    // console.log("Adding user:", name, "with timer:", timer);
    if (!name || name.trim() === "") {
      alert("Please enter a valid username");
      return;
    }
    const response = await fetch(`/api/users/${name}/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: `${name.trim()}`, messages: [], timer: timer, startTime: Date.now(), duration: timer * 3600 }),
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
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-36"
          >
            We Listen We Don't Judge
          </motion.h1>
        </AnimatePresence>
      </header>
      <PageWrapper>
        <div className="flex flex-col justify-center items-center gap-4 md:gap-2">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-8/12 md:w-6/12 lg:w-5/12">
            <motion.input
              // whileHover={{ scale: 1.1 }}
              onChange={(e) => setUsername(e.target.value)}
              transition={{ duration: 0.5 }}
              type="text"
              placeholder="Create username to start"
              className="rounded-3xl border-2 px-4 py-2 w-full shadow-xl text-sm"
            ></motion.input>
            <motion.button
              onClick={() => addUser(username)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="submit"
              className="w-full md:w-auto rounded-3xl border-2 px-7 py-2 shadow-xl"
            >
              Start
            </motion.button>
          </div>
          <TimerDropdown setTimer={setTimer} />
        </div>
      </PageWrapper>
    </>
  );
}
