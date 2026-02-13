import React, { useState, useEffect } from "react";
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

    // MASSIVE CONFETTI BLAST 🎉
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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black font-[Poppins]">

      {/* 🔥 Rotating Mesh Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#ff00cc,transparent_40%),radial-gradient(circle_at_80%_70%,#ff4d6d,transparent_40%),radial-gradient(circle_at_50%_50%,#c084fc,transparent_40%)]"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      {/* ✨ Sparkle Particles */}
      {[...Array(60)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full"
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

      {/* 💎 Glass Card with Animated Background Inside */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0, y: 100 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 1, type: "spring" }}
        className="relative z-10 overflow-hidden rounded-[50px] border border-white/30 shadow-[0_0_80px_rgba(255,0,150,0.6)] p-20 text-center max-w-3xl w-full bg-white/10 backdrop-blur-3xl"
      >
        {/* Inner Animated Background */}
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
              {/* 🌈 Shimmer Title */}
              <motion.h1
                animate={{ backgroundPosition: ["0%", "100%"] }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-fuchsia-500 bg-[length:200%_200%] mb-16"
              >
                Will You Be My Valentine? 💘
              </motion.h1>

              <div className="flex flex-col items-center gap-10 relative">

                {/* 💕 YES BUTTON */}
                <motion.button
                  onClick={handleYesClick}
                  animate={{ scale: yesScale }}
                  whileHover={{ scale: yesScale + 0.3 }}
                  whileTap={{ scale: yesScale - 0.1 }}
                  className="relative overflow-hidden cursor-pointer bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white font-extrabold px-20 py-10 rounded-full text-3xl shadow-[0_0_60px_rgba(255,0,150,1)]"
                >
                  <span className="relative z-10 cursor-pointer">YES 💕</span>
                  {/* Glow Pulse */}
                  <motion.span
                    className="absolute inset-0 bg-white/30"
                    animate={{ opacity: [0, 0.4, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                </motion.button>

                {/* 😢 NO BUTTON */}
                <motion.button
                  onClick={handleNoClick}
                  animate={{
                    y: noFallBehind ? 200 : 0,
                    scale: noFallBehind ? 0.3 : 1,
                    rotate: noFallBehind ? 45 : 0,
                    opacity: noFallBehind ? 0.2 : 1
                  }}
                  transition={{ duration: 0.7 }}
                  className="bg-gray-300 text-gray-900 cursor-pointer font-bold px-16 py-8 rounded-full text-2xl shadow-xl"
                >
                  NO 😢
                </motion.button>
              </div>

              {/* 😭 Dramatic Messages */}
              <div className="mt-16 min-h-[60px]">
                <AnimatePresence mode="wait">
                  {noCount > 0 && noCount <= 5 && (
                    <motion.p
                      key={noCount}
                      initial={{ opacity: 0, y: 40, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -40 }}
                      transition={{ type: "spring" }}
                      className="text-2xl font-bold text-pink-200"
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
                className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-emerald-300 bg-[length:200%_200%] mb-8"
              >
                YESSSSSS 💖 Finally you are mine...Love you
              </motion.h2>

              {/* ✨ Floating rotating hearts */}
              <motion.div
                className="text-9xl mt-16"
                animate={{
                  rotate: 360,
                  scale: [1, 1.5, 1]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "linear"
                }}
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
