import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, error, icon, className = '', ...props }) => {
  return (
    <div className="w-full space-y-1.5">
      {label && <label className="text-xs font-medium text-gray-400 mr-1">{label}</label>}
      <div className="relative group">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors">
            {icon}
          </div>
        )}
        <input
          className={`
            w-full bg-gray-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white 
            placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 
            transition-all duration-200
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/5' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="text-[10px] text-red-500 mr-1">{error}</p>}
    </div>
  );
};
