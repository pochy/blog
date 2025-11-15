import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post, PostMeta } from "@/types";

const postsDirectory = path.join(process.cwd(), "_posts");

export const PAGE_SIZE = 2;
export const range = (start: number, end: number, length = end - start + 1) =>
  Array.from({ length }, (_, i) => start + i);

export function getPosts() {
  return fs.readdirSync(postsDirectory);
}

export function getPostFilePaths(
  dir = postsDirectory,
  filePaths: string[] = []
) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getPostFilePaths(filePath, filePaths);
    } else if (stat.isFile() && /\.md$/.test(filePath)) {
      filePaths.push(filePath);
    }
  });

  return filePaths;
}

export function getPostById(id: string) {
  const postFilePaths = getPostFilePaths();
  const postPath = postFilePaths.find((filePath) => filePath.includes(id));

  if (!postPath) {
    throw new Error(`Post with id ${id} not found`);
  }

  const fileContents = fs.readFileSync(postPath, "utf8");
  const { data, content } = matter(fileContents);

  const post: Post = {
    id: id,
    filePath: postPath.replace(/\.md$/, "").replace(postsDirectory + "/", ""),
    content,
    ...(data as PostMeta),
  };
  return post;
}

export function getAllPosts() {
  const postFilePaths = getPostFilePaths();
  const allPostsData = postFilePaths
    .map((filePath) => {
      const id = path.basename(filePath, ".md");
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

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
}

export function slicedAllPosts(current_page = 1) {
  const posts = getAllPosts();
  posts.sort((a: any, b: any) => {
    return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
  });
  return slicedPosts(posts, current_page);
}

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
