
"use client";
export const dynamic = 'force-static';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti'

export default function ValentineProject() {
  const [noButtonPos, setNoButtonPos] = useState({ top: '50%', left: '60%' });
  const [isAccepted, setIsAccepted] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Fix for hydration in Next.js
// Fix for hydration and confetti in Next.js
  useEffect(() => {
    // 1. Mark as mounted so the screen actually shows up
    setMounted(true);

    // 2. Trigger confetti only if accepted
    if (isAccepted) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff0000', '#ff69b4', '#ffffff']
      });

      //Music
      const audio = new Audio('/music.mp3');
      audio.loop = true;
      audio.play().catch(e => console.error("Audio play failed:", e));
    }
  }, [isAccepted]); // This runs once on load AND whenever isAccepted changes

  const noPhrases = [
    "No",
    "Are you sure?",
    "Paka kotha?",
    "Ki lo? Click korte parona?",
    "Arre try koro...",
    "Kopal e nai!",
    "Bhalobasha dorkar!",
    "Wrong choice, baby!",
    "Ekbar bhebe dekho...",
    "Hobe an bhai",
    "Error 404: No not found",
    "Try harder!",
    "Bhai, thak dorkar nai...",
    "Oops! Missed it.",
    "Click me if you can!",
    "Yes e click koro lokhi meye",
    "Still trying? 😂",
    "Persistence is key, but not here.",
    "Na bolle hobe?",
    "Just give up already!",
    "Eto shoja",
    "Dhurrr!",
    "Asha chere dao",
    "Kopal tai pora!",
    "Boka naki?",
    "তোমায় নিয়ে পালাবো",
    "সুইজারল্যান্ড যাবো",
    "না না, মাল্টা যাবো",
    "মাল্টা খাবো",
    "এমন ছেলে হারালে",
    "কাঁদতে হবে আড়ালে",
    "আমি হলাম রোমিও",
    "লেডি কিলার রোমিও",
    "পাক্কা প্লেবয় রোমিও"
  ];

const moveButton = () => {
  // Narrower range for mobile (max 60% of width)
  const randomX = Math.floor(Math.random() * 60) + 10; 
  const randomY = Math.floor(Math.random() * 70) + 15;
  
  setNoButtonPos({ top: `${randomY}%`, left: `${randomX}%` });
  setNoCount((prev) => prev + 1);
};

  if (!mounted) return null;

  if (isAccepted) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-pink-100 text-center p-6 transition-all duration-500">
        <h1 className="text-5xl font-extrabold text-red-600 mb-6 animate-bounce">
          Finally! ❤️
        </h1>
        <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-pink-300 max-w-sm">
          <p className="text-xl text-gray-800 font-medium">
            It only took you <span className="text-red-500 font-bold text-2xl">{noCount}</span> attempts to realize we're a match!
          </p>
          <p className="text-sm text-gray-500 mt-2 italic">
            {noCount > 10 ? "Kafi beshi dhoirjo tomar!" : "That was quick!"}
          </p>
        </div>
        <img 
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHp1eXlzY2N4eXN4eXN4eXN4eXN4eXN4eXN4eXN4eXN4ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HlIDU84K376wT28/giphy.gif" 
          alt="celebration" 
          className="rounded-lg shadow-2xl w-72 mt-8" 
        />
      </div>
    );
  }

  return (
    <main className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-b from-pink-50 to-white overflow-hidden p-4 touch-none">
      <div className="z-10 text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-black text-pink-600 drop-shadow-sm">
          Will you be my Valentine? 🌹
        </h1>
        {noCount > 0 && (
          <p className="mt-4 text-pink-400 font-mono font-bold animate-pulse">
            Attempts to escape: {noCount}
          </p>
        )}
      </div>
      
      <div className="flex gap-8 items-center z-10">
        {/* YES BUTTON */}
      <button
        onClick={() => setIsAccepted(true)}
        className="bg-green-500 hover:bg-green-600 text-white font-black py-3 px-8 md:py-4 md:px-12 rounded-full text-xl md:text-2xl transition-all transform hover:scale-110 active:scale-95 shadow-lg z-20"
      >
        Yes
      </button>

        {/* MOVING NO BUTTON */}
        <button
          onMouseEnter={moveButton}
          onTouchStart={(e) => { e.preventDefault(); moveButton(); }} // Prevents mobile ghost clicks
          style={{ 
            position: 'absolute', 
            top: noButtonPos.top, 
            left: noButtonPos.left,
            transition: 'all 0.15s ease-out',
          }}
          className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg shadow-md whitespace-nowrap text-sm md:text-base z-20"
        >
          {noPhrases[noCount % noPhrases.length]}
        </button>
      </div>

      {/* Background Decor */}
      <div className="absolute top-10 left-10 text-pink-200 text-6xl opacity-20">❤️</div>
      <div className="absolute bottom-10 right-10 text-pink-200 text-6xl opacity-20">💖</div>
    </main>
  );
}