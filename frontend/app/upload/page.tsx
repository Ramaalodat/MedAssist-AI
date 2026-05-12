"use client";

import {
  Activity,
  CloudUpload,
  FileIcon,
  FileSearch,
  ImageIcon,
  Info,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/components/language/LanguageProvider";

export default function UploadPage() {
  const { direction, language, t } = useLanguage();
  const isArabic = language === "ar";

  const metrics = isArabic
    ? [
        { label: "أنواع الملفات", value: "DICOM / JPG / PNG" },
        { label: "حماية البيانات", value: "HIPAA" },
        { label: "جاهزية التحليل", value: "فوري" },
      ]
    : [
        { label: "File types", value: "DICOM / JPG / PNG" },
        { label: "Data protection", value: "HIPAA" },
        { label: "Analysis status", value: "Instant" },
      ];

  const qualityChecks = isArabic
    ? ["وضوح الصورة", "حجم الملف مناسب", "تنسيق طبي مدعوم"]
    : ["Clear image quality", "Supported file size", "Medical format ready"];

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-7 pb-10" dir={direction}>
      <section className="relative overflow-hidden rounded-[2rem] border border-[var(--app-border)] bg-[linear-gradient(135deg,rgba(37,99,235,0.18),rgba(14,165,233,0.08)_45%,var(--app-panel))] p-8 shadow-2xl">
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className={isArabic ? "text-right" : "text-left"}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
              <Sparkles className="h-4 w-4" />
              <span>{isArabic ? "تحليل طبي مدعوم بالذكاء الاصطناعي" : "AI-powered medical imaging"}</span>
            </div>
            <h2 className="max-w-2xl text-4xl font-black leading-tight text-[var(--app-text)] md:text-5xl">
              {t.upload.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--app-muted)]">
              {t.upload.subtitle}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--app-muted)]">{metric.label}</p>
                <p className="mt-2 text-lg font-bold text-[var(--app-text)]">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="glass-card relative overflow-hidden border-2 border-dashed border-blue-500/35 bg-blue-500/[0.03] p-8">
          <div className="flex min-h-[430px] flex-col items-center justify-center gap-7 text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-600/15 text-blue-400 shadow-[0_24px_70px_rgba(37,99,235,0.22)]">
              <CloudUpload className="h-12 w-12" />
            </div>

            <div className="max-w-xl space-y-3">
              <h3 className="text-3xl font-black text-[var(--app-text)]">{t.upload.dropTitle}</h3>
              <p className="text-base leading-8 text-[var(--app-muted)]">{t.upload.dropDescription}</p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button className="flex items-center gap-3 rounded-2xl bg-blue-600 px-7 py-4 font-bold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700">
                <FileIcon className="h-5 w-5" />
                <span>{t.upload.dicomButton}</span>
              </button>
              <button className="flex items-center gap-3 rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] px-7 py-4 font-bold text-[var(--app-text)] transition hover:bg-blue-500/10">
                <ImageIcon className="h-5 w-5" />
                <span>{t.upload.imageButton}</span>
              </button>
            </div>

            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--app-subtle)]">{t.upload.fileLimit}</p>
          </div>
        </div>

        <aside className="space-y-5">
          <div className="glass-card p-6">
            <div className="mb-5 flex items-center gap-3 text-amber-400">
              <Info className="h-5 w-5" />
              <h3 className="font-bold">{t.upload.tipsTitle}</h3>
            </div>

            <ul className={`space-y-4 text-sm leading-7 text-[var(--app-muted)] ${isArabic ? "text-right" : "text-left"}`}>
              {t.upload.tips.map((tip) => (
                <li key={tip} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-amber-400" />
                  <p>{tip}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card p-6">
            <div className="mb-5 flex items-center gap-3 text-emerald-400">
              <LockKeyhole className="h-5 w-5" />
              <h3 className="font-bold">{isArabic ? "فحص سريع قبل التحليل" : "Pre-analysis checklist"}</h3>
            </div>
            <div className="space-y-3">
              {qualityChecks.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] p-3">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm font-semibold text-[var(--app-text)]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="glass-card p-5">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div className={isArabic ? "text-right" : "text-left"}>
              <h4 className="font-bold">{t.upload.encryptedTitle}</h4>
              <p className="mt-2 text-sm leading-7 text-[var(--app-muted)]">{t.upload.encryptedDescription}</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-blue-500/10 p-3 text-blue-400">
              <FileSearch className="h-6 w-6" />
            </div>
            <div className={isArabic ? "text-right" : "text-left"}>
              <h4 className="font-bold">{t.upload.aiTitle}</h4>
              <p className="mt-2 text-sm leading-7 text-[var(--app-muted)]">{t.upload.aiDescription}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="rounded-2xl border border-blue-500/15 bg-blue-500/5 p-5 text-center text-sm italic leading-7 text-blue-400">
        "{t.upload.quote}"
      </div>
    </div>
  );
}
