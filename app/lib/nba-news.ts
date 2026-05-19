const FEED_URL = "https://www.espn.com/espn/rss/nba/news";

export type NbaNewsItem = {
  id: string;
  title: string;
  link: string;
  pubDate: number;
  description: string;
};

export async function fetchNbaNews(): Promise<NbaNewsItem[]> {
  try {
    const response = await fetch(FEED_URL, {
      next: { revalidate: 60 },
      headers: {
        "User-Agent":
          "BasketballPH/1.0 (+https://github.com/isaac2019-io/basketball-ph)",
      },
    });
    if (!response.ok) return [];
    const xml = await response.text();
    return parseRssItems(xml);
  } catch {
    return [];
  }
}

function parseRssItems(xml: string): NbaNewsItem[] {
  const items: NbaNewsItem[] = [];
  const itemRegex = /<item[^>]*>([\s\S]*?)<\/item>/g;
  let match: RegExpExecArray | null;

  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const title = extractTag(block, "title");
    const link = extractTag(block, "link");
    if (!title || !link) continue;

    const description = extractTag(block, "description");
    const pubDateRaw = extractTag(block, "pubDate");
    const parsed = Date.parse(pubDateRaw);

    items.push({
      id: link,
      title,
      link,
      pubDate: Number.isFinite(parsed) ? parsed : Date.now(),
      description: stripHtml(description).slice(0, 220),
    });
  }

  return items.slice(0, 12);
}

function extractTag(block: string, tag: string): string {
  const re = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i");
  const m = block.match(re);
  if (!m) return "";
  const inner = m[1].trim();
  const cdata = inner.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/);
  return (cdata ? cdata[1] : inner).trim();
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}
