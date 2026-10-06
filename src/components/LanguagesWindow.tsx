import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, PenLine, MessageCircle, Activity, ListTree, ChevronDown, ChevronRight } from 'lucide-react';

type FlagKind = 'ireland' | 'india' | 'japan' | 'uk';

interface Language {
  name: string;
  native: string;
  glyph: string;
  flag: FlagKind;
  reading: number;
  writing: number;
  speaking: number;
  note?: string;
}

export const LANGUAGES: Language[] = [
  { name: 'English', native: 'English', glyph: 'Aa', flag: 'uk', reading: 100, writing: 100, speaking: 100 },
  { name: 'Hindi', native: 'हिन्दी', glyph: 'हि', flag: 'india', reading: 100, writing: 100, speaking: 100 },
  { name: 'Marathi', native: 'मराठी', glyph: 'म', flag: 'india', reading: 100, writing: 100, speaking: 100 },
  { name: 'Konkani', native: 'कोंकणी', glyph: 'को', flag: 'india', reading: 0, writing: 0, speaking: 100, note: 'Spoken at home' },
  { name: 'Japanese', native: '日本語', glyph: 'あ', flag: 'japan', reading: 10, writing: 2, speaking: 10, note: 'Learning' },
  { name: 'Irish', native: 'Gaeilge', glyph: 'Á', flag: 'ireland', reading: 10, writing: 5, speaking: 10, note: 'Learning' },
];

type Skill = 'reading' | 'writing' | 'speaking';

const SKILLS: { key: Skill; label: string; icon: React.ReactNode }[] = [
  { key: 'reading', label: 'Reading', icon: <BookOpen size={12} /> },
  { key: 'writing', label: 'Writing', icon: <PenLine size={12} /> },
  { key: 'speaking', label: 'Speaking', icon: <MessageCircle size={12} /> },
];

export const Flag: React.FC<{ kind: FlagKind; className?: string }> = ({ kind, className = 'w-6 h-4' }) => {
  switch (kind) {
    case 'ireland':
      return (
        <svg viewBox="0 0 3 2" className={`${className} border border-black shrink-0`} aria-label="Flag of Ireland">
          <rect width="1" height="2" fill="#169B62" />
          <rect x="1" width="1" height="2" fill="#fff" />
          <rect x="2" width="1" height="2" fill="#FF883E" />
        </svg>
      );
    case 'india':
      return (
        <svg viewBox="0 0 30 20" className={`${className} border border-black shrink-0`} aria-label="Flag of India">
          <rect width="30" height="20" fill="#fff" />
          <rect width="30" height="6.67" fill="#FF9933" />
          <rect y="13.33" width="30" height="6.67" fill="#138808" />
          <circle cx="15" cy="10" r="2.6" fill="none" stroke="#000080" strokeWidth="0.7" />
          <circle cx="15" cy="10" r="0.6" fill="#000080" />
        </svg>
      );
    case 'japan':
      return (
        <svg viewBox="0 0 30 20" className={`${className} border border-black shrink-0`} aria-label="Flag of Japan">
          <rect width="30" height="20" fill="#fff" />
          <circle cx="15" cy="10" r="6" fill="#BC002D" />
        </svg>
      );
    case 'uk':
      return (
        <svg viewBox="0 0 60 30" className={`${className} border border-black shrink-0`} aria-label="Flag of the United Kingdom">
          <clipPath id="uk-clip"><rect width="60" height="30" /></clipPath>
          <g clipPath="url(#uk-clip)">
            <rect width="60" height="30" fill="#012169" />
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="2" />
            <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
            <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
          </g>
        </svg>
      );
  }
};

// Language app icon: flag with a script glyph badge
export const LanguageIcon: React.FC<{ lang: Language }> = ({ lang }) => (
  <span className="relative inline-flex shrink-0">
    <Flag kind={lang.flag} />
    <span className="absolute -bottom-1.5 -right-2 min-w-[16px] h-[14px] px-0.5 bg-white border border-black text-[9px] leading-[12px] text-center font-bold shadow-[1px_1px_0px_black]">
      {lang.glyph}
    </span>
  </span>
);

