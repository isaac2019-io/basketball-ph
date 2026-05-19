import type { Metadata } from "next";
import { ManilaContent } from "./manila-content";

export const metadata: Metadata = {
  title: "Manila Basketball | Basketball PH",
  description:
    "Manila basketball map, recommended courts, and pickup runs. Manila 篮球地图、球馆推荐和社区约战信息。",
};

export default function ManilaPage() {
  return <ManilaContent />;
}
