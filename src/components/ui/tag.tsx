"use client";
import NextLink from "next/link";
import { motion } from "framer-motion";

export default function Tag({ tag }: { tag: string }) {
  return (
    <NextLink key={tag} href={`/tags/${tag}`}>
      <motion.span
        key={tag}
        className="relative z-10 text-xs rounded-full bg-gray-50 mr-2 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100 border-neutral-300 border-2 inline-block"
        whileHover={{
          scale: 1.1,
          backgroundColor: "#f9fafb",
          borderColor: "#9ca3af",
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        # {tag}
      </motion.span>
    </NextLink>
  );
}
