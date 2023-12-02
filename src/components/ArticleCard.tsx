/* eslint-disable @next/next/no-img-element */
import { Article } from "@/types";
import NextLink from "next/link";
import Markdown from "./Markdown";
import { Folder } from "lucide-react";
import { basePath } from "../../next.config";
import { ClockIcon, CounterClockwiseClockIcon } from "@radix-ui/react-icons";
import { formatDate } from "@/utils/dateUtils";
const BASE_PATH = basePath ? basePath : "";

export default function ArticleCard({ article }: { article: Article }) {
  const formattedDate = formatDate(article.createdAt);
  const updatedAt = formatDate(article.updatedAt);
  const tags = article.tags || [];
  const categories = article.categories || [];
  return (
    <article className="bg-white p-4 rounded-lg">
      <div className="flex items-center gap-x-4 mb-2">
        <span className="flex items-center gap-x-1">
          <ClockIcon />
          <time dateTime={formattedDate} className="text-gray-500">
            {formattedDate}
          </time>
        </span>
        <span className="flex items-center gap-x-1">
          <CounterClockwiseClockIcon />
          <time dateTime={updatedAt} className="text-gray-500">
            {updatedAt}
          </time>
        </span>
        <div>
          {categories.map((category) => (
            <NextLink key={category} href={`/categories/${category}`}>
              <span
                key={category}
                className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
              >
                <Folder className="inline h-4 w-4" /> {category}
              </span>
            </NextLink>
          ))}
        </div>
      </div>
      <div className="mb-4">
        {tags.map((tag) => (
          <NextLink key={tag} href={`/tags/${tag}`}>
            <span
              key={tag}
              className="relative z-10 text-xs rounded-full bg-gray-50 px-3 py-1.5 ml-2 font-medium text-gray-600 hover:bg-gray-100 border-neutral-300 border-2"
            >
              # {tag}
            </span>
          </NextLink>
        ))}
      </div>
      <div className="group relative">
        <NextLink href={`/articles/${article.filePath}`}>
          <img src={`${BASE_PATH}${article.coverImage}`} alt={article.title} />
        </NextLink>
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <NextLink
            href={`/articles/${article.filePath}`}
            className="hover:underline"
          >
            <span className="" />
            {article.title}
          </NextLink>
        </h3>

        <div className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
          <Markdown filePath={article.filePath}>{article.description}</Markdown>
        </div>
      </div>
    </article>
  );
}
