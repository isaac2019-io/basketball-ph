import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Manila Basketball | Basketball PH",
  description: "Manila 篮球地图、球馆推荐和社区约战信息。",
};

const manilaStats = [
  { label: "Manila 球馆", value: "42" },
  { label: "免费场地", value: "18" },
  { label: "今晚约战", value: "27" },
];

const districts = [
  {
    name: "Ermita / Rizal Park",
    vibe: "户外半场、游客友好、傍晚最热闹",
    courts: 8,
    top: "38%",
    left: "43%",
  },
  {
    name: "Tondo",
    vibe: "街球强度高，周末有社区小联赛",
    courts: 11,
    top: "24%",
    left: "39%",
  },
  {
    name: "Malate",
    vibe: "夜间灯光场，适合下班后 3v3",
    courts: 7,
    top: "53%",
    left: "48%",
  },
  {
    name: "Sampaloc",
    vibe: "大学球局多，新手和学生友好",
    courts: 9,
    top: "31%",
    left: "58%",
  },
];

const manilaCourts = [
  {
    name: "Rizal Park Open Court",
    area: "Ermita",
    type: "免费",
    bestTime: "17:30 - 21:00",
    detail: "公共户外球场，适合 3v3 和临时组队。",
  },
  {
    name: "San Andres Sports Complex",
    area: "Malate",
    type: "收费",
    bestTime: "19:00 - 22:00",
    detail: "室内全场，建议提前预约晚间时段。",
  },
  {
    name: "Tondo Community Court",
    area: "Tondo",
    type: "免费",
    bestTime: "16:00 - 20:00",
    detail: "本地街球氛围浓，周末竞争强度更高。",
  },
  {
    name: "Sampaloc Training Gym",
    area: "Sampaloc",
    type: "收费",
    bestTime: "18:00 - 21:30",
    detail: "适合训练、半场局和小型友谊赛。",
  },
];

const runs = [
  {
    title: "Makati / Manila 混合 5v5，缺一个中锋",
    time: "今晚 8:30",
    players: "9/10 人",
  },
  {
    title: "Rizal Park 新手半场，欢迎 solo 加入",
    time: "明天 6:00",
    players: "5/8 人",
  },
  {
    title: "Malate 室内全场包场，AA 场地费",
    time: "周五 9:00",
    players: "12/15 人",
  },
];

