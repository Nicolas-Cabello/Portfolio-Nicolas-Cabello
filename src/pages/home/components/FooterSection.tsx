import { useTranslation } from 'react-i18next';

const EMAIL = 'nicolascabelloalonso@gmail.com';
const LINKEDIN_URL = 'https://www.linkedin.com/in/nicol%C3%A1s-cabello-alonso-94319a282/';
const GITHUB_URL = 'https://github.com/Nicolas-Cabello';

const FooterSection = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { labelKey: 'nav_inicio', id: 'inicio' },
    { labelKey: 'nav_sobre_mi', id: 'sobre-mi' },
    { labelKey: 'nav_proyectos', id: 'proyectos' },
    { labelKey: 'nav_habilidades', id: 'habilidades' },
    { labelKey: 'nav_experiencia', id: 'experiencia' },
    { labelKey: 'nav_contacto', id: 'contacto' },
  ];

  const specialtyKeys = ['spec1', 'spec2', 'spec3', 'spec4', 'spec5', 'spec6'];

  return (
    <footer className="bg-[#0c0c0e] border-t border-white/5 py-14">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://public.readdy.ai/ai/img_res/7d15968a-58e3-4ae8-a135-d33c7d9cc6cb.png"
                alt="Logo Nicolás Cabello"
                className="h-8 w-auto"
              />
              <span
                className="text-white font-semibold text-sm"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Nicolás Cabello
              </span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">{t('footer_tagline')}</p>
            <div className="flex items-center gap-4 mt-5">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="w-8 h-8 flex items-center justify-center text-zinc-600 hover:text-green-400 transition-colors duration-200 cursor-pointer"
                aria-label="GitHub"
              >
                <i className="ri-github-fill text-lg" />
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="w-8 h-8 flex items-center justify-center text-zinc-600 hover:text-green-400 transition-colors duration-200 cursor-pointer"
                aria-label="LinkedIn"
              >
                <i className="ri-linkedin-fill text-lg" />
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="w-8 h-8 flex items-center justify-center text-zinc-600 hover:text-green-400 transition-colors duration-200 cursor-pointer"
                aria-label="Email"
              >
                <i className="ri-mail-line text-lg" />
              </a>
            </div>
          </div>

          <div>
            <h4
              className="text-white font-semibold text-sm mb-4 uppercase tracking-widest"
              id="navegacion"
            >
              <a href="#navegacion">{t('footer_nav_title')}</a>
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-zinc-500 hover:text-green-400 transition-colors duration-200 text-sm cursor-pointer whitespace-nowrap"
                  >
                    {t(link.labelKey)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="text-white font-semibold text-sm mb-4 uppercase tracking-widest"
              id="especialidades"
            >
              <a href="#especialidades">{t('footer_specialties_title')}</a>
            </h4>
            <ul className="space-y-3">
              {specialtyKeys.map((key) => (
                <li key={key}>
                  <span className="text-zinc-500 text-sm">{t(key)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-600 text-sm">
            &copy; {currentYear} Nicolás Cabello. {t('footer_rights')}
          </p>
          <p className="text-zinc-600 text-xs">{t('footer_made')}</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
