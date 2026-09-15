import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Folder, 
  FileCode2, 
  ExternalLink, 
  Star, 
  GitFork, 
  Search, 
  RefreshCw, 
  Github, 
  Terminal, 
  Copy, 
  Check, 
  ArrowLeft, 
  ArrowUp, 
  SlidersHorizontal,
  LayoutGrid,
  List,
  Sparkles,
  BookOpen,
  Calendar,
  Lock,
  Globe
} from 'lucide-react';

export interface Repository {
  id: number | string;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics?: string[];
  homepage?: string | null;
  default_branch?: string;
  fork?: boolean;
}

const FALLBACK_REPOS: Repository[] = [
  {
    id: 1,
    name: 'NER-in-Kannada-using-CRF-for-Historical-Text',
    full_name: 'LPinto98/NER-in-Kannada-using-CRF-for-Historical-Text',
    html_url: 'https://github.com/LPinto98/NER-in-Kannada-using-CRF-for-Historical-Text',
    description: 'Named Entity Recognition (NER) pipeline for historical text in Kannada language using Conditional Random Fields (CRF) and NLP feature engineering.',
    language: 'Python',
    stargazers_count: 3,
    forks_count: 1,
    updated_at: '2023-11-20T14:32:00Z',
    topics: ['nlp', 'machine-learning', 'crf', 'kannada', 'historical-text', 'data-science'],
    fork: false
  },
  {
    id: 2,
    name: 'Data-Visualization-in-Python',
    full_name: 'LPinto98/Data-Visualization-in-Python',
    html_url: 'https://github.com/LPinto98/Data-Visualization-in-Python',
    description: 'A comprehensive collection of interactive data visualization notebooks, statistical charts, seaborn plots, and exploratory data analysis (EDA).',
    language: 'Jupyter Notebook',
    stargazers_count: 2,
    forks_count: 0,
    updated_at: '2023-09-15T10:15:00Z',
    topics: ['data-visualization', 'python', 'eda', 'matplotlib', 'seaborn', 'jupyter'],
    fork: false
  },
  {
    id: 3,
    name: 'Image-Processing-with-Python',
    full_name: 'LPinto98/Image-Processing-with-Python',
    html_url: 'https://github.com/LPinto98/Image-Processing-with-Python',
    description: 'Computer vision algorithms, filtering, spatial transformations, edge detection, and histogram equalization using OpenCV and Python.',
    language: 'Python',
    stargazers_count: 2,
    forks_count: 1,
    updated_at: '2023-08-10T16:45:00Z',
    topics: ['computer-vision', 'opencv', 'image-processing', 'python-scripts'],
    fork: false
  },
  {
    id: 4,
    name: 'Django-Projects',
    full_name: 'LPinto98/Django-Projects',
    html_url: 'https://github.com/LPinto98/Django-Projects',
    description: 'Full-stack web applications and micro-services built with the Django framework, SQLite/PostgreSQL, authentication, and REST APIs.',
    language: 'Python',
    stargazers_count: 1,
    forks_count: 0,
    updated_at: '2023-06-22T09:20:00Z',
    topics: ['django', 'web-development', 'python-backend', 'rest-api'],
    fork: false
  },
  {
    id: 5,
    name: 'rentkar',
    full_name: 'LPinto98/rentkar',
    html_url: 'https://github.com/LPinto98/rentkar',
    description: 'Rental platform web service featuring item discovery, booking workflows, user authentication, and inventory management.',
    language: 'JavaScript',
    stargazers_count: 1,
    forks_count: 1,
    updated_at: '2023-04-12T11:00:00Z',
    topics: ['web-app', 'marketplace', 'rental-system'],
    fork: true
  },
  {
    id: 6,
    name: 'PythonReps',
    full_name: 'LPinto98/PythonReps',
    html_url: 'https://github.com/LPinto98/PythonReps',
    description: 'Algorithms, data structures practice, recursion puzzles, and coding workout solutions in Python.',
    language: 'Python',
    stargazers_count: 1,
    forks_count: 0,
    updated_at: '2023-02-18T18:10:00Z',
    topics: ['algorithms', 'data-structures', 'python', 'competitive-programming'],
    fork: true
  },
  {
    id: 7,
    name: 'LPinto98',
    full_name: 'LPinto98/LPinto98',
    html_url: 'https://github.com/LPinto98/LPinto98',
    description: 'Special GitHub profile repository showcasing developer stats, technology stack, and journey.',
    language: 'Markdown',
    stargazers_count: 1,
    forks_count: 0,
    updated_at: '2024-01-05T12:00:00Z',
    topics: ['profile', 'readme', 'portfolio'],
    fork: false
  }
];

