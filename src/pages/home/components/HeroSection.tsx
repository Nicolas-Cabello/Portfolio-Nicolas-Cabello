import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import IconButton from '../../../components/IconButton';
import MagneticButton from '../../../components/MagneticButton';
import ParticleNetwork from '../../../components/ParticleNetwork';
import { GITHUB_URL, LINKEDIN_URL } from '../../../content/site';

const FloatingObjects = lazy(() => import('../../../components/FloatingObjects'));

const HeroSection = () => {
  const { t } = useTranslation();
  const reduced = useReducedMotion();

  const roles = useMemo(() => [
    t('hero_role0'),
    t('hero_role1'),
    t('hero_role2'),
  ], [t]);

  const [roleIndex, setRoleIndex] = useState(0);
  const [typed, setTyped] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [show3d, setShow3d] = useState(false);
  const [effects, setEffects] = useState(true);

  useEffect(() => {
    if (reduced) {
      setTyped(roles[0]);
      return;
    }

    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && typed.length < current.length) {
      timeout = setTimeout(() => setTyped(current.slice(0, typed.length + 1)), 60);
    } else if (!isDeleting && typed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && typed.length > 0) {
      timeout = setTimeout(() => setTyped(current.slice(0, typed.length - 1)), 35);
    } else if (isDeleting && typed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [typed, isDeleting, roleIndex, roles, reduced]);

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 767px)').matches;
    const cores = navigator.hardwareConcurrency || 8;
    if (reduced || mobile || cores <= 4) return;
    setShow3d(true);
    let frames = 0;
    let start = 0;
    let raf = 0;
    const sample = (now: number) => {
      if (!start) start = now;
      frames += 1;
      if (now - start < 1000) {
        raf = requestAnimationFrame(sample);
        return;
      }
      if (frames < 30) setEffects(false);
    };
    raf = requestAnimationFrame(sample);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <section id="inicio" className="relative flex min-h-screen items-center overflow-hidden">
      {effects && <ParticleNetwork id="hero-particles" density={80} />}
      {show3d && effects && (
        <div className="pointer-events-none absolute inset-0 opacity-80">
          <Suspense fallback={null}>
            <FloatingObjects />
          </Suspense>
        </div>
      )}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-start px-6 pb-20 pt-32">
        <motion.p
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1 text-sm text-emerald-300"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400" style={{ animation: reduced ? undefined : 'glow-pulse 2s ease-in-out infinite' }} />
          {t('hero_badge')}
        </motion.p>
        <h1 className="text-depth text-6xl font-bold leading-[0.9] tracking-tight sm:text-7xl md:text-8xl">
          NICOLÁS
          <br />
          CABELLO
        </h1>
        <p className="mono mt-6 h-8 text-lg text-[#c4b5fd] md:text-2xl">
          &gt; {typed}
          <span className="blink text-[#06b6d4]">_</span>
        </p>
        <p className="mt-3 text-[#94a3b8]">{t('hero_place')}</p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <MagneticButton href="#proyectos" className="rounded-full bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] px-7 py-3 font-semibold text-white">
            <i className="ri-code-s-slash-line text-lg" aria-hidden="true" />
            {t('hero_cta_projects')}
          </MagneticButton>
          <MagneticButton href="#contacto" className="rounded-full border border-[#7c3aed]/60 px-7 py-3 font-semibold text-[#e2e8f0]">
            <i className="ri-mail-line text-lg" aria-hidden="true" />
            {t('hero_cta_contact')}
          </MagneticButton>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <IconButton href={GITHUB_URL} icon="github">GitHub</IconButton>
          <IconButton href={LINKEDIN_URL} icon="linkedin">LinkedIn</IconButton>
        </div>
      </div>
      <a href="#sobre-mi" className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-sm text-[#94a3b8]">
        {t('hero_scroll')} ↓
      </a>
    </section>
  );
};

export default HeroSection;
