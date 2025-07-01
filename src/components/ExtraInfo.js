import { BiLogoInstagram, BiLogoTwitter } from "react-icons/bi";

export default function ExtraInfo() {
  return (
    <div className="text-white flex flex-col justify-center mt-10 items-center gap-2 w-fit bg-secondaryColour rounded-xl px-4 py-2 shadow-xl ">
      <h1 className="font-bold mx-auto">Contact Us</h1>
      <div className="flex items-center gap-2">
        <p>tobiasaboh@gmail.com</p>
        <a href="https://www.instagram.com/t0b1a5_1"><BiLogoInstagram className="text-white" /></a>
        <a href="https://x.com/T0B1A53"><BiLogoTwitter className="text-white" /></a>
      </div>
      <div className="flex items-center gap-2">
        <p>tiimothy@gmail.com</p>
        <a href="https://www.instagram.com/timothy_aboh"><BiLogoInstagram className="text-white" /></a>
        <a href="https://twitter.com/timothy_aboh"><BiLogoTwitter className="text-white" /></a>
      </div>
    </div>

  );
}