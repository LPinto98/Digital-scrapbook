import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { chiptuneEngine, TRACK_LIST, Song } from '../utils/audioSynth.ts';
import { Tv, X, Minimize2, Sparkles, Volume2, VolumeX, Music } from 'lucide-react';

export type AudioSourceMode = 'actual' | 'chiptune' | 'youtube';

interface MusicContextType {
  isPlaying: boolean;
  currentTrackIndex: number;
  currentTrack: Song;
  tracks: Song[];
  volume: number;
  isMuted: boolean;
  source: AudioSourceMode;
  currentTime: number;
  duration: number;
  autoplayNext: boolean;
  isVideoVisible: boolean;
  isFlyoutOpen: boolean;
  isDetached: boolean;
  visualizerBars: number[];
  togglePlay: () => void;
  play: () => void;
  pause: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  selectTrack: (index: number) => void;
  seek: (seconds: number) => void;
  setVolume: (val: number) => void;
  toggleMute: () => void;
  setSource: (s: AudioSourceMode) => void;
  toggleAutoplayNext: () => void;
  toggleVideoVisible: () => void;
  setVideoVisible: (v: boolean) => void;
  toggleFlyout: () => void;
  setFlyoutOpen: (open: boolean) => void;
  toggleDetached: (detached?: boolean) => void;
}

