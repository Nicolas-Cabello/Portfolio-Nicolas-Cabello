import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import IconButton from '../../../components/IconButton';
import ParticleBurst from '../../../components/ParticleBurst';
import TiltCard from '../../../components/TiltCard';
import { linkLabelKey, projects, type Project, type ProjectLink } from '../../../content/site';

const iconFor = (kind: ProjectLink['kind']) => (kind === 'github' ? 'github' : kind === 'demo' ? 'demo' : 'download');

const ProjectLinks = ({ project }: { project: Project }) => {
  const { t } = useTranslation();

  return (
    <p className="mt-4 flex flex-wrap gap-2">
      {project.links.map((link) => (
        <IconButton
          key={link.href}
          href={link.href}
          icon={iconFor(link.kind)}
          className={link.kind === 'github' ? 'icon-btn-sm' : 'icon-btn-sm icon-btn-solid'}
        >
          {t(linkLabelKey[link.kind])}
        </IconButton>
      ))}
    </p>
  );
};

const ProjectCard = ({ project, compact = false, onEnter }: { project: Project; compact?: boolean; onEnter: (event: React.MouseEvent) => void }) => {
  const { t } = useTranslation();
  const title = t(project.titleKey);
  const imageClass = compact ? 'h-24 w-full object-cover' : 'h-40 w-full object-cover';

  return (
    <TiltCard className="h-full" onMouseEnter={onEnter}>
      <article data-project={project.id} className="gradient-border glass-card flex h-full flex-col overflow-hidden rounded-2xl">
        {project.image ? (
          <img src={project.image} alt={title} className={imageClass} />
        ) : (
          <div className={`flex items-end bg-[radial-gradient(circle_at_30%_30%,#7c3aed,transparent_55%),radial-gradient(circle_at_70%_70%,#06b6d4,transparent_50%)] p-4 ${compact ? 'h-24' : 'h-40'}`}>
            <span className="font-semibold">{title}</span>
          </div>
        )}
        <div className={`flex flex-1 flex-col ${compact ? 'p-3' : 'p-4'}`}>
          <h3 className={`font-bold ${compact ? 'text-base' : 'text-lg'}`}>{title}</h3>
          <p className={`mt-2 text-[#94a3b8] ${compact ? 'text-xs' : 'text-sm'}`}>{t(project.summaryKey)}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li key={tag} className="mono rounded-full border border-white/10 px-2 py-1 text-[11px]">{tag}</li>
            ))}
          </ul>
          <ProjectLinks project={project} />
        </div>
      </article>
    </TiltCard>
  );
};

const ProjectsSection = () => {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const [burst, setBurst] = useState<{ x: number; y: number; token: number } | null>(null);
  const featured = projects.filter((project) => project.featured);
  const compact = projects.filter((project) => !project.featured);

  const enter = (event: React.MouseEvent) => {
    if (reduced) return;
    setBurst({ x: event.clientX, y: event.clientY, token: Date.now() });
  };

  return (
    <section id="proyectos" className="relative bg-[#0a0a1a] px-6 py-24">
      {burst && <ParticleBurst x={burst.x} y={burst.y} token={burst.token} />}
      <div className="mx-auto max-w-6xl">
        <p className="mono text-sm text-[#06b6d4]">{t('proj_label')}</p>
        <h2 className="text-depth mt-2 text-4xl font-bold md:text-5xl">{t('proj_title')}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {featured.map((project, index) => (
            <motion.div
              key={project.id}
              className="h-full"
              initial={reduced ? false : { opacity: 0, y: 28, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: reduced ? 0 : index * 0.08 }}
            >
              <ProjectCard project={project} onEnter={enter} />
            </motion.div>
          ))}
        </div>
        <p className="mono mt-12 text-xs uppercase tracking-[0.2em] text-[#94a3b8]">{t('proj_more')}</p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          {compact.map((project, index) => (
            <motion.div
              key={project.id}
              className="h-full"
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: reduced ? 0 : index * 0.08 }}
            >
              <ProjectCard project={project} compact onEnter={enter} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
