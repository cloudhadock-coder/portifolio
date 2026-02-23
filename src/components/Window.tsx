import React from 'react';
import { motion } from 'motion/react';
import { X, Minus, Square } from 'lucide-react';

interface WindowProps {
  id: string;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  isActive: boolean;
  onFocus: (id: string) => void;
  initialX?: number;
  initialY?: number;
}

export const Window: React.FC<WindowProps> = ({
  id,
  title,
  icon,
  children,
  onClose,
  onMinimize,
  isActive,
  onFocus,
  initialX = 50,
  initialY = 50,
}) => {
  return (
    <motion.div
      drag
      dragMomentum={false}
      onMouseDown={() => onFocus(id)}
      initial={{ x: initialX, y: initialY, scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`absolute min-w-[300px] min-h-[200px] bg-[#ece9d8] flex flex-col rounded-t-lg overflow-hidden xp-window-shadow border-2 border-[#0058e6] ${
        isActive ? 'z-50' : 'z-10'
      }`}
      style={{ boxShadow: '3px 3px 10px rgba(0,0,0,0.3)' }}
    >
      {/* Title Bar */}
      <div className={`h-8 flex items-center justify-between px-2 xp-gradient-title select-none cursor-default`}>
        <div className="flex items-center gap-2">
          {icon && <div className="text-white scale-75">{icon}</div>}
          <span className="text-white font-bold text-sm drop-shadow-md">{title}</span>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => onMinimize(id)}
            className="w-5 h-5 bg-[#3a91f4] border border-white/50 rounded flex items-center justify-center hover:bg-[#1e73d6] transition-colors"
          >
            <Minus size={12} className="text-white" />
          </button>
          <button className="w-5 h-5 bg-[#3a91f4] border border-white/50 rounded flex items-center justify-center hover:bg-[#1e73d6] transition-colors">
            <Square size={10} className="text-white" />
          </button>
          <button
            onClick={() => onClose(id)}
            className="w-5 h-5 bg-[#e81123] border border-white/50 rounded flex items-center justify-center hover:bg-[#f1707a] transition-colors"
          >
            <X size={12} className="text-white" />
          </button>
        </div>
      </div>

      {/* Menu Bar (Classic look) */}
      <div className="h-6 bg-[#ece9d8] border-b border-white/50 flex items-center px-2 gap-4 text-xs text-black/80">
        <span className="hover:bg-[#316ac5] hover:text-white px-1 cursor-default">File</span>
        <span className="hover:bg-[#316ac5] hover:text-white px-1 cursor-default">Edit</span>
        <span className="hover:bg-[#316ac5] hover:text-white px-1 cursor-default">View</span>
        <span className="hover:bg-[#316ac5] hover:text-white px-1 cursor-default">Help</span>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto bg-white m-1 border border-[#919b9c] p-4 text-sm text-black">
        {children}
      </div>
    </motion.div>
  );
};
