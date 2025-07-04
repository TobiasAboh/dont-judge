"use client";
import html2canvas from "html2canvas";
import { motion } from "framer-motion";
import { FaShareAlt } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { PiWhatsappLogoBold } from "react-icons/pi";

export default function ShareCard({ confession, layout, username }) {
  const generateCardImage = async () => {
    const card = document.getElementById("confession-card");

    // Create a temporary container
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.left = "-9999px";
    container.style.top = "-9999px";
    container.style.width = "1080px";
    container.style.height = "1080px";
    container.style.display = "flex";
    container.style.justifyContent = "center";
    container.style.alignItems = "center";
    container.style.backgroundImage = "url(/background.png)";
    container.style.backgroundSize = "cover";

    const cardClone = card.cloneNode(true);
    cardClone.style.transform = "scale(2.3)";
    container.appendChild(cardClone);
    document.body.appendChild(container);

    const canvas = await html2canvas(container, {
      logging: true,
      useCORS: true,
      width: 1080,
      height: 1080,
    });

    document.body.removeChild(container);
    return canvas;
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
              window.open(
                `https://wa.me/?text=${encodeURIComponent(message)}`,
                "_blank"
              );
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
      window.open(
        `https://wa.me/?text=${encodeURIComponent(message)}`,
        "_blank"
      );
    }
  };

  return (
    <motion.div
      id="confession-card"
      layoutId={layout}
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col items-center bg-secondaryColour rounded-3xl p-1 w-[90%] lg:w-96 h-96"
    >
      <motion.div className="flex flex-col justify-center text-center w-full h-full text-sm md:text-base lg:text-lg font-bold bg-white rounded-3xl px-2 opacity-full break-words whitespace-normal">
        {confession}
      </motion.div>
      <div className="flex items-center justify-between w-full px-6 py-2 text-white font-bold">
        <p>Share with your friends</p>
        <div className="flex items-center gap-2">
          {/* <a onClick={handleDownload}><FiInstagram className="w-[100%]" /></a>
          <a onClick={handleShareWhatsApp}><PiWhatsappLogoBold className="w-[100%]" /></a> */}
        <a onClick={handleShareWhatsApp}><FaShareAlt className="w-[100%]" /></a>
        </div>
      </div>
    </motion.div>
  );
}