export default function ManilaPage() {
  return (
    <main className="min-h-screen bg-[#05060a] text-white">
      <section className="relative isolate overflow-hidden px-5 py-6 sm:px-8 lg:px-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_10%,rgba(249,115,22,0.32),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(37,99,235,0.28),transparent_28%),linear-gradient(135deg,#05060a_0%,#111827_52%,#05060a_100%)]" />
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-full bg-orange-500 text-lg font-black text-black">
              PH
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-orange-300">
                Basketball PH
              </p>
              <p className="text-xs text-slate-400">Manila 城市页</p>
            </div>
          </Link>
          <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a href="#districts" className="hover:text-orange-300">
              区域
            </a>
            <a href="#courts" className="hover:text-orange-300">
              球馆
            </a>
            <a href="#runs" className="hover:text-orange-300">
              约战
            </a>
          </div>
          <Link
            href="/"
            className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-orange-300"
          >
            返回首页
          </Link>
        </nav>

        <div className="mx-auto grid max-w-7xl gap-10 py-16 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:py-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-300/30 bg-orange-300/10 px-4 py-2 text-sm font-semibold text-orange-200">
              <span className="size-2 rounded-full bg-orange-400" />
              Metro Manila pickup hub
            </div>
            <h1 className="text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
              Manila
              <span className="block bg-gradient-to-r from-orange-300 via-orange-500 to-red-500 bg-clip-text text-transparent">
                篮球地图
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              找到 Manila 的免费公共球场、可预约室内馆和今晚可加入的球局。
              从 Rizal Park 到 Tondo，把城市里的篮球能量集中到一页。
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#courts"
                className="rounded-full bg-orange-500 px-7 py-4 text-center font-black text-black shadow-[0_0_35px_rgba(249,115,22,0.35)] transition hover:bg-orange-300"
              >
                查看 Manila 球馆
              </a>
              <a
                href="#runs"
                className="rounded-full border border-white/15 bg-white/5 px-7 py-4 text-center font-bold text-white transition hover:border-orange-300/60 hover:bg-white/10"
              >
                加入今晚约战
              </a>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-3">
              {manilaStats.map((stat) => (
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

          <div className="relative min-h-[460px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#07111f] p-5 shadow-2xl shadow-black/30">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:36px_36px]" />
            <div className="absolute left-[30%] top-[14%] h-[72%] w-[44%] rounded-[42%_48%_44%_56%] border border-orange-300/40 bg-orange-400/10 shadow-[inset_0_0_70px_rgba(249,115,22,0.12)]" />
            <div className="absolute left-[43%] top-[37%] h-[34%] w-[25%] rotate-12 rounded-[46%] border border-blue-300/35 bg-blue-500/10" />

            {districts.map((district) => (
              <div
                key={district.name}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ top: district.top, left: district.left }}
              >
                <div className="relative">
                  <div className="absolute inset-0 animate-ping rounded-full bg-orange-400/40" />
                  <div className="relative size-4 rounded-full border-2 border-black bg-orange-400" />
                </div>
                <div className="mt-2 min-w-32 rounded-2xl border border-white/10 bg-black/75 px-3 py-2 text-xs backdrop-blur">
                  <p className="font-black text-white">{district.name}</p>
                  <p className="text-orange-200">{district.courts} courts</p>
                </div>
              </div>
            ))}

            <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-white/10 bg-black/60 p-4 backdrop-blur">
              <p className="text-sm font-bold text-slate-300">
                热门动线：Rizal Park 热身 → Malate 夜场 → Tondo 周末街球
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="districts"
        className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12"
      >
        <p className="text-sm font-black uppercase tracking-[0.32em] text-orange-300">
          Manila Districts
        </p>
        <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
          热门篮球区域
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {districts.map((district) => (
            <article
              key={district.name}
              className="rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-black">{district.name}</h3>
                  <p className="mt-3 leading-7 text-slate-300">{district.vibe}</p>
                </div>
                <span className="rounded-full bg-blue-500/15 px-3 py-1 text-sm font-bold text-blue-200">
                  {district.courts} 球馆
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="courts" className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.32em] text-orange-300">
              Manila Courts
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Manila 球馆推荐
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
          {manilaCourts.map((court) => (
            <article
              key={court.name}
              className="rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-5 transition hover:-translate-y-1 hover:border-orange-300/50 hover:bg-white/[0.08]"
            >
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
              <p className="mt-2 text-slate-400">{court.area}</p>
              <p className="mt-4 leading-7 text-slate-300">{court.detail}</p>
              <div className="mt-5 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-orange-200">
                最佳时间：{court.bestTime}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="runs"
        className="mx-auto max-w-7xl px-5 py-12 pb-20 sm:px-8 lg:px-12"
      >
        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(249,115,22,0.16),rgba(37,99,235,0.14),rgba(255,255,255,0.04))] p-5 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.32em] text-orange-300">
                Manila Runs
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                今日约战
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-300">
                Manila 玩家可以在这里发布缺人、包场、训练和新手局。下一步可接入真实发帖系统。
              </p>
            </div>
            <div className="space-y-4">
              {runs.map((run) => (
                <article
                  key={run.title}
                  className="rounded-3xl border border-white/10 bg-black/35 p-5"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="font-black text-orange-200">{run.time}</p>
                    <p className="text-xs font-bold text-slate-400">
                      {run.players}
                    </p>
                  </div>
                  <h3 className="text-xl font-black leading-snug">{run.title}</h3>
                  <button className="mt-4 rounded-full bg-white px-4 py-2 text-sm font-black text-slate-950 transition hover:bg-orange-300">
                    我要加入
                  </button>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
