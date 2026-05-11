import React from 'react';
import { 
  Users, 
  Scan, 
  BrainCircuit, 
  AlertCircle, 
  Target,
  Server,
  Zap,
  Activity
} from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { StatisticsCard } from '@/components/dashboard/StatisticsCard';
import { MonitoringCard } from '@/components/admin/MonitoringCard';
import { ActivityTable } from '@/components/admin/ActivityTable';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function AdminPage() {
  return (
    <PageContainer 
      title="لوحة تحكم الإدارة" 
      description="مراقبة أداء الأنظمة، صحة الذكاء الاصطناعي، ونشاط المنصة بشكل كامل."
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm">تحميل التقرير</Button>
          <Button variant="primary" size="sm">تحديث النظام</Button>
        </div>
      }
    >
      {/* System Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatisticsCard 
          title="إجمالي المرضى" 
          value="1,284" 
          change={12} 
          icon={Users} 
          color="blue" 
        />
        <StatisticsCard 
          title="إجمالي الفحوصات" 
          value="8,432" 
          change={8.5} 
          icon={Scan} 
          color="purple" 
        />
        <StatisticsCard 
          title="تحليلات AI نشطة" 
          value="24" 
          icon={BrainCircuit} 
          color="blue" 
        />
        <StatisticsCard 
          title="حالات حرجة" 
          value="12" 
          change={-2} 
          isPositive={false} 
          icon={AlertCircle} 
          color="red" 
        />
        <StatisticsCard 
          title="دقة النموذج" 
          value="99.2%" 
          change={0.4} 
          icon={Target} 
          color="emerald" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Monitoring Panel */}
        <div className="lg:col-span-1 space-y-8">
          <MonitoringCard />
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="w-5 h-5 text-purple-500" />
                حالة السيرفرات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">الشرق الأوسط (دبي)</span>
                <span className="text-emerald-500 font-bold">متصل</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">أوروبا (لندن)</span>
                <span className="text-emerald-500 font-bold">متصل</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">الولايات المتحدة</span>
                <span className="text-amber-500 font-bold">صيانة</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500" />
              أحدث النشاطات الطبية
            </h3>
            <Button variant="ghost" size="sm">عرض الكل</Button>
          </div>
          <ActivityTable />
        </div>
      </div>
    </PageContainer>
  );
}
