import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FolderCode, 
  Search, 
  Sparkles, 
  ExternalLink, 
  Copy, 
  Check, 
  FileText, 
  Award, 
  Layers, 
  Cpu, 
  Database, 
  Cloud, 
  Wrench, 
  BookOpen, 
  Code2, 
  Github, 
  RefreshCw,
  Tag,
  Palette,
  Binary,
  ArrowUpRight,
  Info
} from 'lucide-react';

export type TechCategory = 
  | 'all'
  | 'languages' 
  | 'ai-ml' 
  | 'frameworks' 
  | 'databases' 
  | 'devops-cloud' 
  | 'tools-design' 
  | 'research';

export interface TechItem {
  name: string;
  category: Exclude<TechCategory, 'all' | 'research'>;
  categoryLabel: string;
  badgeUrl: string;
  badgeMarkdown: string;
  bgColor: string;
  textColor?: string;
  description: string;
  relatedRepos?: { name: string; url: string }[];
  highlight?: boolean;
}

export const TECH_ITEMS: TechItem[] = [
  // Languages
  {
    name: 'Python',
    category: 'languages',
    categoryLabel: 'Programming Language',
    badgeUrl: 'https://img.shields.io/badge/python-3670A0?style=plastic&logo=python&logoColor=ffdd54',
    badgeMarkdown: '![Python](https://img.shields.io/badge/python-3670A0?style=plastic&logo=python&logoColor=ffdd54)',
    bgColor: '#3670A0',
    description: 'Primary language for ML, NLP, CNN models, and data science scripting.',
    relatedRepos: [
      { name: 'NER-in-Kannada-using-CRF-for-Historical-Text', url: 'https://github.com/LPinto98/NER-in-Kannada-using-CRF-for-Historical-Text' },
      { name: 'Data-Visualization-in-Python', url: 'https://github.com/LPinto98/Data-Visualization-in-Python' },
      { name: 'Django-Projects', url: 'https://github.com/LPinto98/Django-Projects' }
    ],
    highlight: true
  },
  {
    name: 'Java',
    category: 'languages',
    categoryLabel: 'Programming Language',
    badgeUrl: 'https://img.shields.io/badge/java-%23ED8B00.svg?style=plastic&logo=java&logoColor=white',
    badgeMarkdown: '![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=plastic&logo=java&logoColor=white)',
    bgColor: '#ED8B00',
    description: 'Enterprise backend, object-oriented systems, and Spring frameworks.',
    highlight: true
  },

  // AI & Data Science
  {
    name: 'scikit-learn',
    category: 'ai-ml',
    categoryLabel: 'ML Algorithms & NLP',
    badgeUrl: 'https://img.shields.io/badge/scikit--learn-%23F7931E.svg?style=plastic&logo=scikit-learn&logoColor=white',
    badgeMarkdown: '![scikit-learn](https://img.shields.io/badge/scikit--learn-%23F7931E.svg?style=plastic&logo=scikit-learn&logoColor=white)',
    bgColor: '#F7931E',
    description: 'Predictive modeling, classification, regression, clustering & CRF NLP pipelines.',
    relatedRepos: [
      { name: 'NER-in-Kannada-using-CRF-for-Historical-Text', url: 'https://github.com/LPinto98/NER-in-Kannada-using-CRF-for-Historical-Text' }
    ],
    highlight: true
  },
  {
    name: 'Pandas',
    category: 'ai-ml',
    categoryLabel: 'Data Wrangling & Analytics',
    badgeUrl: 'https://img.shields.io/badge/pandas-%23150458.svg?style=plastic&logo=pandas&logoColor=white',
    badgeMarkdown: '![Pandas](https://img.shields.io/badge/pandas-%23150458.svg?style=plastic&logo=pandas&logoColor=white)',
    bgColor: '#150458',
    description: 'DataFrames, exploratory data analysis, time series manipulation, and ETL.',
    relatedRepos: [
      { name: 'Data-Visualization-in-Python', url: 'https://github.com/LPinto98/Data-Visualization-in-Python' }
    ]
  },
  {
    name: 'Plotly',
    category: 'ai-ml',
    categoryLabel: 'Data Visualization',
    badgeUrl: 'https://img.shields.io/badge/Plotly-%233F4F75.svg?style=plastic&logo=plotly&logoColor=white',
    badgeMarkdown: '![Plotly](https://img.shields.io/badge/Plotly-%233F4F75.svg?style=plastic&logo=plotly&logoColor=white)',
    bgColor: '#3F4F75',
    description: 'Interactive statistical plots, charts, and dynamic dashboards.',
    relatedRepos: [
      { name: 'Data-Visualization-in-Python', url: 'https://github.com/LPinto98/Data-Visualization-in-Python' }
    ]
  },

  // Frameworks & Web
  {
    name: 'TypeScript',
    category: 'frameworks',
    categoryLabel: 'Typed Web Development',
    badgeUrl: 'https://img.shields.io/badge/typescript-%23007ACC.svg?style=plastic&logo=typescript&logoColor=white',
    badgeMarkdown: '![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=plastic&logo=typescript&logoColor=white)',
    bgColor: '#007ACC',
    description: 'Strict type safety for scalable frontend & backend web applications.',
    highlight: true
  },
  {
    name: 'JavaScript',
    category: 'frameworks',
    categoryLabel: 'Web Scripting',
    badgeUrl: 'https://img.shields.io/badge/javascript-%23323330.svg?style=plastic&logo=javascript&logoColor=%23F7DF1E',
    badgeMarkdown: '![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=plastic&logo=javascript&logoColor=%23F7DF1E)',
    bgColor: '#F7DF1E',
    textColor: '#000',
    description: 'Modern ES6+ web engineering, interactivity, and Node.js environments.'
  },
  {
    name: 'HTML',
    category: 'frameworks',
    categoryLabel: 'Markup & Structure',
    badgeUrl: 'https://img.shields.io/badge/html5-%23E34F26.svg?style=plastic&logo=html5&logoColor=white',
    badgeMarkdown: '![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=plastic&logo=html5&logoColor=white)',
    bgColor: '#E34F26',
    description: 'Semantic document structure, accessibility standards, and web audio/canvas.'
  },
  {
    name: 'CSS',
    category: 'frameworks',
    categoryLabel: 'Styling & Layout',
    badgeUrl: 'https://img.shields.io/badge/css3-%231572B6.svg?style=plastic&logo=css3&logoColor=white',
    badgeMarkdown: '![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=plastic&logo=css3&logoColor=white)',
    bgColor: '#1572B6',
    description: 'Responsive styling, retro layouts, flexbox, grid, and CSS animations.'
  },
  {
    name: 'React',
    category: 'frameworks',
    categoryLabel: 'Frontend Framework',
    badgeUrl: 'https://img.shields.io/badge/react-%2320232a.svg?style=plastic&logo=react&logoColor=%2361DAFB',
    badgeMarkdown: '![React](https://img.shields.io/badge/react-%2320232a.svg?style=plastic&logo=react&logoColor=%2361DAFB)',
    bgColor: '#20232A',
    description: 'Component-driven user interfaces, state hooks, and virtual DOM architecture.',
    highlight: true
  },
  {
    name: 'Django',
    category: 'frameworks',
    categoryLabel: 'Python Web Framework',
    badgeUrl: 'https://img.shields.io/badge/django-%23092E20.svg?style=plastic&logo=django&logoColor=white',
    badgeMarkdown: '![Django](https://img.shields.io/badge/django-%23092E20.svg?style=plastic&logo=django&logoColor=white)',
    bgColor: '#092E20',
    description: 'Battery-included Python web framework, ORM, authentication & admin panel.',
    relatedRepos: [
      { name: 'Django-Projects', url: 'https://github.com/LPinto98/Django-Projects' }
    ],
    highlight: true
  },
  {
    name: 'Django REST',
    category: 'frameworks',
    categoryLabel: 'API Toolkit',
    badgeUrl: 'https://img.shields.io/badge/DJANGO-REST-ff1709?style=plastic&logo=django&logoColor=white&color=ff1709&labelColor=gray',
    badgeMarkdown: '![DjangoREST](https://img.shields.io/badge/DJANGO-REST-ff1709?style=plastic&logo=django&logoColor=white&color=ff1709&labelColor=gray)',
    bgColor: '#A30000',
    description: 'Robust, flexible toolkit for building web APIs with Django and serializers.',
    relatedRepos: [
      { name: 'Django-Projects', url: 'https://github.com/LPinto98/Django-Projects' }
    ]
  },
  {
    name: 'Express.js',
    category: 'frameworks',
    categoryLabel: 'Node Backend',
    badgeUrl: 'https://img.shields.io/badge/express.js-%23404d59.svg?style=plastic&logo=express&logoColor=%2361DAFB',
    badgeMarkdown: '![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=plastic&logo=express&logoColor=%2361DAFB)',
    bgColor: '#404D59',
    description: 'Fast, unopinionated, minimalist web server & routing framework for Node.js.'
  },
  {
    name: 'Spring',
    category: 'frameworks',
    categoryLabel: 'Java Enterprise',
    badgeUrl: 'https://img.shields.io/badge/spring-%236DB33F.svg?style=plastic&logo=spring&logoColor=white',
    badgeMarkdown: '![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=plastic&logo=spring&logoColor=white)',
    bgColor: '#6DB33F',
    description: 'Java enterprise framework, Spring Boot microservices, and inversion of control.'
  },
  {
    name: 'Angular',
    category: 'frameworks',
    categoryLabel: 'Frontend Framework',
    badgeUrl: 'https://img.shields.io/badge/angular-%23DD0031.svg?style=plastic&logo=angular&logoColor=white',
    badgeMarkdown: '![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=plastic&logo=angular&logoColor=white)',
    bgColor: '#DD0031',
    description: 'TypeScript-based client web platform, component architecture, and dependency injection.'
  },
  {
    name: 'Bootstrap',
    category: 'frameworks',
    categoryLabel: 'UI Toolkit',
    badgeUrl: 'https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=plastic&logo=bootstrap&logoColor=white',
    badgeMarkdown: '![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=plastic&logo=bootstrap&logoColor=white)',
    bgColor: '#563D7C',
    description: 'Responsive mobile-first front-end CSS framework with prebuilt components.'
  },
  {
    name: 'jQuery',
    category: 'frameworks',
    categoryLabel: 'DOM Utility',
    badgeUrl: 'https://img.shields.io/badge/jquery-%230769AD.svg?style=plastic&logo=jquery&logoColor=white',
    badgeMarkdown: '![jQuery](https://img.shields.io/badge/jquery-%230769AD.svg?style=plastic&logo=jquery&logoColor=white)',
    bgColor: '#0769AD',
    description: 'Classic DOM manipulation, event handling, animations, and Ajax utilities.'
  },

  // Databases
  {
    name: 'PostgreSQL',
    category: 'databases',
    categoryLabel: 'Relational Database',
    badgeUrl: 'https://img.shields.io/badge/postgres-%23316192.svg?style=plastic&logo=postgresql&logoColor=white',
    badgeMarkdown: '![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=plastic&logo=postgresql&logoColor=white)',
    bgColor: '#316192',
    description: 'Advanced open-source object-relational database system with ACID compliance.',
    highlight: true
  },
  {
    name: 'MySQL',
    category: 'databases',
    categoryLabel: 'Relational SQL',
    badgeUrl: 'https://img.shields.io/badge/mysql-%2300f.svg?style=plastic&logo=mysql&logoColor=white',
    badgeMarkdown: '![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=plastic&logo=mysql&logoColor=white)',
    bgColor: '#00546B',
    description: 'Ubiquitous relational database system for web apps and backend services.'
  },
  {
    name: 'MariaDB',
    category: 'databases',
    categoryLabel: 'Open Source SQL',
    badgeUrl: 'https://img.shields.io/badge/MariaDB-003545?style=plastic&logo=mariadb&logoColor=white',
    badgeMarkdown: '![MariaDB](https://img.shields.io/badge/MariaDB-003545?style=plastic&logo=mariadb&logoColor=white)',
    bgColor: '#003545',
    description: 'Community-developed fork of MySQL with enhanced query storage engines.'
  },
  {
    name: 'SQLite',
    category: 'databases',
    categoryLabel: 'Embedded Database',
    badgeUrl: 'https://img.shields.io/badge/sqlite-%2307405e.svg?style=plastic&logo=sqlite&logoColor=white',
    badgeMarkdown: '![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=plastic&logo=sqlite&logoColor=white)',
    bgColor: '#07405E',
    description: 'Lightweight self-contained, serverless zero-configuration SQL engine.',
    relatedRepos: [
      { name: 'Django-Projects', url: 'https://github.com/LPinto98/Django-Projects' }
    ]
  },

  // DevOps & Cloud
  {
    name: 'AWS',
    category: 'devops-cloud',
    categoryLabel: 'Cloud Infrastructure',
    badgeUrl: 'https://img.shields.io/badge/AWS-%23FF9900.svg?style=plastic&logo=amazon-aws&logoColor=white',
    badgeMarkdown: '![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=plastic&logo=amazon-aws&logoColor=white)',
    bgColor: '#FF9900',
    description: 'Cloud computing platform including EC2, S3, RDS, and serverless hosting.',
    highlight: true
  },
  {
    name: 'Docker',
    category: 'devops-cloud',
    categoryLabel: 'Containerization',
    badgeUrl: 'https://img.shields.io/badge/docker-%230db7ed.svg?style=plastic&logo=docker&logoColor=white',
    badgeMarkdown: '![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=plastic&logo=docker&logoColor=white)',
    bgColor: '#0DB7ED',
    description: 'Containerized environments ensuring reproducible deployment & isolation.',
    highlight: true
  },
  {
    name: 'Kubernetes',
    category: 'devops-cloud',
    categoryLabel: 'Container Orchestration',
    badgeUrl: 'https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=plastic&logo=kubernetes&logoColor=white',
    badgeMarkdown: '![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=plastic&logo=kubernetes&logoColor=white)',
    bgColor: '#326CE5',
    description: 'Automated deployment, scaling, and management of containerized clusters.'
  },
  {
    name: 'Node.js',
    category: 'devops-cloud',
    categoryLabel: 'JavaScript Runtime',
    badgeUrl: 'https://img.shields.io/badge/node.js-6DA55F?style=plastic&logo=node.js&logoColor=white',
    badgeMarkdown: '![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=plastic&logo=node.js&logoColor=white)',
    bgColor: '#6DA55F',
    description: 'Asynchronous event-driven JavaScript runtime outside the web browser.'
  },
  {
    name: 'Apache Maven',
    category: 'devops-cloud',
    categoryLabel: 'Java Build Tool',
    badgeUrl: 'https://img.shields.io/badge/Apache%20Maven-C71A36?style=plastic&logo=Apache%20Maven&logoColor=white',
    badgeMarkdown: '![Apache Maven](https://img.shields.io/badge/Apache%20Maven-C71A36?style=plastic&logo=Apache%20Maven&logoColor=white)',
    bgColor: '#C71A36',
    description: 'Java dependency management and project lifecycle build tool (pom.xml).'
  },
  {
    name: 'NPM',
    category: 'devops-cloud',
    categoryLabel: 'Package Manager',
    badgeUrl: 'https://img.shields.io/badge/NPM-%23000000.svg?style=plastic&logo=npm&logoColor=white',
    badgeMarkdown: '![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=plastic&logo=npm&logoColor=white)',
    bgColor: '#CB3837',
    description: 'Node package registry and command-line package dependency manager.'
  },
  {
    name: 'Yarn',
    category: 'devops-cloud',
    categoryLabel: 'Package Manager',
    badgeUrl: 'https://img.shields.io/badge/yarn-%232C8EBB.svg?style=plastic&logo=yarn&logoColor=white',
    badgeMarkdown: '![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=plastic&logo=yarn&logoColor=white)',
    bgColor: '#2C8EBB',
    description: 'Fast, reliable, and secure dependency management for JavaScript applications.'
  },

  // Tools & Design
  {
    name: 'Figma',
    category: 'tools-design',
    categoryLabel: 'UI/UX Design',
    badgeUrl: 'https://img.shields.io/badge/figma-%23F24E1E.svg?style=plastic&logo=figma&logoColor=white',
    badgeMarkdown: '![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=plastic&logo=figma&logoColor=white)',
    bgColor: '#F24E1E',
    description: 'Collaborative interface design, vector prototyping, and design systems.',
    highlight: true
  },
  {
    name: 'Adobe XD',
    category: 'tools-design',
    categoryLabel: 'Vector Prototyping',
    badgeUrl: 'https://img.shields.io/badge/Adobe%20XD-470137?style=plastic&logo=Adobe%20XD&logoColor=#FF61F6',
    badgeMarkdown: '![Adobe XD](https://img.shields.io/badge/Adobe%20XD-470137?style=plastic&logo=Adobe%20XD&logoColor=#FF61F6)',
    bgColor: '#470137',
    description: 'Wireframing, UI interaction design, and visual asset generation.'
  },
  {
    name: 'Postman',
    category: 'tools-design',
    categoryLabel: 'API Testing',
    badgeUrl: 'https://img.shields.io/badge/Postman-FF6C37?style=plastic&logo=postman&logoColor=white',
    badgeMarkdown: '![Postman](https://img.shields.io/badge/Postman-FF6C37?style=plastic&logo=postman&logoColor=white)',
    bgColor: '#FF6C37',
    description: 'API development, automated testing collections, mocking, and debugging.',
    highlight: true
  },
  {
    name: 'Swagger',
    category: 'tools-design',
    categoryLabel: 'API Documentation',
    badgeUrl: 'https://img.shields.io/badge/-Swagger-%23Clojure?style=plastic&logo=swagger&logoColor=white',
    badgeMarkdown: '![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=plastic&logo=swagger&logoColor=white)',
    bgColor: '#85EA2D',
    textColor: '#000',
    description: 'OpenAPI specification and interactive API contract documentation.'
  }
];

