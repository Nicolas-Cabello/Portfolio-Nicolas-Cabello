import { useTranslation } from 'react-i18next';
import useInView from '../../../hooks/useInView';

const AboutSection = () => {
  const { t } = useTranslation();
  const { ref: sectionRef, isVisible } = useInView();
  const { ref: imgRef, isVisible: imgVisible } = useInView({ threshold: 0.1 });

  const stats = [
    { value: '2+', labelKey: 'about_stat1_label', icon: 'ri-code-s-slash-line' },
    { value: '3+', labelKey: 'about_stat2_label', icon: 'ri-award-line' },
    { value: '5+', labelKey: 'about_stat3_label', icon: 'ri-stack-line' },
    { value: '1',  labelKey: 'about_stat4_label', icon: 'ri-graduation-cap-line' },
  ];

  return (
    <section id="sobre-mi" className="py-24 bg-[#09090b] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={sectionRef}
          className="in-view"
          style={isVisible ? { opacity: 1, transform: 'translateY(0)' } : {}}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-green-400" />
            <span className="text-green-400 text-sm font-medium uppercase tracking-widest">{t('about_label')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">
            {t('about_title_plain')} <span className="gradient-text">{t('about_title_highlight')}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div
            className="in-view"
            style={isVisible ? { opacity: 1, transform: 'translateY(0)' } : {}}
          >
            <p className="text-zinc-300 leading-relaxed text-[17px] mb-6">
              {t('about_bio1')}
            </p>
            <p className="text-zinc-300 leading-relaxed text-[17px] mb-6">
              {t('about_bio2')}
            </p>
            <p className="text-zinc-300 leading-relaxed text-[17px] mb-10">
              {t('about_bio3')}
            </p>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.value}
                  className="bg-[#111113] rounded-lg p-5 glow-border group transition-all duration-300 hover:bg-[#18181b]"
                >
                  <div className="w-8 h-8 flex items-center justify-center mb-3">
                    <i className={`${stat.icon} text-green-400 text-xl`} />
                  </div>
                  <div
                    className="text-3xl font-bold text-green-400 mb-1"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-zinc-400 text-sm leading-tight whitespace-pre-line">
                    {t(stat.labelKey)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            ref={imgRef}
            className="in-view"
            style={imgVisible ? { opacity: 1, transform: 'translateY(0)' } : {}}
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-green-400/20 to-transparent" />
              <div className="relative rounded-xl overflow-hidden w-full h-[420px]">
                <img
                  src="https://readdy.ai/api/search-image?query=minimalist%20professional%20developer%20workspace%20dark%20room%20multiple%20monitors%20showing%20Python%20machine%20learning%20code%20data%20charts%20emerald%20green%20ambient%20lighting%20modern%20tech%20setup%20clean%20aesthetic%20neon%20glow%20keyboard%20photography%20cinematic&width=800&height=600&seq=about001&orientation=landscape"
                  alt="Workspace profesional de Nicolás Cabello"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/60 via-transparent to-transparent" />
              </div>

              <div className="absolute bottom-6 left-6 right-6 bg-[#09090b]/90 backdrop-blur-sm border border-white/10 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-green-400/20 rounded-md">
                    <i className="ri-terminal-line text-green-400 text-sm" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">Python · Docker · Linux · ML</p>
                    <p className="text-zinc-400 text-xs">{t('about_stack_sublabel')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
