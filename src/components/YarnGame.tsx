import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';

export const YarnCatcher: React.FC = () => {
  const [score, setScore] = useState(0);
  const [basketPos, setBasketPos] = useState(50);
  const [yarns, setYarns] = useState<{ id: number, x: number, y: number, color: string }[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const requestRef = useRef<number>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const colors = ['#ffd1dc', '#aec6cf', '#b39eb5', '#fdfd96', '#77dd77'];

  const spawnYarn = () => {
    const newYarn = {
      id: Date.now(),
      x: Math.random() * 90,
      y: -10,
      color: colors[Math.floor(Math.random() * colors.length)]
    };
    setYarns(prev => [...prev, newYarn]);
  };

  const update = () => {
    setYarns(prev => {
      const nextYarns = prev.map(y => ({ ...y, y: y.y + 2.5 }));
      
      // Catch logic
      const caughtCount = nextYarns.filter(y => 
        y.y > 80 && y.y < 95 && Math.abs(y.x - basketPos) < 15
      ).length;
      
      if (caughtCount > 0) {
        setScore(s => s + caughtCount);
      }

      // Check for missed yarns
      if (nextYarns.some(y => y.y > 100)) {
         setGameOver(true);
         setIsPlaying(false);
      }

      return nextYarns.filter(y => y.y <= 100 && !(y.y > 80 && Math.abs(y.x - basketPos) < 15));
    });

    if (isPlaying) {
      requestRef.current = requestAnimationFrame(update);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(spawnYarn, 1000);
      requestRef.current = requestAnimationFrame(update);
      return () => {
        clearInterval(interval);
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
      };
    }
  }, [isPlaying, basketPos]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') setBasketPos(p => Math.max(0, p - 10));
    if (e.key === 'ArrowRight') setBasketPos(p => Math.min(90, p + 10));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        setBasketPos(Math.min(90, Math.max(0, x - 5)));
    }
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[400px] bg-gray-50 border-4 border-black overflow-hidden select-none cursor-crosshair"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="absolute top-2 right-2 font-gamers text-xs">SCORE: {score}</div>
      
      {!isPlaying && !gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-10 p-4 text-center">
          <h3 className="font-gamers text-lg mb-4 text-pastel-purple">YARN CATCHER</h3>
          <p className="font-pixel text-xl mb-6">Catch the falling yarn balls to keep the knitting going!</p>
          <button 
            onClick={() => { setScore(0); setYarns([]); setIsPlaying(true); setGameOver(false); }}
            className="btn-retro bg-pastel-pink"
          >
            START GAME
          </button>
        </div>
      )}

      {gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50/90 z-10 p-4 text-center">
          <h3 className="font-gamers text-lg mb-4 text-red-500">GAME OVER</h3>
          <p className="font-pixel text-xl mb-6">You missed a stitch!</p>
          <p className="font-pixel text-2xl mb-6">FINAL SCORE: {score}</p>
          <button 
            onClick={() => { setScore(0); setYarns([]); setIsPlaying(true); setGameOver(false); }}
            className="btn-retro bg-pastel-green"
          >
            RETRY
          </button>
        </div>
      )}

      {yarns.map(yarn => (
        <motion.div
           key={yarn.id}
           className="absolute pointer-events-none"
           style={{ left: `${yarn.x}%`, top: `${yarn.y}%` }}
        >
          <svg width="40" height="40" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill={yarn.color} stroke="black" strokeWidth="4" />
            <path d="M30,30 Q50,10 70,30" fill="none" stroke="black" strokeWidth="2" />
            <path d="M20,50 Q50,50 80,50" fill="none" stroke="black" strokeWidth="2" />
            <path d="M30,70 Q50,90 70,70" fill="none" stroke="black" strokeWidth="2" />
          </svg>
        </motion.div>
      ))}

      {/* Basket/Basket (Cat) */}
      <motion.div 
        className="absolute bottom-4 h-16 w-16"
        animate={{ left: `${basketPos}%` }}
      >
        <div className="relative w-full h-full">
            {/* Simple Cat/Basket Pixel Art */}
            <svg viewBox="0 0 8 8" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
              <rect x="1" y="4" width="6" height="3" fill="#aec6cf" stroke="black" strokeWidth="0.5" />
              <rect x="2" y="3" width="1" height="1" fill="#aec6cf" stroke="black" strokeWidth="0.5" />
              <rect x="5" y="3" width="1" height="1" fill="#aec6cf" stroke="black" strokeWidth="0.5" />
              <rect x="3" y="5" width="2" height="1" fill="white" />
            </svg>
        </div>
      </motion.div>
    </div>
  );
};
