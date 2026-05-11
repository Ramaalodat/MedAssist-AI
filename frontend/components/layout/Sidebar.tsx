'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Upload, 
  History, 
  ShieldAlert, 
  Settings, 
  LogOut,
  BrainCircuit,
  Activity,
  Users
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'لوحة التحكم', href: '/dashboard' },
  { icon: Upload, label: 'رفع التحليلات', href: '/upload' },
  { icon: History, label: 'السجل الطبي', href: '/history' },
  { icon: Activity, label: 'النتائج', href: '/results' },
  { icon: ShieldAlert, label: 'الإدارة', href: '/admin' },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed right-0 top-0 h-screen w-72 bg-[#111827] border-l border-white/5 z-50 hidden lg:flex flex-col p-6">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
          <BrainCircuit className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">ClinicalMind</h2>
          <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">AI Medical SaaS</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-4 mb-4">القائمة الرئيسية</div>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-white'}`} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5 space-y-2">
        <Link href="/settings" className="sidebar-link">
          <Settings className="w-5 h-5 text-gray-500" />
          <span className="font-medium">الإعدادات</span>
        </Link>
        <button className="sidebar-link w-full text-right text-red-400 hover:text-red-300 hover:bg-red-500/10">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
};
