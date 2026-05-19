"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useLanguage, type LanguageCode } from "./language-provider";

export type Post = {
  id: string;
  author: string;
  title: string;
  createdAt: number;
  tags: string[];
};

type PostsContextValue = {
  posts: Post[];
  addPost: (input: { author: string; title: string; tags?: string[] }) => void;
};

const PostsContext = createContext<PostsContextValue | null>(null);

const STORAGE_KEY = "basketball-ph-posts";

const seedTemplates: Record<LanguageCode, Array<Omit<Post, "id" | "createdAt">>> = {
  "zh-CN": [
    {
      author: "Marco",
      title: "今晚 Makati 还缺 2 个后卫，8 点开打",
      tags: ["约战"],
    },
    {
      author: "Janelle",
      title: "整理了一份 Quezon City 免费球场灯光时间表",
      tags: ["球馆情报"],
    },
    {
      author: "Coach Rey",
      title: "周六 Cebu 5v5 新手友谊赛，欢迎组队",
      tags: ["约战"],
    },
  ],
  en: [
    {
      author: "Marco",
      title: "Makati needs 2 guards tonight, tipoff at 8",
      tags: ["Pickup"],
    },
    {
      author: "Janelle",
      title: "I made a free-court lighting schedule for Quezon City",
      tags: ["Court Intel"],
    },
    {
      author: "Coach Rey",
      title: "Beginner-friendly Cebu 5v5 this Saturday, teams welcome",
      tags: ["Pickup"],
    },
  ],
  tl: [
    {
      author: "Marco",
      title: "Kulang ng 2 guards sa Makati ngayong gabi, 8 ang tipoff",
      tags: ["Pickup"],
    },
    {
      author: "Janelle",
      title: "Gumawa ako ng lighting schedule ng free courts sa Quezon City",
      tags: ["Court Intel"],
    },
    {
      author: "Coach Rey",
      title: "Beginner-friendly Cebu 5v5 ngayong Sabado, puwedeng teams",
      tags: ["Pickup"],
    },
  ],
};

function isPost(value: unknown): value is Post {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    typeof v.author === "string" &&
    typeof v.title === "string" &&
    typeof v.createdAt === "number" &&
    Array.isArray(v.tags) &&
    v.tags.every((tag) => typeof tag === "string")
  );
}

function loadFromStorage(): Post[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed.filter(isPost);
  } catch {
    return null;
  }
}

function saveToStorage(posts: Post[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch {
    // Quota errors are ignored — posts simply don't persist this session.
  }
}

function buildSeedPosts(language: LanguageCode): Post[] {
  const now = Date.now();
  return seedTemplates[language].map((post, index) => ({
    ...post,
    id: `seed-${now}-${index}`,
    createdAt: now - (index + 1) * 30 * 60 * 1000,
  }));
}

export function PostsProvider({ children }: { children: ReactNode }) {
  const { language } = useLanguage();

  const [posts, setPosts] = useState<Post[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = loadFromStorage();
    if (stored && stored.length > 0) return stored;
    return buildSeedPosts(language);
  });

  useEffect(() => {
    saveToStorage(posts);
  }, [posts]);

  const addPost = useCallback(
    (input: { author: string; title: string; tags?: string[] }) => {
      setPosts((prev) => [
        {
          id: `post-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          author: input.author,
          title: input.title,
          tags: input.tags ?? [],
          createdAt: Date.now(),
        },
        ...prev,
      ]);
    },
    [],
  );

  return (
    <PostsContext.Provider value={{ posts, addPost }}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error("usePosts must be used inside PostsProvider");
  }
  return context;
}

export function formatRelativeTime(
  timestamp: number,
  language: LanguageCode,
): string {
  const diff = Math.max(0, Date.now() - timestamp);
  const minutes = Math.floor(diff / (60 * 1000));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (language === "zh-CN") {
    if (minutes < 1) return "刚刚";
    if (minutes < 60) return `${minutes} 分钟前`;
    if (hours < 24) return `${hours} 小时前`;
    return `${days} 天前`;
  }
  if (language === "tl") {
    if (minutes < 1) return "ngayon lang";
    if (minutes < 60) return `${minutes} min ang nakalipas`;
    if (hours < 24) return `${hours} oras ang nakalipas`;
    return `${days} araw ang nakalipas`;
  }
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hr ago`;
  return `${days} d ago`;
}
