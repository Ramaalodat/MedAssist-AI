import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { Activity, Server, Cpu, Clock } from 'lucide-react';

export const MonitoringCard: React.FC = () => {
  const metrics = [
    { label: 'حالة النموذج (AI)', value: 98.4, status: 'نشط', icon: Cpu, variant: 'primary' as const },
    { label: 'صحة الخادم', value: 99.9, status: 'مستقر', icon: Server, variant: 'success' as const },
    { label: 'وقت الاستجابة', value: 85, status: '240ms', icon: Clock, variant: 'warning' as const },
    { label: 'استهلاك الموارد', value: 42, status: 'عادي', icon: Activity, variant: 'primary' as const },
  ];

  return (
    <Card neon className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-500" />
          مراقبة الأنظمة الذكية
        </CardTitle>
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          مباشر
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {metrics.map((metric, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <metric.icon className="w-4 h-4 text-gray-500" />
                {metric.label}
              </div>
              <span className={`text-xs font-bold ${metric.variant === 'success' ? 'text-emerald-500' : 'text-blue-500'}`}>
                {metric.status}
              </span>
            </div>
            <ProgressBar value={metric.value} variant={metric.variant} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
