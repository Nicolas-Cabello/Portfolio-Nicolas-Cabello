import { useEffect, useMemo, useState } from 'react';
import { Particles, useParticlesProvider } from '@tsparticles/react';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

type ParticleNetworkProps = {
  id: string;
  density?: number;
  className?: string;
  interactive?: boolean;
};

const ParticleNetwork = ({ id, density = 80, className = '', interactive = true }: ParticleNetworkProps) => {
  const reduced = usePrefersReducedMotion();
  const { loaded } = useParticlesProvider();
  const [count, setCount] = useState(density);

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 767px)').matches;
    const cores = navigator.hardwareConcurrency || 8;
    setCount(mobile || cores <= 4 ? Math.round(density * 0.5) : density);
  }, [density]);

  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: 'transparent' } },
      fpsLimit: 40,
      detectRetina: true,
      particles: {
        number: { value: count },
        color: { value: '#8b5cf6' },
        links: {
          enable: true,
          color: '#8b5cf6',
          opacity: 0.3,
          distance: interactive ? 150 : 110,
        },
        move: { enable: !reduced, speed: interactive ? 1 : 0.35 },
        opacity: { value: { min: 0.3, max: 0.8 } },
        size: { value: { min: 1, max: 3 } },
      },
      interactivity: {
        detectsOn: 'window' as const,
        events: {
          onHover: { enable: interactive && !reduced, mode: 'grab' as const },
          onClick: { enable: interactive && !reduced, mode: 'push' as const },
        },
        modes: {
          grab: { distance: 200, links: { opacity: 0.8 } },
          push: { quantity: 4 },
        },
      },
    }),
    [count, interactive, reduced],
  );

  if (reduced || !loaded) return null;

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      <Particles id={id} options={options} className="h-full w-full" />
    </div>
  );
};

export default ParticleNetwork;
