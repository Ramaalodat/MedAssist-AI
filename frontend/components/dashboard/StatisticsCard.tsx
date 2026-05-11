import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card } from '../ui/Card';

interface StatisticsCardProps {
  title: string;
  value: string | number;
  change?: string | number;
  isPositive?: boolean;
  icon: LucideIcon;
  color?: 'blue' | 'emerald' | 'amber' | 'red' | 'purple';
}

export const StatisticsCard: React.FC<StatisticsCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  color = 'blue'
}) => {
  const colors = {
    blue: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    red: 'bg-red-500/10 text-red-500 border-red-500/20',
    purple: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  };

  return (
    <Card className="relative overflow-hidden group">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl border ${colors[color]} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6" />
        </div>
        {change !== undefined && (
          <div className={`text-xs font-bold px-2 py-1 rounded-lg ${isPositive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
            {isPositive ? '+' : ''}{change}%
          </div>
        )}
      </div>
      <div>
        <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
      </div>
      
      {/* Decorative background glow */}
      <div className={`absolute -right-4 -bottom-4 w-24 h-24 blur-3xl opacity-10 rounded-full ${colors[color].split(' ')[0]}`} />
    </Card>
  );
};
