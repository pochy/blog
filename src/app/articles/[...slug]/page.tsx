import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleContent from "./ArticleContent";
import { getAllPosts, getPostById } from "@/utils/posts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug: slugArray } = await params;
  const slug = slugArray.join("/");
  const article = getPostById(slug);
  return {
    title: article?.title,
    description: article?.content,
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  const slugs = posts.map((post) => ({
    slug: post.filePath.split("/"),
  }));
  return slugs;
}

export default async function ArticleDetail({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug: slugArray } = await params;
  const slug = slugArray.join("/");
  const article = getPostById(slug);
  if (!article) {
    notFound();
  }

  return <ArticleContent article={article} slug={slug} />;
}
