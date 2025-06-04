import React, { FC, HTMLProps, MouseEventHandler } from 'react';

export type SemanticButtonProps = HTMLProps<HTMLAnchorElement>;

export const SemanticButton: FC<SemanticButtonProps> = ({
  children = '',
  ...props
}) => {
  const { onClick } = props;

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <a href="#" role="button" {...props} onClick={handleClick}>
      {children}
    </a>
  );
};
