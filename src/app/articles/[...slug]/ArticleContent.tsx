/* eslint-disable @next/next/no-img-element */
import Markdown from "@/components/Markdown";
import { Post } from "@/types";
import { ClockIcon, CounterClockwiseClockIcon } from "@radix-ui/react-icons";
import { basePath } from "../../../../next.config";
import { formatDate } from "@/utils/dateUtils";
import Tag from "@/components/ui/tag";
import Category from "@/components/ui/category";
const BASE_PATH = basePath ? basePath : "";

export default function ArticleContent({
  article,
}: {
  article: Post;
  slug: string;
}) {
  const formattedDate = formatDate(article.createdAt);
  const updatedAt = formatDate(article.updatedAt);
  const tags = article.tags || [];
  const categories = article.categories || [];
  return (
    <div className="container mt-10 pb-10 mx-auto px-0 sm:px-4 max-w-4xl">
      <article className="mx-auto p-4 bg-white rounded-lg">
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
              <Category key={category} category={category} />
            ))}
          </div>
        </div>
        <div className="mb-4">
          {tags.map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
        </div>
        <div>
          <img
            className="rounded-lg"
            src={`${BASE_PATH}${article.coverImage}`}
            alt={article.title}
            style={{ width: "fit-content" }}
          />
        </div>
        <div className="mt-5 text-gray-600">
          <Markdown filePath={article.filePath}>{article.content}</Markdown>
        </div>
      </article>
    </div>
  );
}
