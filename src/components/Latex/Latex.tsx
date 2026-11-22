"use client";

import { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

type LatexProps = {
  expression: string;
  displayMode?: boolean;
  ariaLabel?: string;
};

export default function Latex({
  expression,
  displayMode = false,
  ariaLabel,
}: LatexProps) {
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (elementRef.current) {
      katex.render(expression, elementRef.current, {
        displayMode,
        throwOnError: false,
      });
    }
  }, [displayMode, expression]);

  return (
    <span
      ref={elementRef}
      aria-label={ariaLabel}
      className={displayMode ? "katex-display" : undefined}
    />
  );
}
