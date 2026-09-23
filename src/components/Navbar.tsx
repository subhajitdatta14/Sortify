import React, { useRef } from 'react';
import { PageId } from '../types';
import { SortifyRobot } from './SortifyRobot';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenTerminal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenTerminal,
}) => {
  const navItems: { id: PageId; label: string }[] = [
    { id: 'visualizer', label: 'Visualizer' },
    { id: 'practice', label: 'Practice' },
    { id: 'learn', label: 'Learn' },
  ];

  const pressTimer = useRef<NodeJS.Timeout | null>(null);
  const didTriggerHold = useRef(false);

  const startHold = () => {
    didTriggerHold.current = false;
    pressTimer.current = setTimeout(() => {
      didTriggerHold.current = true;
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(60);
      }
      onOpenTerminal?.();
    }, 3000);
  };

  const endHold = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  };

  const handleClick = () => {
    if (didTriggerHold.current) {
      didTriggerHold.current = false;
      return;
    }
    onNavigate('visualizer');
  };

  return (
    <header className="w-full border-b border-[#1E2640] bg-[#080B16]/95 backdrop-blur-md sticky top-0 z-50 shrink-0">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={handleClick}
          onTouchStart={startHold}
          onTouchEnd={endHold}
          onTouchCancel={endHold}
          onMouseDown={startHold}
          onMouseUp={endHold}
          onMouseLeave={endHold}
          className="flex items-center gap-3 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] rounded-lg p-1 select-none active:opacity-90 transition-opacity"
          aria-label="Sortify Home"
        >
          <SortifyRobot size={34} />
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#F8FAFC] transition-colors">
            Sorti<span className="text-[#8B5CF6]">fy</span>
          </span>
        </button>

        {/* Navigation links */}
        <nav className="flex items-center gap-1 sm:gap-2 shrink-0">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-2.5 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all relative ${
                  isActive
                    ? 'text-[#F8FAFC] font-semibold border-b-2 border-[#8B5CF6] bg-[#8B5CF6]/10'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#101426]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

