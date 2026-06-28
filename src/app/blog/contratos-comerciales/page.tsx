import type { Metadata } from "next";
import { StaticBlogArticlePage } from "@/components/StaticBlogArticlePage";
import { getStaticBlogArticle } from "@/lib/blog-static";

const article = getStaticBlogArticle("contratos-comerciales");

export const metadata: Metadata = {
  title: article?.seoTitle,
  description: article?.excerpt,
  alternates: { canonical: "/blog/contratos-comerciales" },
};

export default function Page() {
  return <StaticBlogArticlePage article={article!} />;
}
