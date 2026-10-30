import useTilt from '../hooks/useTilt';

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  max?: number;
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void;
};

const TiltCard = ({ children, className = '', max = 8, onMouseEnter }: TiltCardProps) => {
  const { ref, onMouseMove, onMouseLeave } = useTilt(max);

  return (
    <div className={`tilt-scene ${className}`}>
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
        className="tilt-card relative h-full"
      >
        {children}
        <span className="tilt-glare" aria-hidden="true" />
      </div>
    </div>
  );
};

export default TiltCard;
