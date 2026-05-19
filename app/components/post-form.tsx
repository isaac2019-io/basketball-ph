"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useLanguage, type LanguageCode } from "./language-provider";
import { usePosts } from "./posts-store";

type FormCopy = {
  title: string;
  authorLabel: string;
  authorPlaceholder: string;
  titleLabel: string;
  titlePlaceholder: string;
  tagsLabel: string;
  tagsPlaceholder: string;
  submit: string;
  cancel: string;
};

const formCopy: Record<LanguageCode, FormCopy> = {
  "zh-CN": {
    title: "发布新帖子",
    authorLabel: "你的昵称",
    authorPlaceholder: "例如 Marco",
    titleLabel: "想说点什么？",
    titlePlaceholder: "约战、球馆情报、训练分享...",
    tagsLabel: "标签（用逗号分隔，选填）",
    tagsPlaceholder: "约战, 球馆情报",
    submit: "发布",
    cancel: "取消",
  },
  en: {
    title: "Create a new post",
    authorLabel: "Your handle",
    authorPlaceholder: "e.g. Marco",
    titleLabel: "What's on your mind?",
    titlePlaceholder: "Pickup, court intel, training notes...",
    tagsLabel: "Tags (comma separated, optional)",
    tagsPlaceholder: "Pickup, Court Intel",
    submit: "Post",
    cancel: "Cancel",
  },
  tl: {
    title: "Gumawa ng bagong post",
    authorLabel: "Iyong handle",
    authorPlaceholder: "hal. Marco",
    titleLabel: "Ano ang nasa isip mo?",
    titlePlaceholder: "Pickup, court intel, training notes...",
    tagsLabel: "Mga tag (paghiwalayin ng comma, optional)",
    tagsPlaceholder: "Pickup, Court Intel",
    submit: "I-post",
    cancel: "Kanselahin",
  },
};

export function PostForm({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { language } = useLanguage();
  const { addPost } = usePosts();
  const t = formCopy[language];

  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [tagsRaw, setTagsRaw] = useState("");

  useEffect(() => {
    if (!open) return;
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const trimmedAuthor = author.trim();
  const trimmedTitle = title.trim();
  const canSubmit = trimmedAuthor.length > 0 && trimmedTitle.length > 0;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
    const tags = tagsRaw
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)
      .slice(0, 5);
    addPost({ author: trimmedAuthor, title: trimmedTitle, tags });
    setAuthor("");
    setTitle("");
    setTagsRaw("");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-4 backdrop-blur sm:items-center">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
      />
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-lg rounded-[2rem] border border-white/10 bg-[#0a0e18] p-6 shadow-2xl shadow-black/60 sm:p-8"
      >
        <h2 className="text-2xl font-black text-white sm:text-3xl">{t.title}</h2>
        <div className="mt-6 space-y-5">
          <label className="block">
            <span className="text-sm font-bold text-slate-300">
              {t.authorLabel}
            </span>
            <input
              type="text"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              placeholder={t.authorPlaceholder}
              maxLength={32}
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-orange-300"
            />
          </label>
          <label className="block">
            <span className="text-sm font-bold text-slate-300">
              {t.titleLabel}
            </span>
            <textarea
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder={t.titlePlaceholder}
              rows={3}
              maxLength={200}
              required
              className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-orange-300"
            />
          </label>
          <label className="block">
            <span className="text-sm font-bold text-slate-300">
              {t.tagsLabel}
            </span>
            <input
              type="text"
              value={tagsRaw}
              onChange={(event) => setTagsRaw(event.target.value)}
              placeholder={t.tagsPlaceholder}
              maxLength={80}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-orange-300"
            />
          </label>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/15 px-6 py-3 font-bold text-slate-200 transition hover:bg-white/10"
          >
            {t.cancel}
          </button>
          <button
            type="submit"
            disabled={!canSubmit}
            className="rounded-full bg-orange-500 px-6 py-3 font-black text-black transition hover:bg-orange-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {t.submit}
          </button>
        </div>
      </form>
    </div>
  );
}
