import { useState } from "react";

export default function ReadMore({ text, className }: { text: string; className: string }) {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 400;

  if (text.length <= maxLength) {
    return <p className={className}>{text}</p>;
  }

  return (
    <p className={className}>
      {expanded ? text : `${text.slice(0, maxLength)}... `}
      <button
        className="text-blue-500 text-xs sm:text-sm xl:text-base underline cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Read Less" : "Read More"}
      </button>
    </p>
  );
}
