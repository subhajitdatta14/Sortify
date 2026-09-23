import React from 'react';
import { GitCompare, ArrowUpDown, Target, BarChart2 } from 'lucide-react';

interface StatCardsProps {
  comparisons: number;
  writes: number;
  writesLabel?: string;
  currentStep: number;
  totalSteps: number;
  arraySize: number;
}

export const StatCards: React.FC<StatCardsProps> = ({
  comparisons,
  writes,
  writesLabel = 'SWAPS / WRITES',
  currentStep,
  totalSteps,
  arraySize,
}) => {
  const stats = [
    {
      label: 'COMPARISONS',
      value: comparisons,
      icon: <GitCompare className="w-4 h-4 text-[#8B5CF6]" />,
      iconBg: 'bg-[#8B5CF6]/15',
    },
    {
      label: writesLabel,
      value: writes,
      icon: <ArrowUpDown className="w-4 h-4 text-[#F59E0B]" />,
      iconBg: 'bg-[#F59E0B]/15',
    },
    {
      label: 'STEP',
      value: `${currentStep} / ${totalSteps}`,
      icon: <Target className="w-4 h-4 text-[#22D3EE]" />,
      iconBg: 'bg-[#22D3EE]/15',
    },
    {
      label: 'ARRAY SIZE',
      value: arraySize,
      icon: <BarChart2 className="w-4 h-4 text-[#8B5CF6]" />,
      iconBg: 'bg-[#8B5CF6]/15',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 my-6">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-[#101426] border border-[#8B5CF6] rounded-xl p-3.5 sm:p-4 flex items-center gap-3.5 shadow-md"
        >
          <div className={`p-2.5 rounded-lg ${stat.iconBg} shrink-0`}>
            {stat.icon}
          </div>
          <div className="min-w-0">
            <div className="text-[11px] sm:text-xs font-sans font-bold tracking-wider text-[#94A3B8] uppercase truncate">
              {stat.label}
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-[#F8FAFC] mt-0.5 tabular-nums">
              {stat.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
