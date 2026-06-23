import { getCategories } from "@/utils/categories";
import { Folder } from "lucide-react";
import NextLink from "next/link";

export default function Category() {
  const categories = Array.from(
    new Set(getCategories().map((c) => c.category))
  );

  return (
    <main className="container mt-10 pb-10 mx-auto px-4 max-w-4xl">
      <div className="mx-auto mb-10 max-w-2xl lg:mx-0">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          カテゴリ一覧
        </h1>
      </div>
      <div className="rounded-lg border border-border bg-card p-8 text-card-foreground transition-colors">
        <ul>
          {categories
            .filter((c) => typeof c === "string")
            .map((category) => (
              <li key={category} className="mb-4 last:mb-0">
                <NextLink
                  className="relative z-10 rounded-full bg-muted px-3 py-1.5 font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  key={category}
                  href={`/categories/${category}`}
                >
                  <Folder className="inline h-4 w-4" /> {category}
                </NextLink>
              </li>
            ))}
        </ul>
      </div>
    </main>
  );
}
