import type { Metadata } from "next";
import { StaticBlogArticlePage } from "@/components/StaticBlogArticlePage";
import { getStaticBlogArticle } from "@/lib/blog-static";

const article = getStaticBlogArticle("gobierno-corporativo");

export const metadata: Metadata = {
  title: article?.seoTitle,
  description: article?.excerpt,
  alternates: { canonical: "/blog/gobierno-corporativo" },
};

export default function Page() {
  return <StaticBlogArticlePage article={article!} />;
}
