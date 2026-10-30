import useMagnetic from '../hooks/useMagnetic';

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  ariaLabel?: string;
  target?: string;
  rel?: string;
};

const MagneticButton = ({
  children,
  className = '',
  href,
  onClick,
  type = 'button',
  disabled,
  ariaLabel,
  target,
  rel,
}: MagneticButtonProps) => {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic();
  const classes = `magnetic-btn ${className}`;

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        className={classes}
        aria-label={ariaLabel}
        target={target}
        rel={rel}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={classes}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default MagneticButton;
