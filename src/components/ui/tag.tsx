"use client";
import NextLink from "next/link";
import { motion } from "framer-motion";

export default function Tag({ tag }: { tag: string }) {
  return (
    <NextLink key={tag} href={`/tags/${tag}`}>
      <motion.span
        key={tag}
        className="relative z-10 mr-2 inline-block rounded-full border-2 border-border bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        whileHover={{
          scale: 1.1,
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        # {tag}
      </motion.span>
    </NextLink>
  );
}
