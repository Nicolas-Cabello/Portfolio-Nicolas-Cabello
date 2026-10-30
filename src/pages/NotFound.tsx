import { useTranslation } from 'react-i18next';
import MagneticButton from '../components/MagneticButton';
import ParticleNetwork from '../components/ParticleNetwork';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#030014] px-6 text-center text-[#e2e8f0]">
      <ParticleNetwork id="notfound-particles" density={50} />
      <p className="text-depth relative text-8xl font-bold md:text-9xl">404</p>
      <h1 className="relative mt-4 text-2xl">{t('notfound_title')}</h1>
      <MagneticButton href="/" className="relative mt-8 rounded-full border border-white/20 px-6 py-3">
        {t('notfound_back')}
      </MagneticButton>
    </main>
  );
}
