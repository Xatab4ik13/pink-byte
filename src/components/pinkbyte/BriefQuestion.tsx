import { useEffect, useState } from "react";

export function BriefQuestion({ question }: { question: string }) {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(question.length);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const count = Math.min(question.length, Math.max(0, Math.floor((now - start - 1050) / 24)));
      setVisible(count);
      if (count < question.length) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [question]);

  return (
    <div className="pb-brief-thought pointer-events-none absolute z-30">
      <span className="pb-thought-dot pb-thought-dot-first" aria-hidden="true" />
      <span className="pb-thought-dot pb-thought-dot-second" aria-hidden="true" />
      <span className="pb-thought-dot pb-thought-dot-third" aria-hidden="true" />
      <div className="pb-thought-cloud">
        <svg className="pb-thought-silhouette" viewBox="0 0 320 166" preserveAspectRatio="none" aria-hidden="true">
          <path d="M42 127C15 133 2 114 15 99C-2 82 8 61 29 58C23 35 48 22 69 29C76 8 109 5 126 18C146 0 173 7 182 19C205 5 236 15 241 32C268 21 291 37 289 56C317 60 328 83 308 98C325 121 299 140 276 135C264 158 235 157 220 145C202 166 173 160 158 147C139 165 109 158 101 144C76 157 49 149 42 127Z" />
        </svg>
        <p className="sr-only" role="status">{question}</p>
        <p className="pb-thought-text" aria-hidden="true">
          <span className="invisible">{question}</span>
          <span className="pb-thought-typed">
            {question.slice(0, visible)}
            {visible > 0 && visible < question.length && <span className="pb-thought-caret" />}
          </span>
        </p>
      </div>
    </div>
  );
}