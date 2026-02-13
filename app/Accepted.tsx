"use client";

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { valentineQuotes } from './phrases';

interface AcceptedProps {
  noCount: number;
}

const bgColors = [
  // --- Pinks & Roses ---
  "bg-[#fff5f5]", // Very Pale Pink
  "bg-[#ffe4e6]", // Soft Rose
  "bg-[#fecdd3]", // Vibrant Blush
  "bg-[#fda4af]", // Deep Rose
  
  // --- Purples & Lavenders ---
  "bg-[#f5f3ff]", // Pale Lavender
  "bg-[#ede9fe]", // Light Purple
  "bg-[#ddd6fe]", // Soft Violet
  "bg-[#c4b5fd]", // Vibrant Lavender
  
  // --- Blues & Cyans ---
  "bg-[#eff6ff]", // Ice Blue
  "bg-[#dbeafe]", // Sky Blue
  "bg-[#bfdbfe]", // Soft Azure
  "bg-[#93c5fd]", // Bright Blue
  
  // --- Teals & Mint ---
  "bg-[#f0fdfa]", // Pale Mint
  "bg-[#ccfbf1]", // Light Teal
  "bg-[#99f6e4]", // Soft Aqua
  "bg-[#5eead4]", // Vibrant Teal
  
  // --- Greens ---
  "bg-[#f0fdf4]", // Pale Sage
  "bg-[#dcfce7]", // Light Green
  "bg-[#bbf7d0]", // Soft Mint Green
  "bg-[#86efac]", // Bright Pastel Green
  
  // --- Yellows & Oranges ---
  "bg-[#fffbeb]", // Cream
  "bg-[#fef3c7]", // Soft Gold
  "bg-[#fde68a]", // Warm Yellow
  "bg-[#fcd34d]", // Vibrant Amber
  "bg-[#ffedd5]", // Pale Peach
  "bg-[#fed7aa]", // Soft Orange
  "bg-[#fdba74]"  // Warm Apricot
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