"use client";

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

interface AcceptedProps {
  noCount: number;
}

const Accepted: React.FC<AcceptedProps> = ({ noCount }) => {
  const [page, setPage] = useState(0);

  // The pages of your "Storybook"
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
      content: "Let's make this Valentine's Day the first of many beautiful chapters. ✨",
      image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHp1eXlzY2N4eXN4eXN4eXN4eXN4eXN4eXN4eXN4eXN4ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oz8xAFms7E9r65v6o/giphy.gif"
    }
  ];

  useEffect(() => {
      // 1. Confetti burst on entry
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

      // We use a small timeout to let the previous page's audio fully clear
      const timer = setTimeout(() => {
        playPromise = audio.play();
        
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("Playback prevented by browser until user interacts:", error);
          });
        }
      }, 150); // 150ms delay for a clean transition

      // Cleanup function
      return () => {
        clearTimeout(timer);
        if (playPromise !== undefined) {
          playPromise.then(() => {
            audio.pause();
            audio.src = ""; // Nuclear option: clear source to prevent ghost audio
          }).catch(() => {
            // Promise was rejected (likely browser blocked it), no need to pause
          });
        } else {
          // Fallback for cases where the timeout hasn't fired yet
          audio.pause();
          audio.src = "";
        }
      };
    }, []);

  const nextPage = () => {
    if (page < storyPages.length - 1) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#fff5f5] p-4 overflow-hidden">
      {/* The Book Container */}
      <motion.div 
        initial={{ rotateY: -20, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-md bg-white aspect-[3/4.5] rounded-r-2xl shadow-2xl border-l-[12px] border-red-700 p-6 md:p-10 flex flex-col justify-between overflow-hidden"
        style={{ perspective: "1000px" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex-1 flex flex-col items-center justify-center"
          >
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-red-800 mb-6 text-center">
              {storyPages[page].title}
            </h2>
            
            <img 
              src={storyPages[page].image} 
              className="w-48 h-48 object-cover rounded-lg mb-6 shadow-md border-2 border-pink-100" 
              alt="story gif" 
            />
            
            <p className="text-gray-700 font-medium leading-relaxed italic text-center px-2">
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

          {/* NEW: Confetti Rain Button (Only shows on the last page) */}
          {page === storyPages.length - 1 && (
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                confetti({
                  particleCount: 100,
                  spread: 100,
                  origin: { y: 0.7 },
                  colors: ['#ff0000', '#ff69b4', '#ffffff', '#FFD700'] // Added Gold
                });
              }}
              className="bg-gradient-to-r from-pink-400 to-red-500 text-white text-xs font-bold py-2 px-6 rounded-full shadow-lg border-2 border-white flex items-center gap-2"
            >
              <span>🎊</span> Trigger Confetti Rain <span>🎊</span>
            </motion.button>
          )}
        </div>

        {/* Fairy Tale Magic Dust Decor */}
        <div className="absolute top-4 right-4 text-yellow-400 opacity-30 text-2xl animate-pulse">✨</div>
        <div className="absolute bottom-20 left-4 text-pink-300 opacity-40 text-xl animate-bounce">💖</div>
      </motion.div>

      {/* Background decoration for the whole screen */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-10 z-0">
        <div className="absolute top-10 left-10 text-8xl">🌹</div>
        <div className="absolute bottom-10 right-10 text-8xl">🍷</div>
      </div>
    </div>
  );
};

export default Accepted;