import NextLink from "next/link";

export default function Tag({ tag }: { tag: string }) {
  return (
    <NextLink key={tag} href={`/tags/${tag}`}>
      <span
        key={tag}
        className="relative z-10 text-xs rounded-full bg-gray-50 mr-2 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100 border-neutral-300 border-2"
      >
        # {tag}
      </span>
    </NextLink>
  );
}
