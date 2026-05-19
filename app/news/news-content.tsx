"use client";

import Link from "next/link";
import { useLanguage, type LanguageCode } from "../components/language-provider";
import { NewsAutoRefresh } from "../components/news-auto-refresh";
import { formatRelativeTime } from "../components/posts-store";
import { SettingsMenu } from "../components/settings-menu";
import type { NbaNewsItem } from "../lib/nba-news";

const copy: Record<
  LanguageCode,
  {
    navSubtitle: string;
    backHome: string;
    eyebrow: string;
    newsLabel: string;
    newsTitle: string;
    newsDescription: string;
    newsSource: string;
    readMore: string;
    noNewsYet: string;
    totalLabel: string;
    refreshHint: string;
  }
> = {
  "zh-CN": {
    navSubtitle: "NBA 新闻中心",
    backHome: "返回首页",
    eyebrow: "实时聚合 · 每分钟刷新",
    newsLabel: "NBA 每日资讯",
    newsTitle: "每日 NBA 头条",
    newsDescription:
      "聚合 ESPN 最新 NBA 新闻，让菲律宾球迷第一时间掌握赛场动态，无需手动刷新。",
    newsSource: "来源：ESPN",
    readMore: "查看原文",
    noNewsYet: "暂无最新资讯，请稍后再来。",
    totalLabel: "条头条",
    refreshHint: "页面会自动获取最新新闻",
  },
  en: {
    navSubtitle: "NBA News Hub",
    backHome: "Back Home",
    eyebrow: "Live feed · refreshed every minute",
    newsLabel: "NBA Daily Headlines",
    newsTitle: "Daily NBA News",
    newsDescription:
      "Aggregated headlines from ESPN, refreshed every minute so Philippine hoop fans never miss a beat.",
    newsSource: "Source: ESPN",
    readMore: "Read more",
    noNewsYet: "No fresh headlines right now. Please check back later.",
    totalLabel: "headlines",
    refreshHint: "This page auto-refreshes when new news lands",
  },
  tl: {
    navSubtitle: "NBA News Hub",
    backHome: "Bumalik",
    eyebrow: "Live feed · nag-re-refresh kada minuto",
    newsLabel: "Araw-araw NBA Headlines",
    newsTitle: "NBA Updates Araw-araw",
    newsDescription:
      "Pinagsama-samang ESPN NBA headlines na laging updated para sa Pilipinong hoop fans.",
    newsSource: "Pinagmulan: ESPN",
    readMore: "Basahin",
    noNewsYet: "Wala pang balita ngayon. Bumalik mamaya.",
    totalLabel: "balita",
    refreshHint: "Awtomatikong nag-re-refresh ang pahina kapag may bago",
  },
};

export function NewsContent({ news }: { news: NbaNewsItem[] }) {
  const { language } = useLanguage();
  const c = copy[language];

  return (
    <main className="min-h-screen bg-[#05060a] text-white">
      <section className="relative isolate overflow-hidden px-5 py-6 sm:px-8 lg:px-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_10%,rgba(249,115,22,0.32),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(37,99,235,0.28),transparent_28%),linear-gradient(135deg,#05060a_0%,#111827_52%,#05060a_100%)]" />
        <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 rounded-[2rem] border border-white/10 bg-white/5 px-4 py-3 backdrop-blur sm:rounded-full">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-full bg-orange-500 text-lg font-black text-black">
              PH
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-orange-300">
                Basketball PH
              </p>
              <p className="text-xs text-slate-400">{c.navSubtitle}</p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-orange-300"
            >
              {c.backHome}
            </Link>
            <SettingsMenu />
          </div>
        </nav>

        <div className="mx-auto max-w-7xl py-12 sm:py-16">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-300/30 bg-orange-300/10 px-4 py-2 text-sm font-semibold text-orange-200">
            <span className="size-2 animate-pulse rounded-full bg-orange-400" />
            {c.eyebrow}
          </div>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.32em] text-orange-300">
                {c.newsLabel}
              </p>
              <h1 className="mt-4 text-5xl font-black tracking-tight sm:text-6xl">
                {c.newsTitle}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                {c.newsDescription}
              </p>
            </div>
            <div className="text-sm text-slate-400 md:text-right">
              <p className="font-bold">{c.newsSource}</p>
              <p className="mt-1 text-xs text-slate-500">{c.refreshHint}</p>
              {news.length > 0 && (
                <p className="mt-2 text-2xl font-black text-orange-300">
                  {news.length}{" "}
                  <span className="text-sm text-slate-400">{c.totalLabel}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-12">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {news.length > 0 ? (
            news.map((item) => (
              <article
                key={item.id}
                className="flex h-full flex-col rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-5 transition hover:-translate-y-1 hover:border-orange-300/50 hover:bg-white/[0.08]"
              >
                <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-300">
                  {formatRelativeTime(item.pubDate, language)}
                </p>
                <h3 className="mt-3 text-lg font-black leading-snug">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-300">
                    {item.description}
                  </p>
                )}
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex pt-4 text-sm font-black text-orange-300 hover:text-orange-200"
                >
                  {c.readMore} →
                </a>
              </article>
            ))
          ) : (
            <p className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-center text-slate-400 md:col-span-2 lg:col-span-3">
              {c.noNewsYet}
            </p>
          )}
        </div>
      </section>
      <NewsAutoRefresh />
    </main>
  );
}
