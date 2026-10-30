import { useRef } from 'react';
import usePrefersReducedMotion from './usePrefersReducedMotion';

export default function useTilt(max = 8) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const reduced = usePrefersReducedMotion();

  const onMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const rotateX = (0.5 - py) * max;
      const rotateY = (px - 0.5) * max;
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      el.style.setProperty('--glare-x', `${px * 100}%`);
      el.style.setProperty('--glare-y', `${py * 100}%`);
    });
  };

  const onMouseLeave = () => {
    cancelAnimationFrame(frame.current);
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };

  return { ref, onMouseMove, onMouseLeave };
}
