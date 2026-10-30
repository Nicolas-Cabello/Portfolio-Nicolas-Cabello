type IconName = 'github' | 'linkedin' | 'mail' | 'demo' | 'download';

const remixIcon: Record<IconName, string> = {
  github: 'ri-github-fill',
  linkedin: 'ri-linkedin-fill',
  mail: 'ri-mail-line',
  demo: 'ri-external-link-line',
  download: 'ri-download-line',
};

type IconButtonProps = {
  href: string;
  icon: IconName;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  variant?: 'pill' | 'link';
};

const IconButton = ({ href, icon, children, className = '', external = true, variant = 'pill' }: IconButtonProps) => {
  const classes = variant === 'link'
    ? `inline-flex items-center gap-2 text-sm text-[#94a3b8] transition-colors duration-200 hover:text-[#06b6d4] ${className}`
    : `icon-btn ${className}`;

  return (
    <a
      href={href}
      className={classes}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      <i className={`${remixIcon[icon]} text-base leading-none`} aria-hidden="true" />
      {children}
    </a>
  );
};

export default IconButton;
