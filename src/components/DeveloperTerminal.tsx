import React, { useEffect, useState } from 'react';

interface DeveloperTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TARGET_TEXT = 'DEVELOPED BY SUBHAJIT DATTA 24TH SEPTEMBER 2026';

export const DeveloperTerminal: React.FC<DeveloperTerminalProps> = ({ isOpen, onClose }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    // Also allow closing with Escape if needed
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Typing animation triggered whenever the terminal opens
  useEffect(() => {
    if (!isOpen) {
      setDisplayedText('');
      return;
    }

    setDisplayedText('');
    let currentIndex = 0;
    let typingInterval: NodeJS.Timeout | null = null;

    // Small delay of 150ms before typing begins for natural terminal feel
    const startTimeout = setTimeout(() => {
      typingInterval = setInterval(() => {
        currentIndex++;
        setDisplayedText(TARGET_TEXT.slice(0, currentIndex));

        if (currentIndex >= TARGET_TEXT.length && typingInterval) {
          clearInterval(typingInterval);
        }
      }, 35);
    }, 150);

    return () => {
      clearTimeout(startTimeout);
      if (typingInterval) {
        clearInterval(typingInterval);
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      {/* Small Terminal Window */}
      <div
        className="w-full max-w-lg bg-[#080B16] border border-[#8B5CF6] rounded-xl shadow-2xl shadow-[#8B5CF6]/20 overflow-hidden font-mono"
        role="dialog"
        aria-modal="true"
      >
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#0D1224] border-b border-[#1E2640] select-none">
          {/* Mac-style window controls */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
            <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
            <span className="w-3 h-3 rounded-full bg-[#22C55E]" />
            <span className="text-[11px] text-[#94A3B8] ml-2 font-mono hidden sm:inline">
              terminal ~ sortify
            </span>
          </div>

          <div className="text-[11px] text-[#64748B] font-mono sm:hidden">
            terminal
          </div>

          {/* Exit button - VISIBLE ONLY ON MOBILE (sm:hidden). No exit button on desktop */}
          <button
            onClick={onClose}
            className="sm:hidden flex items-center justify-center w-6 h-6 rounded bg-[#181F38] border border-[#2B355A] text-[#94A3B8] hover:text-[#F8FAFC] text-xs font-bold transition-colors"
            aria-label="Exit Terminal"
          >
            ✕
          </button>
        </div>

        {/* Terminal Content */}
        <div className="p-4 sm:p-6 space-y-3 bg-[#050711]">
          <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
            <span className="text-[#22C55E]">root@sortify</span>
            <span className="text-[#8B5CF6]">:</span>
            <span className="text-[#22D3EE]">~</span>
            <span>$</span>
            <span className="text-[#F8FAFC]">cat credits.txt</span>
          </div>

          <div className="pt-1 pb-2">
            <p className="text-xs sm:text-sm md:text-base font-bold text-[#F8FAFC] tracking-wider leading-relaxed break-words selection:bg-[#8B5CF6]/50">
              {displayedText}
              <span className="inline-block w-2 sm:w-2.5 h-4 sm:h-4.5 bg-[#22D3EE] ml-1.5 animate-pulse align-middle" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
