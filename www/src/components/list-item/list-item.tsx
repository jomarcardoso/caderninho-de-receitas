import React, { FC, HTMLProps, ReactNode, useMemo } from 'react';
import { IoChevronForward } from 'react-icons/io5';
import './list-item.scss';
import { generateClasses } from '../../services/dom/classes';
import { SemanticButton, SemanticButtonProps } from '../semantic-button';

interface Props {
  isAction?: boolean;
  isActive?: boolean;
  icon?: ReactNode;
  noGutters?: boolean;
  noBorder?: boolean;
}

export type ListItemProps = Props &
  HTMLProps<HTMLLIElement> &
  SemanticButtonProps;

export const ListItem: FC<ListItemProps> = ({
  children,
  isAction = false,
  isActive = false,
  icon = '',
  className = '',
  noGutters = false,
  noBorder = false,
  ...props
}) => {
  const { onClick } = props;

  const classes = generateClasses({
    'list-item': true,
    [className]: className,
    '-icon': !!icon,
    '-active': isActive,
    '-no-gutters': noGutters,
    '-no-border': noBorder,
  });

  const content = useMemo(
    () => (
      <>
        {icon && <div className="list-item__image">{icon}</div>}
        <div className="list-item__content">{children}</div>
        {isAction && <IoChevronForward className="list-item__icon" />}
      </>
    ),
    [children, icon, isAction],
  );

  if (onClick) {
    return (
      <SemanticButton className={classes} {...props}>
        {content}
      </SemanticButton>
    );
  }

  return (
    <li className={classes} {...props}>
      {content}
    </li>
  );
};
