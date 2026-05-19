import { HomeContent } from "./home-content";
import { fetchNbaNews } from "./lib/nba-news";

export const revalidate = 60;

export default async function Home() {
  const news = await fetchNbaNews();
  return <HomeContent news={news} />;
}
