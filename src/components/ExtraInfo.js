import { BiLogoInstagram, BiLogoTwitter } from "react-icons/bi";
import { IoIosMail } from "react-icons/io";
import { IoCodeSlash } from "react-icons/io5";
import { PiPaintBrushHousehold } from "react-icons/pi";
import { motion } from "framer-motion";

const InfoCard = (props) => {
  const { title, email, instagram, twitter, icon } = props;
  const subject = "";
  const body = "";
  const mailto = `mailto:${email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
  return (
    <div className="flex bg-white items-center justify-between gap-4 lg:gap-4 w-full pl-4 rounded-l-lg">
      <p className="flex items-center gap-2">
        {icon}
        {title}
      </p>
      <div className="flex h-full gap-4 bg-gray-500 py-2 px-4 rounded-md">
        <motion.a
          href={mailto}
          animate={{
            y: [0, -2, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <IoIosMail className="text-white" />
        </motion.a>
        <motion.a
          href={instagram}
          animate={{
            y: [0, -2, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2,
          }}
        >
          <BiLogoInstagram className="text-white" />
        </motion.a>
        <motion.a
          href={twitter}
          animate={{
            y: [0, -2, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
        >
          <BiLogoTwitter className="text-white" />
        </motion.a>
      </div>
    </div>
  );
};

export default function ExtraInfo() {
  const email = "tobiasaboh@gmail.com";
  const email2 = "tiimothyaboh@gmail.com";

  return (
    <div className="flex flex-col gap-4 mt-10">
      {/* <div className="text-white flex flex-col justify-center mt-10 items-center gap-2 w-fit md:w-[35%] lg:w-[25%] rounded-xl px-4 py-2 shadow-xl mb-6"> */}
      <InfoCard
        title="Developer"
        email={email}
        instagram="https://www.instagram.com/t0b1a5_1"
        twitter="https://x.com/T0B1A53"
        icon={<IoCodeSlash />}
      />

      <InfoCard
        title="Designer"
        email={email}
        instagram="https://www.instagram.com/timothy_aboh"
        twitter="https://x.com/T0B1A53"
        icon={<PiPaintBrushHousehold />}
      />
      {/* </div> */}
    </div>
  );
}