export const TechStackWindow: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<TechCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedBadge, setCopiedBadge] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<TechItem | null>(null);
  const [viewMode, setViewMode] = useState<'stickers' | 'badges' | 'research'>('stickers');

  const categories: { id: TechCategory; label: string; icon: React.ReactNode; count: number }[] = [
    { id: 'all', label: 'ALL SKILLS', icon: <Layers size={14} />, count: TECH_ITEMS.length },
    { id: 'languages', label: 'LANGUAGES', icon: <Code2 size={14} />, count: TECH_ITEMS.filter(t => t.category === 'languages').length },
    { id: 'ai-ml', label: 'AI & DATA SCIENCE', icon: <Cpu size={14} />, count: TECH_ITEMS.filter(t => t.category === 'ai-ml').length },
    { id: 'frameworks', label: 'FRAMEWORKS & WEB', icon: <FolderCode size={14} />, count: TECH_ITEMS.filter(t => t.category === 'frameworks').length },
    { id: 'databases', label: 'DATABASES', icon: <Database size={14} />, count: TECH_ITEMS.filter(t => t.category === 'databases').length },
    { id: 'devops-cloud', label: 'DEVOPS & CLOUD', icon: <Cloud size={14} />, count: TECH_ITEMS.filter(t => t.category === 'devops-cloud').length },
    { id: 'tools-design', label: 'TOOLS & DESIGN', icon: <Wrench size={14} />, count: TECH_ITEMS.filter(t => t.category === 'tools-design').length },
    { id: 'research', label: 'PUBLICATIONS & RESEARCH', icon: <Award size={14} />, count: 2 }
  ];

  const filteredItems = useMemo(() => {
    return TECH_ITEMS.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesQuery = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const handleCopyBadge = (text: string, name: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBadge(name);
    setTimeout(() => setCopiedBadge(null), 2000);
  };

  return (
    <div className="h-full flex flex-col font-sans text-black select-text">
      {/* Top Retro Banner / Breadcrumb */}
      <div className="bg-pastel-cream border-2 border-black p-3 mb-3 shadow-[2px_2px_0px_black] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-pastel-yellow border-2 border-black flex items-center justify-center font-pixel text-xs">
            <FolderCode size={14} />
          </div>
          <span className="font-pixel text-sm tracking-wide">
            C:\SCRAPBOOK\LPINTO98\TECH_STACK\ <span className="text-gray-500 text-xs hidden sm:inline">(SOURCE: LPinto98/LPinto98)</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/LPinto98/LPinto98"
            target="_blank"
            rel="noreferrer"
            className="font-pixel text-xs bg-black text-white px-2 py-1 flex items-center gap-1 hover:bg-gray-800 transition-colors shadow-[1px_1px_0px_black]"
          >
            <Github size={12} /> REPO: LPinto98/LPinto98
          </a>
          <span className="font-pixel text-xs bg-pastel-green px-2 py-1 border border-black hidden md:inline-block">
            {TECH_ITEMS.length} SKILLS VERIFIED
          </span>
        </div>
      </div>

      {/* Control Bar: View Switcher & Search */}
      <div className="flex flex-col sm:flex-row gap-2 mb-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills, tools, frameworks, databases..."
            className="w-full pl-9 pr-3 py-1.5 border-2 border-black font-pixel text-sm bg-white focus:outline-none focus:bg-yellow-50/50 shadow-[2px_2px_0px_black]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 hover:text-black font-pixel"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* View Switcher Tabs */}
        <div className="flex gap-1 shrink-0">
          <button
            onClick={() => { setViewMode('stickers'); if (selectedCategory === 'research') setSelectedCategory('all'); }}
            className={`px-3 py-1 border-2 border-black font-pixel text-xs flex items-center gap-1 transition-all ${
              viewMode === 'stickers' ? 'bg-pastel-yellow shadow-[2px_2px_0px_black] font-bold' : 'bg-white hover:bg-gray-100'
            }`}
          >
            <Palette size={12} /> SCRAPBOOK
          </button>
          <button
            onClick={() => { setViewMode('badges'); if (selectedCategory === 'research') setSelectedCategory('all'); }}
            className={`px-3 py-1 border-2 border-black font-pixel text-xs flex items-center gap-1 transition-all ${
              viewMode === 'badges' ? 'bg-pastel-blue shadow-[2px_2px_0px_black] font-bold' : 'bg-white hover:bg-gray-100'
            }`}
          >
            <Tag size={12} /> BADGES
          </button>
          <button
            onClick={() => { setViewMode('research'); setSelectedCategory('research'); }}
            className={`px-3 py-1 border-2 border-black font-pixel text-xs flex items-center gap-1 transition-all ${
              viewMode === 'research' ? 'bg-pastel-pink shadow-[2px_2px_0px_black] font-bold' : 'bg-white hover:bg-gray-100'
            }`}
          >
            <Award size={12} /> RESEARCH & PUBLICATIONS
          </button>
        </div>
      </div>

      {/* Category Pills (Visible when not in pure Research mode) */}
      {viewMode !== 'research' && (
        <div className="flex gap-1.5 overflow-x-auto pb-2 mb-3 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                if (cat.id === 'research') {
                  setViewMode('research');
                  setSelectedCategory('research');
                } else {
                  setSelectedCategory(cat.id);
                }
              }}
              className={`shrink-0 px-2.5 py-1 text-xs font-pixel border-2 border-black flex items-center gap-1.5 transition-all ${
                selectedCategory === cat.id
                  ? 'bg-black text-white shadow-[2px_2px_0px_black]'
                  : 'bg-white text-black hover:bg-yellow-100'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1 py-0.2 border border-current rounded-sm ${
                selectedCategory === cat.id ? 'bg-white text-black' : 'bg-gray-100 text-gray-700'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto pr-1">
        {viewMode === 'research' ? (
          /* Research & Publications View */
          <div className="space-y-4">
            {/* Scrapbook Note Ribbon */}
            <div className="relative bg-pastel-yellow/40 border-4 border-black p-4 shadow-[4px_4px_0px_black]">
              <div className="absolute -top-3 left-6 bg-pastel-pink border-2 border-black px-3 py-0.5 font-pixel text-xs shadow-[2px_2px_0px_black]">
                ★ PEER-REVIEWED PUBLICATION
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 items-start pt-2">
                <div className="w-16 h-16 bg-white border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_black]">
                  <Award size={36} className="text-amber-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-gamers text-lg text-black mb-1">
                    IEEE Research Article: Named Entity Recognition in Kannada Language using Conditional Random Fields
                  </h3>
                  <p className="font-pixel text-xs text-gray-700 leading-relaxed mb-3">
                    Co-authored with fellow researchers and published in IEEE Xplore. Features advanced Natural Language Processing (NLP) pipeline, Kannada script POS tagging, feature extraction, and CRF sequential prediction for historical & contemporary texts.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href="https://ieeexplore.ieee.org/document/9137818"
                      target="_blank"
                      rel="noreferrer"
                      className="font-pixel text-xs bg-black text-white px-3 py-1.5 border-2 border-black flex items-center gap-1.5 hover:bg-gray-800 shadow-[2px_2px_0px_black]"
                    >
                      <ExternalLink size={12} /> OPEN IN IEEE XPLORE
                    </a>
                    <a
                      href="https://github.com/LPinto98/NER-in-Kannada-using-CRF-for-Historical-Text"
                      target="_blank"
                      rel="noreferrer"
                      className="font-pixel text-xs bg-white text-black px-3 py-1.5 border-2 border-black flex items-center gap-1.5 hover:bg-yellow-50 shadow-[2px_2px_0px_black]"
                    >
                      <Github size={12} /> VIEW NER GITHUB REPO
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Research Focus Note */}
            <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_black] relative">
              <div className="flex items-center gap-2 mb-2">
                <Cpu size={18} className="text-pastel-purple" />
                <h4 className="font-gamers text-sm">CURRENT RESEARCH & MACHINE LEARNING FOCUS</h4>
              </div>
              <p className="font-pixel text-xs text-gray-700 leading-relaxed">
                From Larissa&apos;s GitHub Profile bio:
                <br />
                <span className="italic block mt-1 p-2 bg-pastel-cream border-2 border-black border-dashed">
                  &ldquo;Passionate about Data Science and ML collaboration | Currently diving into CNN models for my project 📚 | Co-authored an IEEE article with my awesome buddies! 🤩 Check it out here 👉 https://ieeexplore.ieee.org/document/9137818 📝 | Let&apos;s code together and conquer the data universe! 🌌🤝&rdquo;
                </span>
              </p>
            </div>
          </div>
        ) : viewMode === 'badges' ? (
          /* Shield Badges Grid (Exact Badges from GitHub Profile) */
          <div className="space-y-4">
            <div className="bg-pastel-yellow/30 border-2 border-black p-2.5 font-pixel text-xs flex items-center justify-between">
              <span>Authentic shields.io plastic-style badges straight from Larissa&apos;s GitHub Profile repository. Click any badge to copy markdown!</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {filteredItems.map((item) => (
                <div 
                  key={item.name}
                  onClick={() => handleCopyBadge(item.badgeMarkdown, item.name)}
                  className="bg-white border-2 border-black p-2.5 flex flex-col items-center justify-between gap-2 hover:bg-yellow-50 transition-all cursor-pointer shadow-[2px_2px_0px_black] group relative"
                >
                  <img 
                    src={item.badgeUrl} 
                    alt={item.name} 
                    className="h-6 max-w-full object-contain pointer-events-none" 
                    referrerPolicy="no-referrer"
                  />
                  <span className="font-pixel text-xs text-gray-700 font-bold">{item.name}</span>
                  <div className="w-full flex items-center justify-between pt-1 border-t border-black/10 text-[10px] font-pixel text-gray-500">
                    <span>{item.categoryLabel}</span>
                    <span className="flex items-center gap-0.5 text-blue-600 group-hover:underline">
                      {copiedBadge === item.name ? (
                        <>
                          <Check size={10} className="text-green-600" /> COPIED!
                        </>
                      ) : (
                        <>
                          <Copy size={10} /> COPY
                        </>
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Scrapbook Stickers Grid View */
          <div>
            {filteredItems.length === 0 ? (
              <div className="bg-white border-4 border-black p-8 text-center shadow-[4px_4px_0px_black]">
                <p className="font-pixel text-lg text-gray-600">NO TECHNOLOGIES MATCH &ldquo;{searchQuery}&rdquo;</p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                  className="mt-3 px-3 py-1 bg-pastel-yellow border-2 border-black font-pixel text-xs shadow-[2px_2px_0px_black]"
                >
                  RESET SEARCH
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.name}
                    layout
                    whileHover={{ y: -2 }}
                    className={`bg-white border-3 border-black p-3 flex flex-col justify-between shadow-[3px_3px_0px_black] relative transition-colors ${
                      item.highlight ? 'ring-2 ring-pastel-pink ring-offset-1' : ''
                    }`}
                  >
                    {/* Retro Washi Tape Graphic */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-3.5 bg-pastel-pink/70 border border-black/30 transform -rotate-1 pointer-events-none" />

                    <div>
                      {/* Header with Title and Category Tag */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span 
                              className="w-2.5 h-2.5 rounded-full border border-black shrink-0" 
                              style={{ backgroundColor: item.bgColor }} 
                            />
                            <h3 className="font-gamers text-sm font-bold tracking-wide">{item.name}</h3>
                          </div>
                          <span className="font-pixel text-[11px] text-gray-600 uppercase">
                            {item.categoryLabel}
                          </span>
                        </div>
                        {item.highlight && (
                          <span className="font-pixel text-[9px] bg-pastel-yellow border border-black px-1.5 py-0.5 flex items-center gap-0.5">
                            <Sparkles size={8} /> CORE
                          </span>
                        )}
                      </div>

                      {/* Official Shield Badge Preview */}
                      <div className="my-2 py-1 px-2 bg-gray-50 border border-black/20 flex items-center justify-center">
                        <img 
                          src={item.badgeUrl} 
                          alt={item.name} 
                          className="h-5 max-w-full object-contain pointer-events-none" 
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Description */}
                      <p className="font-pixel text-xs text-gray-700 leading-relaxed mb-2">
                        {item.description}
                      </p>

                      {/* Related Repos if applicable */}
                      {item.relatedRepos && item.relatedRepos.length > 0 && (
                        <div className="mb-2 pt-1 border-t border-black/10">
                          <span className="font-pixel text-[10px] text-gray-500 block mb-1">
                            USED IN LPinto98 REPOS:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedRepos.map((repo) => (
                              <a
                                key={repo.name}
                                href={repo.url}
                                target="_blank"
                                rel="noreferrer"
                                className="font-pixel text-[10px] bg-pastel-cream hover:bg-pastel-yellow border border-black px-1.5 py-0.5 flex items-center gap-1 text-black truncate max-w-full"
                              >
                                <Github size={9} /> <span className="truncate">{repo.name}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-2 border-t border-black/10 flex items-center justify-between text-[11px] font-pixel">
                      <button
                        onClick={() => handleCopyBadge(item.badgeMarkdown, item.name)}
                        className="text-gray-600 hover:text-black flex items-center gap-1"
                        title="Copy badge markdown code"
                      >
                        {copiedBadge === item.name ? (
                          <>
                            <Check size={11} className="text-green-600" /> <span className="text-green-600 font-bold">COPIED</span>
                          </>
                        ) : (
                          <>
                            <Copy size={11} /> <span>COPY BADGE</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => setActiveItem(item)}
                        className="bg-black text-white px-2 py-0.5 hover:bg-gray-800 transition-colors flex items-center gap-1 shadow-[1px_1px_0px_black]"
                      >
                        <Info size={10} /> INSPECT
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Item Detail Inspector Modal */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white border-4 border-black w-full max-w-md shadow-[10px_10px_0px_rgba(0,0,0,0.5)] relative overflow-hidden"
            >
              {/* Modal Header */}
              <div className="bg-pastel-purple p-3 border-b-4 border-black flex items-center justify-between">
                <div className="flex items-center gap-2 font-pixel text-lg">
                  <Binary size={18} /> TECH_INSPECTOR.EXE
                </div>
                <button
                  onClick={() => setActiveItem(null)}
                  className="w-6 h-6 bg-white border-2 border-black flex items-center justify-center font-bold hover:bg-red-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 border-3 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_black]"
                    style={{ backgroundColor: activeItem.bgColor }}
                  >
                    <Code2 size={24} className={activeItem.textColor ? 'text-black' : 'text-white'} />
                  </div>
                  <div>
                    <h3 className="font-gamers text-xl">{activeItem.name}</h3>
                    <p className="font-pixel text-xs text-gray-500">{activeItem.categoryLabel}</p>
                  </div>
                </div>

                <div className="bg-pastel-cream border-2 border-black p-3 space-y-2">
                  <span className="font-pixel text-xs text-gray-500 block">DESCRIPTION:</span>
                  <p className="font-pixel text-sm text-gray-800 leading-relaxed">
                    {activeItem.description}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="font-pixel text-xs text-gray-500 block">SHIELDS.IO BADGE:</span>
                  <div className="bg-gray-100 border-2 border-black p-2 flex items-center justify-center">
                    <img 
                      src={activeItem.badgeUrl} 
                      alt={activeItem.name} 
                      className="h-7 max-w-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="font-pixel text-xs text-gray-500 block">MARKDOWN EMBED CODE:</span>
                  <div className="bg-black text-green-400 font-mono text-[11px] p-2 border-2 border-black break-all flex items-center justify-between gap-2">
                    <span className="truncate">{activeItem.badgeMarkdown}</span>
                    <button
                      onClick={() => handleCopyBadge(activeItem.badgeMarkdown, activeItem.name)}
                      className="shrink-0 text-white hover:text-yellow-300 font-pixel text-xs flex items-center gap-1"
                    >
                      {copiedBadge === activeItem.name ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                    </button>
                  </div>
                </div>

                {activeItem.relatedRepos && activeItem.relatedRepos.length > 0 && (
                  <div className="space-y-1">
                    <span className="font-pixel text-xs text-gray-500 block">ASSOCIATED REPOSITORIES:</span>
                    <div className="space-y-1">
                      {activeItem.relatedRepos.map((repo) => (
                        <a
                          key={repo.name}
                          href={repo.url}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full text-left p-1.5 bg-white hover:bg-pastel-yellow border border-black font-pixel text-xs flex items-center justify-between shadow-[1px_1px_0px_black]"
                        >
                          <span className="flex items-center gap-1 truncate">
                            <Github size={12} /> {repo.name}
                          </span>
                          <ArrowUpRight size={12} />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-3 bg-gray-100 border-t-2 border-black flex justify-end">
                <button
                  onClick={() => setActiveItem(null)}
                  className="px-4 py-1 bg-black text-white font-pixel text-xs hover:bg-gray-800 shadow-[2px_2px_0px_black]"
                >
                  CLOSE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
