"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage, type LanguageCode } from "./components/language-provider";
import { NewsAutoRefresh } from "./components/news-auto-refresh";
import { NewsTopBar } from "./components/news-top-bar";
import { PostForm } from "./components/post-form";
import { usePosts, formatRelativeTime } from "./components/posts-store";
import { SettingsMenu } from "./components/settings-menu";
import type { NbaNewsItem } from "./lib/nba-news";

const courtContacts: Record<string, string> = {
  "Bonifacio Global City Hoops": "+63 917 555 0101 · Messenger: BGC Hoops",
  "Rizal Park Open Court": "Manila Parks Desk · +63 2 8527 1217",
  "Cebu City Sports Center": "+63 32 254 8567 · sportscenter@cebucity.gov.ph",
  "Davao People's Court": "Barangay Poblacion Desk · +63 82 227 3126",
  "Dasmariñas Hoops Arena": "+63 917 555 0414 · Messenger: Dasma Hoops",
  "Bacoor Community Court": "Bacoor Sports Office · +63 46 481 4100",
  "Barangay Covered Court": "Barangay Hall / SK Sports Coordinator",
};

function googleMapsSearchUrl(name: string, location: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${name} ${location} Philippines`,
  )}`;
}

const copy = {
  "zh-CN": {
    navSubtitle: "菲律宾篮球社区",
    navManila: "Manila",
    navMap: "地图",
    navCourts: "球馆",
    navNews: "NBA 新闻",
    navCommunity: "社区",
    postCta: "发帖约球",
    eyebrow: "Manila 到 Davao，找到下一场球",
    headlineTop: "菲律宾篮球人的",
    headlineAccent: "街球主场",
    intro:
      "用一张篮球地图发现菲律宾各城市球馆，筛选免费或收费场地，加入本地约战帖子，像 NBA 比赛夜一样热血开场。",
    mapCta: "查看篮球地图",
    courtsCta: "浏览球馆列表",
    manilaCta: "进入 Manila 页面",
    live: "实时",
    pickupBoard: "今晚约战板",
    featuredRun: "精选球局",
    featuredRunText: "BGC 室内 5v5 · 今晚 9:00",
    mapLabel: "菲律宾球场地图",
    mapTitle: "菲律宾篮球地图",
    mapDescription:
      "按城市快速查看球馆密度、打法氛围和热门约战区域。后续可以接入 Google Maps 或 Mapbox，把这些点位换成真实经纬度。",
    courtUnit: "球馆",
    courtUnitEn: "courts",
    popularRoute:
      "热门线路：Manila 约战 → Quezon City 大学球局 → Cebu 周末联赛",
    courtFinder: "球馆查找",
    courtsTitle: "免费 / 收费球馆列表",
    free: "免费",
    paid: "收费",
    contactLabel: "联系方式",
    mapsLabel: "Google 地图",
    communityLabel: "社区动态",
    communityTitle: "社区帖子",
    communityDescription:
      "发布约战、找队友、分享球馆情报。移动端优先设计，手机上也能快速看帖和加入球局。",
    newPost: "发布新帖子",
    noPostsYet: "暂无帖子，第一个来发起约战吧",
    newsLabel: "NBA 每日资讯",
    newsTitle: "每日 NBA 头条",
    newsDescription: "每天聚合 NBA 头条新闻，菲律宾球迷一站掌握主场动态。",
    newsSource: "来源：ESPN",
    readMore: "查看原文",
    noNewsYet: "今天暂无最新资讯，请稍后再来。",
    postTagRun: "约战",
    postTagCourt: "球馆情报",
    stats: [
      { label: "活跃球员", value: "18.4K" },
      { label: "收录球馆", value: "126" },
      { label: "本周约战", value: "342" },
    ],
    zones: [
      { city: "Manila", courts: 42, vibe: "街球 / 室内联赛", top: "31%", left: "46%" },
      { city: "Quezon City", courts: 28, vibe: "大学球局", top: "25%", left: "53%" },
      { city: "Cavite", courts: 14, vibe: "南部社区球局", top: "39%", left: "39%" },
      { city: "Cebu", courts: 19, vibe: "海岛夜赛", top: "55%", left: "58%" },
      { city: "Davao", courts: 16, vibe: "周末公开赛", top: "76%", left: "64%" },
      { city: "Iloilo", courts: 11, vibe: "社区半场", top: "58%", left: "43%" },
    ],
    courts: [
      {
        name: "Bonifacio Global City Hoops",
        location: "Taguig, Metro Manila",
        kind: "paid",
        price: "PHP 180 / 小时",
        tags: ["室内", "夜间灯光", "更衣室"],
      },
      {
        name: "Rizal Park Open Court",
        location: "Ermita, Manila",
        kind: "free",
        price: "公共球场",
        tags: ["户外", "先到先打", "3v3 热门"],
      },
      {
        name: "Cebu City Sports Center",
        location: "Cebu City",
        kind: "paid",
        price: "PHP 80 / 人",
        tags: ["木地板", "全场", "可预约"],
      },
      {
        name: "Davao People's Court",
        location: "Poblacion, Davao",
        kind: "free",
        price: "社区开放",
        tags: ["户外", "周末联赛", "本地高手"],
      },
      {
        name: "Dasmariñas Hoops Arena",
        location: "Dasmariñas, Cavite",
        kind: "paid",
        price: "PHP 120 / 小时",
        tags: ["室内", "可预约", "全场"],
      },
      {
        name: "Bacoor Community Court",
        location: "Bacoor, Cavite",
        kind: "free",
        price: "社区开放",
        tags: ["户外", "傍晚热门", "半场"],
      },
      {
        name: "Barangay Covered Court",
        location: "Local Barangay, Cavite",
        kind: "free",
        price: "Barangay 公共开放",
        tags: ["免费", "有顶棚", "社区约战"],
      },
    ],
    posts: [
      {
        author: "Marco",
        title: "今晚 Makati 还缺 2 个后卫，8 点开打",
        meta: "12 分钟前 · 18 回复",
      },
      {
        author: "Janelle",
        title: "整理了一份 Quezon City 免费球场灯光时间表",
        meta: "34 分钟前 · 41 收藏",
      },
      {
        author: "Coach Rey",
        title: "周六 Cebu 5v5 新手友谊赛，欢迎组队",
        meta: "1 小时前 · 9 支队伍",
      },
    ],
  },
  en: {
    navSubtitle: "Philippines basketball community",
    navManila: "Manila",
    navMap: "Map",
    navCourts: "Courts",
    navNews: "NBA News",
    navCommunity: "Community",
    postCta: "Post a Run",
    eyebrow: "Find your next run from Manila to Davao",
    headlineTop: "The home court for",
    headlineAccent: "Philippine hoopers",
    intro:
      "Discover courts across the Philippines, filter free and paid venues, and join local pickup posts with NBA-night energy.",
    mapCta: "View Court Map",
    courtsCta: "Browse Courts",
    manilaCta: "Open Manila Page",
    live: "Live",
    pickupBoard: "Tonight's pickup board",
    featuredRun: "Featured run",
    featuredRunText: "BGC Indoor 5v5 · Tonight 9:00",
    mapLabel: "Philippines Court Map",
    mapTitle: "Philippines Basketball Map",
    mapDescription:
      "Scan court density, playing style, and pickup hotspots by city. Later, these points can connect to Google Maps or Mapbox with real coordinates.",
    courtUnit: "courts",
    courtUnitEn: "courts",
    popularRoute:
      "Popular route: Manila pickup → Quezon City college run → Cebu weekend league",
    courtFinder: "Court Finder",
    courtsTitle: "Free / Paid Court List",
    free: "Free",
    paid: "Paid",
    contactLabel: "Contact",
    mapsLabel: "Google Maps",
    communityLabel: "Community Feed",
    communityTitle: "Community Posts",
    communityDescription:
      "Post runs, find teammates, and share court intel. The mobile-first layout keeps it easy to read posts and join games on your phone.",
    newPost: "Create Post",
    noPostsYet: "No posts yet — be the first to share a run",
    newsLabel: "NBA Daily Headlines",
    newsTitle: "Daily NBA News",
    newsDescription:
      "Daily NBA headlines aggregated for Philippine hoop fans — never miss a storyline.",
    newsSource: "Source: ESPN",
    readMore: "Read more",
    noNewsYet: "No fresh headlines right now. Please check back later.",
    postTagRun: "Pickup",
    postTagCourt: "Court Intel",
    stats: [
      { label: "Active players", value: "18.4K" },
      { label: "Listed courts", value: "126" },
      { label: "Runs this week", value: "342" },
    ],
    zones: [
      { city: "Manila", courts: 42, vibe: "Streetball / indoor leagues", top: "31%", left: "46%" },
      { city: "Quezon City", courts: 28, vibe: "College runs", top: "25%", left: "53%" },
      { city: "Cavite", courts: 14, vibe: "Southside community runs", top: "39%", left: "39%" },
      { city: "Cebu", courts: 19, vibe: "Island night games", top: "55%", left: "58%" },
      { city: "Davao", courts: 16, vibe: "Weekend open runs", top: "76%", left: "64%" },
      { city: "Iloilo", courts: 11, vibe: "Community half-court", top: "58%", left: "43%" },
    ],
    courts: [
      {
        name: "Bonifacio Global City Hoops",
        location: "Taguig, Metro Manila",
        kind: "paid",
        price: "PHP 180 / hour",
        tags: ["Indoor", "Night lights", "Locker room"],
      },
      {
        name: "Rizal Park Open Court",
        location: "Ermita, Manila",
        kind: "free",
        price: "Public court",
        tags: ["Outdoor", "First come", "3v3 hotspot"],
      },
      {
        name: "Cebu City Sports Center",
        location: "Cebu City",
        kind: "paid",
        price: "PHP 80 / player",
        tags: ["Wood floor", "Full court", "Bookable"],
      },
      {
        name: "Davao People's Court",
        location: "Poblacion, Davao",
        kind: "free",
        price: "Community open court",
        tags: ["Outdoor", "Weekend league", "Local talent"],
      },
      {
        name: "Dasmariñas Hoops Arena",
        location: "Dasmariñas, Cavite",
        kind: "paid",
        price: "PHP 120 / hour",
        tags: ["Indoor", "Bookable", "Full court"],
      },
      {
        name: "Bacoor Community Court",
        location: "Bacoor, Cavite",
        kind: "free",
        price: "Community open court",
        tags: ["Outdoor", "Evening hotspot", "Half court"],
      },
      {
        name: "Barangay Covered Court",
        location: "Local Barangay, Cavite",
        kind: "free",
        price: "Barangay public access",
        tags: ["Free", "Covered", "Community runs"],
      },
    ],
    posts: [
      {
        author: "Marco",
        title: "Makati needs 2 guards tonight, tipoff at 8",
        meta: "12 min ago · 18 replies",
      },
      {
        author: "Janelle",
        title: "I made a free-court lighting schedule for Quezon City",
        meta: "34 min ago · 41 saves",
      },
      {
        author: "Coach Rey",
        title: "Beginner-friendly Cebu 5v5 this Saturday, teams welcome",
        meta: "1 hour ago · 9 teams",
      },
    ],
  },
  tl: {
    navSubtitle: "Komunidad ng basketball sa Pilipinas",
    navManila: "Manila",
    navMap: "Mapa",
    navCourts: "Mga court",
    navNews: "NBA News",
    navCommunity: "Komunidad",
    postCta: "Mag-post ng laro",
    eyebrow: "Hanapin ang susunod mong laro mula Manila hanggang Davao",
    headlineTop: "Home court ng",
    headlineAccent: "basketbolistang Pinoy",
    intro:
      "Tuklasin ang mga court sa buong Pilipinas, salain ang libre at may bayad na venue, at sumali sa lokal na pickup posts na may NBA-night energy.",
    mapCta: "Tingnan ang mapa",
    courtsCta: "Tingnan ang courts",
    manilaCta: "Buksan ang Manila page",
    live: "Live",
    pickupBoard: "Pickup board ngayong gabi",
    featuredRun: "Tampok na laro",
    featuredRunText: "BGC Indoor 5v5 · Ngayong gabi 9:00",
    mapLabel: "Mapa ng Court sa Pilipinas",
    mapTitle: "Mapa ng Basketball sa Pilipinas",
    mapDescription:
      "Tingnan ang dami ng court, estilo ng laro, at pickup hotspots kada lungsod. Puwedeng ikabit sa Google Maps o Mapbox gamit ang totoong coordinates.",
    courtUnit: "court",
    courtUnitEn: "courts",
    popularRoute:
      "Sikat na ruta: Manila pickup → Quezon City college run → Cebu weekend league",
    courtFinder: "Hanapan ng Court",
    courtsTitle: "Listahan ng Libre / May Bayad na Court",
    free: "Libre",
    paid: "May bayad",
    contactLabel: "Contact",
    mapsLabel: "Google Maps",
    communityLabel: "Community Feed",
    communityTitle: "Mga Post ng Komunidad",
    communityDescription:
      "Mag-post ng laro, maghanap ng kakampi, at magbahagi ng impormasyon sa court. Mobile-first ang layout para madaling magbasa at sumali gamit ang phone.",
    newPost: "Gumawa ng post",
    noPostsYet: "Wala pang post — ikaw ang mauna mag-post",
    newsLabel: "Araw-araw NBA Headlines",
    newsTitle: "NBA Updates Araw-araw",
    newsDescription:
      "Araw-araw na NBA headlines para sa Pilipinong hoop fans — laging updated.",
    newsSource: "Pinagmulan: ESPN",
    readMore: "Basahin",
    noNewsYet: "Wala pang balita ngayon. Bumalik mamaya.",
    postTagRun: "Pickup",
    postTagCourt: "Court intel",
    stats: [
      { label: "Aktibong players", value: "18.4K" },
      { label: "Nakalistang courts", value: "126" },
      { label: "Laro ngayong linggo", value: "342" },
    ],
    zones: [
      { city: "Manila", courts: 42, vibe: "Streetball / indoor leagues", top: "31%", left: "46%" },
      { city: "Quezon City", courts: 28, vibe: "College runs", top: "25%", left: "53%" },
      { city: "Cavite", courts: 14, vibe: "Southside community runs", top: "39%", left: "39%" },
      { city: "Cebu", courts: 19, vibe: "Island night games", top: "55%", left: "58%" },
      { city: "Davao", courts: 16, vibe: "Weekend open runs", top: "76%", left: "64%" },
      { city: "Iloilo", courts: 11, vibe: "Community half-court", top: "58%", left: "43%" },
    ],
    courts: [
      {
        name: "Bonifacio Global City Hoops",
        location: "Taguig, Metro Manila",
        kind: "paid",
        price: "PHP 180 / oras",
        tags: ["Indoor", "May night lights", "Locker room"],
      },
      {
        name: "Rizal Park Open Court",
        location: "Ermita, Manila",
        kind: "free",
        price: "Pampublikong court",
        tags: ["Outdoor", "Unahang dating", "3v3 hotspot"],
      },
      {
        name: "Cebu City Sports Center",
        location: "Cebu City",
        kind: "paid",
        price: "PHP 80 / player",
        tags: ["Wood floor", "Full court", "Puwedeng i-book"],
      },
      {
        name: "Davao People's Court",
        location: "Poblacion, Davao",
        kind: "free",
        price: "Bukas sa komunidad",
        tags: ["Outdoor", "Weekend league", "Lokal na talento"],
      },
      {
        name: "Dasmariñas Hoops Arena",
        location: "Dasmariñas, Cavite",
        kind: "paid",
        price: "PHP 120 / oras",
        tags: ["Indoor", "Puwedeng i-book", "Full court"],
      },
      {
        name: "Bacoor Community Court",
        location: "Bacoor, Cavite",
        kind: "free",
        price: "Bukas sa komunidad",
        tags: ["Outdoor", "Sikat sa gabi", "Half court"],
      },
      {
        name: "Barangay Covered Court",
        location: "Local Barangay, Cavite",
        kind: "free",
        price: "Pampublikong Barangay",
        tags: ["Libre", "May bubong", "Community runs"],
      },
    ],
    posts: [
      {
        author: "Marco",
        title: "Kulang ng 2 guards sa Makati ngayong gabi, 8 ang tipoff",
        meta: "12 min ang nakalipas · 18 sagot",
      },
      {
        author: "Janelle",
        title: "Gumawa ako ng lighting schedule ng free courts sa Quezon City",
        meta: "34 min ang nakalipas · 41 save",
      },
      {
        author: "Coach Rey",
        title: "Beginner-friendly Cebu 5v5 ngayong Sabado, puwedeng teams",
        meta: "1 oras ang nakalipas · 9 teams",
      },
    ],
  },
} satisfies Record<LanguageCode, object>;

