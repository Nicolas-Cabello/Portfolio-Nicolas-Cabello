import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import TiltCard from '../../../components/TiltCard';

type Study = {
  id: string;
  periodKey: string;
  titleKey: string;
  institutionKey: string;
  typeKey: string;
  descKey: string;
  achievementKeys: string[];
  dot: string;
};

const studies: Study[] = [
  {
    id: 'b2',
    periodKey: 'e_lang_period',
    titleKey: 'path_b2_title',
    institutionKey: 'path_b2_place',
    typeKey: 'e_lang_type',
    descKey: 'path_b2_detail',
    achievementKeys: [],
    dot: '#7c3aed',
  },
  {
    id: 'asir',
    periodKey: 'e3_period',
    titleKey: 'e3_title',
    institutionKey: 'e3_institution',
    typeKey: 'e3_type',
    descKey: 'e3_desc',
    achievementKeys: ['e3_a1', 'e3_a2', 'e3_a3', 'e3_a4'],
    dot: '#fbbf24',
  },
  {
    id: 'bigdata',
    periodKey: 'e2_period',
    titleKey: 'e2_title',
    institutionKey: 'e2_institution',
    typeKey: 'e2_type',
    descKey: 'e2_desc',
    achievementKeys: ['e2_a1', 'e2_a2', 'e2_a3', 'e2_a4'],
    dot: '#a78bfa',
  },
  {
    id: 'nebrija',
    periodKey: 'e1_period',
    titleKey: 'e1_title',
    institutionKey: 'e1_institution',
    typeKey: 'e1_type',
    descKey: 'e1_desc',
    achievementKeys: ['e1_a1', 'e1_a2', 'e1_a3', 'e1_a4'],
    dot: '#06b6d4',
  },
];

const jobTasks = ['job_a1', 'job_a2', 'job_a3', 'job_a4'];

const ExperienceSection = () => {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const [active, setActive] = useState(studies[studies.length - 1].id);
  const current = studies.find((study) => study.id === active) ?? studies[studies.length - 1];

  return (
    <section id="experiencia" className="relative overflow-hidden bg-[#0a0a1a] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mono text-sm text-[#06b6d4]">{t('exp_label')}</p>
          <h2 className="text-depth mt-2 text-4xl font-bold md:text-5xl">
            <span className="text-[#06b6d4]">{t('exp_title_highlight')}</span> {t('exp_title_plain')}
          </h2>
        </motion.div>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-2">
          <div>
            <h3 className="mono text-sm uppercase tracking-[0.18em] text-[#c4b5fd]">{t('exp_work_label')}</h3>
            <motion.div
              className="mt-6"
              initial={reduced ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <TiltCard>
                <article className="glass-card h-full rounded-2xl p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[#7c3aed]/15 text-[#c4b5fd]">
                        <i className="ri-briefcase-line text-lg" aria-hidden="true" />
                      </span>
                      <div>
                        <h4 className="text-[17px] font-bold">{t('job_title')}</h4>
                        <p className="mt-0.5 text-sm text-[#94a3b8]">{t('job_place')}</p>
                      </div>
                    </div>
                    <span className="mono text-xs text-[#94a3b8]">{t('job_period')}</span>
                  </div>
                  <p className="mt-4 text-[15px] leading-relaxed text-[#94a3b8]">{t('job_desc')}</p>
                  <ul className="mt-4 space-y-2">
                    {jobTasks.map((key) => (
                      <li key={key} className="flex items-start gap-2 text-sm text-[#e2e8f0]">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#06b6d4]" />
                        {t(key)}
                      </li>
                    ))}
                  </ul>
                </article>
              </TiltCard>
            </motion.div>
          </div>

          <div>
            <h3 className="mono text-sm uppercase tracking-[0.18em] text-[#c4b5fd]">{t('exp_edu_label')}</h3>
            <div className="relative mt-6">
              <div className="timeline-rail absolute bottom-2 left-[11px] top-3 w-px bg-gradient-to-b from-[#7c3aed] via-[#3b82f6] to-[#06b6d4]" />
              <div className="space-y-5">
                {studies.map((study) => {
                  const selected = study.id === current.id;
                  return (
                    <button key={study.id} type="button" onClick={() => setActive(study.id)} aria-pressed={selected} className="relative flex w-full gap-4 text-left">
                      <span
                        className={`relative z-10 mt-1 h-6 w-6 flex-shrink-0 rounded-full border-2 transition-transform ${selected ? 'scale-110' : ''}`}
                        style={{ borderColor: study.dot, backgroundColor: selected ? study.dot : '#030014' }}
                      />
                      <span>
                        <span className="mono block text-sm text-white">{t(study.periodKey)}</span>
                        <span className={`mt-1 block text-sm font-semibold ${selected ? 'text-[#06b6d4]' : ''}`}>{t(study.titleKey)}</span>
                        <span className="mt-1 block text-xs text-[#94a3b8]">{t(study.institutionKey)}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            <motion.div
              key={current.id}
              className="mt-6"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TiltCard>
                <article className="glass-card rounded-2xl p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h4 className="text-[17px] font-bold">{t(current.titleKey)}</h4>
                      <p className="mt-0.5 text-sm text-[#94a3b8]">{t(current.institutionKey)}</p>
                    </div>
                    <span className="rounded-full border border-[#7c3aed]/40 bg-[#7c3aed]/15 px-3 py-1 text-xs font-medium text-[#ddd6fe]">
                      {t(current.typeKey)}
                    </span>
                  </div>
                  <p className="mt-4 text-[15px] leading-relaxed text-[#94a3b8]">{t(current.descKey)}</p>
                  {current.achievementKeys.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {current.achievementKeys.map((key) => (
                        <li key={key} className="flex items-start gap-2 text-sm text-[#e2e8f0]">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#06b6d4]" />
                          {t(key)}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
