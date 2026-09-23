import React from 'react';

interface SortifyRobotProps {
  size?: number;
  className?: string;
  glow?: boolean;
}

export const SortifyRobot: React.FC<SortifyRobotProps> = ({
  size = 32,
  className = '',
  glow = false,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {glow && (
        <div
          className="absolute inset-0 bg-[#8B5CF6]/25 blur-md rounded-xl pointer-events-none"
          aria-hidden="true"
        />
      )}
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative"
      >
        {/* Antenna */}
        <circle cx="24" cy="5" r="2.5" fill="#8B5CF6" />
        <rect x="23" y="7" width="2" height="4" fill="#7C3AED" rx="1" />

        {/* Small ears */}
        <rect x="5" y="18" width="3" height="7" rx="1.5" fill="#7C3AED" />
        <rect x="40" y="18" width="3" height="7" rx="1.5" fill="#7C3AED" />

        {/* Main Head / Screen */}
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

        {/* Inner Screen Screen Glass */}
        <rect
          x="11"
          y="14"
          width="26"
          height="16"
          rx="4"
          fill="#080B16"
        />

        {/* Eyes */}
        <circle cx="18" cy="21" r="2.8" fill="#22D3EE" />
        <circle cx="18.8" cy="20.2" r="1" fill="#FFFFFF" />
        <circle cx="30" cy="21" r="2.8" fill="#22D3EE" />
        <circle cx="30.8" cy="20.2" r="1" fill="#FFFFFF" />

        {/* Friendly smile */}
        <path
          d="M21 25.5C22 26.8 26 26.8 27 25.5"
          stroke="#22D3EE"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        {/* Sorting bars base / equalizer */}
        <rect x="11" y="37" width="4.5" height="5" rx="1" fill="#8B5CF6" />
        <rect x="18" y="35" width="4.5" height="7" rx="1" fill="#22D3EE" />
        <rect x="25" y="38" width="4.5" height="4" rx="1" fill="#8B5CF6" />
        <rect x="32" y="34" width="4.5" height="8" rx="1" fill="#22D3EE" />
      </svg>
    </div>
  );
};
