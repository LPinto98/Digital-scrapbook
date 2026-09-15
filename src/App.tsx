import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Mail, 
  Linkedin, 
  Youtube, 
  Palette, 
  Scissors, 
  CookingPot as ChefHat,
  Dog,
  Code,
  FolderIcon,
  FolderGit2,
  FolderCode,
  Monitor,
  Gamepad2,
  Music as MusicIcon,
  User,
  History,
  Square,
  Github,
  Pin,
  Plane,
  MapPin,
  ZoomIn,
  GraduationCap,
  Award,
  PartyPopper,
  Users,
  Sparkles
} from 'lucide-react';
import { Window, DesktopIcon } from './components/RetroUI.tsx';
import { YarnCatcher } from './components/YarnGame.tsx';
import { MusicPlayer } from './components/MusicPlayer.tsx';
import { ProjectsWindow } from './components/ProjectsWindow.tsx';
import { TechStackWindow } from './components/TechStackWindow.tsx';
import { AboutMeWindow } from './components/AboutMeWindow.tsx';
import { MusicProvider, useMusic } from './context/MusicContext.tsx';
import { TaskbarMusicApp } from './components/TaskbarMusicApp.tsx';

export interface JourneyPhotoModal {
  src: string;
  filename: string;
  title: string;
  location: string;
  date: string;
  caption: string;
  badge: string;
  routeOrDegree: string;
  headerColor?: string;
  iconType?: 'plane' | 'grad' | 'party' | 'sparkles';
}

