export type PostMeta = {
  title: string;
  // content: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  coverImage?: string;
  tags: string[];
  categories: string[];
  ogImage: {
    url: string;
  };
};

export type Post = PostMeta & {
  filePath: string;
  id: string;
  content: string;
};
