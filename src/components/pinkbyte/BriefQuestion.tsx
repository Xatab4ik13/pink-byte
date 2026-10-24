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