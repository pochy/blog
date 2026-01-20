"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <header className="">
      <div className="max-w-4xl mx-auto flex justify-between items-center mt-5 px-4">
        <ul className="flex">
          <motion.li
            className="pr-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link className="font-bold text-2xl" href="/">
              KINACOO
            </Link>
          </motion.li>
        </ul>
        <ul className="flex">
          {/* <li className="pr-2">
            <Link href="/categories">カテゴリ</Link>
          </li> */}
          <motion.li
            className="pr-2"
            whileHover={{ scale: 1.1, color: "#000" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/tags">タグ</Link>
          </motion.li>
        </ul>
      </div>
    </header>
  );
}
