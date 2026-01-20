"use client";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface AnimatedLinkProps {
  href?: string;
  children?: React.ReactNode;
}

export default function AnimatedLink({ href, children }: AnimatedLinkProps) {
  const isExternal = href?.startsWith("http");

  return (
    <motion.a
      href={href}
      className="relative inline-flex items-center gap-1 text-blue-600 hover:text-blue-800"
      whileHover={{
        x: 2,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.span
        className="relative"
        whileHover={{
          transition: { duration: 0.2 }
        }}
      >
        {children}
        <motion.span
          className="absolute bottom-0 left-0 h-[2px] bg-blue-600"
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3 }}
        />
      </motion.span>
      {isExternal && (
        <motion.span
          initial={{ opacity: 0, x: -2 }}
          whileHover={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <ExternalLink className="h-3 w-3" />
        </motion.span>
      )}
    </motion.a>
  );
}
