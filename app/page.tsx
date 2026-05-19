import Link from "next/link";

const courtStats = [
  { label: "活跃球员", value: "18.4K" },
  { label: "收录球馆", value: "126" },
  { label: "本周约战", value: "342" },
];

const courtZones = [
  { city: "Manila", courts: 42, vibe: "街球 / 室内联赛", top: "31%", left: "46%" },
  { city: "Quezon City", courts: 28, vibe: "大学球局", top: "25%", left: "53%" },
  { city: "Cavite", courts: 14, vibe: "南部社区球局", top: "39%", left: "39%" },
  { city: "Cebu", courts: 19, vibe: "海岛夜赛", top: "55%", left: "58%" },
  { city: "Davao", courts: 16, vibe: "周末公开赛", top: "76%", left: "64%" },
  { city: "Iloilo", courts: 11, vibe: "社区半场", top: "58%", left: "43%" },
];

const courts = [
  {
    name: "Bonifacio Global City Hoops",
    location: "Taguig, Metro Manila",
    type: "收费",
    price: "PHP 180 / 小时",
    tags: ["室内", "夜间灯光", "更衣室"],
  },
  {
    name: "Rizal Park Open Court",
    location: "Ermita, Manila",
    type: "免费",
    price: "公共球场",
    tags: ["户外", "先到先打", "3v3 热门"],
  },
  {
    name: "Cebu City Sports Center",
    location: "Cebu City",
    type: "收费",
    price: "PHP 80 / 人",
    tags: ["木地板", "全场", "可预约"],
  },
  {
    name: "Davao People's Court",
    location: "Poblacion, Davao",
    type: "免费",
    price: "社区开放",
    tags: ["户外", "周末联赛", "本地高手"],
  },
  {
    name: "Dasmariñas Hoops Arena",
    location: "Dasmariñas, Cavite",
    type: "收费",
    price: "PHP 120 / 小时",
    tags: ["室内", "可预约", "全场"],
  },
  {
    name: "Bacoor Community Court",
    location: "Bacoor, Cavite",
    type: "免费",
    price: "社区开放",
    tags: ["户外", "傍晚热门", "半场"],
  },
  {
    name: "Barangay Covered Court",
    location: "Local Barangay, Cavite",
    type: "免费",
    price: "Barangay 公共开放",
    tags: ["免费", "有顶棚", "社区约战"],
  },
];

