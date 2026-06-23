import NextLink from "next/link";
import { Folder } from "lucide-react";

export default function Category({ category }: { category: string }) {
  return <></>;
  return (
    <NextLink key={category} href={`/categories/${category}`}>
      <span
        key={category}
        className="relative z-10 rounded-full px-3 py-1.5 font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        <Folder className="inline h-4 w-4" /> {category}
      </span>
    </NextLink>
  );
}
