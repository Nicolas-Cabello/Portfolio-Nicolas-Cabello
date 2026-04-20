import { useTranslation } from 'react-i18next';
import useInView from '../../../hooks/useInView';

interface ProjectData {
  id: string;
  titleKey: string;
  descKey: string;
  badgeKey: string;
  badgeColor: string;
  image: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  highlightKeys: string[];
  tags: string[];
  githubUrl: string;
  liveUrl: string;
}

const ProjectsSection = () => {
  const { t } = useTranslation();

  const projects: ProjectData[] = [
    {
      id: 'p1',
      titleKey: 'proj1_title',
      descKey: 'proj1_desc',
      badgeKey: 'proj1_badge',
      badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
      image: 'https://readdy.ai/api/search-image?query=cybersecurity%20digital%20authentication%20fingerprint%20biometric%20scanner%20Linux%20terminal%20interface%20dark%20background%20green%20neon%20glowing%20security%20shield%20access%20control%20two%20factor%20authentication%20professional%20system%20modern%20UI&width=800&height=500&seq=proj001&orientation=landscape',
      icon: 'ri-shield-keyhole-line',
      iconBg: 'bg-rose-500/10',
      iconColor: 'text-rose-400',
      highlightKeys: ['proj1_h1', 'proj1_h2', 'proj1_h3', 'proj1_h4'],
      tags: ['Python', 'Linux', 'PAM', 'Biometría', 'TOTP'],
      githubUrl: 'https://github.com/Nicolas-Cabello/Sistema-de-Seguridad-2FA-y-biometrico-en-Linux',
      liveUrl: '',
    },
    {
      id: 'p2',
      titleKey: 'proj2_title',
      descKey: 'proj2_desc',
      badgeKey: 'proj2_badge',
      badgeColor: 'bg-green-500/20 text-green-400 border-green-500/30',
      image: 'https://readdy.ai/api/search-image?query=data%20science%20machine%20learning%20analytics%20dashboard%20automotive%20used%20cars%20Spain%20market%20data%20visualization%20charts%20graphs%20Python%20predictive%20model%20dark%20professional%20interface%20clean%20modern%20digital&width=800&height=500&seq=proj002&orientation=landscape',
      icon: 'ri-bar-chart-2-line',
      iconBg: 'bg-green-500/10',
      iconColor: 'text-green-400',
      highlightKeys: ['proj2_h1', 'proj2_h2', 'proj2_h3', 'proj2_h4'],
      tags: ['Python', 'Scikit-learn', 'XGBoost', 'Pandas', 'EDA'],
      githubUrl: 'https://github.com/Nicolas-Cabello/Analisis-Mercado-Automocion',
      liveUrl: '',
    },
    {
      id: 'p3',
      titleKey: 'proj3_title',
      descKey: 'proj3_desc',
      badgeKey: 'proj3_badge',
      badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      image: 'https://readdy.ai/api/search-image?query=chatbot%20conversational%20AI%20interface%20parcel%20tracking%20delivery%20logistics%20courier%20service%20dark%20background%20warm%20amber%20accent%20modern%20web%20application%20chat%20bubbles%20package%20shipment%20status%20real-time%20professional%20UI%20clean%20minimal%20design&width=800&height=500&seq=proj003&orientation=landscape',
      icon: 'ri-chat-3-line',
      iconBg: 'bg-amber-500/10',
      iconColor: 'text-amber-400',
      highlightKeys: ['proj3_h1', 'proj3_h2', 'proj3_h3', 'proj3_h4'],
      tags: ['React', 'TypeScript', 'Chatbot', 'Vercel', 'NLP'],
      githubUrl: 'https://github.com/Nicolas-Cabello/Chatbot-Correos-Express',
      liveUrl: 'https://chatbot-correos-express-kh5p3n1xu-nicolas-cabellos-projects.vercel.app/',
    },
  ];

  const { ref: titleRef, isVisible: titleVisible } = useInView();

  return (
    <section id="proyectos" className="py-24 bg-[#0c0c0e] relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={titleRef}
          className="in-view mb-16"
          style={titleVisible ? { opacity: 1, transform: 'translateY(0)' } : {}}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-green-400" />
            <span className="text-green-400 text-sm font-medium uppercase tracking-widest">{t('proj_label')}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              {t('proj_title_plain')} <span className="gradient-text">{t('proj_title_highlight')}</span>
            </h2>
            <p className="text-zinc-400 text-sm max-w-xs md:text-right">
              {t('proj_subtitle')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, delay }: { project: ProjectData; delay: number }) => {
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
      <article className="bg-[#111113] rounded-xl overflow-hidden glow-border group transition-all duration-300 hover:-translate-y-1 cursor-pointer">
        <div className="relative h-52 overflow-hidden">
          <img
            src={project.image}
            alt={t(project.titleKey)}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-[#111113]/30 to-transparent" />
          <span className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1.5 rounded-full border backdrop-blur-sm whitespace-nowrap ${project.badgeColor}`}>
            {t(project.badgeKey)}
          </span>
        </div>

        <div className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className={`w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0 ${project.iconBg}`}>
              <i className={`${project.icon} text-lg ${project.iconColor}`} />
            </div>
            <h3 className="text-white font-bold text-lg leading-snug group-hover:text-green-400 transition-colors duration-200">
              {t(project.titleKey)}
            </h3>
          </div>

          <p className="text-zinc-300 text-[15px] leading-relaxed mb-5">{t(project.descKey)}</p>

          <ul className="grid grid-cols-2 gap-2 mb-5">
            {project.highlightKeys.map((hk) => (
              <li key={hk} className="flex items-center gap-2 text-zinc-300 text-sm">
                <span className="w-1.5 h-1.5 flex items-center justify-center flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                </span>
                {t(hk)}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm text-zinc-300 bg-[#18181b] border border-white/5 px-3 py-1 rounded-md whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-white/5">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex items-center gap-2 text-zinc-400 hover:text-green-400 text-sm transition-colors duration-200 cursor-pointer whitespace-nowrap"
              aria-label={`Ver código de ${t(project.titleKey)} en GitHub`}
            >
              <i className="ri-github-fill" />
              {t('proj_btn_repo')}
            </a>
            {project.liveUrl && (
              <>
                <span className="text-zinc-600">·</span>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex items-center gap-2 text-zinc-400 hover:text-green-400 text-sm transition-colors duration-200 cursor-pointer whitespace-nowrap"
                  aria-label={`Ver demo de ${t(project.titleKey)}`}
                >
                  <i className="ri-external-link-line" />
                  {t('proj_btn_live')}
                </a>
              </>
            )}
          </div>
        </div>
      </article>
    </div>
  );
};

export default ProjectsSection;
