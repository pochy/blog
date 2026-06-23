import fs from "fs";
import path from "path";
import { cache } from "react";
import { Post, PostMeta } from "@/types";

const postsDirectory = path.join(process.cwd(), "_posts");

export const PAGE_SIZE = 2;
export const range = (start: number, end: number, length = end - start + 1) =>
  Array.from({ length }, (_, i) => start + i);

const collectPostFilePaths = (dir: string, filePaths: string[]) => {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      collectPostFilePaths(filePath, filePaths);
    } else if (stat.isFile() && /\.md$/.test(filePath)) {
      filePaths.push(filePath);
    }
  });
};

const parseFrontmatterValue = (value: string) => {
  const trimmed = value.trim();
  if (trimmed === "null") return null;
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z?$/.test(trimmed)) {
    return new Date(trimmed.endsWith("Z") ? trimmed : `${trimmed}Z`);
  }
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
};

const parsePostFile = (fileContents: string) => {
  if (!fileContents.startsWith("---\n")) {
    return { data: {}, content: fileContents };
  }

  const end = fileContents.indexOf("\n---", 4);
  if (end === -1) {
    return { data: {}, content: fileContents };
  }

  const data: Record<string, any> = {};
  const lines = fileContents.slice(4, end).split(/\r?\n/);
  let currentKey: string | null = null;

  for (const line of lines) {
    if (!line.trim()) continue;

    const arrayItem = line.match(/^\s+-\s+(.*)$/);
    if (arrayItem && currentKey) {
      if (!Array.isArray(data[currentKey])) {
        data[currentKey] = [];
      }
      data[currentKey].push(parseFrontmatterValue(arrayItem[1]));
      continue;
    }

    const nestedEntry = line.match(/^\s{2}([^:]+):\s*(.*)$/);
    if (nestedEntry && currentKey && !Array.isArray(data[currentKey])) {
      data[currentKey][nestedEntry[1]] = parseFrontmatterValue(nestedEntry[2]);
      continue;
    }

    const separator = line.indexOf(":");
    if (separator === -1) continue;

    const key = line.slice(0, separator);
    const value = line.slice(separator + 1);
    currentKey = key;
    data[key] = value.trim() ? parseFrontmatterValue(value) : {};
  }

  return {
    data,
    content: fileContents.slice(end + "\n---".length).replace(/^\r?\n/, ""),
  };
};

export const getPosts = cache(() => fs.readdirSync(postsDirectory));

export const getPostFilePaths = cache((dir?: string) => {
  const baseDir = dir ?? postsDirectory;
  const filePaths: string[] = [];
  collectPostFilePaths(baseDir, filePaths);
  return filePaths;
});

export const getPostById = cache((id: string) => {
  const postFilePaths = getPostFilePaths();
  const postPath = postFilePaths.find((filePath) => filePath.includes(id));

  if (!postPath) {
    throw new Error(`Post with id ${id} not found`);
  }

  const fileContents = fs.readFileSync(postPath, "utf8");
  const { data, content } = parsePostFile(fileContents);

  const post: Post = {
    id: id,
    filePath: postPath.replace(/\.md$/, "").replace(postsDirectory + "/", ""),
    content,
    ...(data as PostMeta),
  };
  return post;
});

export const getAllPosts = cache(() => {
  const postFilePaths = getPostFilePaths();
  const allPostsData = postFilePaths
    .map((filePath) => {
      const id = path.basename(filePath, ".md");
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = parsePostFile(fileContents);

      const article: Post = {
        id: id,
        filePath: filePath
          .replace(/\.md$/, "")
          .replace(postsDirectory + "/", ""),
        content,
        ...(data as PostMeta),
      };
      return article;
    })
    .filter((article) => {
      // draft: trueの記事を除外
      const draft = (article as any).draft;
      return !draft;
    })
    .filter((article, index, self) => {
      // 同じslugを持つ記事の重複を除外（最初に見つかったもののみ残す）
      return index === self.findIndex((a) => a.slug === article.slug);
    });
  return allPostsData;
});

export const slicedAllPosts = cache((current_page = 1) => {
  const posts = [...getAllPosts()];
  posts.sort((a: any, b: any) => {
    return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
  });
  return slicedPosts(posts, current_page);
});

export function slicedPosts(posts: Post[], current_page: number) {
  const pages = range(1, Math.ceil(posts.length / PAGE_SIZE));

  const articles = posts.slice(
    PAGE_SIZE * (current_page - 1),
    PAGE_SIZE * current_page
  );

  return {
    pages,
    articles,
  };
}
