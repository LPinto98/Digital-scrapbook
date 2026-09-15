import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Linkedin, 
  Mail, 
  Github, 
  FolderCode, 
  PartyPopper, 
  GraduationCap, 
  Terminal, 
  Coffee, 
  ShieldCheck, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Heart, 
  Scissors, 
  Bug, 
  Zap, 
  Briefcase, 
  Award, 
  MapPin, 
  Bot, 
  Activity, 
  Calendar,
  ExternalLink,
  ChevronRight,
  Smile,
  Plane
} from 'lucide-react';
import { JourneyPhotoModal } from '../App.tsx';

interface AboutMeWindowProps {
  onOpenJourneyPhoto: (photo: JourneyPhotoModal) => void;
  onOpenWindow: (windowId: string) => void;
}

type TabKey = 'narrative' | 'superpowers' | 'questlog' | 'funfacts';

export const AboutMeWindow: React.FC<AboutMeWindowProps> = ({ 
  onOpenJourneyPhoto, 
  onOpenWindow 
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('narrative');

  const tabs: { key: TabKey; label: string; icon: React.ReactNode; color: string }[] = [
    { key: 'narrative', label: 'THE_STORY.TXT', icon: <Terminal size={14} />, color: 'bg-pastel-pink' },
    { key: 'superpowers', label: 'TECH_SPECS.SYS', icon: <Cpu size={14} />, color: 'bg-pastel-blue' },
    { key: 'questlog', label: 'CAREER_LOG.MD', icon: <Briefcase size={14} />, color: 'bg-pastel-yellow' },
    { key: 'funfacts', label: 'FUN_FACTS.CFG', icon: <Sparkles size={14} />, color: 'bg-pastel-purple' },
  ];

  return (
    <div className="space-y-5 pb-4 text-gray-900">
      {/* Top Profile Summary Card */}
      <div className="bg-pastel-cream/80 border-3 border-black p-3.5 sm:p-4 shadow-[5px_5px_0px_black] relative">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center sm:items-start">
          {/* Profile Photo with Polaroid vibe */}
          <div 
            onClick={() => onOpenJourneyPhoto({
              src: '/about_me.jpg',
              filename: 'LARISSA_PINTO_ABOUT_ME.JPG',
              title: 'LARISSA PINTO • DEVELOPER & MAKER',
              location: 'BATH, UK • THE ROYAL CRESCENT',
              date: 'DEVELOPER & MAKER',
              caption: "Developer at ESProfiler, MSc Data Science graduate, and yarn/craft lover wearing a handmade crocheted cardigan amongst the blooming Bath wisteria.",
              badge: 'ABOUT ME',
              routeOrDegree: 'DEVELOPER & MAKER',
              headerColor: 'bg-pastel-purple',
              iconType: 'sparkles'
            })}
            className="w-36 h-48 sm:w-40 sm:h-52 border-3 border-black relative bg-neutral-900 overflow-hidden cursor-pointer group shadow-[4px_4px_0px_black] shrink-0"
            title="Click to view full photo"
          >
            <img 
              src="/about_me.jpg" 
              alt="Larissa Pinto - Developer & Maker" 
              className="w-full h-full object-cover object-[center_15%] group-hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-1 right-1 bg-yellow-200 border border-black px-1.5 py-0.5 text-[9px] font-pixel shadow-[1px_1px_0px_black] text-gray-900 flex items-center gap-0.5">
              <Sparkles size={10} className="text-purple-600" /> MAKER
            </div>
            <div className="absolute bottom-1 inset-x-1 bg-black/85 text-white text-[9px] font-pixel text-center py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
              CLICK TO EXPAND 🔍
            </div>
          </div>

          {/* Bio Header & Quick Info */}
          <div className="flex-1 text-center sm:text-left min-w-0">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
              <h2 className="font-gamers text-2xl sm:text-3xl text-pastel-purple tracking-wide">
                LARISSA PINTO
              </h2>
              <span className="bg-pastel-green px-2 py-0.5 border border-black font-pixel text-xs font-bold shadow-[1px_1px_0px_black] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse" />
                ONLINE & CODING
              </span>
            </div>

            <p className="font-pixel text-lg sm:text-xl text-gray-700 font-bold leading-tight">
              Backend & Full-Stack Engineer • MSc Data Scientist • Yarn Crafter
            </p>

            <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start mt-2">
              <span className="bg-white border border-black px-2 py-0.5 font-pixel text-xs text-gray-800 shadow-[1px_1px_0px_black] flex items-center gap-1">
                <MapPin size={11} className="text-pastel-purple" /> Manchester, UK (ex-Mumbai ✈️)
              </span>
              <span className="bg-white border border-black px-2 py-0.5 font-pixel text-xs text-gray-800 shadow-[1px_1px_0px_black] flex items-center gap-1">
                <Briefcase size={11} className="text-pastel-blue" /> Backend Dev @ ESProfiler
              </span>
              <span className="bg-white border border-black px-2 py-0.5 font-pixel text-xs text-gray-800 shadow-[1px_1px_0px_black] flex items-center gap-1">
                <GraduationCap size={11} className="text-pastel-pink" /> MSc Data Science (MMU)
              </span>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-2 mt-3.5 justify-center sm:justify-start">
              <a 
                href="https://linkedin.com/in/larissa-pinto" 
                target="_blank" 
                rel="noreferrer"
                className="px-2.5 py-1 border-2 border-black bg-white hover:bg-pastel-blue flex items-center gap-1 font-pixel text-xs shadow-[2px_2px_0px_black] active:translate-x-0.5 active:translate-y-0.5 transition-colors"
                onMouseDown={(e) => e.stopPropagation()}
              >
                <Linkedin size={14} className="text-[#0077b5]" /> LINKEDIN
              </a>
              <a 
                href="https://github.com/LPinto98" 
                target="_blank" 
                rel="noreferrer"
                className="px-2.5 py-1 border-2 border-black bg-white hover:bg-neutral-200 flex items-center gap-1 font-pixel text-xs shadow-[2px_2px_0px_black] active:translate-x-0.5 active:translate-y-0.5 transition-colors"
                onMouseDown={(e) => e.stopPropagation()}
              >
                <Github size={14} /> GITHUB
              </a>
              <a 
                href="mailto:larissapinto98@gmail.com" 
                className="px-2.5 py-1 border-2 border-black bg-white hover:bg-pastel-green flex items-center gap-1 font-pixel text-xs shadow-[2px_2px_0px_black] active:translate-x-0.5 active:translate-y-0.5 transition-colors"
                onMouseDown={(e) => e.stopPropagation()}
              >
                <Mail size={14} className="text-green-700" /> EMAIL
              </a>
              <button 
                onClick={() => onOpenWindow('techstack')} 
                className="px-2.5 py-1 border-2 border-black bg-pastel-purple text-white hover:bg-purple-600 flex items-center gap-1 font-pixel text-xs shadow-[2px_2px_0px_black] active:translate-x-0.5 active:translate-y-0.5 transition-colors cursor-pointer" 
                onMouseDown={(e) => e.stopPropagation()}
              >
                <FolderCode size={14} /> TECH_STACK.SYS
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Retro Windows Tab Strip */}
      <div className="flex border-b-2 border-black gap-1 overflow-x-auto pt-1 select-none">
        {tabs.map((tab) => {
          const isSelected = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              onMouseDown={(e) => e.stopPropagation()}
              className={`font-pixel text-xs sm:text-sm px-3 py-1.5 border-t-2 border-x-2 border-black flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                isSelected 
                  ? `${tab.color} font-bold shadow-[2px_-2px_0px_black] -mb-[2px] pb-2 z-10 text-gray-950` 
                  : 'bg-neutral-100 hover:bg-white text-gray-600 opacity-90'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div className="min-h-[260px]">
        {/* TAB 1: THE STORY */}
        {activeTab === 'narrative' && (
          <motion.div 
            initial={{ opacity: 0, y: 4 }} 
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_black] space-y-3">
              <div className="flex items-center gap-2 font-pixel text-lg font-bold text-pastel-purple border-b border-black/20 pb-2">
                <Terminal size={16} />
                <span>MEET LARISSA (THE HUMAN BEHIND THE TERMINAL)</span>
              </div>

              <p className="font-pixel text-xl sm:text-2xl text-gray-800 leading-relaxed">
                Hey there! Welcome to <span className="bg-pastel-yellow px-1 font-bold">L_OS v1.0</span>. I'm Larissa — a Backend and Full-Stack Engineer based in Manchester, UK with <span className="font-bold text-gray-950">3.5+ years of experience</span> turning caffeine, clean logic, and curiosity into resilient distributed systems.
              </p>

              <p className="font-pixel text-xl sm:text-2xl text-gray-800 leading-relaxed">
                By day at <span className="font-bold text-gray-950">ESProfiler</span>, I architect event-driven microservices in <span className="bg-pastel-blue/40 px-1 font-bold">Java 21/25</span>, wrangle message brokers with <span className="bg-pastel-green/40 px-1 font-bold">RabbitMQ</span>, and deploy generative AI workflows into production using <span className="bg-pastel-purple/30 px-1 font-bold">Spring AI + Gemini</span>.
              </p>

              <div className="bg-pastel-yellow/40 border-2 border-black border-dashed p-3 space-y-1">
                <p className="font-pixel text-base sm:text-lg font-bold text-gray-900 flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-green-700" />
                  Engineering Quality Initiative: The Test Coverage Crusade 🛡️
                </p>
                <p className="font-pixel text-base sm:text-lg text-gray-700 leading-snug">
                  Apart from and on top of all my normal daily feature development and sprint tasks, I took the proactive initiative to set up automated GitHub CI/CD workflows for PR coverage checks, elevating our backend unit test coverage from <span className="font-bold text-red-700">4%</span> all the way to <span className="font-bold text-green-700">30%</span> in 7 months. Bugs belong in jars, not in production.
                </p>
              </div>

              <p className="font-pixel text-xl sm:text-2xl text-gray-800 leading-relaxed">
                When the terminal window closes: you’ll find me untangling skeins of wool to crochet cardigans (like the one in my photo outside the Royal Crescent in Bath!), cooking, painting, and actively plotting to adopt a dog 🐕.
              </p>
            </div>

            {/* Quick Links & Shortcuts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => onOpenWindow('journey')}
                className="bg-pastel-blue/80 border-2 border-black p-3 text-left shadow-[3px_3px_0px_black] hover:bg-pastel-blue active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer group"
                onMouseDown={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between font-pixel text-sm font-bold text-gray-950">
                  <span className="flex items-center gap-1.5">
                    <PartyPopper size={15} /> EXPLORE MY_JOURNEY.EXE
                  </span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="font-pixel text-xs text-gray-700 mt-1">
                  From Mumbai departure gates to MMU Graduation & ESProfiler Launch Day photos!
                </p>
              </button>

              <button
                onClick={() => onOpenWindow('techstack')}
                className="bg-pastel-purple/80 border-2 border-black p-3 text-left shadow-[3px_3px_0px_black] hover:bg-pastel-purple active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer group"
                onMouseDown={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between font-pixel text-sm font-bold text-gray-950">
                  <span className="flex items-center gap-1.5">
                    <FolderCode size={15} /> OPEN TECH_STACK.SYS
                  </span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="font-pixel text-xs text-gray-700 mt-1">
                  Interactive badges, copyable markdown shields, and real repo associations.
                </p>
              </button>
            </div>
          </motion.div>
        )}

        {/* TAB 2: TECH SPECS (SUPERPOWERS) */}
        {activeTab === 'superpowers' && (
          <motion.div 
            initial={{ opacity: 0, y: 4 }} 
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Card 1 */}
              <div className="bg-white border-2 border-black p-3 shadow-[3px_3px_0px_black] space-y-1.5">
                <div className="flex items-center gap-2 font-pixel text-base font-bold text-pastel-purple">
                  <Bot size={16} />
                  <span>SPRING AI & GENERATIVE LLMS</span>
                </div>
                <p className="font-pixel text-base text-gray-700 leading-snug">
                  Hands-on engineering deploying production GenAI workflows with <span className="font-bold text-gray-900">Spring AI (Gemini)</span> on Java 21/25, structuring prompts, embeddings, and context ingestion into microservices.
                </p>
                <div className="pt-1 flex flex-wrap gap-1">
                  {['Java 21/25', 'Spring AI', 'Gemini', 'REST APIs'].map((tag) => (
                    <span key={tag} className="font-pixel text-[11px] bg-neutral-100 border border-black px-1.5 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white border-2 border-black p-3 shadow-[3px_3px_0px_black] space-y-1.5">
                <div className="flex items-center gap-2 font-pixel text-base font-bold text-blue-700">
                  <Zap size={16} />
                  <span>ASYNC MESSAGING & ARCHITECTURE</span>
                </div>
                <p className="font-pixel text-base text-gray-700 leading-snug">
                  Decoupling complex monolithic pain points into event-driven microservices using <span className="font-bold text-gray-900">RabbitMQ</span> message brokers for resilient delivery under heavy concurrency.
                </p>
                <div className="pt-1 flex flex-wrap gap-1">
                  {['RabbitMQ', 'Microservices', 'Event-Driven', 'Docker'].map((tag) => (
                    <span key={tag} className="font-pixel text-[11px] bg-neutral-100 border border-black px-1.5 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white border-2 border-black p-3 shadow-[3px_3px_0px_black] space-y-1.5">
                <div className="flex items-center gap-2 font-pixel text-base font-bold text-green-700">
                  <CheckCircle2 size={16} />
                  <span>CI/CD & TEST COVERAGE CRUSADE</span>
                </div>
                <p className="font-pixel text-base text-gray-700 leading-snug">
                  Apart from and alongside all standard feature deliverables, spearheaded automated GitHub Workflows for PR coverage gates, boosting codebase test coverage from <span className="font-bold text-red-700">4%</span> to <span className="font-bold text-green-800">30%</span> in 7 months with JUnit & Mockito.
                </p>
                <div className="pt-1 flex flex-wrap gap-1">
                  {['JUnit', 'Mockito', 'GitHub Actions', 'TDD', 'CI/CD'].map((tag) => (
                    <span key={tag} className="font-pixel text-[11px] bg-neutral-100 border border-black px-1.5 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white border-2 border-black p-3 shadow-[3px_3px_0px_black] space-y-1.5">
                <div className="flex items-center gap-2 font-pixel text-base font-bold text-orange-700">
                  <Activity size={16} />
                  <span>OBSERVABILITY & FULL-STACK</span>
                </div>
                <p className="font-pixel text-base text-gray-700 leading-snug">
                  Instrumenting service traces and performance telemetry using <span className="font-bold text-gray-900">OpenTelemetry, Prometheus, & Grafana</span>, plus building clean internal tools in Vaadin, React, and Angular.
                </p>
                <div className="pt-1 flex flex-wrap gap-1">
                  {['OpenTelemetry', 'Prometheus', 'Grafana', 'Vaadin UI', 'React'].map((tag) => (
                    <span key={tag} className="font-pixel text-[11px] bg-neutral-100 border border-black px-1.5 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Data Science Banner */}
            <div className="bg-pastel-cream border-2 border-black p-3 shadow-[3px_3px_0px_black] flex items-center gap-3">
              <div className="w-10 h-10 border-2 border-black bg-pastel-yellow flex items-center justify-center shrink-0">
                <GraduationCap size={22} className="text-gray-900" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-pixel text-base font-bold text-gray-900">
                  MSc DATA SCIENCE FOUNDATION (MANCHESTER MET)
                </p>
                <p className="font-pixel text-sm text-gray-600">
                  Specialized in advanced Python, SQL, Hadoop, distributed data modeling, statistical analysis, and machine learning architectures.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 3: CAREER QUEST LOG */}
        {activeTab === 'questlog' && (
          <motion.div 
            initial={{ opacity: 0, y: 4 }} 
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            {/* ESProfiler */}
            <div className="bg-white border-2 border-black p-3.5 shadow-[3px_3px_0px_black] relative">
              <div className="flex flex-wrap items-center justify-between gap-1 border-b border-black/15 pb-1.5 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-pastel-green border border-black" />
                  <span className="font-pixel text-lg font-bold text-gray-950">ESPROFILER (UK)</span>
                  <span className="bg-pastel-green px-1.5 py-0.5 text-[10px] font-pixel border border-black font-bold">CURRENT</span>
                </div>
                <span className="font-pixel text-xs text-gray-500 font-bold">APR 2024 – PRESENT</span>
              </div>
              <p className="font-pixel text-base font-bold text-pastel-purple mb-1">Backend Developer</p>
              <ul className="font-pixel text-sm sm:text-base text-gray-700 space-y-1 list-disc list-inside">
                <li>Proactively drove engineering standards apart from regular daily feature work: created automated GitHub Workflows for PR coverage gates, driving backend unit test coverage from 4% to 30%.</li>
                <li>Built generative AI backend REST APIs using Java 21/25 and Spring AI (Gemini) for platform microservices.</li>
                <li>Integrated RabbitMQ message broker for decoupled asynchronous service communication under load.</li>
                <li>Configured OpenTelemetry, Prometheus, and Grafana for full observability; crafted Vaadin admin UIs.</li>
              </ul>
            </div>

            {/* GodelCloud */}
            <div className="bg-white border-2 border-black p-3.5 shadow-[3px_3px_0px_black] relative">
              <div className="flex flex-wrap items-center justify-between gap-1 border-b border-black/15 pb-1.5 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-pastel-yellow border border-black" />
                  <span className="font-pixel text-lg font-bold text-gray-950">GODELCLOUD (UK)</span>
                  <span className="bg-pastel-yellow px-1.5 py-0.5 text-[10px] font-pixel border border-black font-bold">CONTRACT</span>
                </div>
                <span className="font-pixel text-xs text-gray-500 font-bold">DEC 2022 – JAN 2023</span>
              </div>
              <p className="font-pixel text-base font-bold text-pastel-purple mb-1">Freelance Full Stack Developer</p>
              <ul className="font-pixel text-sm sm:text-base text-gray-700 space-y-1 list-disc list-inside">
                <li>Owned end-to-end development & cloud launch of early-stage startup platform in Django 3, SQL, and JS.</li>
                <li>Shipped responsive Bootstrap 5 / jQuery frontends hooked to backend REST endpoints in a 2-month sprint.</li>
              </ul>
            </div>

            {/* IBM */}
            <div className="bg-white border-2 border-black p-3.5 shadow-[3px_3px_0px_black] relative">
              <div className="flex flex-wrap items-center justify-between gap-1 border-b border-black/15 pb-1.5 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-pastel-blue border border-black" />
                  <span className="font-pixel text-lg font-bold text-gray-950">IBM (INDIA)</span>
                </div>
                <span className="font-pixel text-xs text-gray-500 font-bold">JAN 2021 – AUG 2022</span>
              </div>
              <p className="font-pixel text-base font-bold text-pastel-purple mb-1">Application Developer</p>
              <ul className="font-pixel text-sm sm:text-base text-gray-700 space-y-1 list-disc list-inside">
                <li>Partnered with Cisco Webex teams building automated integration bots in Node.js ahead of public API releases.</li>
                <li>Engineered Angular frontends backed by Spring Boot microservices deployed on Kubernetes & IBM Cloud.</li>
              </ul>
            </div>

            {/* Education Dual-Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="bg-pastel-cream border-2 border-black p-3 shadow-[2px_2px_0px_black]">
                <p className="font-pixel text-xs text-gray-500 font-bold">SEP 2022 – SEP 2023</p>
                <p className="font-pixel text-base font-bold text-gray-900">M.Sc. Data Science</p>
                <p className="font-pixel text-xs text-pastel-purple font-bold">Manchester Metropolitan University, UK</p>
                <p className="font-pixel text-xs text-gray-600 mt-1">Python, SQL, Hadoop, distributed data modeling & ML.</p>
              </div>
              <div className="bg-pastel-cream border-2 border-black p-3 shadow-[2px_2px_0px_black]">
                <p className="font-pixel text-xs text-gray-500 font-bold">AUG 2016 – JUL 2020</p>
                <p className="font-pixel text-base font-bold text-gray-900">B.E. Computer Science</p>
                <p className="font-pixel text-xs text-pastel-purple font-bold">St. Francis Institute of Technology, Mumbai</p>
                <p className="font-pixel text-xs text-gray-600 mt-1">Algorithms, Data Structures, Networks, DBMS.</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 4: FUN SPECS & TRIVIA */}
        {activeTab === 'funfacts' && (
          <motion.div 
            initial={{ opacity: 0, y: 4 }} 
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Fact 1 */}
              <div className="bg-pastel-pink/30 border-2 border-black p-3 shadow-[3px_3px_0px_black] space-y-1">
                <div className="flex items-center gap-1.5 font-pixel text-base font-bold text-gray-900">
                  <Scissors size={16} className="text-pink-600" />
                  <span>THE YARN VS. CODE THEOREM</span>
                </div>
                <p className="font-pixel text-sm sm:text-base text-gray-700 leading-snug">
                  Crochet and software engineering are basically the same discipline: you start with an ambitious design, follow strict algorithmic patterns, and if you miss one loop on row 42, the entire thing unravels at runtime!
                </p>
              </div>

              {/* Fact 2 */}
              <div className="bg-pastel-yellow/30 border-2 border-black p-3 shadow-[3px_3px_0px_black] space-y-1">
                <div className="flex items-center gap-1.5 font-pixel text-base font-bold text-gray-900">
                  <Coffee size={16} className="text-amber-800" />
                  <span>PRIMARY SYSTEM FUEL</span>
                </div>
                <p className="font-pixel text-sm sm:text-base text-gray-700 leading-snug">
                  Hot chai, iced matcha lattes, and that intoxicating sweet dopamine rush when a finicky GitHub Actions workflow turns completely green on the first try.
                </p>
              </div>

              {/* Fact 3 */}
              <div className="bg-pastel-blue/30 border-2 border-black p-3 shadow-[3px_3px_0px_black] space-y-1">
                <div className="flex items-center gap-1.5 font-pixel text-base font-bold text-gray-900">
                  <Plane size={16} className="text-blue-700" />
                  <span>FIRST FLIGHT EVER (2022) ✈️</span>
                </div>
                <p className="font-pixel text-sm sm:text-base text-gray-700 leading-snug">
                  My flight to the UK in September 2022 to pursue my Master's at Manchester Met was the first ever flight in my life! Talk about taking a leap across the world.
                </p>
              </div>

              {/* Fact 4 */}
              <div className="bg-pastel-purple/30 border-2 border-black p-3 shadow-[3px_3px_0px_black] space-y-1">
                <div className="flex items-center gap-1.5 font-pixel text-base font-bold text-gray-900">
                  <Heart size={16} className="text-purple-700" />
                  <span>FUTURE CANINE CO-PILOT 🐾</span>
                </div>
                <p className="font-pixel text-sm sm:text-base text-gray-700 leading-snug">
                  Patiently awaiting the day I adopt a dog to officially serve as Head of Rubber Duck Debugging, walk partner, and Chief Cozy Officer. 🐶✨
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Retro Status Bar at the bottom of the window */}
      <div className="bg-neutral-100 border-2 border-black px-3 py-1.5 flex flex-wrap items-center justify-between gap-2 text-gray-700 text-xs font-pixel">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <span>STATUS: OPEN TO INTERESTING COLLABORATIONS</span>
        </div>
        <div className="flex items-center gap-3">
          <span>LANG: EN / HI / KON</span>
          <span className="text-pastel-purple font-bold">L_OS v1.0 • SYSTEM ACTIVE</span>
        </div>
      </div>
    </div>
  );
};
