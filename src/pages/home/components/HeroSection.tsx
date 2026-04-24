import { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation();

  const TITLES = useMemo(() => [
    t('hero_title0'),
    t('hero_title1'),
    t('hero_title2'),
    t('hero_title3'),
  ], [t]);

  const [titleIndex, setTitleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = TITLES[titleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 35);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, titleIndex, TITLES]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://readdy.ai/api/search-image?query=dark%20abstract%20technology%20neural%20network%20AI%20digital%20data%20visualization%20emerald%20green%20neon%20particles%20geometric%20grid%20lines%20floating%20code%20elements%20deep%20black%20background%20ultra%20realistic%20cinematic%20professional%208k%20portfolio%20hero%20atmosphere%20glowing%20nodes%20interconnected%20system&width=1920&height=1080&seq=hero001&orientation=landscape)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#09090b]/70 via-[#09090b]/60 to-[#09090b]" />
      <div className="absolute inset-0 grid-bg opacity-40" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-24 pb-16 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 bg-[#18181b]/80 border border-green-400/30 text-green-400 text-xs font-medium px-4 py-2 rounded-full mb-8 backdrop-blur-sm animate-fadeInUp">
          <span className="w-2 h-2 flex items-center justify-center">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulseGlow" />
          </span>
          {t('hero_badge')}
        </div>

        <h1
          className="text-5xl md:text-7xl font-bold text-white leading-tight mb-4 animate-fadeInUp"
          style={{ animationDelay: '0.1s', opacity: 0 }}
        >
          Nicolás <span className="gradient-text">Cabello</span>
        </h1>

        <div
          className="flex items-center justify-center gap-2 text-xl md:text-2xl text-zinc-300 font-medium mb-6 h-9 animate-fadeInUp"
          style={{ animationDelay: '0.25s', opacity: 0 }}
        >
          <span>{displayed}</span>
          <span className="animate-blink text-green-400">|</span>
        </div>

        <p
          className="max-w-2xl text-zinc-300 text-[17px] md:text-lg leading-relaxed mb-10 animate-fadeInUp"
          style={{ animationDelay: '0.4s', opacity: 0 }}
        >
          {t('hero_desc')}
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 animate-fadeInUp"
          style={{ animationDelay: '0.55s', opacity: 0 }}
        >
          <button
            onClick={() => scrollTo('proyectos')}
            className="flex items-center justify-center gap-2 bg-green-400 text-[#09090b] px-8 py-3.5 rounded-md font-semibold text-sm hover:bg-green-300 transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            <i className="ri-code-s-slash-line" />
            {t('hero_cta_projects')}
          </button>
          <button
            onClick={() => scrollTo('contacto')}
            className="flex items-center justify-center gap-2 border border-green-400/40 text-green-400 px-8 py-3.5 rounded-md font-semibold text-sm hover:bg-green-400/10 transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            <i className="ri-mail-line" />
            {t('hero_cta_contact')}
          </button>
        </div>

        <div
          className="mt-8 flex items-center gap-6 animate-fadeInUp"
          style={{ animationDelay: '0.7s', opacity: 0 }}
        >
          <a
            href="https://github.com/Nicolas-Cabello"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="w-9 h-9 flex items-center justify-center text-zinc-500 hover:text-green-400 transition-colors duration-200 cursor-pointer"
            aria-label="GitHub"
          >
            <i className="ri-github-fill text-xl" />
          </a>
          <a
            href="https://www.linkedin.com/in/nicol%C3%A1s-cabello-alonso-94319a282/"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="w-9 h-9 flex items-center justify-center text-zinc-500 hover:text-green-400 transition-colors duration-200 cursor-pointer"
            aria-label="LinkedIn"
          >
            <i className="ri-linkedin-fill text-xl" />
          </a>
        </div>

        <button
          onClick={() => scrollTo('sobre-mi')}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-green-400 transition-colors duration-200 cursor-pointer animate-float"
          aria-label="Scroll hacia abajo"
        >
          <i className="ri-arrow-down-line text-xl" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
