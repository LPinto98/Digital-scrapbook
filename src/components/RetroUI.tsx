import React, { useState } from 'react';
import { motion, useDragControls } from 'motion/react';
import { X, Minus, Square, Copy } from 'lucide-react';

interface WindowProps {
  title: string;
  headerColor?: string;
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
  onMinimize?: () => void;
  isMaximized?: boolean;
  onToggleMaximize?: () => void;
}

export const Window: React.FC<WindowProps & { onMouseDown?: () => void }> = ({ 
  title, 
  headerColor = "bg-pastel-pink", 
  children, 
  className = "",
  onClose,
  onMinimize,
  isMaximized: controlledMaximized,
  onToggleMaximize,
  onMouseDown
}) => {
  const [internalMaximized, setInternalMaximized] = useState(false);
  const isMaximized = controlledMaximized !== undefined ? controlledMaximized : internalMaximized;
  const dragControls = useDragControls();

  const handleToggleMaximize = () => {
    if (onToggleMaximize) {
      onToggleMaximize();
    } else {
      setInternalMaximized(prev => !prev);
    }
  };

  return (
    <motion.div
      drag={!isMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      onMouseDown={onMouseDown}
      className={`retro-window pointer-events-auto ${
        isMaximized 
          ? 'fixed top-2 left-2 right-2 bottom-14 md:top-3 md:left-3 md:right-3 md:bottom-14 !w-auto !h-auto !transform-none z-50 shadow-[14px_14px_0px_rgba(0,0,0,0.4)]' 
          : className
      }`}
    >
      <div 
        className={`retro-window-header ${headerColor} ${isMaximized ? 'cursor-default' : 'cursor-move'} select-none`}
        onPointerDown={(e) => {
          if (!isMaximized) {
            dragControls.start(e);
          }
        }}
        onDoubleClick={handleToggleMaximize}
      >
        <span className="font-pixel text-xl flex items-center gap-2 select-none truncate">
          <Square size={16} fill="black" /> {title}
        </span>
        <div className="flex gap-1 shrink-0" onPointerDown={(e) => e.stopPropagation()}>
          <button
            type="button"
            title="Minimize"
            onClick={(e) => {
              e.stopPropagation();
              if (onMinimize) onMinimize();
              else if (onClose) onClose();
            }}
            className="retro-close-btn cursor-pointer hover:bg-pastel-blue"
          >
            <Minus size={14} />
          </button>
          <button
            type="button"
            title={isMaximized ? "Restore Window" : "Maximize Window"}
            onClick={(e) => {
              e.stopPropagation();
              handleToggleMaximize();
            }}
            className="retro-close-btn cursor-pointer hover:bg-pastel-yellow"
          >
            {isMaximized ? (
              <Copy size={12} className="rotate-180" />
            ) : (
              <Square size={12} />
            )}
          </button>
          <button
            type="button"
            title="Close"
            onClick={(e) => {
              e.stopPropagation();
              if (onClose) onClose();
            }}
            className="retro-close-btn cursor-pointer hover:bg-red-400 hover:text-white"
          >
            <X size={14} />
          </button>
        </div>
      </div>
      <div className="p-4 flex-1 overflow-auto bg-white/90">
        {children}
      </div>
    </motion.div>
  );
};

export const DesktopIcon: React.FC<{ icon: React.ReactNode, label: string, onClick: (e: React.MouseEvent) => void }> = ({ icon, label, onClick }) => (
  <motion.div
    drag
    dragMomentum={false}
    whileHover={{ scale: 1.1, y: -5 }}
    whileTap={{ scale: 0.95 }}
    className="flex flex-col items-center gap-1 group w-24 cursor-pointer relative z-10"
  >
    <div className="relative" onClick={(e) => onClick(e)}>
        <div className="w-16 h-12 bg-pastel-yellow border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.2)] flex items-center justify-center group-hover:bg-white transition-colors">
            {icon}
        </div>
        <div className="absolute -top-2 left-0 w-8 h-2 bg-pastel-yellow border-x-4 border-t-4 border-black" />
    </div>
    <span className="font-pixel text-lg bg-black text-white px-2 mt-1 shadow-[2px_2px_0px_rgba(0,0,0,0.2)] select-none" onClick={(e) => onClick(e)}>{label}</span>
  </motion.div>
);
