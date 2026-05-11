import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.6)]',
    secondary: 'bg-gray-800 text-white hover:bg-gray-700',
    outline: 'border border-white/10 text-white hover:bg-white/5',
    ghost: 'text-gray-400 hover:text-white hover:bg-white/5',
    danger: 'bg-red-600/20 text-red-500 border border-red-500/50 hover:bg-red-600 hover:text-white',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      ) : null}
      {children}
    </button>
  );
};
