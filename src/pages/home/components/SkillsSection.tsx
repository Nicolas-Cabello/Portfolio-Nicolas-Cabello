import { useTranslation } from 'react-i18next';
import useInView from '../../../hooks/useInView';

const SkillsSection = () => {
  const { t } = useTranslation();

  const skillCategories = [
    {
      categoryKey: 'skills_cat1',
      icon: 'ri-code-s-slash-line',
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      barColor: '#4ade80',
      skills: [
        { name: 'Python', level: 90, descKey: 's1_d1' },
        { name: 'Bash / Shell', level: 80, descKey: 's1_d2' },
        { name: 'SQL', level: 75, descKey: 's1_d3' },
      ],
    },
    {
      categoryKey: 'skills_cat2',
      icon: 'ri-brain-line',
      color: 'text-violet-400',
      bgColor: 'bg-violet-400/10',
      barColor: '#a78bfa',
      skills: [
        { name: 'Scikit-learn', level: 88, descKey: 's2_d1' },
        { name: 'Pandas / NumPy', level: 85, descKey: 's2_d2' },
        { name: 'XGBoost / CatBoost', level: 78, descKey: 's2_d3' },
        { name: 'Matplotlib / Seaborn', level: 80, descKey: 's2_d4' },
      ],
    },
    {
      categoryKey: 'skills_cat3',
      icon: 'ri-server-line',
      color: 'text-amber-400',
      bgColor: 'bg-amber-400/10',
      barColor: '#fbbf24',
      skills: [
        { name: 'Linux (Debian/Ubuntu)', level: 88, descKey: 's3_d1' },
        { name: 'Docker', level: 82, descKey: 's3_d2' },
        { name: 'TCP/IP', level: 78, descKey: 's3_d3' },
        { name: 'Active Directory', level: 70, descKey: 's3_d4' },
      ],
    },
    {
      categoryKey: 'skills_cat4',
      icon: 'ri-shield-keyhole-line',
      color: 'text-rose-400',
      bgColor: 'bg-rose-400/10',
      barColor: '#f87171',
      skills: [
        { nameKey: 's4_n1', level: 85, descKey: 's4_d1' },
        { nameKey: 's4_n2', level: 80, descKey: 's4_d2' },
        { nameKey: 's4_n3', level: 82, descKey: 's4_d3' },
        { nameKey: 's4_n4', level: 70, descKey: 's4_d4' },
      ],
    },
  ];

  const { ref: titleRef, isVisible: titleVisible } = useInView();

  return (
    <section id="habilidades" className="py-24 bg-[#09090b] relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-green-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={titleRef}
          className="in-view mb-16"
          style={titleVisible ? { opacity: 1, transform: 'translateY(0)' } : {}}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-green-400" />
            <span className="text-green-400 text-sm font-medium uppercase tracking-widest">{t('skills_label')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            <span className="gradient-text">{t('skills_title_highlight')}</span> {t('skills_title_plain')}
          </h2>
          <p className="text-zinc-400 mt-3 text-[15px] max-w-lg">{t('skills_subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((cat, i) => (
            <SkillCategory key={cat.categoryKey} category={cat} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface SkillItem {
  name?: string;
  nameKey?: string;
  level: number;
  descKey: string;
}

interface SkillCategoryData {
  categoryKey: string;
  icon: string;
  color: string;
  bgColor: string;
  barColor: string;
  skills: SkillItem[];
}

const SkillBar = ({ level, barColor }: { level: number; barColor: string }) => {
  const { ref, isVisible } = useInView({ threshold: 0.3 });
  return (
    <div ref={ref} className="w-full h-1.5 bg-[#27272a] rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-1000 ease-out"
        style={{ width: isVisible ? `${level}%` : '0%', backgroundColor: barColor }}
      />
    </div>
  );
};

const SkillCategory = ({ category, delay }: { category: SkillCategoryData; delay: number }) => {
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
      <div className="bg-[#111113] rounded-xl p-6 glow-border h-full">
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-9 h-9 flex items-center justify-center rounded-lg ${category.bgColor}`}>
            <i className={`${category.icon} ${category.color}`} />
          </div>
          <h3 className="text-white font-semibold text-base">{t(category.categoryKey)}</h3>
        </div>

        <div className="space-y-5">
          {category.skills.map((skill, idx) => {
            const skillName = skill.nameKey ? t(skill.nameKey) : (skill.name ?? '');
            return (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-zinc-200 text-[15px] font-medium">{skillName}</span>
                  <span className={`text-sm font-semibold ${category.color}`}>{skill.level}%</span>
                </div>
                <SkillBar level={skill.level} barColor={category.barColor} />
                <p className="text-zinc-500 text-sm mt-1.5 leading-relaxed">{t(skill.descKey)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
