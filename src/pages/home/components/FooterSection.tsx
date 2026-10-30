import { useTranslation } from 'react-i18next';
import IconButton from '../../../components/IconButton';
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from '../../../content/site';

const FooterSection = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  const links = [
    { id: 'inicio', label: t('nav_inicio') },
    { id: 'proyectos', label: t('nav_proyectos') },
    { id: 'experiencia', label: t('nav_experiencia') },
    { id: 'contacto', label: t('nav_contacto') },
  ];

  return (
    <footer className="relative border-t border-transparent bg-[#05010f] px-6 py-12 [border-image:linear-gradient(90deg,#7c3aed,#3b82f6,#06b6d4)_1]">
      <div className="pointer-events-none absolute inset-0 opacity-30" aria-hidden="true">
        <div className="absolute left-10 top-6 h-16 w-16 rounded-full bg-[#7c3aed]/30 blur-2xl" />
        <div className="absolute bottom-4 right-16 h-20 w-20 rounded-full bg-[#06b6d4]/20 blur-2xl" />
      </div>
      <div className="relative mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
        <div>
          <div className="flex items-center gap-3">
            <img src="/favicon.png" alt="" className="h-8 w-8" />
            <span className="font-semibold">Nicolás Cabello</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-[#94a3b8]">{t('footer_tagline')}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#94a3b8]">{t('footer_nav_title')}</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {links.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className="hover:text-[#06b6d4]">{link.label}</a>
              </li>
            ))}
            <li><IconButton href={GITHUB_URL} icon="github">GitHub</IconButton></li>
            <li><IconButton href={LINKEDIN_URL} icon="linkedin">LinkedIn</IconButton></li>
            <li><IconButton href={`mailto:${EMAIL}`} icon="mail" external={false}>{EMAIL}</IconButton></li>
          </ul>
        </div>
      </div>
      <p className="relative mt-10 text-sm text-[#94a3b8]">© {year} Nicolás Cabello. {t('footer_rights')}</p>
    </footer>
  );
};

export default FooterSection;
