import React from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Music, 
  Volume2, 
  VolumeX, 
  Disc, 
  Pin, 
  Radio, 
  Tv, 
  ExternalLink,
  ChevronDown,
  Minimize2,
  Sparkles,
  Heart,
  Headphones,
  Repeat,
  Zap
} from 'lucide-react';
import { motion } from 'motion/react';
import { useMusic } from '../context/MusicContext.tsx';

interface MusicPlayerProps {
  onClose?: () => void;
  isFlyout?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ onClose, isFlyout = false }) => {
  const { 
    isPlaying, 
    currentTrack, 
    currentTrackIndex, 
    tracks, 
    volume, 
    isMuted, 
    source, 
    currentTime,
    duration,
    autoplayNext,
    isVideoVisible,
    visualizerBars,
    togglePlay, 
    nextTrack, 
    prevTrack, 
    selectTrack, 
    seek,
    setVolume, 
    toggleMute, 
    setSource,
    toggleAutoplayNext,
    toggleVideoVisible,
    toggleDetached,
    setFlyoutOpen
  } = useMusic();

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`bg-[#f0edf5] border-4 border-black font-sans flex flex-col select-none ${isFlyout ? 'shadow-[8px_-8px_0px_rgba(0,0,0,0.3)]' : 'h-full'}`}>
      {/* Pinned App Header Banner */}
      <div className="bg-pastel-pink border-b-4 border-black px-3 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2 font-pixel text-lg">
          <span className="flex items-center gap-1 bg-white/80 px-2 py-0.5 border border-black text-xs font-pixel shadow-[1px_1px_0px_black]">
            <Pin size={12} className="text-pastel-pink fill-pastel-pink rotate-45" /> PINNED
          </span>
          <span className="font-bold text-gray-900 tracking-wide flex items-center gap-1">
            <Music size={16} /> MUSIC.EXE
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Toggle between Pinned Taskbar Flyout and Standalone Window */}
          <button
            onClick={() => {
              if (isFlyout) {
                toggleDetached(true);
              } else {
                toggleDetached(false);
              }
            }}
            title={isFlyout ? "Pop out into movable desktop window" : "Dock back to taskbar"}
            className="px-2 py-0.5 bg-white border-2 border-black text-xs font-pixel hover:bg-pastel-yellow shadow-[1px_1px_0px_black] active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-1"
          >
            {isFlyout ? (
              <>
                <ExternalLink size={12} /> POP OUT
              </>
            ) : (
              <>
                <Pin size={12} /> DOCK TO TASKBAR
              </>
            )}
          </button>

          {/* Minimize / Close into Taskbar */}
          <button
            onClick={() => {
              if (isFlyout) {
                setFlyoutOpen(false);
              } else if (onClose) {
                onClose();
              }
            }}
            title="Minimize to Taskbar"
            className="w-6 h-6 bg-white border-2 border-black flex items-center justify-center hover:bg-red-300 shadow-[1px_1px_0px_black] active:translate-x-0.5 active:translate-y-0.5"
          >
            {isFlyout ? <ChevronDown size={14} /> : <Minimize2 size={12} />}
          </button>
        </div>
      </div>

      <div className="p-3.5 flex flex-col gap-3">
        {/* Source Mode Selector & Autoplay Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 bg-gray-100 p-1.5 border-2 border-black">
          {/* Audio Engine Selection */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSource('actual')}
              className={`px-2.5 py-1 text-xs font-pixel flex items-center gap-1 border-2 border-black transition-all ${
                source !== 'chiptune' 
                  ? 'bg-pastel-pink text-gray-900 font-bold shadow-[1px_1px_0px_black]' 
                  : 'bg-white hover:bg-gray-200'
              }`}
              title="Play Full Original Song with Vocals"
            >
              <Headphones size={13} /> FULL SONG
            </button>
            <button
              onClick={() => setSource('chiptune')}
              className={`px-2.5 py-1 text-xs font-pixel flex items-center gap-1 border-2 border-black transition-all ${
                source === 'chiptune' 
                  ? 'bg-pastel-purple text-white font-bold shadow-[1px_1px_0px_black]' 
                  : 'bg-white hover:bg-gray-200'
              }`}
              title="8-Bit Synthesizer Chiptune Mode"
            >
              <Radio size={13} /> 8-BIT RETRO
            </button>
          </div>

          {/* Autoplay & MTV Video Toggles */}
          <div className="flex items-center gap-1">
            {/* Autoplay Next Toggle Button */}
            <button
              onClick={toggleAutoplayNext}
              className={`px-2 py-1 text-[11px] font-pixel flex items-center gap-1 border-2 border-black transition-all ${
                autoplayNext 
                  ? 'bg-pastel-green text-green-950 font-bold shadow-[1px_1px_0px_black]' 
                  : 'bg-gray-200 text-gray-600'
              }`}
              title={autoplayNext ? "Autoplay is active (plays sequentially)" : "Autoplay is paused"}
            >
              <Zap size={11} className={autoplayNext ? "fill-green-900 text-green-900 animate-pulse" : ""} />
              <span>{autoplayNext ? 'AUTOPLAY: ON' : 'AUTOPLAY: OFF'}</span>
            </button>

            {/* Retro MTV Video TV Monitor Toggle */}
            <button
              onClick={toggleVideoVisible}
              className={`px-2 py-1 text-[11px] font-pixel flex items-center gap-1 border-2 border-black transition-all ${
                isVideoVisible
                  ? 'bg-pastel-yellow text-gray-900 font-bold shadow-[1px_1px_0px_black]'
                  : 'bg-white hover:bg-gray-200'
              }`}
              title={isVideoVisible ? "Hide Video Monitor" : "Open Retro MTV TV Screen"}
            >
              <Tv size={11} />
              <span>{isVideoVisible ? 'HIDE TV' : 'WATCH TV'}</span>
            </button>
          </div>
        </div>

        {/* Visual Cassette / Spinning Disc + Info Area */}
        <div className="bg-black text-white p-3 border-3 border-black shadow-[inset_3px_3px_0px_rgba(0,0,0,0.5)] flex gap-3.5 items-center relative overflow-hidden">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:8px_8px] pointer-events-none" />

          {/* Album Vinyl / CD disc */}
          <div className="relative w-16 h-16 shrink-0 bg-neutral-900 border-2 border-neutral-700 rounded-full flex items-center justify-center overflow-hidden shadow-inner">
            <motion.div 
              animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-full h-full flex items-center justify-center relative"
            >
              {/* Vinyl grooves */}
              <div className="absolute inset-1 rounded-full border border-neutral-800" />
              <div className="absolute inset-3 rounded-full border border-neutral-800" />
              {/* Center label */}
              <div 
                className="w-7 h-7 rounded-full border border-black flex items-center justify-center text-black"
                style={{ backgroundColor: currentTrack.coverColor }}
              >
                <Disc size={16} />
              </div>
            </motion.div>
          </div>

          {/* Track Details & Marquee */}
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center justify-between text-[11px] font-pixel text-pastel-pink uppercase tracking-wider mb-0.5">
              <span>TRACK {currentTrackIndex + 1}/{tracks.length}</span>
              <span className="flex items-center gap-1 text-pastel-yellow">
                <Sparkles size={11} /> {source === 'chiptune' ? '8-BIT SYNTH' : 'FULL ORIGINAL SONG'}
              </span>
            </div>

            <div className="bg-neutral-900 border border-neutral-700 px-2 py-1 overflow-hidden whitespace-nowrap">
              <motion.div
                animate={isPlaying ? { x: ['100%', '-100%'] } : { x: 0 }}
                transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                className="font-pixel text-base text-pastel-green inline-block"
              >
                {currentTrack.title} — {currentTrack.artist} ✦ {currentTrack.anthemTheme}
              </motion.div>
            </div>

            {/* Equalizer Waveform Bars */}
            <div className="flex items-end gap-1.5 h-4 mt-2">
              {visualizerBars.map((heightVal, idx) => (
                <div 
                  key={idx} 
                  className="flex-1 bg-neutral-800 rounded-xs overflow-hidden h-full flex items-end"
                >
                  <motion.div 
                    animate={{ height: isPlaying ? `${Math.max(15, heightVal * 100)}%` : '15%' }}
                    transition={{ duration: 0.15 }}
                    className="w-full bg-gradient-to-t from-pastel-pink to-pastel-blue"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Playback Controls, Progress Scrubber, and Volume */}
        <div className="bg-white border-2 border-black p-2.5 flex flex-col gap-2.5 shadow-[2px_2px_0px_black]">
          {/* Seekbar Scrubber */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center text-[10px] font-pixel text-gray-500">
              <span className="text-gray-900 font-bold">{formatTime(currentTime)}</span>
              <span className="text-[10px] text-pastel-purple font-semibold">
                {source === 'chiptune' ? 'CHIPTUNE LOOP' : 'FULL SONG DURATION'}
              </span>
              <span>{formatTime(duration)}</span>
            </div>
            <input 
              type="range"
              min={0}
              max={duration || currentTrack.durationSeconds}
              step={0.5}
              value={currentTime}
              onChange={(e) => seek(parseFloat(e.target.value))}
              className="w-full h-2 accent-pastel-pink bg-gray-200 border border-black cursor-pointer rounded-none"
            />
          </div>

          {/* Main Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {/* Previous */}
              <button 
                onClick={prevTrack}
                title="Previous Track"
                className="p-1.5 bg-gray-100 border-2 border-black hover:bg-pastel-blue active:translate-x-0.5 active:translate-y-0.5 shadow-[1px_1px_0px_black]"
              >
                <SkipBack size={16} />
              </button>

              {/* Play / Pause */}
              <button 
                onClick={togglePlay}
                title={isPlaying ? "Pause" : "Play"}
                className="px-4 py-1.5 bg-pastel-pink border-2 border-black font-pixel text-sm font-bold flex items-center gap-1 hover:bg-pastel-yellow shadow-[2px_2px_0px_black] active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
              >
                {isPlaying ? (
                  <>
                    <Pause size={16} fill="black" /> PAUSE
                  </>
                ) : (
                  <>
                    <Play size={16} fill="black" /> PLAY
                  </>
                )}
              </button>

              {/* Next */}
              <button 
                onClick={nextTrack}
                title="Next Track"
                className="p-1.5 bg-gray-100 border-2 border-black hover:bg-pastel-blue active:translate-x-0.5 active:translate-y-0.5 shadow-[1px_1px_0px_black]"
              >
                <SkipForward size={16} />
              </button>
            </div>

            {/* Volume Controls */}
            <div className="flex items-center gap-2 bg-gray-50 border border-black px-2 py-1">
              <button 
                onClick={toggleMute}
                title={isMuted ? "Unmute" : "Mute"}
                className="text-gray-700 hover:text-black"
              >
                {isMuted || volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>
              <input 
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-16 h-2 accent-pastel-purple cursor-pointer"
              />
            </div>
          </div>

          {/* Tracklist Drawer */}
          <div className="border-t-2 border-black pt-2">
            <div className="flex items-center justify-between mb-1.5 text-xs font-pixel text-gray-700">
              <span className="flex items-center gap-1 font-bold">
                <Heart size={12} className="text-pastel-pink fill-pastel-pink" /> WOMEN EMPOWERMENT PLAYLIST
              </span>
              <span className="text-[10px] text-gray-500 font-bold">
                {tracks.length} FULL TRACKS
              </span>
            </div>

            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {tracks.map((track, i) => {
                const isSelected = i === currentTrackIndex;
                return (
                  <button
                    key={track.id}
                    onClick={() => selectTrack(i)}
                    className={`w-full text-left px-2.5 py-1.5 text-xs font-pixel flex items-center justify-between border border-black transition-all ${
                      isSelected 
                        ? 'bg-pastel-yellow font-bold shadow-[2px_2px_0px_black] -translate-y-0.5' 
                        : 'bg-white hover:bg-pastel-pink/30'
                    }`}
                  >
                    <div className="flex flex-col min-w-0 pr-2">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="text-[10px] opacity-70">#{i + 1}</span>
                        <span className="truncate text-gray-900 font-bold">{track.title}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-500 pl-4 truncate">
                        <span className="text-gray-900 font-semibold">{track.artist}</span>
                        <span>•</span>
                        <span className="text-pastel-purple truncate">{track.anthemTheme}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {isSelected && isPlaying ? (
                        <span className="flex items-center gap-0.5 text-pastel-purple">
                          <span className="w-1 h-3.5 bg-pastel-purple animate-pulse" />
                          <span className="w-1 h-2.5 bg-pastel-pink animate-pulse delay-75" />
                          <span className="w-1 h-4 bg-pastel-green animate-pulse delay-150" />
                        </span>
                      ) : (
                        <span className="text-[10px] text-gray-600 font-pixel bg-gray-100 px-1.5 py-0.5 border border-black/20">
                          {Math.floor(track.durationSeconds / 60)}:{(track.durationSeconds % 60).toString().padStart(2, '0')}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Pinned Info Footer */}
        <div className="bg-pastel-cream/80 border border-black/40 p-1.5 text-[11px] font-pixel text-gray-600 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Headphones size={11} className="text-pastel-pink fill-pastel-pink" />
            Full Songs & Continuous Sequential Autoplay
          </span>
          <span className="text-gray-500 font-bold">MUSIC_PLAYER.EXE</span>
        </div>
      </div>
    </div>
  );
};
