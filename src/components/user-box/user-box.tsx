import React, { FC, HTMLProps, ReactNode } from 'react';
import { generateCSSClasses } from '../../services/dom/classes';
import { Avatar } from '../avatar/avatar';
import './user-box.scss';

export interface UserBoxProps extends Omit<HTMLProps<HTMLDivElement>, 'name'> {
  src?: string;
  name?: ReactNode;
}

export const UserBox: FC<UserBoxProps> = ({
  src = '',
  name = '',
  className = '',
  ...props
}) => {
  const classes = generateCSSClasses({
    'user-box': true,
    [className]: className,
  });

  return (
    <section className={classes} {...props}>
      <Avatar src={src} />
      {name}
    </section>
  );
};
