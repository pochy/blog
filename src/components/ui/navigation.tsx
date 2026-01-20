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
            className={`px-4 py-2 border ${
              current_page === page ? "bg-black text-white" : ""
            }`}
            whileHover={{
              backgroundColor: current_page === page ? "#000" : "#000",
              color: "#fff",
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
