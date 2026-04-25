import { useTranslation } from 'react-i18next';
import useInView from '../../../hooks/useInView';

const CV_URL = 'https://drive.google.com/file/d/19p6cQ9fNO90SOvuYYkSXKopCUvqdppF5/view?usp=sharing';
const CV_DOWNLOAD_URL = 'https://drive.google.com/uc?export=download&id=19p6cQ9fNO90SOvuYYkSXKopCUvqdppF5';

const CurriculumSection = () => {
  const { t } = useTranslation();
  const { ref, isVisible: inView } = useInView({ threshold: 0.1 });

  const highlights = [
    { icon: 'ri-graduation-cap-line', label: t('cv_highlight1_label'), value: t('cv_highlight1_value') },
    { icon: 'ri-brain-line', label: t('cv_highlight2_label'), value: t('cv_highlight2_value') },
    { icon: 'ri-shield-check-line', label: t('cv_highlight3_label'), value: t('cv_highlight3_value') },
    { icon: 'ri-code-s-slash-line', label: t('cv_highlight4_label'), value: t('cv_highlight4_value') },
  ];

  return (
    <section id="curriculum" className="py-24 bg-[#09090b] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-green-400/3 blur-3xl" />
      </div>

      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-green-400 text-xs font-semibold tracking-widest uppercase mb-4 border border-green-400/20 px-4 py-1.5 rounded-full bg-green-400/5">
            <i className="ri-file-user-line" />
            {t('cv_label')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            <span className="text-green-400">{t('cv_title_highlight')}</span>{' '}
            <span>{t('cv_title_plain')}</span>
          </h2>
          <p className="text-zinc-400 text-base max-w-2xl mx-auto leading-relaxed">
            {t('cv_subtitle')}
          </p>
        </div>

        {/* Main card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: preview card */}
          <div className="relative group">
            <div className="bg-zinc-900/60 border border-white/8 rounded-lg overflow-hidden">
              {/* CV mock preview */}
              <div className="relative bg-gradient-to-br from-zinc-900 to-zinc-800 p-8 min-h-[340px] flex flex-col justify-between">
                {/* Top bar */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  <span className="ml-3 text-zinc-500 text-xs font-mono">curriculum_vitae.pdf</span>
                </div>

                {/* Mock CV content */}
                <div className="flex-1 space-y-4">
                  <div>
                    <div className="h-5 w-48 bg-green-400/20 rounded mb-2" />
                    <div className="h-3 w-32 bg-zinc-700 rounded" />
                  </div>
                  <div className="border-t border-white/5 pt-4 space-y-2">
                    <div className="h-2.5 w-full bg-zinc-700/60 rounded" />
                    <div className="h-2.5 w-5/6 bg-zinc-700/60 rounded" />
                    <div className="h-2.5 w-4/6 bg-zinc-700/60 rounded" />
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-8 bg-zinc-700/40 rounded border border-white/5" />
                    ))}
                  </div>
                  <div className="space-y-2 pt-1">
                    <div className="h-2 w-full bg-zinc-700/50 rounded" />
                    <div className="h-2 w-3/4 bg-zinc-700/50 rounded" />
                  </div>
                </div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                  <a
                    href={CV_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-green-400 text-[#09090b] px-6 py-3 rounded-md font-semibold text-sm cursor-pointer whitespace-nowrap hover:bg-green-300 transition-colors duration-200"
                  >
                    <i className="ri-eye-line" />
                    {t('cv_btn_view')}
                  </a>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-zinc-500 text-xs">
                  <i className="ri-file-pdf-line text-red-400" />
                  <span>PDF · Nicolás Cabello Alonso</span>
                </div>
                <span className="text-green-400 text-xs font-semibold">{t('cv_updated')}</span>
              </div>
            </div>
          </div>

          {/* Right: info + buttons */}
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {t('cv_card_title')}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {t('cv_card_desc')}
              </p>
            </div>

            {/* Highlights grid */}
            <div className="grid grid-cols-2 gap-3">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="bg-zinc-900/60 border border-white/8 rounded-lg p-4 flex flex-col gap-2"
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-md bg-green-400/10 text-green-400">
                    <i className={`${item.icon} text-base`} />
                  </div>
                  <span className="text-white text-sm font-semibold leading-tight">{item.value}</span>
                  <span className="text-zinc-500 text-xs">{item.label}</span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={CV_DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-green-400 text-[#09090b] px-6 py-3.5 rounded-md font-semibold text-sm cursor-pointer whitespace-nowrap hover:bg-green-300 transition-all duration-200 animate-pulseGlow"
              >
                <i className="ri-download-2-line text-base" />
                {t('cv_btn_download')}
              </a>
              <a
                href={CV_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 border border-white/10 text-zinc-300 hover:text-green-400 hover:border-green-400/40 px-6 py-3.5 rounded-md font-semibold text-sm cursor-pointer whitespace-nowrap transition-all duration-200"
              >
                <i className="ri-external-link-line text-base" />
                {t('cv_btn_view')}
              </a>
            </div>

            {/* Note */}
            <p className="text-zinc-600 text-xs flex items-center gap-1.5">
              <i className="ri-information-line text-zinc-500" />
              {t('cv_note')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurriculumSection;
