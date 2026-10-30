import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import ParticleNetwork from '../../../components/ParticleNetwork';
import TiltCard from '../../../components/TiltCard';

const useCount = (target: number, run: boolean) => {
  const [value, setValue] = useState(run ? 0 : target);

  useEffect(() => {
    if (!run) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / 700);
      setValue(Math.round(target * progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [run, target]);

  return value;
};

const Stat = ({ value, suffix, label, className }: { value: string; suffix?: string; label: string; className: string }) => (
  <TiltCard className={`float-a ${className}`}>
    <article className="glass-card rounded-2xl px-6 py-5 text-center">
      <p className="text-4xl font-bold text-white">{value}{suffix}</p>
      <p className="mt-1 text-sm text-[#94a3b8]">{label}</p>
    </article>
  </TiltCard>
);

const AboutSection = () => {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const [seen, setSeen] = useState(false);
  const projects = useCount(8, seen && !reduced);
  const tech = useCount(5, seen && !reduced);

  return (
    <section id="sobre-mi" className="relative overflow-hidden px-6 py-24">
      <ParticleNetwork id="about-particles" density={28} interactive={false} />
      <div className="relative mx-auto max-w-6xl">
        <p className="mono text-sm text-[#06b6d4]">{t('about_label')}</p>
        <h2 className="text-depth mt-2 text-4xl font-bold md:text-5xl">{t('about_title')}</h2>
        <motion.div
          className="mt-8"
          onViewportEnter={() => setSeen(true)}
          viewport={{ once: true, amount: 0.4 }}
          initial={reduced ? false : { opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        >
          <TiltCard max={10}>
            <article className="glass-card rounded-3xl p-8 md:p-10">
              <p className="text-xl leading-relaxed md:text-2xl">{t('about_bio1')}</p>
              <p className="mt-3 text-lg text-[#94a3b8]">{t('about_bio2')}</p>
            </article>
          </TiltCard>
        </motion.div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Stat value={String(reduced ? 8 : projects)} label={t('about_stat_projects')} className="" />
          <Stat value={String(reduced ? 5 : tech)} suffix="+" label={t('about_stat_tech')} className="float-b" />
          <Stat value="B2" label={t('about_stat_lang')} className="float-c" />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
