import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { CheckCircle2, Clock, AlertTriangle, FileText } from 'lucide-react';

const activities = [
  { id: 1, type: 'upload', patient: 'محمد علي', test: 'تصوير رنين مغناطيسي', time: 'منذ دقيقتين', status: 'processing' },
  { id: 2, type: 'diagnosis', patient: 'سارة خالد', test: 'تحليل دم شامل', time: 'منذ 15 دقيقة', status: 'completed' },
  { id: 3, type: 'critical', patient: 'أحمد محمود', test: 'تخطيط قلب', time: 'منذ ساعة', status: 'alert' },
  { id: 4, type: 'review', patient: 'ليلى يوسف', test: 'أشعة سينية', time: 'منذ ساعتين', status: 'pending' },
];

export const ActivityTable: React.FC = () => {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead>
            <tr className="border-b border-white/5">
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">المريض</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">نوع الفحص</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">الوقت</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">الحالة</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">الإجراء</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {activities.map((activity) => (
              <tr key={activity.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-500 font-bold text-xs">
                      {activity.patient[0]}
                    </div>
                    <span className="text-sm font-medium text-white">{activity.patient}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <FileText className="w-4 h-4 text-gray-600" />
                    {activity.test}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{activity.time}</td>
                <td className="px-6 py-4">
                  {activity.status === 'completed' && <Badge variant="success">مكتمل</Badge>}
                  {activity.status === 'processing' && <Badge variant="info">جاري المعالجة</Badge>}
                  {activity.status === 'alert' && <Badge variant="error">حالة حرجة</Badge>}
                  {activity.status === 'pending' && <Badge variant="warning">قيد المراجعة</Badge>}
                </td>
                <td className="px-6 py-4">
                  <button className="text-xs font-bold text-blue-500 hover:text-blue-400 underline underline-offset-4">التفاصيل</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
