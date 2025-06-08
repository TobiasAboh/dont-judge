import { motion, animate, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function TimerDropdown({ setTimer }) {
  const [timerCount, setTimerCount] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const confessionLifeSpan = [1, 12, 24];

    const updateTimer = (text) => {
      setTimerCount(text);
      setTimer(text);
      setIsOpen(!isOpen);
    };


  return (
    <>
      {isOpen ? (
        <motion.div
          layoutId="timer"
        //   onClick={() => {
            
        //   }}
          className="border rounded-3xl w-64"
        >
          <ul className="w-full">
            {confessionLifeSpan.map((text, index) => (
              <motion.div
                key={index}
                onClick={() => {
                  updateTimer(text);
                }}
                className="hover:cursor-pointer text-center border-b-1 py-2 hover:bg-white rounded-3xl w-full"
              >
                {text} hrs
              </motion.div>
            ))}
          </ul>
        </motion.div>
      ) : (
        <AnimatePresence>
          <motion.div
            layoutId="timer"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className="border h-10 py-2 w-64 text-center hover:bg-white rounded-3xl"
          >
            {timerCount} hrs
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}