export function HomeContent({ news }: { news: NbaNewsItem[] }) {
  const { language } = useLanguage();
  const c = copy[language] as (typeof copy)["zh-CN"];
  const { posts } = usePosts();
  const [formOpen, setFormOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-hidden bg-[#05060a] text-white">
      <NewsTopBar news={news} />
      <section className="relative isolate px-5 py-6 sm:px-8 lg:px-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(245,96,32,0.32),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(29,78,216,0.35),transparent_24%),linear-gradient(135deg,#05060a_0%,#101524_46%,#05060a_100%)]" />
        <div className="absolute left-1/2 top-0 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl" />

        <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 rounded-[2rem] border border-white/10 bg-white/5 px-4 py-3 backdrop-blur sm:rounded-full">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-full bg-orange-500 text-lg font-black text-black">
              PH
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-orange-300">
                Basketball PH
              </p>
              <p className="text-xs text-slate-400">{c.navSubtitle}</p>
            </div>
          </div>
          <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <Link href="/manila" className="hover:text-orange-300">
              {c.navManila}
            </Link>
            <a href="#map" className="hover:text-orange-300">
              {c.navMap}
            </a>
            <a href="#courts" className="hover:text-orange-300">
              {c.navCourts}
            </a>
            <a href="#news" className="hover:text-orange-300">
              {c.navNews}
            </a>
            <a href="#community" className="hover:text-orange-300">
              {c.navCommunity}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="#community"
              className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-orange-300"
            >
              {c.postCta}
            </a>
            <SettingsMenu />
          </div>
        </nav>

        <div className="mx-auto grid max-w-7xl gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-300/30 bg-orange-300/10 px-4 py-2 text-sm font-semibold text-orange-200">
              <span className="size-2 rounded-full bg-orange-400" />
              {c.eyebrow}
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
              {c.headlineTop}
              <span className="block bg-gradient-to-r from-orange-300 via-orange-500 to-red-500 bg-clip-text text-transparent">
                {c.headlineAccent}
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              {c.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#map"
                className="rounded-full bg-orange-500 px-7 py-4 text-center font-black text-black shadow-[0_0_35px_rgba(249,115,22,0.35)] transition hover:bg-orange-300"
              >
                {c.mapCta}
              </a>
              <a
                href="#courts"
                className="rounded-full border border-white/15 bg-white/5 px-7 py-4 text-center font-bold text-white transition hover:border-orange-300/60 hover:bg-white/10"
              >
                {c.courtsCta}
              </a>
              <Link
                href="/manila"
                className="rounded-full border border-orange-300/40 bg-orange-300/10 px-7 py-4 text-center font-bold text-orange-200 transition hover:bg-orange-300 hover:text-black"
              >
                {c.manilaCta}
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-3">
              {c.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-white/10 bg-white/[0.06] p-4"
                >
                  <p className="text-2xl font-black text-orange-300 sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-white/10 bg-slate-950/70 p-4 shadow-2xl shadow-black/40 sm:p-6">
            <div className="absolute -right-6 -top-6 rounded-full bg-blue-600 px-5 py-3 text-sm font-black uppercase tracking-[0.2em] text-white shadow-xl">
              {c.live}
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(160deg,rgba(15,23,42,0.9),rgba(2,6,23,0.95))] p-5">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400">
                {c.pickupBoard}
              </p>
              <div className="mt-5 space-y-4">
                {posts.length > 0 ? (
                  posts.slice(0, 2).map((post) => (
                    <article
                      key={post.id}
                      className="rounded-3xl border border-white/10 bg-white/[0.06] p-5"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <span className="rounded-full bg-orange-500/15 px-3 py-1 text-xs font-bold text-orange-200">
                          @{post.author}
                        </span>
                        <span className="text-xs text-slate-500">
                          {formatRelativeTime(post.createdAt, language)}
                        </span>
                      </div>
                      <h2 className="text-xl font-black leading-snug">
                        {post.title}
                      </h2>
                    </article>
                  ))
                ) : (
                  <p className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-sm text-slate-400">
                    {c.noPostsYet}
                  </p>
                )}
              </div>
              <div className="mt-5 rounded-3xl bg-orange-500 p-5 text-black">
                <p className="text-sm font-bold uppercase tracking-[0.2em]">
                  {c.featuredRun}
                </p>
                <p className="mt-2 text-2xl font-black">{c.featuredRunText}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="map"
        className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12"
      >
        <div>
          <p className="text-sm font-black uppercase tracking-[0.32em] text-orange-300">
            {c.mapLabel}
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            {c.mapTitle}
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            {c.mapDescription}
          </p>
          <div className="mt-6 space-y-3">
            {c.zones.map((zone) => (
              <a
                key={zone.city}
                href={zone.city === "Manila" ? "/manila" : "#map"}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 transition hover:border-orange-300/50 hover:bg-white/[0.08]"
              >
                <div>
                  <p className="font-bold">{zone.city}</p>
                  <p className="text-sm text-slate-400">{zone.vibe}</p>
                </div>
                <p className="rounded-full bg-blue-500/15 px-3 py-1 text-sm font-bold text-blue-200">
                  {zone.courts} {c.courtUnit}
                </p>
              </a>
            ))}
          </div>
        </div>

        <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#07111f] p-5 shadow-2xl shadow-black/30">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:42px_42px]" />
          <div className="absolute left-[34%] top-[13%] h-[68%] w-[38%] rounded-[48%_42%_52%_38%] border border-orange-300/40 bg-orange-400/10 shadow-[inset_0_0_60px_rgba(249,115,22,0.12)]" />
          <div className="absolute left-[42%] top-[45%] h-[26%] w-[30%] rotate-12 rounded-[55%_35%_50%_45%] border border-blue-300/35 bg-blue-500/10" />
          <div className="absolute bottom-[11%] right-[24%] h-[15%] w-[18%] rounded-[50%] border border-orange-300/35 bg-orange-400/10" />

          {c.zones.map((zone) => (
            <div
              key={zone.city}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ top: zone.top, left: zone.left }}
            >
              <div className="relative">
                <div className="absolute inset-0 animate-ping rounded-full bg-orange-400/40" />
                <div className="relative size-4 rounded-full border-2 border-black bg-orange-400" />
              </div>
              <div className="mt-2 min-w-28 rounded-2xl border border-white/10 bg-black/70 px-3 py-2 text-xs backdrop-blur">
                <p className="font-black text-white">{zone.city}</p>
                <p className="text-orange-200">
                  {zone.courts} {c.courtUnitEn}
                </p>
              </div>
            </div>
          ))}
          <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-white/10 bg-black/60 p-4 backdrop-blur">
            <p className="text-sm font-bold text-slate-300">{c.popularRoute}</p>
          </div>
        </div>
      </section>

      <section id="courts" className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.32em] text-orange-300">
              {c.courtFinder}
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              {c.courtsTitle}
            </h2>
          </div>
          <div className="flex gap-2 rounded-full border border-white/10 bg-white/[0.04] p-2 text-sm font-bold">
            <span className="rounded-full bg-emerald-400 px-4 py-2 text-black">
              {c.free}
            </span>
            <span className="rounded-full bg-orange-500 px-4 py-2 text-black">
              {c.paid}
            </span>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {c.courts.map((court) => (
            <article
              key={court.name}
              className="rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-5 transition hover:-translate-y-1 hover:border-orange-300/50 hover:bg-white/[0.08]"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-black ${
                      court.kind === "free"
                        ? "bg-emerald-400 text-black"
                        : "bg-orange-500 text-black"
                    }`}
                  >
                    {court.kind === "free" ? c.free : c.paid}
                  </span>
                  <h3 className="mt-4 text-2xl font-black">{court.name}</h3>
                  <p className="mt-2 text-slate-400">{court.location}</p>
                </div>
                <p className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-orange-200">
                  {court.price}
                </p>
              </div>
              <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                  {c.contactLabel}
                </p>
                <p className="mt-1 text-sm font-bold text-slate-200">
                  {courtContacts[court.name]}
                </p>
              </div>
              <a
                href={googleMapsSearchUrl(court.name, court.location)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex rounded-full border border-orange-300/40 bg-orange-300/10 px-4 py-2 text-sm font-black text-orange-200 transition hover:bg-orange-300 hover:text-black"
              >
                {c.mapsLabel}
              </a>
              <div className="mt-5 flex flex-wrap gap-2">
                {court.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="news"
        className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12"
      >
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.32em] text-orange-300">
              {c.newsLabel}
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              {c.newsTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">
              {c.newsDescription}
            </p>
          </div>
          <p className="text-sm font-bold text-slate-400">{c.newsSource}</p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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

      <section
        id="community"
        className="mx-auto max-w-7xl px-5 py-12 pb-20 sm:px-8 lg:px-12"
      >
        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(249,115,22,0.16),rgba(37,99,235,0.14),rgba(255,255,255,0.04))] p-5 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.32em] text-orange-300">
                {c.communityLabel}
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                {c.communityTitle}
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-300">
                {c.communityDescription}
              </p>
              <button
                type="button"
                onClick={() => setFormOpen(true)}
                className="mt-6 rounded-full bg-white px-6 py-3 font-black text-slate-950 transition hover:bg-orange-300"
              >
                {c.newPost}
              </button>
            </div>
            <div className="space-y-4">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <article
                    key={post.id}
                    className="rounded-3xl border border-white/10 bg-black/35 p-5"
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <p className="font-black text-orange-200">@{post.author}</p>
                      <p className="text-xs text-slate-400">
                        {formatRelativeTime(post.createdAt, language)}
                      </p>
                    </div>
                    <h3 className="text-xl font-black leading-snug">{post.title}</h3>
                    {post.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2 text-sm font-bold text-slate-300">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-white/10 px-3 py-1"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </article>
                ))
              ) : (
                <p className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-center text-slate-400">
                  {c.noPostsYet}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
      <PostForm open={formOpen} onClose={() => setFormOpen(false)} />
      <NewsAutoRefresh />
    </main>
  );
}
