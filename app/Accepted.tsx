"use client";

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { valentineQuotes } from './phrases';

interface AcceptedProps {
  noCount: number;
}

const bgColors = [
  // --- PINK SERENADE (The Loop Starts) ---
  "bg-[#fff5f5]", "bg-[#fff1f2]", "bg-[#ffe4e6]", "bg-[#fecdd3]", 
  "bg-[#fda4af]", "bg-[#fb7185]", "bg-[#fda4af]", "bg-[#fecdd3]", 
  "bg-[#ffe4e6]", "bg-[#fff1f2]",

  // --- PURPLE HARMONY ---
  "bg-[#f5f3ff]", "bg-[#ede9fe]", "bg-[#ddd6fe]", "bg-[#c4b5fd]", 
  "bg-[#a78bfa]", "bg-[#8b5cf6]", "bg-[#a78bfa]", "bg-[#c4b5fd]", 
  "bg-[#ddd6fe]", "bg-[#ede9fe]",

  // --- BLUE TRANQUILITY ---
  "bg-[#eff6ff]", "bg-[#dbeafe]", "bg-[#bfdbfe]", "bg-[#93c5fd]", 
  "bg-[#60a5fa]", "bg-[#3b82f6]", "bg-[#60a5fa]", "bg-[#93c5fd]", 
  "bg-[#bfdbfe]", "bg-[#dbeafe]",

  // --- TEAL & MINT REFRESH ---
  "bg-[#f0fdfa]", "bg-[#ccfbf1]", "bg-[#99f6e4]", "bg-[#5eead4]", 
  "bg-[#2dd4bf]", "bg-[#14b8a6]", "bg-[#2dd4bf]", "bg-[#5eead4]", 
  "bg-[#99f6e4]", "bg-[#ccfbf1]",

  // --- EMERALD & SAGE ---
  "bg-[#f0fdf4]", "bg-[#dcfce7]", "bg-[#bbf7d0]", "bg-[#86efac]", 
  "bg-[#4ade80]", "bg-[#22c55e]", "bg-[#4ade80]", "bg-[#86efac]", 
  "bg-[#bbf7d0]", "bg-[#dcfce7]",

  // --- SUNSET GOLD & AMBER ---
  "bg-[#fffbeb]", "bg-[#fef3c7]", "bg-[#fde68a]", "bg-[#fcd34d]", 
  "bg-[#fbbf24]", "bg-[#f59e0b]", "bg-[#fbbf24]", "bg-[#fcd34d]", 
  "bg-[#fde68a]", "bg-[#fef3c7]",

  // --- ORANGE & PEACH GLOW ---
  "bg-[#fff7ed]", "bg-[#ffedd5]", "bg-[#fed7aa]", "bg-[#fdba74]", 
  "bg-[#fb923c]", "bg-[#f97316]", "bg-[#fb923c]", "bg-[#fdba74]", 
  "bg-[#fed7aa]", "bg-[#ffedd5]",

  // --- THE BRIDGE (Back to Pink) ---
  "bg-[#fff1f2]", "bg-[#fff5f5]" 
];


const secretIcons = ["❤️", "💖", "✨", "🌹", "🦋", "💍", "🏹", "🐱", "⭐", "🌷" , "🍒" , "😉" , "💘"];


