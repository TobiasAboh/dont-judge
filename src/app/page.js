"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import PageWrapper from "./pageWrapper";
import userData from "../../data/userData.json";
import { motion, animate, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const [id, setId] = useState();
  const [username, setUsername] = useState();
  const [users, setUsers] = useState();

  const router = useRouter();

  // useEffect(() => {
  //   fetch("../../data/userData.json")
  //     .then((res) => res.json())
  //     .then((data) => setUsers(data));
  // }, []);

  const addUser = async (name) => {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: `${username}${Date.now()}`, username: name, messages: [] }),
    });

    if (response.ok) {
      const data = await response.json();
      // setUsers(data.users);
      setId(`${data.newUser.id}`);
      router.push(`/user/${data.newUser.id}`);
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
            ## #### ### #### ###
          </motion.h1>
        </AnimatePresence>
      </header>
      <PageWrapper>
        <div className="flex flex-col md:flex-row w-full justify-center items-center gap-4">
          <motion.input
            // whileHover={{ scale: 1.1 }}
            onChange={(e) => setUsername(e.target.value)}
            transition={{ duration: 0.5 }}
            type="text"
            placeholder="Create username to start"
            className="rounded-3xl border-2 px-4 py-2 w-8/12 md:w-6/12 lg:w-5/12 shadow-xl text-sm"
          ></motion.input>
          <motion.button
            onClick={() => addUser(username)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
            className="rounded-3xl border-2 px-7 py-2 shadow-xl"
          >
            Start
          </motion.button>
        </div>
      </PageWrapper>
    </>
  );
}
