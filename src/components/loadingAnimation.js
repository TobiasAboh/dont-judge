import { motion } from 'framer-motion';

export default function LoadingAnimation() {
  return (
    <div className="flex items-center gap-2">
      <motion.div
        className="w-2 h-2 bg-gray-500 rounded-full"
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="w-2 h-2 bg-gray-500 rounded-full"
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2,
        }}
      />
      <motion.div
        className="w-2 h-2 bg-gray-500 rounded-full"
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4,
        }}
      />
    </div>
  );
}