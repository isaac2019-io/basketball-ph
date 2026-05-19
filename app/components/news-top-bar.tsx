"use client";

import { useLanguage, type LanguageCode } from "./language-provider";
import { formatRelativeTime } from "./posts-store";
import type { NbaNewsItem } from "../lib/nba-news";

const labels: Record<
  LanguageCode,
  { tag: string; viewAll: string; empty: string }
> = {
  "zh-CN": {
    tag: "NBA 头条",
    viewAll: "查看全部",
    empty: "暂无最新资讯",
  },
  en: {
    tag: "NBA Headlines",
    viewAll: "See all",
    empty: "No fresh headlines",
  },
  tl: {
    tag: "NBA Headlines",
    viewAll: "Tingnan lahat",
    empty: "Wala pang balita",
  },
};

export function NewsTopBar({ news }: { news: NbaNewsItem[] }) {
  const { language } = useLanguage();
  const l = labels[language];
  const top = news.slice(0, 6);

  return (
    <div className="sticky top-0 z-40 border-b border-white/5 bg-[#05060a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#05060a]/80">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-2 sm:px-8 lg:px-12">
        <a
          href="#news"
          className="flex shrink-0 items-center gap-2 rounded-full bg-orange-500/15 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-orange-300 transition hover:bg-orange-500/25"
        >
          <span className="size-1.5 animate-pulse rounded-full bg-orange-400" />
          {l.tag}
        </a>

        {top.length > 0 ? (
          <>
            <div className="flex flex-1 items-center gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {top.map((item) => (
                <a
                  key={item.id}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-200 transition hover:border-orange-300/50 hover:bg-white/[0.08]"
                >
                  <span className="text-[10px] font-bold text-slate-500">
                    {formatRelativeTime(item.pubDate, language)}
                  </span>
                  <span className="max-w-[20ch] truncate font-bold sm:max-w-[32ch]">
                    {item.title}
                  </span>
                </a>
              ))}
            </div>
            <a
              href="#news"
              className="hidden shrink-0 text-xs font-black text-orange-300 hover:text-orange-200 sm:inline"
            >
              {l.viewAll} →
            </a>
          </>
        ) : (
          <p className="text-xs text-slate-500">{l.empty}</p>
        )}
      </div>
    </div>
  );
}