const Accepted: React.FC<AcceptedProps> = ({ noCount }) => {
  const [page, setPage] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0); // Moved inside the component
  const [mounted, setMounted] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
    
    // 1. Initial Confetti
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff0000', '#ff69b4', '#ffffff']
    });

    // 2. Music Logic
    const audio = new Audio('/accepted.mp3');
    audio.loop = true;
    let playPromise: Promise<void> | undefined;

    const timer = setTimeout(() => {
      playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => console.log("Waiting for interaction"));
      }
    }, 150);

    return () => {
      clearTimeout(timer);
      if (playPromise !== undefined) {
        playPromise.then(() => {
          audio.pause();
          audio.src = "";
        }).catch(() => {});
      }
    };
  }, []);

  const storyPages = [
    {
      title: "Our Story Begins...",
      content: `It took you ${noCount} tries, but I knew you'd say Yes eventually! ❤️`,
      image: "Holding_Hands.jpg"
    },
    {
      title: "A Little Message",
      content: "শোনো, জল ছলছল কাজল চোখের কন্যা সর্বনাশী, আমি তোমায় ভালোবাসি। 🌹",
      image: "https://media.giphy.com/media/iH2IldVkqeLuJ7eJ0L/giphy.gif"
    },
    {
      title: "To Many More...",
      content: valentineQuotes[quoteIndex], // Uses the cycling quotes
      image: "" // No image needed for final page
    }
  ];

  const nextPage = () => { if (page < storyPages.length - 1) setPage(page + 1); };
  const prevPage = () => { if (page > 0) setPage(page - 1); };

  if (!mounted) return null;

  return (
    <div className={`relative flex items-center justify-center h-screen ${bgColors[bgIndex]} transition-colors duration-1000 ease-in-out p-4 overflow-hidden`}>
      
      {/* The Book Container */}
      <motion.div 
        initial={{ rotateY: -20, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-md bg-white aspect-[3/4.5] rounded-r-2xl shadow-2xl border-l-[12px] border-red-700 p-6 md:p-10 flex flex-col justify-between overflow-hidden z-10"
        style={{ perspective: "1000px" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={page + (page === storyPages.length - 1 ? quoteIndex : 0)}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col items-center justify-center text-center"
          >
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-red-800 mb-6">
              {storyPages[page].title}
            </h2>

            {page < storyPages.length - 1 ? (
              <img 
                src={storyPages[page].image} 
                referrerPolicy="no-referrer"
                className="w-48 h-48 object-cover rounded-lg mb-6 shadow-md border-2 border-pink-100" 
                alt="story" 
              />
            ) : (
              <motion.div 
                key={quoteIndex} // This ensures the icon animates when it changes
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="text-6xl mb-6 mt-4"
              >
                {secretIcons[quoteIndex % secretIcons.length]}
              </motion.div>
            )}

            <p className={`text-gray-700 font-medium leading-relaxed italic px-4 transition-all duration-500 ${page === storyPages.length - 1 ? 'text-xl md:text-2xl text-red-600 font-semibold' : 'text-base'}`}>
              "{storyPages[page].content}"
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Footer Navigation */}
        <div className="flex flex-col items-center mt-6 border-t border-pink-100 pt-4 gap-4">
          <div className="flex justify-between items-center w-full">
            <button 
              onClick={prevPage}
              disabled={page === 0}
              className={`text-sm font-bold ${page === 0 ? 'text-gray-300' : 'text-red-400 hover:text-red-600'}`}
            >
              ← Back
            </button>

            <span className="text-xs text-gray-400 font-mono font-bold">
              {page + 1} / {storyPages.length}
            </span>

            {page < storyPages.length - 1 ? (
              <button 
                onClick={nextPage}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md transition-all active:scale-95"
              >
                Next →
              </button>
            ) : (
              <motion.span 
                initial={{ scale: 0.8 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-red-600 font-black text-sm"
              >
                The End ❤️
              </motion.span>
            )}
          </div>

          {/* ENHANCED: Confetti Rain Button */}
          {page === storyPages.length - 1 && (
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ 
                y: 0, 
                opacity: 1,
                scale: [1, 1.05, 1], // Pulsing effect
                boxShadow: [
                  "0px 0px 0px rgba(236, 72, 153, 0)",
                  "0px 0px 20px rgba(236, 72, 153, 0.6)",
                  "0px 0px 0px rgba(236, 72, 153, 0)"
                ]
              }}
              transition={{ 
                y: { duration: 0.5 },
                opacity: { duration: 0.5 },
                scale: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                boxShadow: { repeat: Infinity, duration: 2, ease: "easeInOut" }
              }}
              whileHover={{ scale: 1.15, filter: "brightness(1.1)" }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                confetti({
                  particleCount: 150, // Increased count for more impact
                  spread: 100,
                  origin: { y: 0.7 },
                  colors: ['#ff0000', '#ff69b4', '#ffffff', '#FFD700', "#000000", "#FF1493", "#FF4500"]
                });
                // Cycle the quote on each click
                setQuoteIndex((prev) => (prev + 1) % valentineQuotes.length);

                // Cycle the background color
                setBgIndex((prev) => (prev + 1) % bgColors.length);
              }}
              className="bg-gradient-to-r from-pink-500 via-red-500 to-rose-500 text-white text-sm md:text-base font-black py-3 px-8 rounded-full shadow-2xl border-2 border-white flex items-center gap-3 mt-2 relative overflow-hidden group"
            >
              {/* Inner glow effect on hover */}
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <span className="text-lg md:text-xl animate-bounce">🎊</span> 
              <span className="tracking-tight uppercase">ভালোবাসা পড়ুক ঝরে</span>
              <span className="text-lg md:text-xl animate-bounce">🎊</span>
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Credit and Replay (Outside Book) */}
      {page === storyPages.length - 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start opacity-60 hover:opacity-100 transition-opacity">
            <a href="https://sudipto-sust.vercel.app/" target="_blank" rel="noopener noreferrer" className="group">
              <p className="text-[10px] md:text-xs font-mono font-bold text-red-800 uppercase tracking-widest group-hover:text-red-600">
                Credit: (Stupido/Sust)
              </p>
              <div className="h-[1.5px] w-0 group-hover:w-full bg-red-400 transition-all duration-300 mt-1" />
            </a>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="fixed bottom-6 right-6 z-50 bg-white/70 hover:bg-white text-red-500 hover:text-red-700 px-4 py-2 rounded-full shadow-md transition-all flex items-center gap-2 text-xs font-black border border-red-200"
          >
            <span>🔄</span> START OVER
          </button>
        </motion.div>
      )}

      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-10 z-0">
        <div className="absolute top-10 left-10 text-8xl">🌹</div>
        <div className="absolute bottom-10 right-10 text-8xl">🍷</div>
      </div>
    </div>
  );
};

export default Accepted;