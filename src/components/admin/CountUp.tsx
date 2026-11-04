import { useEffect, useRef, useState } from 'react';

/* Animates digits inside a formatted value (e.g. "120 000 ₽") from the previous value. */
export function CountUp({ value, duration = 700 }: { value: string; duration?: number }) {
  const target = Number(value.replace(/[^\d]/g, '')) || 0;
  const from = useRef(0);
  const [shown, setShown] = useState(target);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setShown(target); from.current = target; return; }
    const start = performance.now(); const begin = from.current; let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration); const eased = 1 - Math.pow(1 - t, 3);
      setShown(Math.round(begin + (target - begin) * eased));
      if (t < 1) frame = requestAnimationFrame(tick); else from.current = target;
    };
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); from.current = target; };
  }, [target, duration]);
  if (!/\d/.test(value)) return <>{value}</>;
  const formatted = shown.toLocaleString('ru-RU').replace(/\u00a0/g, ' ');
  return <>{value.replace(/[\d\s\u00a0]*\d/, formatted)}</>;
}
