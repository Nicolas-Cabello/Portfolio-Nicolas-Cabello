import useScrollProgress from '../hooks/useScrollProgress';

const ScrollProgress = () => {
  const progress = useScrollProgress();

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px] bg-white/5" aria-hidden="true">
      <div
        className="h-full bg-gradient-to-r from-[#7c3aed] via-[#3b82f6] to-[#06b6d4]"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
};

export default ScrollProgress;
