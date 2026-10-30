type ParticleBurstProps = {
  x: number;
  y: number;
  token: number;
  color?: string;
};

const ParticleBurst = ({ x, y, token, color = '#8b5cf6' }: ParticleBurstProps) => {
  return (
    <span key={token} className="pointer-events-none fixed z-[80]" style={{ left: x, top: y }} aria-hidden="true">
      {Array.from({ length: 8 }, (_, index) => (
        <span
          key={index}
          className="burst-dot"
          style={{
            background: color,
            ['--burst-x' as string]: `${Math.cos((index / 8) * Math.PI * 2) * 42}px`,
            ['--burst-y' as string]: `${Math.sin((index / 8) * Math.PI * 2) * 42}px`,
          }}
        />
      ))}
    </span>
  );
};

export default ParticleBurst;
