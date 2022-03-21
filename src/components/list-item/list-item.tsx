import React, { FC, HTMLProps } from 'react';
import { IoChevronForward } from 'react-icons/io5';
import './list-item.scss';

interface Props {
  isAction?: boolean;
  isActive?: boolean;
}

export type ListItemProps = Props & HTMLProps<HTMLLIElement>;

export const ListItem: FC<ListItemProps> = ({
  children,
  isAction = false,
  isActive = false,
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
      <div className="list-item__content">{children}</div>
      {isAction && <IoChevronForward className="list-item__icon" />}
    </li>
  );
};
