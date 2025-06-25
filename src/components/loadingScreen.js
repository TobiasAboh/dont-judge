// components/LoadingScreen.js
export default function LoadingScreen({text="Loading"}) {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 text-white text-xl">
      {text}...
      {/* You can add a spinner or animation here */}
    </div>
  );
}
