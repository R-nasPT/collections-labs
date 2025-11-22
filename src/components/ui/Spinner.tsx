import { cn } from '@/shared/lib';
import { Loader2Icon, LoaderIcon, RefreshCwIcon } from 'lucide-react';

type SpinnerVariant =
  | 'default'
  | 'loader'
  | 'refresh'
  | 'dots'
  | 'pulse'
  | 'ring';

interface SpinnerProps extends React.ComponentProps<'svg'> {
  variant?: SpinnerVariant;
}

function Spinner({ className, variant = 'default', ...props }: SpinnerProps) {
  // Icon-based spinners
  const iconVariants = {
    default: Loader2Icon,
    loader: LoaderIcon,
    refresh: RefreshCwIcon,
  } as const;

  const IconComponent = iconVariants[variant as keyof typeof iconVariants];

  if (IconComponent) {
    return (
      <IconComponent
        role="status"
        aria-label="Loading"
        className={cn('size-4 animate-spin', className)}
        {...props}
      />
    );
  }

  // Custom SVG spinners
  const baseClasses = cn('size-4', className);

  if (variant === 'dots') {
    return (
      <svg
        role="status"
        aria-label="Loading"
        className={baseClasses}
        viewBox="0 0 24 24"
        fill="currentColor"
        {...props}
      >
        <circle cx="4" cy="12" r="2">
          <animate
            attributeName="opacity"
            values="1;0.2;1"
            dur="1s"
            repeatCount="indefinite"
            begin="0s"
          />
        </circle>
        <circle cx="12" cy="12" r="2">
          <animate
            attributeName="opacity"
            values="1;0.2;1"
            dur="1s"
            repeatCount="indefinite"
            begin="0.33s"
          />
        </circle>
        <circle cx="20" cy="12" r="2">
          <animate
            attributeName="opacity"
            values="1;0.2;1"
            dur="1s"
            repeatCount="indefinite"
            begin="0.66s"
          />
        </circle>
      </svg>
    );
  }

  if (variant === 'pulse') {
    return (
      <svg
        role="status"
        aria-label="Loading"
        className={cn(baseClasses, 'animate-pulse')}
        viewBox="0 0 24 24"
        fill="currentColor"
        {...props}
      >
        <circle cx="12" cy="12" r="8" opacity="0.25" />
        <circle cx="12" cy="12" r="6" opacity="0.5" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    );
  }

  if (variant === 'ring') {
    return (
      <svg
        role="status"
        aria-label="Loading"
        className={cn(baseClasses, 'animate-spin')}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        {...props}
      >
        <circle cx="12" cy="12" r="10" opacity="0.25" />
        <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
      </svg>
    );
  }

  return null;
}

export { Spinner };