function ScrapbookOS() {
  const [openWindows, setOpenWindows] = useState<string[]>(['about']);
  const [activeWindow, setActiveWindow] = useState('about');
  const [maximizedWindows, setMaximizedWindows] = useState<string[]>([]);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [selectedJourneyPhoto, setSelectedJourneyPhoto] = useState<JourneyPhotoModal | null>(null);

  const { isFlyoutOpen, setFlyoutOpen, isDetached, toggleDetached } = useMusic();

  // Sync detached state with window manager
  useEffect(() => {
    if (isDetached && !openWindows.includes('music')) {
      setOpenWindows(prev => [...prev, 'music']);
      setActiveWindow('music');
    } else if (!isDetached && openWindows.includes('music')) {
      setOpenWindows(prev => prev.filter(w => w !== 'music'));
    }
  }, [isDetached]);

  const toggleWindow = (id: string) => {
    if (openWindows.includes(id)) {
      setActiveWindow(id);
    } else {
      setOpenWindows([...openWindows, id]);
      setActiveWindow(id);
    }
  };

  const closeWindow = (id: string) => {
    setOpenWindows(openWindows.filter(w => w !== id));
    setMaximizedWindows(maximizedWindows.filter(w => w !== id));
  };

  const toggleMaximizeWindow = (id: string) => {
    if (maximizedWindows.includes(id)) {
      setMaximizedWindows(maximizedWindows.filter(w => w !== id));
    } else {
      setMaximizedWindows([...maximizedWindows, id]);
      setActiveWindow(id);
    }
  };

  const renderWindow = (id: string, onFocus: () => void) => {
    const isActive = activeWindow === id;
    const isMax = maximizedWindows.includes(id);
    
    switch (id) {
      case 'about':
        return (
          <Window 
            key="about"
            title="ABOUT_ME.TXT" 
            onClose={() => closeWindow('about')}
            onMinimize={() => closeWindow('about')}
            isMaximized={isMax}
            onToggleMaximize={() => toggleMaximizeWindow('about')}
            onMouseDown={onFocus}
            className={`w-[94vw] md:w-[720px] h-[620px] absolute ${isActive ? 'z-50 shadow-[12px_12px_0px_rgba(0,0,0,0.4)]' : 'z-10'} top-6 left-2 sm:top-10 sm:left-10 md:top-14 md:left-36`}
          >
            <AboutMeWindow 
              onOpenJourneyPhoto={setSelectedJourneyPhoto}
              onOpenWindow={(wId) => {
                if (!openWindows.includes(wId)) {
                  setOpenWindows(prev => [...prev, wId]);
                }
                setActiveWindow(wId);
              }}
            />
          </Window>
        );
      case 'journey':
        return (
          <Window 
            key="journey"
            title="MY_JOURNEY.EXE" 
            headerColor="bg-pastel-blue"
            onClose={() => closeWindow('journey')}
            onMinimize={() => closeWindow('journey')}
            isMaximized={isMax}
            onToggleMaximize={() => toggleMaximizeWindow('journey')}
            onMouseDown={onFocus}
            className={`w-[92vw] md:w-[700px] h-[600px] absolute ${isActive ? 'z-50 shadow-[12px_12px_0px_rgba(0,0,0,0.4)]' : 'z-10'} top-24 left-4 md:top-24 md:left-64`}
          >
            <div className="space-y-8 pb-4">
                <div className="border-l-4 border-black border-dotted ml-4 pl-8 space-y-10">
                    <div className="relative">
                        <div className="absolute -left-[42px] top-0 w-4 h-4 bg-pastel-pink border-2 border-black" />
                        
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-gamers text-lg">SEPT 2022</h3>
                          <span className="bg-pastel-pink px-2 py-0.5 border border-black font-pixel text-xs font-bold text-gray-900 shadow-[1px_1px_0px_black] flex items-center gap-1">
                            <Plane size={12} className="rotate-45" /> LEAVING INDIA FOR UK
                          </span>
                        </div>

                        <p className="font-pixel text-xl text-gray-700 leading-snug">
                          Moved from India to the UK with big dreams, bags packed, and boarded the <span className="font-bold text-gray-900 bg-pastel-pink/40 px-1">first ever flight in my life</span> to start my Master's in Data Science at Manchester Metropolitan University.
                        </p>

                        {/* Scrapbook Polaroid Departure Photo */}
                        <div className="mt-4 max-w-sm">
                          <div 
                            onClick={() => setSelectedJourneyPhoto({
                              src: '/journey_india_uk.jpg',
                              filename: 'DEPARTURE_SEPT_2022.JPG',
                              title: 'MUMBAI AIRPORT DEPARTURE TERMINAL',
                              location: 'MUMBAI, INDIA ➔ MANCHESTER, UK',
                              date: '27 SEPT 2022',
                              caption: "Leaving India for the UK to start my Master's in Data Science at Manchester Metropolitan University—and boarding the very first flight of my life! Bags packed, big ambitions, ready for the adventure ahead.",
                              badge: 'FIRST FLIGHT EVER • DEPARTURE',
                              routeOrDegree: 'FLIGHT: BOM ➔ MAN',
                              headerColor: 'bg-pastel-pink',
                              iconType: 'plane'
                            })}
                            className="bg-white border-3 border-black p-3 pb-4 shadow-[6px_6px_0px_black] -rotate-1 hover:rotate-0 hover:scale-[1.02] transition-all cursor-pointer relative group"
                            title="Click to view departure photo in full resolution"
                          >
                            {/* Washi Tape / Pin Badge on top */}
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-200/95 border border-black px-3 py-0.5 text-[10px] font-pixel shadow-[1px_1px_0px_black] uppercase flex items-center gap-1 z-10 text-gray-900">
                              <Pin size={10} className="text-pastel-pink fill-pastel-pink" /> 27 SEPT 2022 • DEPARTURE DAY
                            </div>

                            {/* Photo Container */}
                            <div className="relative aspect-[3/4] w-full overflow-hidden border-2 border-black bg-neutral-900 mt-1">
                              <img 
                                src="./journey_india_uk.jpg" 
                                alt="Leaving India for UK to start Masters - September 2022" 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-0.5 text-[10px] font-pixel flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ZoomIn size={12} /> CLICK TO ENLARGE
                              </div>
                            </div>

                            {/* Caption in handwriting / retro style */}
                            <div className="mt-2.5 text-center">
                              <p className="font-pixel text-base text-gray-900 font-bold leading-tight">
                                ✈️ At Mumbai Airport departure gates, embarking on my journey to the UK for my Masters!
                              </p>
                              <div className="flex items-center justify-center gap-1.5 text-[11px] font-pixel text-gray-500 mt-1">
                                <MapPin size={11} className="text-pastel-purple" />
                                <span>MUMBAI (BOM) → MANCHESTER (MAN)</span>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute -left-[42px] top-0 w-4 h-4 bg-pastel-blue border-2 border-black" />
                        
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-gamers text-lg">JULY 2024</h3>
                          <span className="bg-pastel-blue px-2 py-0.5 border border-black font-pixel text-xs font-bold text-gray-900 shadow-[1px_1px_0px_black] flex items-center gap-1">
                            <GraduationCap size={13} /> GRADUATION DAY • MSc DATA SCIENCE
                          </span>
                        </div>

                        <p className="font-pixel text-xl text-gray-700 leading-snug">
                          Graduated with Master of Science in Data Science from Manchester Metropolitan University! Celebrated donning the graduation gown, hood, and mortarboard on a sunny day by Manchester's canals. Manchester rain {">"} Everything.
                        </p>

                        {/* Scrapbook Polaroid Graduation Photo */}
                        <div className="mt-4 max-w-sm">
                          <div 
                            onClick={() => setSelectedJourneyPhoto({
                              src: '/graduation_day.jpg',
                              filename: 'GRADUATION_DAY_JULY_2024.JPG',
                              title: 'GRADUATION CEREMONY • MANCHESTER METROPOLITAN UNIVERSITY',
                              location: 'MANCHESTER, UK (CANAL BASIN BRIDGE)',
                              date: '17 JULY 2024',
                              caption: "Official graduation day celebrating receiving my Master of Science (MSc) in Data Science from Manchester Metropolitan University. Wearing the academic gown, cap, and celebrating on the bridge by the Manchester canals!",
                              badge: 'MSc DATA SCIENCE GRADUATE',
                              routeOrDegree: 'DEGREE CONFERRED • MMU',
                              headerColor: 'bg-pastel-blue',
                              iconType: 'grad'
                            })}
                            className="bg-white border-3 border-black p-3 pb-4 shadow-[6px_6px_0px_black] rotate-1 hover:rotate-0 hover:scale-[1.02] transition-all cursor-pointer relative group"
                            title="Click to view Graduation Day photo in full resolution"
                          >
                            {/* Washi Tape / Ribbon on top */}
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-pastel-blue/95 border border-black px-3 py-0.5 text-[10px] font-pixel shadow-[1px_1px_0px_black] uppercase flex items-center gap-1 z-10 text-gray-900 font-bold">
                              <GraduationCap size={11} className="text-gray-900" /> 17 JULY 2024 • GRADUATION DAY
                            </div>

                            {/* Photo Container */}
                            <div className="relative aspect-[3/4] w-full overflow-hidden border-2 border-black bg-neutral-900 mt-1">
                              <img 
                                src="/graduation_day.jpg" 
                                alt="Larissa Pinto Graduation Day - Manchester Metropolitan University MSc Data Science" 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-0.5 text-[10px] font-pixel flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ZoomIn size={12} /> CLICK TO ENLARGE
                              </div>
                            </div>

                            {/* Caption in handwriting / retro style */}
                            <div className="mt-2.5 text-center">
                              <p className="font-pixel text-base text-gray-900 font-bold leading-tight">
                                🎓 Official Graduation Day with my MSc Data Science gown & cap!
                              </p>
                              <div className="flex items-center justify-center gap-1.5 text-[11px] font-pixel text-gray-500 mt-1">
                                <Award size={11} className="text-pastel-purple" />
                                <span>MANCHESTER METROPOLITAN UNIVERSITY</span>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                     <div className="relative">
                        <div className="absolute -left-[42px] top-0 w-4 h-4 bg-pastel-green border-2 border-black" />
                        
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-gamers text-lg">PRESENT</h3>
                          <span className="bg-pastel-green px-2 py-0.5 border border-black font-pixel text-xs font-bold text-gray-900 shadow-[1px_1px_0px_black] flex items-center gap-1">
                            <PartyPopper size={13} /> ESPROFILER • BRAND LAUNCH DAY
                          </span>
                        </div>

                        <p className="font-pixel text-xl text-gray-700 leading-snug">
                          Working as a developer at <span className="font-bold text-gray-900">ESProfiler</span>, engineering cybersecurity threat exposure profiling software. Celebrated our official brand launch day with team members wearing party hats and branded balloons!
                        </p>

                        {/* Scrapbook Polaroid ESProfiler Team Launch Photo */}
                        <div className="mt-4 max-w-sm">
                          <div 
                            onClick={() => setSelectedJourneyPhoto({
                              src: '/esprofiler_launch.png',
                              filename: 'ESPROFILER_BRAND_LAUNCH_DAY.PNG',
                              title: 'ESPROFILER BRAND LAUNCH DAY • ENGINEERING TEAM',
                              location: 'ESPROFILER HQ • MANCHESTER, UK',
                              date: 'PRESENT • BRAND LAUNCH',
                              caption: "With my amazing team members at ESProfiler celebrating our official brand launch day! Party hats on, purple and pink balloons floating, and solving hard cyber-exposure puzzles every day.",
                              badge: 'ESPROFILER TEAM',
                              routeOrDegree: 'BRAND LAUNCH CELEBRATION',
                              headerColor: 'bg-pastel-green',
                              iconType: 'party'
                            })}
                            className="bg-white border-3 border-black p-3 pb-4 shadow-[6px_6px_0px_black] -rotate-1 hover:rotate-0 hover:scale-[1.02] transition-all cursor-pointer relative group"
                            title="Click to view ESProfiler Brand Launch photo in full resolution"
                          >
                            {/* Washi Tape / Badge on top */}
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-pastel-green/95 border border-black px-3 py-0.5 text-[10px] font-pixel shadow-[1px_1px_0px_black] uppercase flex items-center gap-1 z-10 text-gray-900 font-bold">
                              <PartyPopper size={11} className="text-gray-900" /> BRAND LAUNCH DAY • ESPROFILER
                            </div>

                            {/* Photo Container */}
                            <div className="relative aspect-[4/3] w-full overflow-hidden border-2 border-black bg-neutral-900 mt-1">
                              <img 
                                src="/esprofiler_launch.jpg" 
                                alt="Larissa Pinto with team members on ESProfiler brand launch day" 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-0.5 text-[10px] font-pixel flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ZoomIn size={12} /> CLICK TO ENLARGE
                              </div>
                            </div>

                            {/* Caption in handwriting / retro style */}
                            <div className="mt-2.5 text-center">
                              <p className="font-pixel text-base text-gray-900 font-bold leading-tight">
                                🎈 Brand launch day celebration with my ESProfiler teammates!
                              </p>
                              <div className="flex items-center justify-center gap-1.5 text-[11px] font-pixel text-gray-500 mt-1">
                                <Users size={11} className="text-pastel-purple" />
                                <span>ESPROFILER • DEVELOPER TEAM</span>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8 bg-pastel-yellow/30 p-4 border-4 border-black shadow-[4px_4px_0px_black] relative overflow-hidden">
                   <h4 className="font-pixel text-2xl flex items-center gap-2">
                       <Dog size={24} /> FUTURE_LOG:
                   </h4>
                   <p className="font-pixel text-xl italic">"Looking for new and exxciting opportunnites...✨"</p>
                   <div className="absolute -right-2 -bottom-2 w-12 h-12 opacity-50">
                      <svg viewBox="0 0 8 8" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
                        <rect x="1" y="2" width="5" height="4" fill="#E2B15D" />
                        <rect x="2" y="1" width="3" height="1" fill="#E2B15D" />
                        <rect x="5" y="2" width="2" height="2" fill="#E2B15D" />
                        <rect x="2" y="3" width="1" height="1" fill="#000" />
                        <rect x="4" y="3" width="1" height="1" fill="#000" />
                        <rect x="2" y="6" width="1" height="1" fill="#E2B15D" />
                        <rect x="4" y="6" width="1" height="1" fill="#E2B15D" />
                      </svg>
                   </div>
                </div>
            </div>
          </Window>
        );
      case 'hobbies':
        return (
          <Window 
            key="hobbies"
            title="SYSTEM_GALLERY.DLL" 
            headerColor="bg-pastel-green"
            onClose={() => closeWindow('hobbies')}
            onMinimize={() => closeWindow('hobbies')}
            isMaximized={isMax}
            onToggleMaximize={() => toggleMaximizeWindow('hobbies')}
            onMouseDown={onFocus}
            className={`w-[90vw] md:w-[700px] h-[500px] absolute ${isActive ? 'z-50 shadow-[12px_12px_0px_rgba(0,0,0,0.4)]' : 'z-10'} top-48 left-16 md:top-40 md:left-96`}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'KNITTING', icon: <Scissors />, color: 'bg-pastel-pink' },
                    { label: 'COOKING', icon: <ChefHat />, color: 'bg-pastel-yellow' },
                    { label: 'PAINTING', icon: <Palette />, color: 'bg-pastel-blue' },
                    { label: 'CROCHET', icon: <Code />, color: 'bg-pastel-purple' }
                ].map((h, i) => (
                    <motion.div 
                        key={i} 
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onMouseDown={(e) => e.stopPropagation()}
                        className={`border-4 border-black ${h.color} p-4 flex flex-col items-center gap-2 shadow-[4px_4px_0px_black] cursor-help`}
                    >
                        {h.icon}
                        <span className="font-pixel text-lg">{h.label}</span>
                    </motion.div>
                ))}
            </div>
            <div className="mt-8 border-t-4 border-black pt-6 flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                    <h3 className="font-pixel text-3xl mb-4 bg-red-100 border-2 border-black px-2 inline-block">YOUTUBE_VLOG.MOV</h3>
                    <p className="font-pixel text-xl italic text-gray-600 mb-4">
                        "Documenting life where I discover that editing my own voice is my greatest nemesis."
                    </p>
                    <a href="https://youtube.com/@larissapinto3791" target="_blank" className="btn-retro bg-red-400 text-white flex items-center gap-2 justify-center" onMouseDown={(e) => e.stopPropagation()}>
                        OPEN YOUTUBE <Youtube size={16}/>
                    </a>
                </div>
                <div className="w-32 h-32 border-4 border-black bg-white flex items-center justify-center shrink-0">
                    <Youtube size={64} className="text-red-500" />
                </div>
            </div>
          </Window>
        );
      case 'projects':
        return (
          <Window 
            key="projects"
            title="PROJECTS_EXPLORER.EXE" 
            headerColor="bg-pastel-yellow"
            onClose={() => closeWindow('projects')}
            onMinimize={() => closeWindow('projects')}
            isMaximized={isMax}
            onToggleMaximize={() => toggleMaximizeWindow('projects')}
            onMouseDown={onFocus}
            className={`w-[92vw] md:w-[780px] h-[580px] absolute ${isActive ? 'z-50 shadow-[12px_12px_0px_rgba(0,0,0,0.4)]' : 'z-10'} top-8 left-4 md:top-14 md:left-48`}
          >
            <ProjectsWindow />
          </Window>
        );
      case 'techstack':
        return (
          <Window 
            key="techstack"
            title="TECH_STACK.SYS" 
            headerColor="bg-pastel-purple"
            onClose={() => closeWindow('techstack')}
            onMinimize={() => closeWindow('techstack')}
            isMaximized={isMax}
            onToggleMaximize={() => toggleMaximizeWindow('techstack')}
            onMouseDown={onFocus}
            className={`w-[92vw] md:w-[840px] h-[590px] absolute ${isActive ? 'z-50 shadow-[12px_12px_0px_rgba(0,0,0,0.4)]' : 'z-10'} top-6 left-2 md:top-10 md:left-40`}
          >
            <TechStackWindow />
          </Window>
        );
      case 'game':
        return (
          <Window 
            key="game"
            title="YARN_CATCHER.CMD" 
            headerColor="bg-pastel-purple"
            onClose={() => closeWindow('game')}
            onMinimize={() => closeWindow('game')}
            isMaximized={isMax}
            onToggleMaximize={() => toggleMaximizeWindow('game')}
            onMouseDown={onFocus}
            className={`w-[90vw] md:w-[600px] h-[550px] absolute ${isActive ? 'z-50 shadow-[12px_12px_0px_rgba(0,0,0,0.4)]' : 'z-10'} top-24 right-10 md:top-60 md:right-40`}
          >
            <YarnCatcher />
          </Window>
        );
      case 'music':
        return (
          <Window 
            key="music"
            title="MUSIC [DETACHED]" 
            headerColor="bg-pastel-pink"
            onClose={() => {
              toggleDetached(false);
              closeWindow('music');
            }}
            onMinimize={() => closeWindow('music')}
            isMaximized={isMax}
            onToggleMaximize={() => toggleMaximizeWindow('music')}
            onMouseDown={onFocus}
            className={`w-[90vw] md:w-[420px] absolute ${isActive ? 'z-50 shadow-[12px_12px_0px_rgba(0,0,0,0.4)]' : 'z-10'} top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
          >
            <MusicPlayer onClose={() => {
              toggleDetached(false);
              closeWindow('music');
            }} />
          </Window>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen overflow-hidden relative selection:bg-pastel-pink selection:text-white" onClick={() => setStartMenuOpen(false)}>
      <div className="scanline" />
      <div className="crt-overlay" />
      <div className="desktop-grid" />
      
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-[10%] opacity-20 pointer-events-none animate-bounce" style={{ animationDuration: '10s' }}>
        <svg width="200" height="100" viewBox="0 0 200 100" fill="white">
          <circle cx="50" cy="50" r="40" />
          <circle cx="90" cy="40" r="40" />
          <circle cx="130" cy="50" r="40" />
          <circle cx="90" cy="60" r="40" />
        </svg>
      </div>
      <div className="absolute bottom-40 right-[15%] opacity-10 pointer-events-none animate-pulse" style={{ animationDuration: '15s' }}>
        <svg width="300" height="150" viewBox="0 0 300 150" fill="white">
          <circle cx="70" cy="70" r="60" />
          <circle cx="130" cy="50" r="60" />
          <circle cx="190" cy="70" r="60" />
          <circle cx="130" cy="90" r="60" />
        </svg>
      </div>

      {/* Floating Sparkles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
            key={i}
            className="absolute text-white/40 pointer-events-none"
            initial={{ 
                x: Math.random() * window.innerWidth, 
                y: Math.random() * window.innerHeight,
                scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
                y: [null, Math.random() * -100],
                opacity: [0, 0.4, 0]
            }}
            transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                ease: "linear"
            }}
        >
            <Heart size={Math.random() * 20 + 10} fill="currentColor" />
        </motion.div>
      ))}

      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
        <Monitor size={400} />
      </div>

      {/* Desktop Icons */}
      <div className="p-8 flex flex-col gap-8 flex-wrap h-full content-start relative z-10">
        <DesktopIcon 
          icon={<User className="text-pastel-purple" size={32}/>} 
          label="ME.TXT" 
          onClick={(e) => { e.stopPropagation(); toggleWindow('about'); }} 
        />
        <DesktopIcon 
          icon={<History className="text-pastel-blue" size={32}/>} 
          label="JOURNEY.EXE" 
          onClick={(e) => { e.stopPropagation(); toggleWindow('journey'); }} 
        />
        <DesktopIcon 
          icon={<FolderGit2 className="text-amber-500" size={32}/>} 
          label="PROJECTS" 
          onClick={(e) => { e.stopPropagation(); toggleWindow('projects'); }} 
        />
        <DesktopIcon 
          icon={<FolderCode className="text-pastel-purple" size={32}/>} 
          label="TECH_STACK" 
          onClick={(e) => { e.stopPropagation(); toggleWindow('techstack'); }} 
        />
        <DesktopIcon 
          icon={<FolderIcon className="text-pastel-green" size={32}/>} 
          label="HOBBIES" 
          onClick={(e) => { e.stopPropagation(); toggleWindow('hobbies'); }} 
        />
        <DesktopIcon 
          icon={<Gamepad2 className="text-pastel-purple" size={32}/>} 
          label="GAME.CMD" 
          onClick={(e) => { e.stopPropagation(); toggleWindow('game'); }} 
        />
        <DesktopIcon 
          icon={
            <div className="relative flex items-center justify-center">
              <FolderIcon className="text-pastel-pink fill-pastel-pink/30" size={32}/>
              <span className="absolute inset-0 flex items-center justify-center pt-1">
                <MusicIcon size={14} className="text-black" />
              </span>
              <span className="absolute -top-1 -right-1 bg-white border border-black rounded-full p-0.5 shadow-[1px_1px_0px_black]">
                <Pin size={10} className="text-pastel-pink fill-pastel-pink rotate-45" />
              </span>
            </div>
          } 
          label="Music" 
          onClick={(e) => { 
            e.stopPropagation(); 
            if (isDetached) {
              toggleWindow('music');
            } else {
              setFlyoutOpen(true);
            }
          }} 
        />
      </div>

      {/* Windows Overlay */}
      <div className="absolute inset-0 pointer-events-none z-40">
        <div className="relative w-full h-full">
          {openWindows.map(id => renderWindow(id, () => setActiveWindow(id)))}
        </div>
      </div>

      {/* Start Menu */}
      <AnimatePresence>
        {startMenuOpen && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="fixed bottom-12 left-0 w-72 bg-white border-4 border-black z-[110] shadow-[8px_-8px_0px_rgba(0,0,0,0.1)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-pastel-pink p-2 border-b-4 border-black font-pixel text-xl flex items-center justify-between">
              <span>LARISSA_OS</span>
              <span className="text-xs bg-white/70 px-1 border border-black">v2.5</span>
            </div>
            <div className="p-2 space-y-1">
                <button onClick={() => { toggleWindow('about'); setStartMenuOpen(false); }} className="w-full text-left p-2 hover:bg-pastel-yellow font-pixel text-lg flex items-center gap-2">
                    <User size={16} /> PROFILE
                </button>
                <button onClick={() => { toggleWindow('projects'); setStartMenuOpen(false); }} className="w-full text-left p-2 hover:bg-pastel-yellow font-pixel text-lg flex items-center gap-2">
                    <FolderGit2 size={16} /> GITHUB PROJECTS
                </button>
                <button onClick={() => { toggleWindow('techstack'); setStartMenuOpen(false); }} className="w-full text-left p-2 hover:bg-pastel-purple hover:text-white font-pixel text-lg flex items-center gap-2">
                    <FolderCode size={16} /> TECH STACK (LPINTO98)
                </button>
                <button onClick={() => { toggleWindow('journey'); setStartMenuOpen(false); }} className="w-full text-left p-2 hover:bg-pastel-blue font-pixel text-lg flex items-center gap-2">
                    <History size={16} /> JOURNEY
                </button>
                <button onClick={() => { toggleWindow('hobbies'); setStartMenuOpen(false); }} className="w-full text-left p-2 hover:bg-pastel-green font-pixel text-lg flex items-center gap-2">
                    <FolderIcon size={16} /> HOBBIES
                </button>
                <button onClick={() => { toggleWindow('game'); setStartMenuOpen(false); }} className="w-full text-left p-2 hover:bg-pastel-purple hover:text-white font-pixel text-lg flex items-center gap-2">
                    <Gamepad2 size={16} /> PLAY GAME
                </button>

                {/* Pinned Music in Start Menu */}
                <button 
                  onClick={() => { 
                    if (isDetached) {
                      toggleWindow('music');
                    } else {
                      setFlyoutOpen(true);
                    }
                    setStartMenuOpen(false); 
                  }} 
                  className="w-full text-left p-2 hover:bg-pastel-pink font-pixel text-lg flex items-center justify-between border border-dashed border-pastel-purple/50 bg-pastel-pink/15"
                >
                    <span className="flex items-center gap-2">
                      <FolderIcon size={16} className="text-pastel-pink fill-pastel-pink/30" /> MUSIC
                    </span>
                    <span className="bg-white border border-black text-[10px] px-1.5 py-0.5 flex items-center gap-1 font-pixel shadow-[1px_1px_0px_black]">
                      <Pin size={9} className="text-pastel-pink fill-pastel-pink rotate-45" /> PINNED
                    </span>
                </button>

                <div className="h-1 bg-black/10 my-2" />
                <a 
                  href="https://github.com/LPinto98" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full text-left p-2 hover:bg-black hover:text-white font-pixel text-lg flex items-center gap-2"
                >
                    <Github size={16} /> GITHUB: @LPINTO98
                </a>
                <button className="w-full text-left p-2 hover:bg-red-400 hover:text-white font-pixel text-lg flex items-center gap-2 opacity-50 cursor-not-allowed">
                    <Square size={16} /> SHUTDOWN
                </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Taskbar with Pinned Music App */}
      <div className="fixed bottom-0 left-0 w-full h-12 bg-white border-t-4 border-black flex items-center px-2 sm:px-4 gap-2 sm:gap-3 z-[100]" onClick={(e) => e.stopPropagation()}>
        {/* Start Button */}
        <button 
          onClick={() => setStartMenuOpen(!startMenuOpen)}
          className="flex items-center gap-1.5 sm:gap-2 bg-pastel-pink border-2 border-black px-3 sm:px-4 h-9 font-pixel text-xl shadow-[2px_2px_0px_black] hover:bg-pastel-yellow transition-colors shrink-0"
        >
            <Square size={16} fill="black" /> START
        </button>

        {/* Pinned Quick Launch App: Media Player */}
        <div className="shrink-0 flex items-center">
          <TaskbarMusicApp />
        </div>

        {/* Embossed Vertical Divider */}
        <div className="w-0.5 h-6 bg-black/20 hidden sm:block shrink-0" />

        {/* Running Windows Tabs (Filter out music unless detached) */}
        <div className="flex-1 flex gap-2 overflow-x-auto h-full items-center">
            {openWindows.filter(id => id !== 'music' || isDetached).map(id => (
                <button 
                  key={id}
                  onClick={() => setActiveWindow(id)}
                  className={`px-3 sm:px-4 h-8 border-2 border-black font-pixel text-sm flex items-center gap-2 transition-colors shrink-0
                    ${activeWindow === id ? 'bg-pastel-blue shadow-none' : 'bg-gray-100 shadow-[2px_2px_0px_black]'}
                  `}
                >
                    {id.toUpperCase()}
                </button>
            ))}
        </div>

        {/* System Clock & Pulse */}
        <div className="font-pixel text-lg sm:text-xl border-l-4 border-black pl-2 sm:pl-4 flex items-center gap-2 sm:gap-4 shrink-0">
            <span className="animate-pulse flex items-center gap-1 text-pastel-pink">
                <Heart size={16} fill="#ffd1dc" />
            </span>
            <span className="hidden sm:inline">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
        </div>
      </div>

      {/* Retro Photo Viewer Lightbox Modal */}
      <AnimatePresence>
        {selectedJourneyPhoto && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
            onClick={() => setSelectedJourneyPhoto(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#f0edf5] border-4 border-black max-w-lg w-full shadow-[10px_10px_0px_black] overflow-hidden flex flex-col"
            >
              {/* Window Header */}
              <div className={`${selectedJourneyPhoto.headerColor || 'bg-pastel-pink'} border-b-4 border-black px-3 py-1.5 flex items-center justify-between`}>
                <span className="font-pixel text-lg font-bold flex items-center gap-1.5 text-gray-900">
                  {selectedJourneyPhoto.iconType === 'grad' ? (
                    <GraduationCap size={16} />
                  ) : selectedJourneyPhoto.iconType === 'party' ? (
                    <PartyPopper size={16} />
                  ) : selectedJourneyPhoto.iconType === 'sparkles' ? (
                    <Sparkles size={16} />
                  ) : (
                    <Plane size={16} className="rotate-45" />
                  )}
                  {selectedJourneyPhoto.filename}
                </span>
                <button 
                  onClick={() => setSelectedJourneyPhoto(null)}
                  className="w-6 h-6 bg-white border-2 border-black flex items-center justify-center hover:bg-red-400 font-bold text-xs shadow-[1px_1px_0px_black] active:translate-x-0.5 active:translate-y-0.5"
                >
                  ✕
                </button>
              </div>

              {/* Photo Area */}
              <div className="p-3.5 bg-white space-y-3">
                <div className="border-3 border-black overflow-hidden max-h-[62vh] flex items-center justify-center bg-black/95">
                  <img 
                    src={selectedJourneyPhoto.src} 
                    alt={selectedJourneyPhoto.title} 
                    className="w-full h-auto max-h-[60vh] object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Scrapbook Details Box */}
                <div className="p-3 bg-pastel-cream border-2 border-black space-y-1.5">
                  <div className="flex items-center justify-between font-pixel text-sm font-bold text-gray-900 flex-wrap gap-1">
                    <span className="flex items-center gap-1">
                      {selectedJourneyPhoto.iconType === 'grad' ? (
                        <Award size={13} className="text-pastel-purple" />
                      ) : selectedJourneyPhoto.iconType === 'party' ? (
                        <PartyPopper size={13} className="text-pastel-purple" />
                      ) : selectedJourneyPhoto.iconType === 'sparkles' ? (
                        <Sparkles size={13} className="text-pastel-purple" />
                      ) : (
                        <Pin size={12} className="text-pastel-pink fill-pastel-pink" />
                      )}
                      {selectedJourneyPhoto.title}
                    </span>
                    <span className="bg-pastel-green px-2 py-0.5 border border-black text-xs shadow-[1px_1px_0px_black]">
                      {selectedJourneyPhoto.date}
                    </span>
                  </div>
                  <p className="font-pixel text-sm text-gray-700 leading-snug">
                    "{selectedJourneyPhoto.caption}"
                  </p>
                  <div className="flex items-center justify-between text-[11px] font-pixel text-gray-500 pt-1 border-t border-black/20 flex-wrap gap-1">
                    <span className="flex items-center gap-1">
                      <MapPin size={11} className="text-pastel-purple" />
                      {selectedJourneyPhoto.location}
                    </span>
                    <span className="text-pastel-purple font-bold">
                      {selectedJourneyPhoto.routeOrDegree}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <MusicProvider>
      <ScrapbookOS />
    </MusicProvider>
  );
}
