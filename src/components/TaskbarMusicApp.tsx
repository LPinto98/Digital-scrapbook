import React, { useRef, useEffect } from 'react';
import { 
  Music, 
  Play, 
  Pause, 
  ChevronUp, 
  ChevronDown, 
  Pin,
  SkipForward,
  Tv,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useMusic } from '../context/MusicContext.tsx';
import { MusicPlayer } from './MusicPlayer.tsx';

export const TaskbarMusicApp: React.FC = () => {
  const { 
    isPlaying, 
    currentTrack, 
    togglePlay, 
    nextTrack, 
    isFlyoutOpen, 
    toggleFlyout, 
    setFlyoutOpen,
    visualizerBars,
    isDetached,
    autoplayNext,
    toggleAutoplayNext,
    isVideoVisible,
    toggleVideoVisible
  } = useMusic();

  const containerRef = useRef<HTMLDivElement>(null);

  // Close flyout on click outside if desired
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        // Only close if click is not inside the flyout
        const flyoutEl = document.getElementById('taskbar-music-flyout');
        if (flyoutEl && flyoutEl.contains(e.target as Node)) return;
        setFlyoutOpen(false);
      }
    };
    if (isFlyoutOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFlyoutOpen, setFlyoutOpen]);

  return (
    <div ref={containerRef} className="relative flex items-center h-full">
      {/* Pinned App DeskBand on Taskbar */}
      <div 
        className={`flex items-center h-9 px-2 gap-1.5 border-2 border-black transition-all cursor-pointer select-none ${
          isFlyoutOpen 
            ? 'bg-pastel-pink shadow-none translate-y-0.5' 
            : isPlaying
              ? 'bg-pastel-pink/30 hover:bg-pastel-pink/50 shadow-[2px_2px_0px_black]'
              : 'bg-gray-100 hover:bg-pastel-pink/20 shadow-[2px_2px_0px_black]'
        }`}
        onClick={() => toggleFlyout()}
        title="Pinned Music Player (Click to open controls)"
      >
        {/* Retro Quick Launch Grip Divider */}
        <div className="flex flex-col gap-0.5 pr-1 opacity-50 border-r border-black/30">
          <div className="w-0.5 h-1 bg-black rounded-full" />
          <div className="w-0.5 h-1 bg-black rounded-full" />
          <div className="w-0.5 h-1 bg-black rounded-full" />
        </div>

        {/* Pin Icon & Rotating Disc */}
        <div className="flex items-center gap-1">
          <Pin size={11} className="text-pastel-pink fill-pastel-pink rotate-45 shrink-0" />
          <motion.div
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-5 h-5 rounded-full bg-black text-pastel-pink flex items-center justify-center shrink-0 border border-black"
          >
            <Music size={11} />
          </motion.div>
        </div>

        {/* Mini Marquee or Track Title */}
        <div className="hidden sm:flex flex-col max-w-[140px] md:max-w-[170px] overflow-hidden leading-none">
          <div className="flex items-center gap-1 font-pixel text-[10px] text-gray-500 uppercase">
            <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
            <span>PINNED MUSIC</span>
          </div>
          <div className="font-pixel text-xs truncate font-bold text-gray-900">
            {isPlaying ? currentTrack.title : 'MUSIC'}
          </div>
        </div>

        {/* In-Taskbar Play/Pause Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          title={isPlaying ? "Pause music" : "Play music"}
          className="w-6 h-6 ml-0.5 bg-white border border-black flex items-center justify-center hover:bg-pastel-yellow active:translate-x-0.5 active:translate-y-0.5 shadow-[1px_1px_0px_black] shrink-0"
        >
          {isPlaying ? <Pause size={11} fill="black" /> : <Play size={11} fill="black" />}
        </button>

        {/* In-Taskbar Next Track Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            nextTrack();
          }}
          title="Next track"
          className="flex w-6 h-6 bg-white border border-black items-center justify-center hover:bg-pastel-blue active:translate-x-0.5 active:translate-y-0.5 shadow-[1px_1px_0px_black] shrink-0"
        >
          <SkipForward size={11} />
        </button>

        {/* In-Taskbar MTV Video Toggle Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleVideoVisible();
          }}
          title={isVideoVisible ? "Hide Video Monitor" : "Watch Full Music Video"}
          className={`hidden sm:flex w-6 h-6 border border-black items-center justify-center shadow-[1px_1px_0px_black] shrink-0 ${
            isVideoVisible ? 'bg-pastel-yellow' : 'bg-white hover:bg-gray-100'
          }`}
        >
          <Tv size={11} />
        </button>

        {/* Autoplay Status Indicator */}
        <div 
          onClick={(e) => {
            e.stopPropagation();
            toggleAutoplayNext();
          }}
          title={autoplayNext ? "Autoplay is ON: sequential playback enabled" : "Autoplay is OFF"}
          className={`hidden md:flex items-center gap-0.5 px-1 py-0.5 border border-black text-[9px] font-pixel shrink-0 cursor-pointer ${
            autoplayNext ? 'bg-pastel-green text-green-950 font-bold' : 'bg-gray-200 text-gray-500'
          }`}
        >
          <Zap size={9} className={autoplayNext ? "fill-green-900" : ""} />
          <span>AUTO</span>
        </div>

        {/* Mini Animated Equalizer */}
        <div className="flex items-end gap-0.5 h-4 px-1 py-0.5 bg-black/10 border border-black/20 shrink-0">
          {visualizerBars.map((val, idx) => (
            <motion.div
              key={idx}
              animate={{ height: isPlaying ? `${Math.max(20, val * 100)}%` : '20%' }}
              transition={{ duration: 0.15 }}
              className="w-1 bg-pastel-purple rounded-none"
            />
          ))}
        </div>

        {/* Expand/Collapse Chevron */}
        <div className="pl-0.5 text-gray-700">
          {isFlyoutOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        </div>
      </div>

      {/* Anchored Pinned Flyout Window */}
      <AnimatePresence>
        {isFlyoutOpen && !isDetached && (
          <motion.div
            id="taskbar-music-flyout"
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="fixed bottom-14 left-2 sm:left-24 md:left-32 w-[92vw] sm:w-[380px] z-[120]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Retro Flyout Container */}
            <div className="relative">
              <MusicPlayer isFlyout={true} />
              {/* Downward Anchor Arrow pointing to taskbar pinned app */}
              <div className="absolute -bottom-2 left-10 w-4 h-4 bg-black rotate-45 -z-10" />
              <div className="absolute -bottom-1 left-10 w-4 h-4 bg-[#f0edf5] rotate-45 z-0 border-r-2 border-b-2 border-black" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
