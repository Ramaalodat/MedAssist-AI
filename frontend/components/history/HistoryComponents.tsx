import React from 'react';
import { Search, Filter, Calendar } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const SearchFilters: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-4 items-end">
      <div className="flex-1 min-w-[240px]">
        <Input 
          label="البحث" 
          placeholder="ابحث بالاسم أو الرقم الطبي..." 
          icon={<Search className="w-4 h-4" />}
        />
      </div>
      <div className="w-48">
        <Input 
          label="التاريخ" 
          type="date" 
          icon={<Calendar className="w-4 h-4" />}
        />
      </div>
      <Button variant="outline" className="h-[42px]">
        <Filter className="w-4 h-4 ml-2" />
        تصفية النتائج
      </Button>
    </div>
  );
};

export const HistoryTable: React.FC<{ data: any[] }> = ({ data }) => {
  return (
    <div className="glass-card overflow-hidden">
      <table className="w-full text-right">
        <thead className="bg-white/5">
          <tr>
            <th className="px-6 py-4 text-xs font-bold text-gray-400">المريض</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-400">التاريخ</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-400">نوع الفحص</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-400">النتيجة</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-400">الإجراء</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {data.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center text-gray-500">لا توجد سجلات حالياً</td>
            </tr>
          ) : (
            data.map((item, idx) => (
              <tr key={idx} className="hover:bg-white/5">
                <td className="px-6 py-4 text-sm font-medium">{item.patient}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{item.date}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{item.type}</td>
                <td className="px-6 py-4 text-sm font-bold text-blue-500">{item.result}</td>
                <td className="px-6 py-4 text-sm">
                  <Button variant="ghost" size="sm">معاينة</Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
