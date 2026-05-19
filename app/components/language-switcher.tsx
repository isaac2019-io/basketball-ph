"use client";

import { useLanguage, type LanguageCode } from "./language-provider";

const languages: Array<{
  code: LanguageCode;
  label: string;
  shortLabel: string;
}> = [
  { code: "zh-CN", label: "中文", shortLabel: "中" },
  { code: "en", label: "English", shortLabel: "EN" },
  { code: "tl", label: "Tagalog", shortLabel: "TL" },
];

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { language: selectedLanguage, setLanguage } = useLanguage();

  return (
    <div
      aria-label="Language options"
      className={`inline-flex rounded-full border border-white/10 bg-black/25 p-1 text-xs font-black backdrop-blur ${className}`}
    >
      {languages.map((language) => {
        const isActive = language.code === selectedLanguage;

        return (
          <button
            key={language.code}
            type="button"
            aria-pressed={isActive}
            onClick={() => setLanguage(language.code)}
            className={`rounded-full px-2.5 py-2 transition sm:px-3 ${
              isActive
                ? "bg-orange-500 text-black"
                : "text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <span className="sm:hidden">{language.shortLabel}</span>
            <span className="hidden sm:inline">{language.label}</span>
          </button>
        );
      })}
    </div>
  );
}
