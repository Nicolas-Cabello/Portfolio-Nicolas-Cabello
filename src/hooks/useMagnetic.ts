import { useRef } from 'react';
import usePrefersReducedMotion from './usePrefersReducedMotion';

export default function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const frame = useRef(0);
  const reduced = usePrefersReducedMotion();

  const onMouseMove = (event: React.MouseEvent) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    const distance = Math.hypot(dx, dy);
    if (distance > 120) return;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    });
  };

  const onMouseLeave = () => {
    cancelAnimationFrame(frame.current);
    if (ref.current) ref.current.style.transform = 'translate(0, 0)';
  };

  return { ref, onMouseMove, onMouseLeave };
}
