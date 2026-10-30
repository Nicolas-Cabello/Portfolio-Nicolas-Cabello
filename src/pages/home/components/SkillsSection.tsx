import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import ParticleBurst from '../../../components/ParticleBurst';
import TiltCard from '../../../components/TiltCard';
import { skillGroups } from '../../../content/site';

const SkillsSection = () => {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const [burst, setBurst] = useState<{ x: number; y: number; token: number } | null>(null);

  return (
    <section id="habilidades" className="relative px-6 py-24">
      {burst && <ParticleBurst x={burst.x} y={burst.y} token={burst.token} color="#06b6d4" />}
      <div className="mx-auto max-w-6xl">
        <p className="mono text-sm text-[#06b6d4]">{t('skills_label')}</p>
        <h2 className="text-depth mt-2 text-4xl font-bold md:text-5xl">{t('skills_title')}</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {skillGroups.map((group) => (
            <TiltCard key={group.id}>
              <article className="glass-card h-full rounded-3xl p-6">
                <h3 className="text-lg font-semibold">{t(group.titleKey)}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item, index) => {
                    const label = 'nameKey' in item ? t(item.nameKey) : item.name;
                    return (
                      <motion.li
                        key={label}
                        initial={reduced ? false : { scale: 0.6, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: reduced ? 0 : index * 0.04 }}
                      >
                        <button
                          type="button"
                          className="mono flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm hover:border-[#7c3aed] hover:shadow-[0_0_18px_rgba(124,58,237,0.45)]"
                          onMouseEnter={(event) => {
                            if (!reduced) setBurst({ x: event.clientX, y: event.clientY, token: Date.now() });
                          }}
                        >
                          <span aria-hidden="true">{item.icon}</span>
                          {label}
                        </button>
                      </motion.li>
                    );
                  })}
                </ul>
              </article>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
