import React, { FC, HTMLProps, ReactNode } from 'react';
import { IoChevronForward } from 'react-icons/io5';
import './list-item.scss';

interface Props {
  isAction?: boolean;
  isActive?: boolean;
  image?: ReactNode;
}

export type ListItemProps = Props & HTMLProps<HTMLLIElement>;

export const ListItem: FC<ListItemProps> = ({
  children,
  isAction = false,
  isActive = false,
  image = '',
  className = '',
  ...props
}) => {
  let classes = 'list-item';

  if (className) {
    classes += ` ${className}`;
  }

  if (isAction) {
    classes += ' list-item--action';
  }

  if (isActive) {
    classes += ' list-item--active';
  }

  return (
    <li className={classes} {...props}>
      {image && <div className="list-item__image">{image}</div>}
      <div className="list-item__content">{children}</div>
      {isAction && <IoChevronForward className="list-item__icon" />}
    </li>
  );
};
