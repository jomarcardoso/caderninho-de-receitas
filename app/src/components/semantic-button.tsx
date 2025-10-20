import type { FC, HTMLProps, MouseEventHandler } from 'react';

export type SemanticButtonProps = HTMLProps<HTMLAnchorElement> & {
  disabled?: boolean;
};

export const SemanticButton: FC<SemanticButtonProps> = ({
  children = '',
  disabled = false,
  ...props
}) => {
  const { onClick } = props;

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();

    if (disabled) return;

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <a
      href="#"
      role="button"
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      {...props}
      onClick={handleClick}
    >
      {children}
    </a>
  );
};
