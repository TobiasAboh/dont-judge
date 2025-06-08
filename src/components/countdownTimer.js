"use client";
import { useState, useEffect } from "react";

export default function CountdownTimer({
  hours,
  minutes,
  seconds,
  onComplete = () => {},
}) {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    let interval;
    const fetchTime = async () => {
      const res = await fetch(
        `/api/users/${localStorage.getItem("username")}/timer`
      );
      const data = await res.json();

      if (!data || !data.startTime || !data.duration) {
        setTimeLeft(0);
        return;
      }

      interval = setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - data.startTime) / 1000);
        const remaining = data.duration - elapsed;
        console.log("Remaining time:", remaining);
        if (remaining <= 0) {
          clearInterval(interval);
          setTimeLeft(0);
          onComplete();
        } else {
          setTimeLeft(remaining);
        }
      }, 1000);
    };
    fetchTime();
    return () => clearInterval(interval);
  }, [timeLeft]);

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
      <div className="absolute px-2 z-10 rounded-3xl border-2 fixed right-4">
        <p>{formatTime(timeLeft)}</p>
      </div>
    </>
  );
}
