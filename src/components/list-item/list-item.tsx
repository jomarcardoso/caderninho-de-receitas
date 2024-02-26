import React, { FC, HTMLProps, ReactNode } from 'react';
import { IoChevronForward } from 'react-icons/io5';
import './list-item.scss';
import { generateCSSClasses } from '../../services/dom/classes';

interface Props {
  isAction?: boolean;
  isActive?: boolean;
  image?: ReactNode;
  noGutters?: boolean;
  noBorder?: boolean;
}

export type ListItemProps = Props & HTMLProps<HTMLLIElement>;

export const ListItem: FC<ListItemProps> = ({
  children,
  isAction = false,
  isActive = false,
  image = '',
  className = '',
  noGutters = false,
  noBorder = false,
  ...props
}) => {
  const classes = generateCSSClasses({
    'list-item': true,
    [className]: className,
    'list-item--action': isAction,
    'list-item--active': isActive,
    '-no-gutters': noGutters,
    '-no-border': noBorder,
  });

  return (
    <li className={classes} {...props}>
      {image && <div className="list-item__image">{image}</div>}
      <div className="list-item__content">{children}</div>
      {isAction && <IoChevronForward className="list-item__icon" />}
    </li>
  );
};
