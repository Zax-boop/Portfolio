import { useState } from "react";
import { motion } from "framer-motion";

export default function ReadMore({ text, className }: { text: string; className: string }) {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 400;
  const isExpandable = text.length > maxLength;

  return (
    <div className={className}>
      <motion.div
        initial={false}
        animate={{ maxHeight: expanded ? 1000 : 80 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        {text}
      </motion.div>
      {isExpandable && (
        <button
          className="text-blue-500 xs:text-[0.5rem] sm:text-sm xl:text-base underline cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
}