// Task Manager style heat shading: higher usage = stronger tint
const heatClass = (v: number) => {
  if (v >= 90) return 'bg-pastel-purple/70';
  if (v >= 50) return 'bg-pastel-purple/45';
  if (v >= 10) return 'bg-pastel-purple/25';
  if (v > 0) return 'bg-pastel-purple/15';
  return 'bg-pastel-cream/60';
};

const overall = (l: Language) => Math.round((l.reading + l.writing + l.speaking) / 3);

const ProcessesTab: React.FC = () => {
  const [sortKey, setSortKey] = useState<Skill | 'name' | 'overall'>('overall');
  const [selected, setSelected] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string[]>([]);

  const sorted = [...LANGUAGES].sort((a, b) => {
    if (sortKey === 'name') return a.name.localeCompare(b.name);
    if (sortKey === 'overall') return overall(b) - overall(a);
    return b[sortKey] - a[sortKey];
  });

  const avg = (k: Skill) => Math.round(LANGUAGES.reduce((s, l) => s + l[k], 0) / LANGUAGES.length);

  const headerBtn = (key: typeof sortKey, label: React.ReactNode, extra = '') => (
    <button
      onClick={() => setSortKey(key)}
      className={`px-2 py-1 text-left hover:bg-pastel-blue/40 border-r border-black/20 ${sortKey === key ? 'bg-pastel-blue/50' : ''} ${extra}`}
    >
      {label}
    </button>
  );

  return (
    <div className="border-2 border-black bg-white font-pixel text-lg overflow-x-auto">
      <div className="min-w-[520px]">
        {/* Column headers */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] border-b-2 border-black bg-gray-100">
          {headerBtn('name', <span>Name</span>)}
          {SKILLS.map(s => (
            <React.Fragment key={s.key}>
              {headerBtn(
                s.key,
                <span className="flex flex-col items-end leading-none">
                  <span className="text-xl">{avg(s.key)}%</span>
                  <span className="text-sm flex items-center gap-1 text-gray-600">{s.icon}{s.label}</span>
                </span>,
                'text-right'
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="px-2 py-1 text-sm text-gray-600 bg-white border-b border-black/10">
          Languages ({LANGUAGES.length})
        </div>

        {sorted.map(lang => {
          const isOpen = expanded.includes(lang.name);
          return (
            <React.Fragment key={lang.name}>
              <div
                onClick={() => setSelected(lang.name)}
                className={`grid grid-cols-[2fr_1fr_1fr_1fr] border-b border-black/10 cursor-default ${selected === lang.name ? 'outline outline-2 outline-pastel-blue -outline-offset-2' : 'hover:bg-pastel-blue/15'}`}
              >
                <div className="flex items-center gap-2 px-2 py-1.5 min-w-0">
                  <button
                    onClick={(e) => { e.stopPropagation(); setExpanded(isOpen ? expanded.filter(n => n !== lang.name) : [...expanded, lang.name]); }}
                    className="text-gray-500 hover:text-black shrink-0"
                    aria-label={isOpen ? 'Collapse' : 'Expand'}
                  >
                    {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </button>
                  <LanguageIcon lang={lang} />
                  <span className="ml-2 truncate">{lang.name}</span>
                  {lang.note && <span className="text-sm text-gray-500 truncate hidden sm:inline">· {lang.note}</span>}
                </div>
                {SKILLS.map(s => (
                  <div key={s.key} className={`px-2 py-1.5 text-right border-l border-white ${heatClass(lang[s.key])}`}>
                    {lang[s.key]}%
                  </div>
                ))}
              </div>
              {isOpen && (
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr] border-b border-black/10 bg-gray-50 text-base">
                  <div className="pl-12 pr-2 py-1 text-gray-600 truncate">{lang.native}.exe</div>
                  {SKILLS.map(s => (
                    <div key={s.key} className="px-2 py-1 flex items-center">
                      <div className="w-full h-2 border border-black bg-white">
                        <div className="h-full bg-pastel-pink" style={{ width: `${lang[s.key]}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

// Fake "live" usage graph per skill: flat line at proficiency with tiny wobble
const UsageGraph: React.FC<{ value: number; label: string; icon: React.ReactNode }> = ({ value, label, icon }) => {
  const points = Array.from({ length: 30 }, (_, i) => {
    const wobble = value === 0 ? 0 : Math.sin(i * 1.3 + value) * Math.min(3, value * 0.3);
    const y = 100 - Math.max(0, Math.min(100, value + wobble));
    return `${(i / 29) * 100},${y}`;
  }).join(' ');

  return (
    <div>
      <div className="flex justify-between text-base mb-1">
        <span className="flex items-center gap-1">{icon} {label}</span>
        <span>{value}%</span>
      </div>
      <div className="relative h-16 border-2 border-black bg-white overflow-hidden"
        style={{ backgroundImage: 'linear-gradient(#b39eb533 1px, transparent 1px), linear-gradient(90deg, #b39eb533 1px, transparent 1px)', backgroundSize: '10% 25%' }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          <polygon points={`0,100 ${points} 100,100`} fill="#b39eb555" />
          <polyline points={points} fill="none" stroke="#7a5f7d" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
    </div>
  );
};

const PerformanceTab: React.FC = () => {
  const [active, setActive] = useState(LANGUAGES[0].name);
  const lang = LANGUAGES.find(l => l.name === active)!;

  return (
    <div className="flex flex-col sm:flex-row gap-3 font-pixel">
      <div className="sm:w-48 shrink-0 flex sm:flex-col gap-1 overflow-x-auto">
        {LANGUAGES.map(l => (
          <button
            key={l.name}
            onClick={() => setActive(l.name)}
            className={`flex items-center gap-3 p-2 border-2 text-left shrink-0 ${active === l.name ? 'border-black bg-pastel-blue/40' : 'border-transparent hover:bg-pastel-blue/15'}`}
          >
            <LanguageIcon lang={l} />
            <span className="ml-1 leading-tight">
              <span className="block text-lg">{l.name}</span>
              <span className="block text-sm text-gray-600">{overall(l)}%</span>
            </span>
          </button>
        ))}
      </div>

      <div className="flex-1 border-2 border-black bg-white p-3 min-w-0">
        <div className="flex items-end justify-between border-b-2 border-black pb-2 mb-3">
          <div className="flex items-center gap-3">
            <Flag kind={lang.flag} className="w-10 h-7" />
            <span className="text-3xl">{lang.name}</span>
          </div>
          <span className="text-xl text-gray-600">{lang.native}</span>
        </div>
        <div className="space-y-3">
          {SKILLS.map(s => (
            <UsageGraph key={`${lang.name}-${s.key}`} value={lang[s.key]} label={s.label} icon={s.icon} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-x-4 mt-3 text-base">
          <span className="text-gray-600">Overall fluency</span><span className="text-right">{overall(lang)}%</span>
          <span className="text-gray-600">Status</span><span className="text-right">{lang.note ?? (overall(lang) === 100 ? 'Fluent' : 'Running')}</span>
        </div>
      </div>
    </div>
  );
};

export const LanguagesWindow: React.FC = () => {
  const [tab, setTab] = useState<'processes' | 'performance'>('processes');

  return (
    <div className="flex flex-col gap-3" onMouseDown={(e) => e.stopPropagation()}>
      <div className="flex gap-1 border-b-2 border-black font-pixel text-lg">
        {([
          { id: 'processes', label: 'Processes', icon: <ListTree size={14} /> },
          { id: 'performance', label: 'Performance', icon: <Activity size={14} /> },
        ] as const).map(t => (
          <motion.button
            key={t.id}
            whileTap={{ scale: 0.97 }}
            onClick={() => setTab(t.id)}
            className={`px-3 py-1 border-2 border-b-0 border-black flex items-center gap-1.5 -mb-[2px] ${tab === t.id ? 'bg-white' : 'bg-gray-100 border-transparent hover:bg-pastel-yellow/50'}`}
          >
            {t.icon} {t.label}
          </motion.button>
        ))}
      </div>

      {tab === 'processes' ? <ProcessesTab /> : <PerformanceTab />}

      <div className="font-pixel text-sm text-gray-600 flex justify-between border-t border-black/20 pt-1">
        <span>Languages: {LANGUAGES.length}</span>
        <span>Fluent: {LANGUAGES.filter(l => overall(l) === 100).length}</span>
      </div>
    </div>
  );
};
