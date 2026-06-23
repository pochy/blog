"use client";
import NextLink from "next/link";
import { motion } from "framer-motion";

export default function Pagination({
  path = "articles",
  pages = [],
  current_page = 1,
}: {
  path: string;
  pages: number[];
  current_page: number;
}) {
  return (
    <div className="flex items-center space-x-1 mt-8">
      {pages.map((page) => (
        <NextLink
          key={page}
          href={`/${path}/${page}`}
        >
          <motion.div
            className={`border border-border px-4 py-2 transition-colors hover:bg-primary hover:text-primary-foreground ${
              current_page === page ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground"
            }`}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {page}
          </motion.div>
        </NextLink>
      ))}
    </div>
  );
}
