// components/LoadingScreen.js
import LoadingAnimation from "./loadingAnimation";

export default function LoadingScreen({text="Loading"}) {

  return (
    <div className="flex flex-col gap-2 fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 text-white text-xl">
      <p>{text}</p>
      <LoadingAnimation />
      {/* You can add a spinner or animation here */}
    </div>
  );
}
