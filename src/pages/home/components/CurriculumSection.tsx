import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import TiltCard from '../../../components/TiltCard';
import { CV_DOWNLOAD_URL, CV_VIEW_URL } from '../../../content/site';

const CurriculumSection = () => {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const highlights = [
    { icon: 'ri-graduation-cap-line', label: t('cv_highlight1_label'), value: t('cv_highlight1_value') },
    { icon: 'ri-brain-line', label: t('cv_highlight2_label'), value: t('cv_highlight2_value') },
    { icon: 'ri-shield-check-line', label: t('cv_highlight3_label'), value: t('cv_highlight3_value') },
    { icon: 'ri-code-s-slash-line', label: t('cv_highlight4_label'), value: t('cv_highlight4_value') },
  ];

  return (
    <section id="curriculum" className="relative overflow-hidden px-6 py-24">
      <motion.div
        className="mx-auto max-w-6xl"
        initial={reduced ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-8 text-center lg:mb-16">
          <span className="mono inline-flex items-center gap-2 rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-[#c4b5fd]">
            <i className="ri-file-user-line" aria-hidden="true" />
            {t('cv_label')}
          </span>
          <h2 className="text-depth mt-4 text-3xl font-bold md:text-4xl">
            <span className="text-[#06b6d4]">{t('cv_title_highlight')}</span> {t('cv_title_plain')}
          </h2>
          <p className="mx-auto mt-4 hidden max-w-2xl text-[#94a3b8] lg:block">{t('cv_subtitle')}</p>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-2">
          <TiltCard max={6}>
            <div className="rounded-2xl border border-violet-500/30 bg-[#070314]/90 p-6 md:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.6)] backdrop-blur-md">
              {/* Document Header Bar */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-violet-500/20">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/70" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/70" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
                  <span className="ml-2 text-xs font-mono text-cyan-400">CV_NicolasCabello.pdf</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                  {t('cv_updated')}
                </span>
              </div>

              {/* Document Visual Wireframe */}
              <div className="space-y-4 font-mono text-xs text-gray-300">
                <div className="p-4 rounded-xl bg-[#030014]/80 border border-violet-500/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-base">Nicolás Cabello Alonso</span>
                    <span className="text-violet-400 text-[10px]">Técnico ASIR & IA</span>
                  </div>
                  <p className="text-[11px] text-gray-400 font-sans">
                    Toledo · nicolascabelloalonso@gmail.com · nicolascabello.com
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#030014]/50 border border-violet-500/15 space-y-1.5 text-[11px]">
                  <span className="text-cyan-400 font-semibold uppercase tracking-wider text-[10px]">Especialidades</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {['Machine Learning', 'Big Data Python', 'Linux Server', 'Docker', 'Power BI', 'Ciberseguridad'].map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded bg-violet-950/50 border border-violet-500/25 text-violet-200 text-[10px]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#030014]/50 border border-violet-500/15 space-y-1 text-[11px]">
                  <span className="text-cyan-400 font-semibold uppercase tracking-wider text-[10px]">Formación Oficial</span>
                  <p className="text-gray-300 font-sans">ASIR + Especialización en IA & Big Data</p>
                  <p className="text-gray-500 font-sans text-[10px]">FEDETO · Univ. Nebrija · I.E.S. Azarquiel</p>
                </div>
              </div>

              {/* Action Buttons inside Card */}
              <div className="mt-8 pt-5 border-t border-violet-500/20 flex flex-col sm:flex-row gap-3">
                <a
                  href={CV_DOWNLOAD_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white px-5 py-3 rounded-xl font-semibold text-xs md:text-sm shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_35px_rgba(124,58,237,0.8)] transition-all duration-300 whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-download-2-line text-base" />
                  <span>{t('cv_btn_download')}</span>
                </a>

                <a
                  href={CV_VIEW_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 border border-violet-500/40 bg-[#030014] text-gray-200 hover:text-white hover:border-cyan-400 px-5 py-3 rounded-xl font-semibold text-xs md:text-sm hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300 whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-google-drive-fill text-base text-cyan-400" />
                  <span>{t('cv_btn_view')}</span>
                </a>
              </div>
            </div>
          </TiltCard>

          <div className="flex flex-col gap-6">
            <div className="hidden lg:block">
              <h3 className="text-xl font-bold">{t('cv_card_title')}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#94a3b8]">{t('cv_card_desc')}</p>
            </div>
            <div className="hidden grid-cols-2 gap-3 lg:grid">
              {highlights.map((item) => (
                <article key={item.label} className="glass-card flex flex-col gap-2 rounded-xl p-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#7c3aed]/15 text-[#c4b5fd]">
                    <i className={`${item.icon} text-base`} aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold leading-tight">{item.value}</span>
                  <span className="text-xs text-[#94a3b8]">{item.label}</span>
                </article>
              ))}
            </div>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row lg:hidden">
              <a
                href={CV_DOWNLOAD_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] px-6 py-3.5 text-sm font-semibold text-white"
              >
                <i className="ri-download-2-line text-base" aria-hidden="true" />
                {t('cv_btn_download')}
              </a>
              <a
                href={CV_VIEW_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-white/15 px-6 py-3.5 text-sm font-semibold text-[#e2e8f0] transition-colors hover:border-[#06b6d4]/50 hover:text-[#06b6d4]"
              >
                <i className="ri-external-link-line text-base" aria-hidden="true" />
                {t('cv_btn_view')}
              </a>
            </div>
            <p className="flex items-center gap-1.5 text-xs text-[#94a3b8] lg:justify-start">
              <i className="ri-information-line" aria-hidden="true" />
              {t('cv_note')}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CurriculumSection;
