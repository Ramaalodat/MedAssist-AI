import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { Badge } from '../ui/Badge';
import { FileText, Download, Share2 } from 'lucide-react';
import { Button } from '../ui/Button';

export const ResultCard: React.FC<{ title: string; date: string; severity: 'low' | 'medium' | 'high' | 'critical' }> = ({
  title,
  date,
  severity
}) => {
  const severityColors = {
    low: 'success',
    medium: 'warning',
    high: 'error',
    critical: 'error'
  } as const;

  const severityLabels = {
    low: 'منخفضة',
    medium: 'متوسطة',
    high: 'عالية',
    critical: 'حرجة'
  };

  return (
    <Card hover className="w-full">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-600/10 text-blue-500">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            <p className="text-[10px] text-gray-500">{date}</p>
          </div>
        </div>
        <Badge variant={severityColors[severity]}>{severityLabels[severity]}</Badge>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mt-4">
          <Button variant="outline" size="sm" className="flex-1 text-[10px]">
            <Download className="w-3 h-3 ml-1.5" />
            تحميل
          </Button>
          <Button variant="outline" size="sm" className="flex-1 text-[10px]">
            <Share2 className="w-3 h-3 ml-1.5" />
            مشاركة
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const SeverityMeter: React.FC<{ value: number; label: string }> = ({ value, label }) => {
  const getVariant = (v: number) => {
    if (v < 30) return 'success';
    if (v < 70) return 'warning';
    return 'error';
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-xs">
        <span className="text-gray-400">{label}</span>
        <span className={`font-bold ${getVariant(value) === 'success' ? 'text-emerald-500' : getVariant(value) === 'warning' ? 'text-amber-500' : 'text-red-500'}`}>
          {value}%
        </span>
      </div>
      <ProgressBar value={value} variant={getVariant(value)} />
    </div>
  );
};
