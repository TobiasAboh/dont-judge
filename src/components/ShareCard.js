"use client";
import { generateImage } from "./ImageGenerator";
import { motion } from "framer-motion";
import { FaShareAlt } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { PiWhatsappLogoBold } from "react-icons/pi";
import { useRef, useState } from "react";
import LoadingScreen from "./loadingScreen";

export default function ShareCard({ confession, layout, username }) {
  const cardRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const generateCardImage = async () => {
    return await generateImage(cardRef);
  };

  const handleDownload = async () => {
    const canvas = await generateCardImage();
    const dataUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "confession.png";
    link.click();
  };

  const handleShareWhatsApp = async () => {
    setLoading(true);
    try {
      const canvas = await generateCardImage();
      const url = `https://dontjudge.vercel.app/user/${username}/sendMessage`;
      const message = `Someone sent me this: ${url}`;

      if (navigator.share) {
        canvas.toBlob(
          async (blob) => {
            if (blob) {
              const file = new File([blob], "confession.png", {
                type: "image/png",
              });
              try {
                await navigator.share({
                  files: [file],
                  title: "Check out this confession!",
                  text: message,
                });
              } catch (error) {
                console.error("Error sharing:", error);
              }
            }
          },
          "image/png",
          1
        );
      } else {
        alert(
          "Your browser doesn't support sharing images directly. You can download the image from the Instagram icon and share it manually."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      id="confession-card"
      layoutId={layout}
      onClick={(e) => e.stopPropagation()}
      className="relative flex flex-col items-center bg-secondaryColour rounded-3xl p-1 w-[90%] lg:w-96 h-96"
    >
      {loading && <LoadingScreen />}
      <motion.div className="flex flex-col justify-center text-center w-full h-full text-sm md:text-xl lg:text-2xl font-bold bg-white rounded-3xl px-2 opacity-full break-words whitespace-normal">
        {confession}
      </motion.div>
      <div className="flex items-center justify-between w-full px-6 py-2 text-white font-bold">
        <div className="flex items-center">
          <span>Share with your friends</span>
        </div>
        {/* <div className="flex items-center"> */}
        <a className="absolute right-6" onClick={handleShareWhatsApp}>
          <FaShareAlt />
        </a>
        {/* </div> */}
      </div>
    </motion.div>
  );
}