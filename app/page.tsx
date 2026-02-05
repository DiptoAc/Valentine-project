"use client";

import React, { useState, useEffect } from 'react';
import Accepted from './Accepted';
import { noPhrases } from './phrases';

// --- HEART TRAIL LOGIC ---
const HeartTrail = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const y = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const heart = document.createElement("span");
      heart.innerHTML = "❤️";
      heart.style.position = "fixed";
      heart.style.left = `${x}px`;
      heart.style.top = `${y}px`;
      heart.style.fontSize = `${Math.random() * 20 + 10}px`;
      heart.style.pointerEvents = "none";
      heart.style.zIndex = "100";
      heart.style.transition = "all 1s ease-out";
      heart.style.opacity = "1";
      
      document.body.appendChild(heart);

      setTimeout(() => {
        heart.style.transform = `translateY(-50px) scale(1.5)`;
        heart.style.opacity = "0";
      }, 50);

      setTimeout(() => {
        heart.remove();
      }, 1000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchstart", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleMouseMove);
    };
  }, []);

  return null;
};

export default function ValentineProject() {
  const [noButtonPos, setNoButtonPos] = useState({ top: '50%', left: '60%' });
  const [isAccepted, setIsAccepted] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const moveButton = () => {
    const randomX = Math.floor(Math.random() * 60) + 10; 
    const randomY = Math.floor(Math.random() * 70) + 15;
    setNoButtonPos({ top: `${randomY}%`, left: `${randomX}%` });
    setNoCount((prev) => prev + 1);
  };

  if (!mounted) return null;

  if (isAccepted) {
    return <Accepted noCount={noCount} />;
  }

  return (
    <main className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-b from-pink-50 to-white overflow-hidden p-4 touch-none">
      <HeartTrail />
      
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
        <button
          onClick={() => setIsAccepted(true)}
          className="bg-green-500 hover:bg-green-600 text-white font-black py-3 px-8 md:py-4 md:px-12 rounded-full text-xl md:text-2xl transition-all transform hover:scale-110 active:scale-95 shadow-lg z-20"
        >
          Yes
        </button>

        <button
          onMouseEnter={moveButton}
          onTouchStart={(e) => { e.preventDefault(); moveButton(); }}
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
    </main>
  );
}