const posts = [
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
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#05060a] text-white">
      <section className="relative isolate px-5 py-6 sm:px-8 lg:px-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(245,96,32,0.32),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(29,78,216,0.35),transparent_24%),linear-gradient(135deg,#05060a_0%,#101524_46%,#05060a_100%)]" />
        <div className="absolute left-1/2 top-0 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl" />

        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-full bg-orange-500 text-lg font-black text-black">
              PH
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-orange-300">
                Basketball PH
              </p>
              <p className="text-xs text-slate-400">菲律宾篮球社区</p>
            </div>
          </div>
          <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <Link href="/manila" className="hover:text-orange-300">
              Manila
            </Link>
            <a href="#map" className="hover:text-orange-300">
              地图
            </a>
            <a href="#courts" className="hover:text-orange-300">
              球馆
            </a>
            <a href="#community" className="hover:text-orange-300">
              社区
            </a>
          </div>
          <a
            href="#community"
            className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-orange-300"
          >
            发帖约球
          </a>
        </nav>

        <div className="mx-auto grid max-w-7xl gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-300/30 bg-orange-300/10 px-4 py-2 text-sm font-semibold text-orange-200">
              <span className="size-2 rounded-full bg-orange-400" />
              Manila 到 Davao，找到下一场球
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
              菲律宾篮球人的
              <span className="block bg-gradient-to-r from-orange-300 via-orange-500 to-red-500 bg-clip-text text-transparent">
                街球主场
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              用一张篮球地图发现菲律宾各城市球馆，筛选免费或收费场地，
              加入本地约战帖子，像 NBA 比赛夜一样热血开场。
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#map"
                className="rounded-full bg-orange-500 px-7 py-4 text-center font-black text-black shadow-[0_0_35px_rgba(249,115,22,0.35)] transition hover:bg-orange-300"
              >
                查看篮球地图
              </a>
              <a
                href="#courts"
                className="rounded-full border border-white/15 bg-white/5 px-7 py-4 text-center font-bold text-white transition hover:border-orange-300/60 hover:bg-white/10"
              >
                浏览球馆列表
              </a>
              <Link
                href="/manila"
                className="rounded-full border border-orange-300/40 bg-orange-300/10 px-7 py-4 text-center font-bold text-orange-200 transition hover:bg-orange-300 hover:text-black"
              >
                进入 Manila 页面
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-3">
              {courtStats.map((stat) => (
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
              Live
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(160deg,rgba(15,23,42,0.9),rgba(2,6,23,0.95))] p-5">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400">
                Tonight&apos;s pickup board
              </p>
              <div className="mt-5 space-y-4">
                {posts.slice(0, 2).map((post) => (
                  <article
                    key={post.title}
                    className="rounded-3xl border border-white/10 bg-white/[0.06] p-5"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <span className="rounded-full bg-orange-500/15 px-3 py-1 text-xs font-bold text-orange-200">
                        @{post.author}
                      </span>
                      <span className="text-xs text-slate-500">{post.meta}</span>
                    </div>
                    <h2 className="text-xl font-black leading-snug">
                      {post.title}
                    </h2>
                  </article>
                ))}
              </div>
              <div className="mt-5 rounded-3xl bg-orange-500 p-5 text-black">
                <p className="text-sm font-bold uppercase tracking-[0.2em]">
                  Featured run
                </p>
                <p className="mt-2 text-2xl font-black">
                  BGC Indoor 5v5 · 今晚 9:00
                </p>
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
            Philippines Court Map
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            菲律宾篮球地图
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            按城市快速查看球馆密度、打法氛围和热门约战区域。后续可以接入
            Google Maps 或 Mapbox，把这些点位换成真实经纬度。
          </p>
          <div className="mt-6 space-y-3">
            {courtZones.map((zone) => (
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
                  {zone.courts} 球馆
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

          {courtZones.map((zone) => (
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
                <p className="text-orange-200">{zone.courts} courts</p>
              </div>
            </div>
          ))}
          <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-white/10 bg-black/60 p-4 backdrop-blur">
            <p className="text-sm font-bold text-slate-300">
              热门线路：Manila pickup → Quezon City college run → Cebu weekend
              league
            </p>
          </div>
        </div>
      </section>

      <section id="courts" className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.32em] text-orange-300">
              Court Finder
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              免费 / 收费球馆列表
            </h2>
          </div>
          <div className="flex gap-2 rounded-full border border-white/10 bg-white/[0.04] p-2 text-sm font-bold">
            <span className="rounded-full bg-emerald-400 px-4 py-2 text-black">
              免费
            </span>
            <span className="rounded-full bg-orange-500 px-4 py-2 text-black">
              收费
            </span>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {courts.map((court) => (
            <article
              key={court.name}
              className="rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-5 transition hover:-translate-y-1 hover:border-orange-300/50 hover:bg-white/[0.08]"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-black ${
                      court.type === "免费"
                        ? "bg-emerald-400 text-black"
                        : "bg-orange-500 text-black"
                    }`}
                  >
                    {court.type}
                  </span>
                  <h3 className="mt-4 text-2xl font-black">{court.name}</h3>
                  <p className="mt-2 text-slate-400">{court.location}</p>
                </div>
                <p className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-orange-200">
                  {court.price}
                </p>
              </div>
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
        id="community"
        className="mx-auto max-w-7xl px-5 py-12 pb-20 sm:px-8 lg:px-12"
      >
        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(249,115,22,0.16),rgba(37,99,235,0.14),rgba(255,255,255,0.04))] p-5 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.32em] text-orange-300">
                Community Feed
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                社区帖子
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-300">
                发布约战、找队友、分享球馆情报。移动端优先设计，手机上也能快速看帖和加入球局。
              </p>
              <button className="mt-6 rounded-full bg-white px-6 py-3 font-black text-slate-950 transition hover:bg-orange-300">
                发布新帖子
              </button>
            </div>
            <div className="space-y-4">
              {posts.map((post) => (
                <article
                  key={post.title}
                  className="rounded-3xl border border-white/10 bg-black/35 p-5"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="font-black text-orange-200">@{post.author}</p>
                    <p className="text-xs text-slate-400">{post.meta}</p>
                  </div>
                  <h3 className="text-xl font-black leading-snug">{post.title}</h3>
                  <div className="mt-4 flex gap-2 text-sm font-bold text-slate-300">
                    <span className="rounded-full bg-white/10 px-3 py-1">
                      约战
                    </span>
                    <span className="rounded-full bg-white/10 px-3 py-1">
                      球馆情报
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
