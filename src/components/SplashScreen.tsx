import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Start progress bar animation shortly after mount
    const progressTimer = setTimeout(() => {
      setProgress(100);
    }, 50);

    // Start smooth fade out at 2.3 seconds
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 2300);

    // Automatically complete and open existing page at 2.6 seconds (between 2 and 3 sec)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2600);

    return () => {
      clearTimeout(progressTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#080B16] flex flex-col items-center justify-center select-none transition-opacity duration-300 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Main Center Content: Robot + Sortify Word */}
      <div className="relative flex flex-col items-center gap-6">
        {/* Animated Robot Container */}
        <div className="relative animate-robot-float">
          {/* Robot SVG */}
          <svg
            width="104"
            height="104"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative"
          >
            {/* Antenna */}
            <circle cx="24" cy="5" r="2.8" fill="#8B5CF6" />
            <rect x="23" y="7" width="2" height="4" fill="#7C3AED" rx="1" />

            {/* Small ears */}
            <rect x="5" y="18" width="3" height="7" rx="1.5" fill="#7C3AED" />
            <rect x="40" y="18" width="3" height="7" rx="1.5" fill="#7C3AED" />

            {/* Main Head / Screen Frame */}
            <rect
              x="8"
              y="11"
              width="32"
              height="22"
              rx="6"
              fill="#101426"
              stroke="#8B5CF6"
              strokeWidth="2.5"
            />

            {/* Inner Screen Glass */}
            <rect
              x="11"
              y="14"
              width="26"
              height="16"
              rx="4"
              fill="#080B16"
            />

            {/* Eye glow reflections */}
            <circle cx="18" cy="21" r="3.2" fill="#22D3EE" />
            <circle cx="19" cy="20" r="1.1" fill="#FFFFFF" />

            <circle cx="30" cy="21" r="3.2" fill="#22D3EE" />
            <circle cx="31" cy="20" r="1.1" fill="#FFFFFF" />

            {/* Friendly smile */}
            <path
              d="M21 25.5C22 26.8 26 26.8 27 25.5"
              stroke="#22D3EE"
              strokeWidth="1.6"
              strokeLinecap="round"
            />

            {/* Sorting Bars at Base - Animated Equalizer */}
            <g transform="translate(0, 32)">
              <rect x="11" y="5" width="4.5" height="5" rx="1" fill="#8B5CF6" />
              <rect x="18" y="3" width="4.5" height="7" rx="1" fill="#22D3EE" />
              <rect x="25" y="6" width="4.5" height="4" rx="1" fill="#8B5CF6" />
              <rect x="32" y="2" width="4.5" height="8" rx="1" fill="#22D3EE" />
            </g>
          </svg>
        </div>

        {/* Brand Word: Sortify */}
        <div className="flex flex-col items-center">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#F8FAFC]">
            Sorti<span className="text-[#8B5CF6]">fy</span>
          </h1>

          {/* Minimal Elegant Loading Line */}
          <div className="w-24 h-1 bg-[#1E2640] rounded-full overflow-hidden mt-5">
            <div
              className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] rounded-full transition-all duration-[2200ms] ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
