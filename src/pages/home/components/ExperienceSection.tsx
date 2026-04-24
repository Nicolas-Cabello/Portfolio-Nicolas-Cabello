import { useTranslation } from 'react-i18next';
import useInView from '../../../hooks/useInView';

const ExperienceSection = () => {
  const { t } = useTranslation();

  const experiences = [
    {
      id: 'e1',
      periodKey: 'e1_period',
      titleKey: 'e1_title',
      institutionKey: 'e1_institution',
      typeKey: 'e1_type',
      typeColor: 'bg-green-400/10 text-green-400 border-green-400/20',
      dotColor: '#4ade80',
      descKey: 'e1_desc',
      achievementKeys: ['e1_a1', 'e1_a2', 'e1_a3', 'e1_a4'],
      icon: 'ri-building-4-line',
    },
    {
      id: 'e2',
      periodKey: 'e2_period',
      titleKey: 'e2_title',
      institutionKey: 'e2_institution',
      typeKey: 'e2_type',
      typeColor: 'bg-violet-400/10 text-violet-400 border-violet-400/20',
      dotColor: '#a78bfa',
      descKey: 'e2_desc',
      achievementKeys: ['e2_a1', 'e2_a2', 'e2_a3', 'e2_a4'],
      icon: 'ri-brain-line',
    },
    {
      id: 'e3',
      periodKey: 'e3_period',
      titleKey: 'e3_title',
      institutionKey: 'e3_institution',
      typeKey: 'e3_type',
      typeColor: 'bg-amber-400/10 text-amber-400 border-amber-400/20',
      dotColor: '#fbbf24',
      descKey: 'e3_desc',
      achievementKeys: ['e3_a1', 'e3_a2', 'e3_a3', 'e3_a4'],
      icon: 'ri-computer-line',
    },
  ];

  const { ref: titleRef, isVisible: titleVisible } = useInView();

  return (
    <section id="experiencia" className="py-24 bg-[#0c0c0e] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-400/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={titleRef}
          className="in-view mb-16"
          style={titleVisible ? { opacity: 1, transform: 'translateY(0)' } : {}}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-green-400" />
            <span className="text-green-400 text-sm font-medium uppercase tracking-widest">{t('exp_label')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            <span className="gradient-text">{t('exp_title_highlight')}</span> {t('exp_title_plain')}
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-green-400/50 via-zinc-800 to-transparent hidden md:block" />
          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <ExperienceCard key={exp.id} exp={exp} delay={i * 0.15} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface ExperienceData {
  id: string;
  periodKey: string;
  titleKey: string;
  institutionKey: string;
  typeKey: string;
  typeColor: string;
  dotColor: string;
  descKey: string;
  achievementKeys: string[];
  icon: string;
}

const ExperienceCard = ({ exp, delay }: { exp: ExperienceData; delay: number }) => {
  const { t } = useTranslation();
  const { ref, isVisible } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className="in-view"
      style={
        isVisible
          ? { opacity: 1, transform: 'translateY(0)', transitionDelay: `${delay}s` }
          : { transitionDelay: `${delay}s` }
      }
    >
      <div className="flex gap-6 md:gap-8">
        <div className="hidden md:flex flex-col items-center flex-shrink-0 pt-1">
          <div
            className="w-10 h-10 flex items-center justify-center rounded-full border-2 flex-shrink-0"
            style={{ borderColor: exp.dotColor, backgroundColor: `${exp.dotColor}15` }}
          >
            <span
              className="w-3 h-3 flex items-center justify-center rounded-full"
              style={{ backgroundColor: exp.dotColor }}
            />
          </div>
        </div>

        <div className="flex-1 bg-[#111113] rounded-xl p-6 glow-border group hover:bg-[#141416] transition-all duration-300">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 flex items-center justify-center bg-[#1a1a1d] rounded-lg flex-shrink-0">
                <i className={`${exp.icon} text-green-400`} />
              </div>
              <div>
                <h3 className="text-white font-bold text-[17px] leading-snug group-hover:text-green-400 transition-colors duration-200">
                  {t(exp.titleKey)}
                </h3>
                <p className="text-zinc-400 text-sm mt-0.5">{t(exp.institutionKey)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0 flex-wrap gap-y-2">
              <span className={`text-xs font-medium px-3 py-1 rounded-full border whitespace-nowrap ${exp.typeColor}`}>
                {t(exp.typeKey)}
              </span>
              <span className="text-zinc-600 text-xs whitespace-nowrap">{t(exp.periodKey)}</span>
            </div>
          </div>

          <p className="text-zinc-400 text-[15px] leading-relaxed mb-4">{t(exp.descKey)}</p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {exp.achievementKeys.map((ak) => (
              <li key={ak} className="flex items-center gap-2 text-zinc-300 text-sm">
                <span className="w-1.5 h-1.5 flex items-center justify-center flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                </span>
                {t(ak)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;
