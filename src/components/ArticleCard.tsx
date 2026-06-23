/* eslint-disable @next/next/no-img-element */
"use client";
import { Post } from "@/types";
import NextLink from "next/link";
import Markdown from "./Markdown";
import { basePath } from "../../next.config.mjs";
import { ClockIcon, CounterClockwiseClockIcon } from "@radix-ui/react-icons";
import { formatDate, toISODateTime } from "@/utils/dateUtils";
import Tag from "@/components/ui/tag";
import Category from "./ui/category";
import { motion } from "framer-motion";

const BASE_PATH = basePath ? basePath : "";

export default function ArticleCard({ article }: { article: Post }) {
  const formattedDate = formatDate(article.createdAt);
  const updatedAt = formatDate(article.updatedAt);
  const tags = article.tags || [];
  const categories = article.categories || [];
  return (
    <motion.article
      className="rounded-lg border border-border bg-card p-4 text-card-foreground transition-colors"
      whileHover={{
        boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.2)",
        transition: { duration: 0.2 }
      }}
    >
      <div className="flex items-center gap-x-4 mb-2">
        <span className="flex items-center gap-x-1">
          <ClockIcon />
          <time
            dateTime={toISODateTime(article.createdAt)}
            className="text-muted-foreground"
          >
            {formattedDate}
          </time>
        </span>
        <span className="flex items-center gap-x-1">
          <CounterClockwiseClockIcon />
          <time
            dateTime={toISODateTime(article.updatedAt)}
            className="text-muted-foreground"
          >
            {updatedAt}
          </time>
        </span>
        <div>
          {categories.map((category) => (
            <Category key={category} category={category} />
          ))}
        </div>
      </div>
      <div className="mb-4">
        {tags.map((tag) => (
          <Tag key={tag} tag={tag} />
        ))}
      </div>
      <div className="group relative">
        {article.coverImage && (
          <NextLink href={`/articles/${article.filePath}`}>
            <motion.div
              className="overflow-hidden rounded-md"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={`${BASE_PATH}${article.coverImage}`}
                alt={article.title}
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </NextLink>
        )}
        <motion.h3
          className="mt-3 text-lg font-semibold leading-6 text-card-foreground group-hover:text-muted-foreground"
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2 }}
        >
          <NextLink
            href={`/articles/${article.filePath}`}
            className="hover:underline"
          >
            <span className="" />
            {article.title}
          </NextLink>
        </motion.h3>

        <div className="mt-5 line-clamp-3 text-sm leading-6 text-muted-foreground">
          <Markdown filePath={article.filePath}>{article.description}</Markdown>
        </div>
      </div>
    </motion.article>
  );
}
