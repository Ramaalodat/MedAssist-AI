'use client';
import React from 'react';
import { Bell, Search, User, Globe } from 'lucide-react';
import { Input } from '../ui/Input';

export const Topbar: React.FC = () => {
  return (
    <header className="h-20 w-full bg-[#0a0e1a]/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40 px-8 flex items-center justify-between gap-8">
      <div className="flex-1 max-w-xl">
        <Input 
          placeholder="ابحث عن مريض، تحليل، أو تقرير..." 
          icon={<Search className="w-4 h-4" />}
          className="bg-gray-800/30 border-none"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
          <Globe className="w-5 h-5" />
        </button>
        
        <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#0a0e1a]" />
        </button>

        <div className="h-8 w-[1px] bg-white/10 mx-2" />

        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-white leading-none">د. أحمد خالد</p>
            <p className="text-[10px] text-blue-500 font-medium">مدير النظام</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center group-hover:border-blue-500 transition-all">
            <User className="w-5 h-5 text-blue-500" />
          </div>
        </div>
      </div>
    </header>
  );
};