const LANGUAGE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Python: { bg: 'bg-pastel-yellow', text: 'text-amber-900', border: 'border-amber-400' },
  'Jupyter Notebook': { bg: 'bg-orange-200', text: 'text-orange-900', border: 'border-orange-400' },
  JavaScript: { bg: 'bg-yellow-200', text: 'text-yellow-900', border: 'border-yellow-500' },
  TypeScript: { bg: 'bg-pastel-blue', text: 'text-sky-900', border: 'border-sky-400' },
  HTML: { bg: 'bg-red-200', text: 'text-red-900', border: 'border-red-400' },
  CSS: { bg: 'bg-pastel-pink', text: 'text-pink-900', border: 'border-pink-400' },
  Markdown: { bg: 'bg-purple-200', text: 'text-purple-900', border: 'border-purple-400' },
  Default: { bg: 'bg-pastel-green', text: 'text-emerald-900', border: 'border-emerald-400' }
};

export const ProjectsWindow: React.FC = () => {
  const [repos, setRepos] = useState<Repository[]>(FALLBACK_REPOS);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [copiedCloneId, setCopiedCloneId] = useState<string | number | null>(null);
  const [dataSource, setDataSource] = useState<'LIVE' | 'CACHE'>('CACHE');

  const fetchGithubRepos = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.github.com/users/LPinto98/repos?sort=updated&per_page=100');
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          // Merge API data with any rich fallback descriptions if API descriptions are empty
          const enhanced = data.map((r: any) => {
            const matchedFallback = FALLBACK_REPOS.find(f => f.name.toLowerCase() === r.name.toLowerCase());
            return {
              id: r.id,
              name: r.name,
              full_name: r.full_name,
              html_url: r.html_url,
              description: r.description || matchedFallback?.description || 'Repository created by Larissa Pinto.',
              language: r.language || matchedFallback?.language || 'Code',
              stargazers_count: r.stargazers_count ?? 0,
              forks_count: r.forks_count ?? 0,
              updated_at: r.updated_at || new Date().toISOString(),
              topics: (r.topics && r.topics.length > 0) ? r.topics : (matchedFallback?.topics || []),
              homepage: r.homepage,
              fork: r.fork
            };
          });
          setRepos(enhanced);
          setDataSource('LIVE');
        }
      }
    } catch (err) {
      console.warn('GitHub API fetch failed or was rate limited, using cached repos', err);
      setDataSource('CACHE');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGithubRepos();
  }, []);

  const languages = ['ALL', ...Array.from(new Set(repos.map(r => r.language).filter(Boolean))) as string[]];

  const filteredRepos = repos.filter(repo => {
    const matchesSearch = 
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (repo.topics && repo.topics.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())));
    const matchesLang = selectedLanguage === 'ALL' || repo.language === selectedLanguage;
    return matchesSearch && matchesLang;
  });

  const handleCopyClone = (repo: Repository, e: React.MouseEvent) => {
    e.stopPropagation();
    const cmd = `git clone ${repo.html_url}.git`;
    navigator.clipboard?.writeText(cmd);
    setCopiedCloneId(repo.id);
    setTimeout(() => setCopiedCloneId(null), 2000);
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Retro File Explorer Toolbar */}
      <div className="bg-pastel-cream border-2 border-black p-2 flex flex-col gap-2 shadow-[2px_2px_0px_black]">
        {/* Top Control Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black/20 pb-2">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <button 
                title="Back"
                onClick={() => setSelectedRepo(null)}
                className="w-7 h-7 bg-white border-2 border-black flex items-center justify-center hover:bg-pastel-pink transition-colors active:translate-y-0.5"
              >
                <ArrowLeft size={14} />
              </button>
              <button 
                title="Up"
                onClick={() => setSelectedRepo(null)}
                className="w-7 h-7 bg-white border-2 border-black flex items-center justify-center hover:bg-pastel-yellow transition-colors active:translate-y-0.5"
              >
                <ArrowUp size={14} />
              </button>
            </div>
            <div className="h-6 w-[2px] bg-black/30 mx-1" />
            <div className="flex items-center gap-1 font-pixel text-base bg-white border-2 border-black px-2 py-0.5">
              <Folder size={14} className="text-pastel-purple fill-pastel-purple" />
              <span className="text-gray-500">C:\GITHUB\</span>
              <span className="font-bold text-black">LPinto98</span>
              {selectedRepo && (
                <span className="text-pastel-purple">\{selectedRepo.name}</span>
              )}
            </div>
          </div>

          {/* Right Toolbar Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchGithubRepos()}
              disabled={loading}
              title="Refresh from GitHub"
              className="flex items-center gap-1 bg-white hover:bg-pastel-green border-2 border-black px-2 py-0.5 font-pixel text-sm transition-colors active:translate-y-0.5 disabled:opacity-50"
            >
              <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
              <span>{loading ? 'SYNCING...' : 'REFRESH'}</span>
            </button>

            <a
              href="https://github.com/LPinto98"
              target="_blank"
              rel="noreferrer"
              onMouseDown={(e) => e.stopPropagation()}
              className="flex items-center gap-1 bg-black text-white hover:bg-pastel-purple hover:text-black border-2 border-black px-2 py-0.5 font-pixel text-sm transition-colors"
            >
              <Github size={12} />
              <span>@LPinto98</span>
              <ExternalLink size={10} />
            </a>

            <div className="flex border-2 border-black bg-white">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1 ${viewMode === 'grid' ? 'bg-pastel-yellow' : 'hover:bg-gray-100'}`}
                title="Grid View"
              >
                <LayoutGrid size={14} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1 border-l border-black ${viewMode === 'list' ? 'bg-pastel-yellow' : 'hover:bg-gray-100'}`}
                title="List View"
              >
                <List size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[180px]">
            <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="SEARCH_PROJECTS.EXE..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-7 pr-2 py-1 bg-white border-2 border-black font-pixel text-sm focus:outline-none focus:bg-pastel-yellow/20"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 font-pixel text-xs text-gray-400 hover:text-black"
              >
                ✕
              </button>
            )}
          </div>

          {/* Language Filter Pills */}
          <div className="flex items-center gap-1 overflow-x-auto max-w-full pb-1">
            <span className="font-pixel text-xs text-gray-500 uppercase flex items-center gap-0.5">
              <SlidersHorizontal size={10} /> LANG:
            </span>
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`font-pixel text-xs px-2 py-0.5 border border-black transition-transform active:scale-95 whitespace-nowrap ${
                  selectedLanguage === lang
                    ? 'bg-black text-white shadow-[1px_1px_0px_rgba(0,0,0,0.5)]'
                    : 'bg-white hover:bg-pastel-pink text-gray-800'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Profile & GitHub Stat Banner */}
      <div className="bg-gradient-to-r from-pastel-pink/40 via-pastel-blue/40 to-pastel-yellow/40 border-2 border-black p-3 flex flex-wrap items-center justify-between gap-3 shadow-[3px_3px_0px_rgba(0,0,0,0.15)]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 border-2 border-black bg-pastel-yellow flex items-center justify-center shadow-[2px_2px_0px_black] shrink-0">
            <Github size={28} className="text-black" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-gamers text-lg tracking-tight">LARISSA PINTO</h3>
              <span className="bg-black text-white font-pixel text-xs px-1.5 py-0.5">
                {dataSource === 'LIVE' ? '● LIVE GITHUB' : '● CACHED ARCHIVE'}
              </span>
            </div>
            <p className="font-pixel text-sm text-gray-600">
              Data Science • Python • NLP • Computer Vision • Web Dev
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-pixel text-xs">
          <div className="bg-white border-2 border-black px-2 py-1 flex items-center gap-1 shadow-[2px_2px_0px_black]">
            <BookOpen size={12} className="text-pastel-purple" />
            <span>{repos.length} REPOSITORIES</span>
          </div>
          <div className="bg-white border-2 border-black px-2 py-1 flex items-center gap-1 shadow-[2px_2px_0px_black]">
            <Star size={12} className="text-amber-500 fill-amber-500" />
            <span>{repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0)} STARS</span>
          </div>
        </div>
      </div>

      {/* Main Content Area: Repositories */}
      <div className="flex-1 overflow-y-auto pr-1">
        {filteredRepos.length === 0 ? (
          <div className="border-4 border-black border-dashed bg-white p-8 text-center space-y-3 my-4">
            <Folder size={48} className="mx-auto text-gray-400" />
            <p className="font-gamers text-lg text-gray-700">NO PROJECTS FOUND</p>
            <p className="font-pixel text-base text-gray-500">
              No repositories match "{searchTerm}" in category "{selectedLanguage}".
            </p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedLanguage('ALL'); }}
              className="btn-retro bg-pastel-yellow font-pixel text-sm inline-flex items-center gap-1"
            >
              CLEAR FILTERS
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-4">
            {filteredRepos.map((repo) => {
              const langTheme = (repo.language && LANGUAGE_COLORS[repo.language]) || LANGUAGE_COLORS.Default;
              const isSelected = selectedRepo?.id === repo.id;

              return (
                <motion.div
                  key={repo.id}
                  layout
                  whileHover={{ y: -3 }}
                  onClick={() => setSelectedRepo(repo)}
                  className={`border-3 border-black p-3 bg-white flex flex-col justify-between transition-shadow cursor-pointer ${
                    isSelected 
                      ? 'ring-2 ring-pastel-purple shadow-[6px_6px_0px_black] bg-pastel-cream' 
                      : 'shadow-[4px_4px_0px_black] hover:shadow-[6px_6px_0px_black]'
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className={`p-1.5 border-2 border-black ${langTheme.bg} shrink-0`}>
                          <FileCode2 size={18} className={langTheme.text} />
                        </div>
                        <h4 className="font-gamers text-base truncate font-bold text-gray-900" title={repo.name}>
                          {repo.name}
                        </h4>
                      </div>
                      {repo.fork && (
                        <span className="font-pixel text-[10px] bg-gray-100 border border-black px-1 text-gray-600 shrink-0">
                          FORK
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="font-pixel text-base text-gray-700 line-clamp-3 mb-3 leading-snug">
                      {repo.description || 'No description provided.'}
                    </p>

                    {/* Topics/Tags */}
                    {repo.topics && repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {repo.topics.slice(0, 3).map((topic, i) => (
                          <span
                            key={i}
                            className="font-pixel text-[11px] bg-pastel-pink/40 border border-black/40 px-1 py-0.2 text-gray-800"
                          >
                            #{topic}
                          </span>
                        ))}
                        {repo.topics.length > 3 && (
                          <span className="font-pixel text-[11px] text-gray-500">
                            +{repo.topics.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Footer Stats & Actions */}
                  <div className="border-t-2 border-black/10 pt-2 flex items-center justify-between gap-2 mt-auto">
                    <div className="flex items-center gap-2">
                      {repo.language && (
                        <span className={`font-pixel text-xs px-1.5 py-0.5 border border-black font-bold ${langTheme.bg} ${langTheme.text}`}>
                          {repo.language}
                        </span>
                      )}
                      {repo.stargazers_count > 0 && (
                        <span className="font-pixel text-xs flex items-center gap-0.5 text-gray-600">
                          <Star size={10} className="fill-amber-400 text-amber-500" />
                          {repo.stargazers_count}
                        </span>
                      )}
                      {repo.forks_count > 0 && (
                        <span className="font-pixel text-xs flex items-center gap-0.5 text-gray-600">
                          <GitFork size={10} />
                          {repo.forks_count}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => handleCopyClone(repo, e)}
                        title="Copy git clone command"
                        className="p-1 bg-white border border-black hover:bg-pastel-yellow transition-colors font-pixel text-xs flex items-center gap-1"
                      >
                        {copiedCloneId === repo.id ? (
                          <>
                            <Check size={11} className="text-green-600" />
                            <span className="text-green-700 text-[10px]">COPIED</span>
                          </>
                        ) : (
                          <Copy size={11} />
                        )}
                      </button>

                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        onMouseDown={(e) => e.stopPropagation()}
                        className="bg-black text-white hover:bg-pastel-purple hover:text-black border border-black px-2 py-0.5 font-pixel text-xs flex items-center gap-1 transition-colors"
                      >
                        <span>VIEW</span>
                        <ExternalLink size={10} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* List / Table View */
          <div className="border-3 border-black bg-white shadow-[4px_4px_0px_black] overflow-hidden mb-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-pixel text-sm border-collapse">
                <thead>
                  <tr className="bg-pastel-cream border-b-2 border-black">
                    <th className="p-2 border-r border-black font-bold">NAME</th>
                    <th className="p-2 border-r border-black font-bold">LANGUAGE</th>
                    <th className="p-2 border-r border-black font-bold">DESCRIPTION</th>
                    <th className="p-2 border-r border-black font-bold text-center">STARS</th>
                    <th className="p-2 font-bold text-right">LINK</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRepos.map((repo, idx) => {
                    const langTheme = (repo.language && LANGUAGE_COLORS[repo.language]) || LANGUAGE_COLORS.Default;
                    return (
                      <tr
                        key={repo.id}
                        onClick={() => setSelectedRepo(repo)}
                        className={`border-b border-black/10 hover:bg-pastel-yellow/30 cursor-pointer ${
                          idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        }`}
                      >
                        <td className="p-2 border-r border-black font-gamers text-sm font-bold flex items-center gap-1.5">
                          <Folder size={14} className="text-pastel-purple fill-pastel-purple" />
                          <span className="truncate max-w-[180px]">{repo.name}</span>
                        </td>
                        <td className="p-2 border-r border-black">
                          {repo.language ? (
                            <span className={`px-1.5 py-0.5 border border-black text-xs ${langTheme.bg} ${langTheme.text}`}>
                              {repo.language}
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="p-2 border-r border-black text-xs text-gray-700 max-w-[280px] truncate">
                          {repo.description || 'No description'}
                        </td>
                        <td className="p-2 border-r border-black text-center text-xs">
                          {repo.stargazers_count}
                        </td>
                        <td className="p-2 text-right">
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noreferrer"
                            onMouseDown={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 bg-black text-white hover:bg-pastel-purple hover:text-black border border-black px-1.5 py-0.5 text-xs"
                          >
                            OPEN <ExternalLink size={10} />
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Selected Repo Details Panel / Drawer */}
      <AnimatePresence>
        {selectedRepo && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="border-3 border-black bg-pastel-yellow/30 p-3 shadow-[4px_4px_0px_black] relative"
          >
            <div className="flex items-start justify-between gap-2 border-b-2 border-black/20 pb-2 mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-white border-2 border-black">
                  <Terminal size={16} />
                </div>
                <div>
                  <h4 className="font-gamers text-base text-gray-900">{selectedRepo.name}</h4>
                  <p className="font-pixel text-xs text-gray-500">
                    REPOSITORY INSPECTOR // {selectedRepo.full_name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <a
                  href={selectedRepo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  onMouseDown={(e) => e.stopPropagation()}
                  className="btn-retro bg-pastel-green font-pixel text-xs flex items-center gap-1"
                >
                  OPEN ON GITHUB <ExternalLink size={12} />
                </a>
                <button
                  onClick={() => setSelectedRepo(null)}
                  className="w-6 h-6 bg-white border border-black hover:bg-red-400 hover:text-white font-pixel text-xs flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-pixel text-xs">
              <div className="md:col-span-2 space-y-2">
                <p className="text-gray-800 text-sm leading-relaxed bg-white border border-black p-2">
                  {selectedRepo.description || 'No description provided.'}
                </p>
                
                {/* Clone snippet */}
                <div className="bg-black text-green-400 p-2 font-mono text-xs flex items-center justify-between gap-2 border border-black">
                  <span className="truncate">$ git clone {selectedRepo.html_url}.git</span>
                  <button
                    onClick={(e) => handleCopyClone(selectedRepo, e)}
                    className="bg-white/20 hover:bg-white/40 text-white px-2 py-0.5 text-[10px] shrink-0 uppercase flex items-center gap-1"
                  >
                    {copiedCloneId === selectedRepo.id ? <Check size={10} /> : <Copy size={10} />}
                    {copiedCloneId === selectedRepo.id ? 'COPIED' : 'COPY'}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5 bg-white border border-black p-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">LANGUAGE:</span>
                  <span className="font-bold">{selectedRepo.language || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">STARS:</span>
                  <span className="font-bold">{selectedRepo.stargazers_count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">FORKS:</span>
                  <span className="font-bold">{selectedRepo.forks_count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">UPDATED:</span>
                  <span className="font-bold">
                    {new Date(selectedRepo.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status Bar */}
      <div className="border-t-2 border-black pt-1 flex items-center justify-between font-pixel text-xs text-gray-600">
        <span>{filteredRepos.length} OBJECT(S) FOUND</span>
        <span className="flex items-center gap-1">
          <Sparkles size={12} className="text-pastel-purple" />
          GITHUB.COM/LPINTO98
        </span>
      </div>
    </div>
  );
};
