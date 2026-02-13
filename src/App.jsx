import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function FunnyValentineApp() {
  const [noCount, setNoCount] = useState(0);
  const [answeredYes, setAnsweredYes] = useState(false);

  const messages = [
    "kuchey, mabey wai ngegi day mep matang 😭",
    "nga sem shura shesi may daben 💔",
    "nga suicide bayga? 😢",
    "please please, accept baynang 🥺",
    "kuchen, choe meba nge metse tong hang hang feel bew may 💘"
  ];

  const handleNoClick = () => {
    if (noCount < 5) setNoCount((prev) => prev + 1);
  };

  const handleYesClick = () => {
    setAnsweredYes(true);
    const duration = 3 * 1000;
    const end = Date.now() + duration;
    const interval = setInterval(() => {
      if (Date.now() > end) return clearInterval(interval);
      confetti({
        particleCount: 6,
        spread: 100,
        startVelocity: 40,
        origin: { x: Math.random(), y: Math.random() - 0.2 }
      });
    }, 150);
  };

  const yesScale = 1 + noCount * 0.35;
  const noFallBehind = noCount >= 5;

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black font-[Poppins] p-4">

      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#ff00cc,transparent_40%),radial-gradient(circle_at_80%_70%,#ff4d6d,transparent_40%),radial-gradient(circle_at_50%_50%,#c084fc,transparent_40%)]"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      {/* Sparkles */}
      {[...Array(60)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0
          }}
          animate={{
            y: [null, -100],
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.5]
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
        />
      ))}

      {/* Glass Card */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0, y: 100 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 1, type: "spring" }}
        className="relative z-10 overflow-hidden rounded-[2rem] border border-white/30 shadow-[0_0_80px_rgba(255,0,150,0.6)] p-8 sm:p-12 md:p-20 text-center max-w-full sm:max-w-md md:max-w-3xl w-full bg-white/10 backdrop-blur-3xl"
      >
        {/* Inner animated background */}
        <motion.div
          className="absolute inset-0"
          style={{ zIndex: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full bg-[radial-gradient(circle_at_20%_30%,#ff00cc,transparent_40%),radial-gradient(circle_at_80%_70%,#ff4d6d,transparent_40%),radial-gradient(circle_at_50%_50%,#c084fc,transparent_40%)] absolute inset-0" />
        </motion.div>

        <AnimatePresence mode="wait">
          {!answeredYes ? (
            <motion.div
              key="question"
              className="relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Shimmer Title */}
              <motion.h1
                animate={{ backgroundPosition: ["0%", "100%"] }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-fuchsia-500 bg-[length:200%_200%] mb-8 sm:mb-16"
              >
                Will You Be My Valentine? 💘
              </motion.h1>

              {/* YES Button centered absolutely */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <motion.button
                  onClick={handleYesClick}
                  animate={{ scale: yesScale }}
                  whileHover={{ scale: yesScale + 0.3 }}
                  whileTap={{ scale: yesScale - 0.1 }}
                  className="relative overflow-hidden cursor-pointer bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white font-extrabold px-10 sm:px-20 py-4 sm:py-10 rounded-full text-xl sm:text-3xl shadow-[0_0_40px_rgba(255,0,150,0.8)]"
                >
                  <span className="relative z-10 cursor-pointer">YES 💕</span>
                  <motion.span
                    className="absolute inset-0 bg-white/30"
                    animate={{ opacity: [0, 0.4, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                </motion.button>
              </div>

              {/* NO Button */}
              <div className="flex justify-center mt-48 sm:mt-60 relative z-20">
                <motion.button
                  onClick={handleNoClick}
                  animate={{
                    y: noFallBehind ? 150 : 0,
                    scale: noFallBehind ? 0.3 : 1,
                    rotate: noFallBehind ? 45 : 0,
                    opacity: noFallBehind ? 0.2 : 1
                  }}
                  transition={{ duration: 0.7 }}
                  className="bg-gray-300 text-gray-900 cursor-pointer font-bold px-6 sm:px-16 py-3 sm:py-8 rounded-full text-lg sm:text-2xl shadow-xl"
                >
                  NO 😢
                </motion.button>
              </div>

              {/* Messages */}
              <div className="mt-8 sm:mt-16 min-h-[50px] relative z-20">
                <AnimatePresence mode="wait">
                  {noCount > 0 && noCount <= 5 && (
                    <motion.p
                      key={noCount}
                      initial={{ opacity: 0, y: 30, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ type: "spring" }}
                      className="text-lg sm:text-2xl font-bold text-pink-200"
                    >
                      {messages[noCount - 1]}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, type: "spring" }}
            >
              <motion.h2
                animate={{ rotate: [0, -15, 15, -15, 0] }}
                transition={{ duration: 1 }}
                className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-emerald-300 mb-4 sm:mb-8"
              >
                YESSSSSS 💖 Finally you are mine...Love you
              </motion.h2>

              {/* Floating hearts */}
              <motion.div
                className="text-6xl sm:text-9xl mt-8 sm:mt-16"
                animate={{ rotate: 360, scale: [1, 1.5, 1] }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              >
                💘✨💘✨💘
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
