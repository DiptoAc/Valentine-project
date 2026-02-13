"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<{ id: number; left: string; duration: string; size: string }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev.slice(-15), 
        { 
          id: Date.now() + Math.random(), 
          left: Math.random() * 100 + "%", 
          duration: Math.random() * 5 + 5 + "s",
          size: Math.random() * 20 + 10 + "px"
        }
      ]);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <motion.span
          key={heart.id}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{ y: "-10vh", opacity: [0, 1, 0] }}
          transition={{ duration: parseFloat(heart.duration), ease: "linear" }}
          style={{ left: heart.left, fontSize: heart.size }}
          className="absolute text-pink-300/40"
        >
          ❤️
        </motion.span>
      ))}
    </div>
  );
};

export default FloatingHearts;