"use client";

import { Fragment, useEffect, useRef, type CSSProperties } from "react";

type Mode = "expand" | "shrink" | "squoosh";
type Props = {
  text: string;
  as?: "h1" | "h2" | "h3";
  mode?: Mode;
  className?: string;
};

// Original theme-compatible adaptation of the requested letter-motion motif.
// No experimental timeline-trigger dependency. Content is readable before JS.
export function VariableHeadline({
  text,
  as: Heading = "h2",
  mode = "expand",
  className = "",
}: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    delete element.dataset.play;
    let hasPlayed = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (preference.matches || hasPlayed) return;
        if (entries.some((entry) => entry.isIntersecting)) {
          hasPlayed = true;
          element.dataset.play = "true";
          observer.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -6% 0px" },
    );
    const syncPreference = () => {
      if (preference.matches) {
        observer.disconnect();
        delete element.dataset.play;
      } else if (!hasPlayed) {
        observer.observe(element);
      }
    };
    syncPreference();
    preference.addEventListener("change", syncPreference);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", syncPreference);
    };
  }, [text, mode]);

  let characterIndex = 0;
  return (
    <Heading
      ref={ref}
      className={`vsp-variable-headline ${className}`.trim()}
      data-motion-mode={mode}
    >
      <span className="vsp-visually-hidden">{text}</span>
      <span aria-hidden="true">
        {text.split(/(\s+)/).map((word, wordIndex) => {
          if (/^\s+$/.test(word)) {
            return <Fragment key={wordIndex}>{word}</Fragment>;
          }
          return (
            <span className="vsp-motion-word" key={wordIndex}>
              {Array.from(word).map((letter, letterIndex) => {
                const delay = Math.min(characterIndex++ * 25, 300);
                return (
                  <span className="vsp-motion-character" key={letterIndex}>
                    <span className="vsp-motion-measure">{letter}</span>
                    <span
                      className="vsp-motion-glyph"
                      style={{ animationDelay: `${delay}ms` } as CSSProperties}
                    >
                      {letter}
                    </span>
                  </span>
                );
              })}
            </span>
          );
        })}
      </span>
    </Heading>
  );
}
