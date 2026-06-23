import { getTags } from "@/utils/tags";
import NextLink from "next/link";

export default function Tags() {
  const tags = Array.from(new Set(getTags().map((c) => c.tag)));
  return (
    <main className="container mt-10 pb-10 mx-auto px-4 max-w-4xl">
      <div className="mx-auto mb-10 max-w-2xl lg:mx-0">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          タグ一覧
        </h1>
      </div>
      <div className="rounded-lg border border-border bg-card p-8 text-card-foreground transition-colors">
        <ul>
          {tags
            .filter((t) => typeof t === "string")
            .map((tag) => (
              <li key={tag} className="mb-4 last:mb-0">
                <NextLink
                  className="relative z-10 rounded-full bg-muted px-3 py-1.5 font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  key={tag}
                  href={`/tags/${tag}`}
                >
                  # {tag}
                </NextLink>
              </li>
            ))}
        </ul>
      </div>
    </main>
  );
}
