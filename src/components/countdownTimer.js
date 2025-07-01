"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { LuTimer } from "react-icons/lu";

export default function CountdownTimer({
  hours,
  minutes,
  seconds,
  timeUp = false,
  onComplete = () => {},
}) {
  const [timeLeft, setTimeLeft] = useState(null);
  const router = useRouter();
  const hasAlerted = useRef(false);

  useEffect(() => {
    let interval;
    const setupTimer = async () => {
      interval = setInterval(async () => {
        const res = await fetch(
          `/api/users/${localStorage.getItem("username")}/timer`
        );

        if (res.status === 404) {
          if (!hasAlerted.current) {
            hasAlerted.current = true;
            alert("Confession session for this user has ended.");
            clearInterval(interval);
            setTimeLeft(0);
            router.push("/");
          }
        }

        const data = await res.json();
        const now = Date.now();
        const elapsed = Math.floor((now - data.startTime) / 1000);
        const remaining = data.duration - elapsed;
        if (remaining <= 0 || timeUp) {
          clearInterval(interval);
          setTimeLeft(0);
          if(!hasAlerted.current) {
            hasAlerted.current = true;
            alert("The Confession session has ended.");
          }
          onComplete();
        } else {
          setTimeLeft(remaining);
        }
      }, 1000);
    };
    if (!timeUp) {
      setupTimer();
    }

    return () => clearInterval(interval);
  }, [timeUp]);

  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <div className="flex items-center gap-1 text-secondaryColour font-bold px-2 z-10 rounded-3xl border-2 text-xs md:text-sm">
        <LuTimer />
        <p>{formatTime(timeLeft)}</p>
      </div>
    </>
  );
}