const MusicContext = createContext<MusicContextType | null>(null);

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [source, setSource] = useState<AudioSourceMode>('actual');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(TRACK_LIST[0].durationSeconds);
  const [autoplayNext, setAutoplayNext] = useState(true);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);
  const [isDetached, setIsDetached] = useState(false);
  const [visualizerBars, setVisualizerBars] = useState([0.3, 0.6, 0.4, 0.8]);

  // Player references
  const ytPlayerRef = useRef<any>(null);
  const ytPlayerReadyRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrackIndexRef = useRef(currentTrackIndex);
  const autoplayNextRef = useRef(autoplayNext);
  const isPlayingRef = useRef(isPlaying);
  const sourceRef = useRef(source);
  const volumeRef = useRef(volume);
  const isMutedRef = useRef(isMuted);

  // Keep refs in sync
  useEffect(() => { currentTrackIndexRef.current = currentTrackIndex; }, [currentTrackIndex]);
  useEffect(() => { autoplayNextRef.current = autoplayNext; }, [autoplayNext]);
  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);
  useEffect(() => { sourceRef.current = source; }, [source]);
  useEffect(() => { volumeRef.current = volume; }, [volume]);
  useEffect(() => { isMutedRef.current = isMuted; }, [isMuted]);

  // Forward declaration of selectTrack ref to avoid circular dependency
  const selectTrackRef = useRef<(idx: number) => void>(() => {});

  // YouTube Iframe API Initialization
  useEffect(() => {
    let checkInterval: number | null = null;

    const initYT = () => {
      if (!window.YT || !window.YT.Player) return;
      if (ytPlayerRef.current) return;

      try {
        ytPlayerRef.current = new window.YT.Player('global-scrapbook-yt-player', {
          videoId: TRACK_LIST[0].youtubeId,
          playerVars: {
            autoplay: 0,
            controls: 1,
            modestbranding: 1,
            rel: 0,
            enablejsapi: 1,
            playsinline: 1,
            origin: window.location.origin
          },
          events: {
            onReady: (event: any) => {
              ytPlayerReadyRef.current = true;
              event.target.setVolume(isMutedRef.current ? 0 : volumeRef.current * 100);
            },
            onStateChange: (event: any) => {
              // 1 = PLAYING, 2 = PAUSED, 0 = ENDED
              if (event.data === 1) {
                setIsPlaying(true);
              } else if (event.data === 2) {
                setIsPlaying(false);
              } else if (event.data === 0) {
                // SONG HAS ENDED: AUTOPLAY NEXT SONG!
                if (autoplayNextRef.current) {
                  const nextIdx = (currentTrackIndexRef.current + 1) % TRACK_LIST.length;
                  selectTrackRef.current(nextIdx);
                } else {
                  setIsPlaying(false);
                }
              }
            },
            onError: (err: any) => {
              console.warn('YouTube Player error, advancing to next song:', err);
              if (autoplayNextRef.current) {
                setTimeout(() => {
                  const nextIdx = (currentTrackIndexRef.current + 1) % TRACK_LIST.length;
                  selectTrackRef.current(nextIdx);
                }, 1200);
              }
            }
          }
        });
      } catch (err) {
        console.warn('Could not initialize YouTube Player:', err);
      }
    };

    if (!window.YT) {
      const existingTag = document.querySelector('script[src*="youtube.com/iframe_api"]');
      if (!existingTag) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
      }

      window.onYouTubeIframeAPIReady = () => {
        initYT();
      };

      // Fallback interval in case ready event was missed
      checkInterval = window.setInterval(() => {
        if (window.YT && window.YT.Player) {
          initYT();
          if (checkInterval) clearInterval(checkInterval);
        }
      }, 500);
    } else {
      initYT();
    }

    return () => {
      if (checkInterval) clearInterval(checkInterval);
    };
  }, []);

  // HTML5 Audio Fallback Initialization
  useEffect(() => {
    if (typeof window !== 'undefined' && !audioRef.current) {
      const audio = new Audio();
      audio.preload = 'metadata';
      audio.src = TRACK_LIST[0].audioUrl;
      audioRef.current = audio;

      const handleEnded = () => {
        if (autoplayNextRef.current) {
          const nextIdx = (currentTrackIndexRef.current + 1) % TRACK_LIST.length;
          selectTrackRef.current(nextIdx);
        } else {
          setIsPlaying(false);
        }
      };

      audio.addEventListener('ended', handleEnded);
      return () => {
        audio.removeEventListener('ended', handleEnded);
        audio.pause();
      };
    }
  }, []);

  // Sync Chiptune engine subscriber and onTrackEnded for chiptune autoplay
  useEffect(() => {
    chiptuneEngine.onTrackEnded = () => {
      if (autoplayNextRef.current && sourceRef.current === 'chiptune') {
        const nextIdx = (currentTrackIndexRef.current + 1) % TRACK_LIST.length;
        selectTrackRef.current(nextIdx);
      }
    };

    const unsub = chiptuneEngine.subscribe(() => {
      if (sourceRef.current === 'chiptune') {
        setIsPlaying(chiptuneEngine.getIsPlaying());
        setCurrentTrackIndex(chiptuneEngine.getCurrentTrackIndex());
        setVisualizerBars([...chiptuneEngine.visualizerData]);
      }
    });

    return () => {
      chiptuneEngine.onTrackEnded = undefined;
      unsub();
    };
  }, []);

  // Dynamic progress polling for full song playback
  useEffect(() => {
    if (!isPlaying) return;

    const interval = window.setInterval(() => {
      if (sourceRef.current !== 'chiptune' && ytPlayerRef.current && ytPlayerReadyRef.current) {
        try {
          if (typeof ytPlayerRef.current.getCurrentTime === 'function') {
            const cur = ytPlayerRef.current.getCurrentTime();
            const dur = ytPlayerRef.current.getDuration();
            if (typeof cur === 'number' && !isNaN(cur)) {
              setCurrentTime(cur);
            }
            if (typeof dur === 'number' && !isNaN(dur) && dur > 0) {
              setDuration(dur);
            }
          }
        } catch {
          // safe catch if player isn't ready
        }
      }
    }, 250);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Animated Visualizer for actual audio playback
  useEffect(() => {
    if (!isPlaying) {
      setVisualizerBars([0.15, 0.15, 0.15, 0.15]);
      return;
    }

    if (source !== 'chiptune') {
      let phase = 0;
      const interval = window.setInterval(() => {
        phase += 0.25;
        setVisualizerBars([
          0.35 + 0.55 * Math.abs(Math.sin(phase * 1.6)),
          0.3 + 0.65 * Math.abs(Math.sin(phase * 2.3 + 0.9)),
          0.25 + 0.7 * Math.abs(Math.cos(phase * 1.9 + 1.3)),
          0.35 + 0.6 * Math.abs(Math.sin(phase * 2.7 + 2.1))
        ]);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying, source]);

  // Handle Track Selection / Changes with Full Song Playback
  const selectTrack = useCallback((index: number) => {
    const safeIndex = (index + TRACK_LIST.length) % TRACK_LIST.length;
    setCurrentTrackIndex(safeIndex);
    const targetTrack = TRACK_LIST[safeIndex];
    setDuration(targetTrack.durationSeconds);
    setCurrentTime(0);

    if (sourceRef.current === 'chiptune') {
      if (ytPlayerRef.current && ytPlayerReadyRef.current) {
        try { ytPlayerRef.current.pauseVideo(); } catch {}
      }
      if (audioRef.current) audioRef.current.pause();
      chiptuneEngine.playTrack(safeIndex);
      setIsPlaying(true);
    } else {
      // Full Song via YouTube Player
      chiptuneEngine.pause();
      if (audioRef.current) audioRef.current.pause();

      if (ytPlayerRef.current && ytPlayerReadyRef.current) {
        try {
          ytPlayerRef.current.loadVideoById({
            videoId: targetTrack.youtubeId,
            startSeconds: 0
          });
          ytPlayerRef.current.playVideo();
          setIsPlaying(true);
        } catch (err) {
          console.warn('Error loading video on player:', err);
        }
      } else {
        // Fallback to HTML5 audio if YouTube player not yet ready
        if (audioRef.current) {
          audioRef.current.src = targetTrack.audioUrl;
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(() => {});
          setIsPlaying(true);
        }
      }
    }
  }, []);

  // Update ref for callbacks
  useEffect(() => {
    selectTrackRef.current = selectTrack;
  }, [selectTrack]);

  const play = useCallback(() => {
    const targetTrack = TRACK_LIST[currentTrackIndexRef.current];

    if (sourceRef.current === 'chiptune') {
      if (ytPlayerRef.current && ytPlayerReadyRef.current) {
        try { ytPlayerRef.current.pauseVideo(); } catch {}
      }
      chiptuneEngine.playTrack(currentTrackIndexRef.current);
      setIsPlaying(true);
    } else {
      chiptuneEngine.pause();
      if (ytPlayerRef.current && ytPlayerReadyRef.current) {
        try {
          const state = ytPlayerRef.current.getPlayerState();
          // If unstarted (-1) or cued (5), load current track
          if (state === -1 || state === 5) {
            ytPlayerRef.current.loadVideoById({
              videoId: targetTrack.youtubeId,
              startSeconds: 0
            });
          }
          ytPlayerRef.current.playVideo();
          setIsPlaying(true);
        } catch (err) {
          console.warn('Play video failed:', err);
        }
      } else if (audioRef.current) {
        audioRef.current.src = targetTrack.audioUrl;
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  }, []);

  const pause = useCallback(() => {
    if (sourceRef.current === 'chiptune') {
      chiptuneEngine.pause();
    } else {
      if (ytPlayerRef.current && ytPlayerReadyRef.current) {
        try {
          ytPlayerRef.current.pauseVideo();
        } catch {}
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const nextTrack = useCallback(() => {
    selectTrack(currentTrackIndexRef.current + 1);
  }, [selectTrack]);

  const prevTrack = useCallback(() => {
    selectTrack(currentTrackIndexRef.current - 1);
  }, [selectTrack]);

  const seek = useCallback((seconds: number) => {
    setCurrentTime(seconds);
    if (sourceRef.current !== 'chiptune' && ytPlayerRef.current && ytPlayerReadyRef.current) {
      try {
        ytPlayerRef.current.seekTo(seconds, true);
      } catch {}
    } else if (audioRef.current) {
      audioRef.current.currentTime = seconds;
    }
  }, []);

  const handleSetVolume = useCallback((val: number) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolumeState(clamped);
    if (ytPlayerRef.current && ytPlayerReadyRef.current) {
      try {
        ytPlayerRef.current.setVolume(isMutedRef.current ? 0 : clamped * 100);
      } catch {}
    }
    if (audioRef.current) {
      audioRef.current.volume = isMutedRef.current ? 0 : clamped;
    }
    chiptuneEngine.setVolume(isMutedRef.current ? 0 : clamped);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const next = !prev;
      if (ytPlayerRef.current && ytPlayerReadyRef.current) {
        try {
          if (next) {
            ytPlayerRef.current.mute();
          } else {
            ytPlayerRef.current.unMute();
            ytPlayerRef.current.setVolume(volumeRef.current * 100);
          }
        } catch {}
      }
      if (audioRef.current) {
        audioRef.current.muted = next;
        audioRef.current.volume = next ? 0 : volumeRef.current;
      }
      chiptuneEngine.setVolume(next ? 0 : volumeRef.current);
      return next;
    });
  }, []);

  const handleSetSource = useCallback((newSource: AudioSourceMode) => {
    setSource(newSource);
    const targetTrack = TRACK_LIST[currentTrackIndexRef.current];

    if (newSource === 'chiptune') {
      if (ytPlayerRef.current && ytPlayerReadyRef.current) {
        try { ytPlayerRef.current.pauseVideo(); } catch {}
      }
      if (audioRef.current) audioRef.current.pause();
      if (isPlayingRef.current) {
        chiptuneEngine.playTrack(currentTrackIndexRef.current);
      }
    } else {
      // 'actual' or 'youtube' mode plays the full song
      chiptuneEngine.pause();
      if (ytPlayerRef.current && ytPlayerReadyRef.current) {
        try {
          ytPlayerRef.current.loadVideoById({
            videoId: targetTrack.youtubeId,
            startSeconds: 0
          });
          if (isPlayingRef.current) {
            ytPlayerRef.current.playVideo();
          }
        } catch {}
      }
      if (newSource === 'youtube') {
        setIsVideoVisible(true);
      }
    }
  }, []);

  const toggleAutoplayNext = useCallback(() => {
    setAutoplayNext(prev => !prev);
  }, []);

  const toggleVideoVisible = useCallback(() => {
    setIsVideoVisible(prev => !prev);
  }, []);

  const toggleFlyout = useCallback(() => {
    setIsFlyoutOpen(prev => !prev);
  }, []);

  const toggleDetached = useCallback((detached?: boolean) => {
    setIsDetached(prev => (detached !== undefined ? detached : !prev));
    setIsFlyoutOpen(false);
  }, []);

  const currentTrack = TRACK_LIST[currentTrackIndex];

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        currentTrackIndex,
        currentTrack,
        tracks: TRACK_LIST,
        volume,
        isMuted,
        source,
        currentTime,
        duration,
        autoplayNext,
        isVideoVisible,
        isFlyoutOpen,
        isDetached,
        visualizerBars,
        togglePlay,
        play,
        pause,
        nextTrack,
        prevTrack,
        selectTrack,
        seek,
        setVolume: handleSetVolume,
        toggleMute,
        setSource: handleSetSource,
        toggleAutoplayNext,
        toggleVideoVisible,
        setVideoVisible: setIsVideoVisible,
        toggleFlyout,
        setFlyoutOpen: setIsFlyoutOpen,
        toggleDetached
      }}
    >
      {children}

      {/* Persistent Global Player Mount for Full Song Audio & Video */}
      <div
        id="global-player-wrapper"
        className={
          isVideoVisible
            ? "fixed z-[999] bottom-14 right-4 sm:right-6 w-[300px] sm:w-[360px] bg-[#f0edf5] border-4 border-black shadow-[8px_8px_0px_black] transition-all"
            : "fixed bottom-0 right-0 w-[240px] h-[160px] opacity-[0.001] pointer-events-none -z-50 overflow-hidden"
        }
      >
        {isVideoVisible && (
          <div className="bg-pastel-pink border-b-4 border-black px-2.5 py-1.5 flex items-center justify-between font-pixel text-xs select-none">
            <div className="flex items-center gap-1.5 font-bold text-gray-900 truncate">
              <Tv size={14} className="text-black shrink-0" />
              <span className="truncate">MTV 90s • CHANNEL 98</span>
              <span className="bg-white/80 px-1 border border-black text-[10px]">LIVE</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsVideoVisible(false)}
                title="Minimize video (Audio continues playing in background)"
                className="w-5 h-5 bg-white border border-black flex items-center justify-center hover:bg-pastel-yellow active:translate-x-0.5 active:translate-y-0.5 shadow-[1px_1px_0px_black]"
              >
                <Minimize2 size={10} />
              </button>
              <button
                onClick={() => setIsVideoVisible(false)}
                title="Close screen"
                className="w-5 h-5 bg-white border border-black flex items-center justify-center hover:bg-red-300 active:translate-x-0.5 active:translate-y-0.5 shadow-[1px_1px_0px_black]"
              >
                <X size={12} />
              </button>
            </div>
          </div>
        )}

        <div className={isVideoVisible ? "relative w-full aspect-video bg-black" : "w-full h-full"}>
          {/* Scanlines overlay when TV is active */}
          {isVideoVisible && (
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:4px_4px] z-10" />
          )}
          <div id="global-scrapbook-yt-player" className="w-full h-full" />
        </div>

        {isVideoVisible && (
          <div className="p-2 bg-[#f0edf5] border-t-2 border-black flex items-center justify-between text-xs font-pixel">
            <div className="truncate max-w-[200px]">
              <div className="font-bold text-gray-900 truncate">{currentTrack.title}</div>
              <div className="text-[10px] text-gray-600 truncate">{currentTrack.artist}</div>
            </div>
            <div className="flex items-center gap-1 text-[10px] bg-pastel-green/40 px-1.5 py-0.5 border border-black">
              <Sparkles size={10} className="text-green-800" />
              <span>{autoplayNext ? 'AUTOPLAY ON' : 'AUTOPLAY OFF'}</span>
            </div>
          </div>
        )}
      </div>
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
