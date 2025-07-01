import { BiLogoInstagram, BiLogoTwitter } from "react-icons/bi";
import { MdMail } from "react-icons/md";

export default function ExtraInfo() {
  const email = "tobiasaboh@gmail.com";
  const email2 = "tiimothyaboh@gmail.com";
  const subject = "";
  const body = "";

  const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const mailto2 = `mailto:${email2}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return (
    <div className="text-white flex flex-col justify-center mt-10 items-center gap-2 w-fit md:w-[35%] lg:w-[25%] bg-secondaryColour rounded-xl px-4 py-2 shadow-xl mb-6">
      <h1 className="font-bold mx-auto">Contact Us</h1>
      <div className="flex items-center justify-between gap-4 lg:gap-2 border-b-2 border-white pb-2 w-full">
        <p>Developer</p>
        <div className="flex gap-4">
          <a href={mailto}>
            <MdMail />
          </a>
          <a href="https://www.instagram.com/t0b1a5_1">
            <BiLogoInstagram className="text-white" />
          </a>
          <a href="https://x.com/T0B1A53">
            <BiLogoTwitter className="text-white" />
          </a>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 w-full">
        <p>UI/UX Designer</p>
        <div className="flex gap-4">
          <a href={mailto2}>
            <MdMail />
          </a>
          <a href="https://www.instagram.com/timothy_aboh">
            <BiLogoInstagram className="text-white" />
          </a>
          <a href="https://twitter.com/timothy_aboh">
            <BiLogoTwitter className="text-white" />
          </a>
        </div>
      </div>
    </div>
  );
}
