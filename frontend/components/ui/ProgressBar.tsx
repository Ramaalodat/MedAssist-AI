import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: 'primary' | 'success' | 'warning' | 'error';
  showValue?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  value, 
  max = 100, 
  variant = 'primary', 
  showValue = false,
  className = '' 
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const variants = {
    primary: 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]',
    success: 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]',
    warning: 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]',
    error: 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]',
  };

  return (
    <div className={`w-full ${className}`}>
      {showValue && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[10px] font-medium text-gray-400">التقدم</span>
          <span className="text-[10px] font-bold text-white">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-500 ease-out rounded-full ${variants[variant]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
