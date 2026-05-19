import type { Metadata } from "next";
import { fetchNbaNews } from "../lib/nba-news";
import { NewsContent } from "./news-content";

export const metadata: Metadata = {
  title: "NBA News | Basketball PH",
  description:
    "Latest NBA headlines aggregated for Philippine hoop fans. 菲律宾球迷的每日 NBA 头条聚合。",
};

export const revalidate = 60;

export default async function NewsPage() {
  const news = await fetchNbaNews();
  return <NewsContent news={news} />;
}
