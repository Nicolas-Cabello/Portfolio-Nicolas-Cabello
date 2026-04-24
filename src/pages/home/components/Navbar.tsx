import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es');
  };

  const navLinks = [
    { label: t('nav_inicio'), id: 'inicio' },
    { label: t('nav_sobre_mi'), id: 'sobre-mi' },
    { label: t('nav_proyectos'), id: 'proyectos' },
    { label: t('nav_habilidades'), id: 'habilidades' },
    { label: t('nav_experiencia'), id: 'experiencia' },
    { label: t('nav_curriculum'), id: 'curriculum' },
    { label: t('nav_contacto'), id: 'contacto' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#09090b]/95 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={() => scrollTo('inicio')} className="cursor-pointer flex items-center gap-3">
          <img
            src="https://public.readdy.ai/ai/img_res/7d15968a-58e3-4ae8-a135-d33c7d9cc6cb.png"
            alt="Logo Nicolás Cabello"
            className="h-9 w-auto"
          />
          <span
            className="text-white font-semibold text-sm tracking-wide hidden sm:block"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Nicolás Cabello
          </span>
        </button>

        <ul className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => scrollTo(link.id)}
                className="text-zinc-400 hover:text-green-400 transition-colors duration-200 text-sm font-medium cursor-pointer whitespace-nowrap"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 border border-white/10 text-zinc-400 hover:text-green-400 hover:border-green-400/40 px-3 py-2 rounded-md text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap"
            aria-label="Cambiar idioma"
          >
            <i className="ri-translate-2 text-sm" />
            {t('lang_toggle')}
          </button>
          <button
            onClick={() => scrollTo('contacto')}
            className="flex items-center gap-2 bg-green-400 text-[#09090b] px-5 py-2 rounded-md text-sm font-semibold hover:bg-green-300 transition-all duration-200 cursor-pointer whitespace-nowrap animate-pulseGlow"
          >
            <i className="ri-mail-line" />
            {t('nav_contactame')}
          </button>
        </div>

        <button
          className="md:hidden w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer transition-colors duration-200"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menú"
        >
          <i className={`text-xl ${mobileOpen ? 'ri-close-line' : 'ri-menu-3-line'}`} />
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#09090b]/98 backdrop-blur-md border-t border-white/5 px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-zinc-300 hover:text-green-400 transition-colors duration-200 text-base text-left cursor-pointer whitespace-nowrap"
            >
              {link.label}
            </button>
          ))}
          <div className="flex items-center gap-3 pt-2 border-t border-white/5">
            <button
              onClick={() => { toggleLang(); setMobileOpen(false); }}
              className="flex items-center gap-1.5 border border-white/10 text-zinc-400 px-3 py-2 rounded-md text-xs font-semibold cursor-pointer whitespace-nowrap"
            >
              <i className="ri-translate-2" />
              {t('lang_toggle')}
            </button>
            <button
              onClick={() => scrollTo('contacto')}
              className="flex-1 bg-green-400 text-[#09090b] px-5 py-2.5 rounded-md text-sm font-semibold cursor-pointer whitespace-nowrap"
            >
              {t('nav_contactame')}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
