"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type LanguageCode = "zh-CN" | "en" | "tl";

type LanguageContextValue = {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getSavedLanguage(): LanguageCode {
  if (typeof window === "undefined") {
    return "zh-CN";
  }

  const savedLanguage = window.localStorage.getItem("basketball-ph-language");

  if (
    savedLanguage === "zh-CN" ||
    savedLanguage === "en" ||
    savedLanguage === "tl"
  ) {
    return savedLanguage;
  }

  return "zh-CN";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<LanguageCode>(getSavedLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("basketball-ph-language", language);
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
