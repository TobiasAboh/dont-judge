import { motion, animate, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { LuTimer } from "react-icons/lu";
import { IoIosArrowDropdown } from "react-icons/io";
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
          className="bg-white border border-gray-300 rounded-3xl w-64"
        >
          <ul className="w-full">
            {confessionLifeSpan.map((text, index) => (
              <motion.div
                key={index}
                onClick={() => {
                  updateTimer(text);
                }}
                className="hover:cursor-pointer text-center border-b-2 border-gray-300 py-2 hover:bg-gray-300 w-full"
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
            className="relative flex items-center justify-center gap-3 border border-gray-300 cursor-pointer h-10 py-2 w-32 text-center bg-white rounded-xl"
          >
             <p className="flex items-center gap-1"><LuTimer className="text-gray-400" />{timerCount}hrs</p><IoIosArrowDropdown className="absolute right-2"/>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}
