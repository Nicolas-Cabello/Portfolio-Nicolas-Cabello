import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MagneticButton from '../../../components/MagneticButton';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isEn = (i18n.resolvedLanguage ?? i18n.language).startsWith('en');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.lang = isEn ? 'en' : 'es';
  }, [isEn]);

  const links = [
    { id: 'inicio', label: t('nav_inicio') },
    { id: 'sobre-mi', label: t('nav_sobre_mi') },
    { id: 'proyectos', label: t('nav_proyectos') },
    { id: 'habilidades', label: t('nav_habilidades') },
    { id: 'experiencia', label: t('nav_experiencia') },
    { id: 'curriculum', label: t('nav_curriculum') },
  ];

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors ${scrolled ? 'border-b border-white/10 bg-[#030014]/70 backdrop-blur-[15px]' : 'bg-transparent'}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <a href="#inicio" className="flex items-center gap-3">
          <img src="/favicon.png" alt="" className="float-a h-9 w-9" />
          <span className="hidden text-sm font-semibold sm:block">Nicolás Cabello</span>
        </a>
        <nav className="hidden items-center gap-5 lg:flex">
          {links.map((link) => (
            <a key={link.id} href={`#${link.id}`} className="nav-link text-sm text-[#94a3b8] hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => i18n.changeLanguage(isEn ? 'es' : 'en')}
            className="mono inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1 text-xs"
          >
            <i className="ri-translate-2 text-sm text-[#06b6d4]" aria-hidden="true" />
            {t('lang_toggle')}
          </button>
          <MagneticButton href="#contacto" className="rounded-full bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] px-4 py-2 text-sm font-semibold text-white shadow-[0_0_18px_rgba(124,58,237,0.45)]">
            <i className="ri-mail-line text-base" aria-hidden="true" />
            {t('nav_contactame')}
          </MagneticButton>
          <button type="button" className="mono text-xs lg:hidden" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col gap-3 border-t border-white/10 bg-[#030014]/95 px-6 py-4 lg:hidden">
          {links.map((link) => (
            <a key={link.id} href={`#${link.id}`} onClick={() => setOpen(false)} className="text-left text-[#e2e8f0]">
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
