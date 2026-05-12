"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Dna,
  Globe2,
  History,
  LayoutDashboard,
  Monitor,
  Moon,
  Scan,
  Sun,
  Upload,
} from "lucide-react";
import { LanguageProvider, useLanguage } from "@/components/language/LanguageProvider";

function ShellContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { language, theme, direction, t, toggleLanguage, toggleTheme } = useLanguage();
  const isArabic = language === "ar";
  const isDark = theme === "dark";
  const sidebarSide = isArabic ? "right-0 border-l" : "left-0 border-r";
  const contentOffset = isArabic ? "lg:mr-72" : "lg:ml-72";
  const activeClass = "sidebar-link-active";

  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: t.app.dashboard },
    { href: "/upload", icon: Upload, label: t.app.newAnalysis },
  ];

  const categoryItems = [
    { href: "#", icon: Scan, label: t.app.xray },
    { href: "#", icon: Dna, label: t.app.mri },
    { href: "#", icon: Monitor, label: t.app.ultrasound },
    { href: "/history", icon: History, label: t.app.history },
  ];

  return (
    <div className="min-h-screen bg-[var(--app-bg)] text-[var(--app-text)] overflow-hidden flex" dir={direction}>
      <aside className={`w-72 bg-[var(--app-sidebar)] border-[var(--app-border)] flex-col h-screen fixed top-0 z-50 shadow-2xl hidden lg:flex ${sidebarSide}`}>
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.5)]">
            <Activity className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-l from-white to-gray-400 bg-clip-text text-transparent">
            ClinicalMind
          </span>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className={`sidebar-link group ${pathname === item.href ? activeClass : ""}`}>
                <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="pt-4 pb-2 px-4">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.app.categories}</span>
          </div>

          {categoryItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.label} href={item.href} className={`sidebar-link group ${pathname === item.href ? activeClass : ""}`}>
                <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className={`flex-1 ${contentOffset} flex flex-col h-screen overflow-hidden`}>
        <header className="h-20 bg-[var(--app-bg-soft)] backdrop-blur-xl border-b border-[var(--app-border)] flex items-center justify-between px-8 z-40 sticky top-0 gap-6">
          <div className={isArabic ? "text-right" : "text-left"}>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-400">ClinicalMind</p>
            <h1 className="text-lg font-bold text-[var(--app-text)]">{t.app.newAnalysis}</h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--app-surface)] border border-[var(--app-border)] text-sm font-semibold text-[var(--app-muted)] hover:text-[var(--app-text)] hover:border-blue-500/30 transition-all"
              aria-label={`Switch language to ${t.app.switchTo}`}
            >
              <Globe2 className="w-4 h-4 text-blue-400" />
              <span>{language.toUpperCase()}</span>
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--app-surface)] border border-[var(--app-border)] text-sm font-semibold text-[var(--app-muted)] hover:text-[var(--app-text)] hover:border-blue-500/30 transition-all"
              aria-label={t.app.switchThemeTo}
            >
              {isDark ? <Moon className="w-4 h-4 text-blue-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
              <span>{isDark ? t.app.themeDark : t.app.themeLight}</span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 scroll-smooth">{children}</main>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ShellContent>{children}</ShellContent>
    </LanguageProvider>
  );
}
