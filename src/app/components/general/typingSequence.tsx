"use client";

import { useEffect, useState, type ReactNode } from "react";

export interface TypingLine {
  text: string;
  className: string;
  speed?: number;
}

interface TypingSequenceProps {
  lines: TypingLine[];
  initialDelay?: number;
  speed?: number;
  linePause?: number;
  initialCursorBlink?: boolean;
  children: (renderLine: (index: number) => ReactNode) => ReactNode;
  onComplete: () => void;
}

export default function TypingSequence({
  lines,
  initialDelay = 0,
  speed = 40,
  linePause = 180,
  initialCursorBlink = false,
  children,
  onComplete,
}: TypingSequenceProps) {
  const [typedLengths, setTypedLengths] = useState<number[]>(() => lines.map(() => 0));
  const [activeLine, setActiveLine] = useState(0);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const [cursorFinished, setCursorFinished] = useState(false);

  useEffect(() => {
    setTypedLengths(lines.map(() => 0));
    setActiveLine(0);
    setHasStartedTyping(false);
    setTypingComplete(false);
    setCursorFinished(false);

    if (lines.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTypedLengths(lines.map((line) => line.text.length));
      setHasStartedTyping(true);
      setCursorFinished(true);
      onComplete();
      return;
    }

    let lineIndex = 0;
    let characterIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const typeNextCharacter = () => {
      const line = lines[lineIndex];
      characterIndex += 1;
      setTypedLengths((lengths) =>
        lengths.map((length, index) => (index === lineIndex ? characterIndex : length))
      );

      if (characterIndex === line.text.length) {
        if (lineIndex === lines.length - 1) {
          setTypingComplete(true);
          onComplete();
          timeoutId = setTimeout(() => setCursorFinished(true), 1000);
          return;
        }

        timeoutId = setTimeout(() => {
          lineIndex += 1;
          characterIndex = 0;
          setActiveLine(lineIndex);
          typeNextCharacter();
        }, linePause);
        return;
      }

      timeoutId = setTimeout(typeNextCharacter, line.speed ?? speed);
    };

    timeoutId = setTimeout(() => {
      setHasStartedTyping(true);
      typeNextCharacter();
    }, initialDelay);
    return () => clearTimeout(timeoutId);
  }, [initialCursorBlink, initialDelay, linePause, lines, onComplete, speed]);

  const renderLine = (index: number) => {
    const line = lines[index];
    if (!line) return null;
    const showInitialCursor =
      initialCursorBlink && index === 0 && !hasStartedTyping && !cursorFinished;

    return (
      <div className={line.className} key={line.text} role="text" aria-label={line.text}>
        <span aria-hidden="true" className="whitespace-pre-wrap">
          {line.text.slice(0, typedLengths[index] ?? 0)}
        </span>
        {index === activeLine &&
          !cursorFinished &&
          (showInitialCursor || index > 0 || (typedLengths[index] ?? 0) > 0) && (
            <span
              aria-hidden="true"
              className={`typing-cursor ${
                typingComplete || showInitialCursor
                  ? "typing-cursor--finish"
                  : "typing-cursor--typing"
              }`}
            />
          )}
      </div>
    );
  };

  return children(renderLine);
}
