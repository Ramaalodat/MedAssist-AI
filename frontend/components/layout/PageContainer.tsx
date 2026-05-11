import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({ 
  children, 
  title, 
  description,
  actions 
}) => {
  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {(title || description || actions) && (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            {title && <h1 className="text-3xl font-bold tracking-tight text-white">{title}</h1>}
            {description && <p className="text-gray-400 text-sm max-w-2xl">{description}</p>}
          </div>
          {actions && <div className="flex items-center gap-3">{actions}</div>}
        </div>
      )}
      <div className="flex flex-col gap-8 w-full">
        {children}
      </div>
    </div>
  );
};
