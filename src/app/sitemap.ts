import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const dynamic = "force-static"; // required for `output: "export"`

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ["", "/projects", "/about", "/contact"].map((route) => ({
    url: `${SITE_CONFIG.url}${route}/`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.7,
  }));
}