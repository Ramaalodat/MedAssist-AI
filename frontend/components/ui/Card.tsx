import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  neon?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hover = true, neon = false }) => {
  return (
    <div 
      className={`
        glass-card p-6 
        ${hover ? 'hover:-translate-y-1 hover:border-white/20' : ''} 
        ${neon ? 'neon-border' : ''} 
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`mb-4 flex items-center justify-between ${className}`}>{children}</div>
);

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold text-white ${className}`}>{children}</h3>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
);
