import { ENV } from "@/lib/constants";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = ENV.NEXT_PUBLIC_APP_URL;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
